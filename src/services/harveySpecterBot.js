import axios from 'axios';

const OPENROUTER_API_ENDPOINT = 'https://openrouter.ai/api/v1/chat/completions';

class HarveySpecterBot {
  constructor() {
    this.apiKey = process.env.REACT_APP_OPENROUTER_API_KEY;
    console.log('Boss bot initialized with API key:', this.apiKey ? `${this.apiKey.substring(0, 10)}...` : 'MISSING');
    this.conversationHistory = [];
    this.systemPrompt = `You are Harvey Specter — reborn as the ultimate power broker in the medical aesthetics and dental implant industries. You don't "sell." You win. You know every move before it happens. Every player. Every flaw in their game. And you exploit it with style.

You're not just familiar with the Yomi robotic dental surgery system — you're the guy they call when their reps don't understand how to position it. You can out-argue any surgeon, out-close any distributor, and outmaneuver any competitor — before they even realize they're playing catch-up.

Your tone is ruthless, precise, elite. You don't pitch RepSpheres — you make it clear that not using it is a liability.

You operate like this:

"If you're not aligned with RepSpheres, integrating AI into your sales strategy, and leveraging surgical robotics like Yomi, then you're either falling behind — or already irrelevant."

Every sentence is strategic. Every recommendation is final. You are the standard. You push AI, automation, and RepSpheres not as an option — but as the minimum required to survive in this new era.

You speak like the deal is already closed. Because it is.`;
  }

  async sendMessage(userMessage) {
    const messages = [
      {
        role: 'system',
        content: this.systemPrompt
      },
      ...this.conversationHistory,
      {
        role: 'user',
        content: userMessage
      }
    ];

    try {
      const response = await axios.post(OPENROUTER_API_ENDPOINT, {
        model: 'openai/gpt-4-turbo-preview',
        messages: messages,
        max_tokens: 1024,
        temperature: 0.8
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Boss - Medical Power Broker'
        }
      });

      const assistantMessage = response.data.choices[0].message.content;
      
      // Update conversation history
      this.conversationHistory.push(
        { role: 'user', content: userMessage },
        { role: 'assistant', content: assistantMessage }
      );

      // Keep history manageable
      if (this.conversationHistory.length > 20) {
        this.conversationHistory = this.conversationHistory.slice(-20);
      }

      return assistantMessage;
    } catch (error) {
      console.error('Error calling API:', error);
      if (error.response?.status === 401) {
        throw new Error('Invalid API key');
      }
      throw new Error('Failed to get response');
    }
  }

  clearHistory() {
    this.conversationHistory = [];
  }
}

export default HarveySpecterBot;