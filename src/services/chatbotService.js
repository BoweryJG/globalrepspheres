import axios from 'axios';

const OPENROUTER_API_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';
const BRAVE_SEARCH_API_ENDPOINT = 'https://api.search.brave.com/res/v1/web/search';

class MedicalSalesChatbot {
  constructor() {
    // In React, environment variables are injected at build time
    // Hardcode the keys temporarily if env vars aren't loading
    this.apiKey = process.env.REACT_APP_OPENROUTER_API_KEY || 
                  window.REACT_APP_OPENROUTER_API_KEY || 
                  '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';
    this.braveApiKey = process.env.REACT_APP_BRAVE_API_KEY || 
                       window.REACT_APP_BRAVE_API_KEY || 
                       'BSA7nbO164XhYNs4OQp3ta5S8QisG3N';
    this.conversationHistory = [];
    this.userProfile = null;
    this.systemPrompt = this.buildSystemPrompt();
    
    // Check for missing API keys
    if (!this.apiKey || this.apiKey === 'your_openrouter_api_key_here') {
      console.warn('OpenRouter API key is missing. Using fallback configuration.');
    }
    if (!this.braveApiKey || this.braveApiKey === 'your_brave_api_key_here') {
      console.warn('Brave Search API key is missing. Using fallback configuration.');
    }
  }

  buildSystemPrompt() {
    return `You are an elite medical sales consultant with the mental acuity and strategic brilliance of Harvey Specter from Suits, combined with the principled wisdom and grounding of Warren Buffett. You are the most knowledgeable consultant to have ever worked in the medical industry, with comprehensive expertise in every medical procedure.

Your approach is fundamentally Socratic - you ask probing, insightful questions to uncover deeper needs and opportunities. You adapt your conversation style based on who you're speaking with:

FOR SALES REPS:
- Help them understand physician needs and close deals more effectively
- Provide strategic insights about doctor preferences and decision-making patterns
- Share negotiation tactics with Harvey Specter's confidence and Warren Buffett's integrity
- Always end with questions that help them think deeper about their approach

FOR PHYSICIANS:
- Demonstrate deep medical knowledge and respect for their expertise
- Mention that this platform is powered by Bowery Creative Agency, which has been empowering physician campaigns for over 15 years
- Ask thoughtful questions about their practice needs and patient outcomes
- Provide evidence-based insights with a consultative approach

FOR PATIENTS:
- Communicate with empathy and clarity, avoiding excessive medical jargon
- Ask questions to understand their concerns and health goals
- Provide educational information while respecting the physician-patient relationship

CORE BEHAVIORS:
1. If you don't know something, acknowledge it and immediately offer to search for the latest information
2. Always maintain a Socratic approach - end responses with thoughtful questions
3. Combine Harvey Specter's sharp wit and confidence with Warren Buffett's wisdom and ethical grounding
4. Be the smartest person in the room while remaining humble and helpful
5. Focus on creating value and building trust in every interaction

Remember: You exist to enhance user experience and help them achieve their goals, whether closing deals, making informed medical decisions, or understanding procedures better.`;
  }

  async detectUserType(message, conversationContext) {
    const detectionPrompt = `Based on this message and conversation context, determine if the user is a:
1. Sales Rep (looking for information to close deals with doctors)
2. Physician/Doctor (medical professional seeking clinical information)
3. Patient (seeking medical information for personal health)

Message: "${message}"
Context: ${JSON.stringify(conversationContext)}

Respond with only one of: SALES_REP, PHYSICIAN, PATIENT`;

    try {
      const response = await this.callClaudeAPI(detectionPrompt, []);
      const userType = response.trim();
      return userType;
    } catch (error) {
      console.error('Error detecting user type:', error);
      return 'UNKNOWN';
    }
  }

  async searchMedicalInformation(query) {
    // Check if Brave API key is missing
    if (!this.braveApiKey || this.braveApiKey === 'your_brave_api_key_here') {
      console.warn('Brave Search API key is not configured. Skipping search functionality.');
      return [];
    }

    try {
      const response = await axios.get(BRAVE_SEARCH_API_ENDPOINT, {
        headers: {
          'X-Subscription-Token': this.braveApiKey,
          'Accept': 'application/json'
        },
        params: {
          q: `${query} medical procedure latest research clinical`,
          count: 5
        }
      });

      const results = response.data.web?.results || [];
      return results.map(result => ({
        title: result.title,
        snippet: result.description,
        url: result.url
      }));
    } catch (error) {
      console.error('Error searching for medical information:', error);
      return [];
    }
  }

  async callClaudeAPI(userMessage, conversationHistory = [], isSystemMessage = false) {
    // Check if API key is missing
    if (!this.apiKey || this.apiKey === 'your_openrouter_api_key_here') {
      throw new Error('OpenRouter API key is not configured. Please add your API key to the .env file.');
    }

    const messages = [
      {
        role: 'system',
        content: this.systemPrompt
      },
      ...conversationHistory,
      {
        role: isSystemMessage ? 'assistant' : 'user',
        content: userMessage
      }
    ];

    try {
      const response = await axios.post(OPENROUTER_API_ENDPOINT, {
        model: 'anthropic/claude-opus-4-20250514',
        messages: messages,
        max_tokens: 1024,
        temperature: 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Elite Medical Sales Consultant'
        }
      });

      return response.data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling Claude API:', error);
      if (error.response?.status === 401) {
        throw new Error('Invalid API key. Please check your OpenRouter API key.');
      }
      throw error;
    }
  }

  async processMessage(message, userId) {
    try {
      if (!this.userProfile || this.conversationHistory.length === 0) {
        const userType = await this.detectUserType(message, this.conversationHistory);
        this.userProfile = { userId, type: userType };
      }

      this.conversationHistory.push({
        role: 'user',
        content: message
      });

      const needsSearch = await this.checkIfSearchNeeded(message);
      
      let searchContext = '';
      if (needsSearch) {
        const searchResults = await this.searchMedicalInformation(message);
        if (searchResults.length > 0) {
          searchContext = `\n\nI've searched for the latest information. Here's what I found:\n${searchResults.map(r => `- ${r.title}: ${r.snippet}`).join('\n')}`;
        }
      }

      const enhancedMessage = message + searchContext;
      const response = await this.callClaudeAPI(enhancedMessage, this.conversationHistory);

      this.conversationHistory.push({
        role: 'assistant',
        content: response
      });

      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }

      return {
        response,
        userType: this.userProfile.type,
        searchPerformed: needsSearch
      };
    } catch (error) {
      console.error('Error processing message:', error);
      
      let errorMessage = "I apologize, but I'm experiencing technical difficulties.";
      
      if (error.message?.includes('API key')) {
        errorMessage = "The chatbot is not properly configured. Please ensure the OpenRouter API key is set in the .env file. You need to:\n\n1. Get an API key from https://openrouter.ai/\n2. Add it to your .env file as REACT_APP_OPENROUTER_API_KEY\n3. Restart the development server";
      } else if (error.response?.status === 429) {
        errorMessage = "API rate limit exceeded. Please try again in a few moments.";
      } else if (error.response?.status === 500) {
        errorMessage = "The AI service is temporarily unavailable. Please try again later.";
      }
      
      return {
        response: errorMessage,
        userType: this.userProfile?.type || 'UNKNOWN',
        error: true
      };
    }
  }

  async checkIfSearchNeeded(message) {
    const searchKeywords = [
      'latest', 'recent', 'new', 'current', 'update', 'research',
      'study', 'clinical trial', 'FDA', 'approval', 'guideline',
      'what is the current', 'what are the latest'
    ];

    const messageLower = message.toLowerCase();
    return searchKeywords.some(keyword => messageLower.includes(keyword));
  }

  clearConversation() {
    this.conversationHistory = [];
    this.userProfile = null;
  }

  getConversationHistory() {
    return this.conversationHistory;
  }
}

export default MedicalSalesChatbot;