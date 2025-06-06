# Elite Medical Sales Chatbot

## Overview
This is a Claude 4-powered intelligent medical sales consultant that combines:
- Harvey Specter's strategic brilliance and sharp wit
- Warren Buffett's principled wisdom and ethical grounding
- Socratic questioning methodology
- Real-time medical information search via Brave API

## Features

### 1. User Type Detection
Automatically identifies and adapts conversation style for:
- **Sales Representatives**: Strategic insights, negotiation tactics, physician preferences
- **Physicians**: Clinical knowledge, evidence-based insights, Bowery Creative Agency partnership
- **Patients**: Clear, empathetic communication with educational focus

### 2. Intelligent Capabilities
- Comprehensive medical procedure knowledge
- Real-time search for latest medical research and guidelines
- Context-aware Socratic questioning
- Conversation history management
- Adaptive personality based on user type

### 3. Core Personality Traits
- Mental acuity of Harvey Specter (confidence, strategic thinking)
- Principled approach of Warren Buffett (integrity, long-term thinking)
- Always ends responses with thoughtful questions
- Acknowledges knowledge gaps and searches for information

## Setup Instructions

### 1. Environment Variables
Create a `.env` file in the root directory:
```
REACT_APP_OPENROUTER_API_KEY=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
REACT_APP_BRAVE_API_KEY=your_brave_search_api_key
```
Note: The OpenRouter API key is already configured. You'll need to add your own Brave Search API key.

### 2. Installation
```bash
npm install
```

### 3. Running the Chatbot
```bash
npm start
```
Then navigate to: `http://localhost:3000/chatbot.html`

### 4. Building for Production
```bash
npm run build
```

## File Structure
```
src/
├── services/
│   └── chatbotService.js        # Core chatbot logic with Claude 4 integration
├── components/
│   └── MedicalChatbot.js        # Chat UI component
├── ChatbotPage.js               # Standalone chatbot page
└── chatbot.js                   # Entry point for chatbot

public/
└── chatbot.html                 # HTML template for chatbot
```

## API Integration

### Claude Opus 4 (via OpenRouter)
- Model: anthropic/claude-opus-4-20250514
- Accessed through OpenRouter API
- Used for intelligent conversation and user type detection
- Maintains conversation context and history

### Brave Search API
- Used for real-time medical information searches
- Triggered automatically when users ask about:
  - Latest research or studies
  - Current guidelines or FDA approvals
  - Recent medical developments

## Conversation Flow

1. **Initial Greeting**: Introduces itself with personality
2. **User Type Detection**: Analyzes first message to identify user type
3. **Adaptive Responses**: Tailors conversation style and content
4. **Socratic Method**: Always ends with relevant questions
5. **Knowledge Gaps**: Proactively searches when information is needed

## Branding
- For physicians: Mentions Bowery Creative Agency partnership (15+ years)
- Professional yet approachable tone
- Balances confidence with humility

## Future Enhancements
- Analytics dashboard for conversation insights
- Integration with CRM systems
- Voice interaction capabilities
- Multi-language support
- Offline procedure database