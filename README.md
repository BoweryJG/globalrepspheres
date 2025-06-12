# RepSpheres

A cutting-edge AI-powered platform revolutionizing medical and dental sales intelligence. Built with React and featuring advanced canvas animations, real-time data visualization, and an intelligent chatbot powered by over 300 AI models and 15 years of pivotal industry data.

## 🚀 Platform Modules

### Core RepSpheres Modules
- **[Market Data](https://marketdata.repspheres.com/)**: Real-time market intelligence and competitive analysis
- **[Canvas](https://canvas.repspheres.com/)**: AI-powered sales automation workspace
- **[Sphere oS](https://crm.repspheres.com/)**: Intelligent CRM system with workflow automation
- **[Podcast](/?page=podcast)**: Industry insights and AI-powered interviews

## Features

### Core Intelligence
- **300+ AI Models**: Access to the most comprehensive AI model suite in the industry
- **15 Years of Industry Data**: The largest dataset ever assembled for dental and aesthetic industries
- **"The Boss" AI Chatbot**: Harvey Specter-inspired AI assistant with premium glassmorphic design and elite medical knowledge
- **Real-time Market Insights**: Live competitive intelligence and market evolution tracking

### Technical Features
- **Animated Orb Background**: Stunning blue/purple starry background with optimized particle effects
- **Canvas Animations**: Dynamic particle systems with WebGL-accelerated rendering
- **Curved Navigation Bar**: Modern navbar with animated canvas background and curved bottom edge
- **Glassmorphism Effects**: Cutting-edge glass-like UI elements with backdrop filters
- **Performance Optimization**: Toggle between full visual effects and optimized performance mode
- **Responsive Design**: Seamless experience across all device sizes

### Platform Capabilities
- **Web Search Integration**: Real-time web search capabilities via Brave Search API
- **Real-time Analytics**: Google Analytics 4 integration for comprehensive tracking
- **Authentication**: Secure user authentication with Supabase
- **Podcast Integration**: Built-in podcast player with waveform visualization
- **Payment Processing**: Stripe Checkout integration for subscriptions
- **Multi-tenant Architecture**: Support for sales reps, physicians, and patients

### 🌊 Ripples Automation Framework
- **Infinite Scalability**: Cascading automation sequences that adapt to user behavior
- **Magic Links**: One-click secure access for seamless user experiences
- **Multi-Channel Orchestration**: Unified communication across all touchpoints
- **300+ Medical Procedures**: The industry's most comprehensive procedure database
- **Linguistic Intelligence**: Advanced NLP understanding medical terminology and sales context

## Tech Stack

- **Frontend**: React 18, Material-UI (MUI)
- **Animations**: Canvas API, WebGL, CSS3 Animations
- **Backend**: Supabase (Auth, Database), Render (API Backend)
- **AI Integration**: OpenRouter API (Claude Opus 4), Brave Search API
- **Analytics**: Google Analytics 4
- **Payments**: Stripe Checkout
- **Deployment**: Netlify (Frontend), Render (Backend)
- **Styling**: CSS-in-JS with MUI's sx prop, Custom CSS

## Prerequisites

- **Node.js**: version 18 or higher is recommended.
- **npm**: comes bundled with Node. Run `npm install` once after cloning the repo to install dependencies.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/BoweryJG/globalrepspheres.git
   cd globalrepspheres
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with your environment variables (see Environment Variables section)

4. Start the development server:
   ```bash
   npm start
   ```

## Useful npm scripts

- `npm start` – launches the development server with hot reloading
- `npm run build` – creates a production build in the `build` directory
- `npm run build:netlify` – creates a production build optimized for Netlify deployment
- `npm test` – runs the test suite
- `npm run eject` – ejects from Create React App (use with caution)

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
# AI and Search APIs
REACT_APP_OPENROUTER_API_KEY=<your-openrouter-api-key>
REACT_APP_BRAVE_API_KEY=<your-brave-search-api-key>

# Supabase Configuration
REACT_APP_SUPABASE_URL=<your-supabase-url>
REACT_APP_SUPABASE_ANON_KEY=<your-supabase-anon-key>

# Backend and Analytics
REACT_APP_BACKEND_URL=<your-render-backend-url>  # e.g., https://osbackend-zl1h.onrender.com
REACT_APP_GA_ID=<your-google-analytics-id>

# Stripe Configuration (handled by backend)
# Your backend should have:
# STRIPE_SECRET_KEY=<your-stripe-secret-key>
# STRIPE_WEBHOOK_SECRET=<your-stripe-webhook-secret>
```

**Important**: After creating or modifying the `.env` file, you must restart the development server for the changes to take effect.

### API Keys Setup

1. **OpenRouter API**: Sign up at [OpenRouter](https://openrouter.ai/) to get an API key for Claude Opus 4
2. **Brave Search API**: Get your API key from [Brave Search API](https://api.search.brave.com/app/keys)
3. **Supabase**: Create a project at [Supabase](https://supabase.com/) for authentication and database
4. **Google Analytics**: Set up GA4 property and get your measurement ID

The `REACT_APP_BACKEND_URL` should point to your deployed backend on Render (e.g. `https://your-backend-service.onrender.com`). This handles Stripe Checkout sessions and other server-side operations.

**Note**: The `.env` file is gitignored and should never be committed to version control.

## Project Structure

```
globalrepspheres/
├── public/
│   ├── index.html              # Main app entry
│   ├── signup.html             # Signup page
│   ├── login.html              # Login page
│   ├── demo.html               # Demo booking page
│   ├── success.html            # Payment success page
│   ├── cancel.html             # Payment cancellation page
│   ├── contact-sales.html      # Enterprise contact form
│   ├── elite-application.html  # Elite tier application
│   └── podcast.html            # Podcast player page
├── src/
│   ├── components/
│   │   ├── NavBar.js           # Main navigation with external links
│   │   ├── PricingSection.js   # Pricing tiers with Stripe integration
│   │   ├── MedicalChatbot.js   # AI-powered chatbot
│   │   └── [other components]
│   ├── stripeService.js        # Stripe Checkout integration
│   ├── App.js                  # Main app component
│   └── index.js                # App entry point
└── .env                        # Environment variables (not in git)
```

## Key Components

### Canvas Components
- **CanvasHeader**: Animated particle background with dynamic connections
- **NavBarCanvas**: Subtle particle effects for the navigation bar
- **AnimatedOrbCanvas**: Performance-optimized orb animations
- **AnimatedOrbExact**: High-fidelity orb rendering for hero sections

### UI Components
- **NavBar**: Curved navigation bar with canvas animations and external module links
- **HeroSectionEnhanced**: Enhanced hero section with integrated canvas effects
- **HarveyChat**: "The Boss" AI chatbot with premium glassmorphic design and Harvey Specter energy
- **MedicalChatbot**: AI-powered medical knowledge assistant (legacy component)
- **AudioPlayer**: Advanced audio player with waveform visualization
- **PricingSection**: Dynamic pricing tiers with Stripe Checkout integration

## Performance Considerations

The application includes performance optimization features:
- Toggle between full visual effects and optimized mode
- Lazy loading of heavy components
- WebGL acceleration for canvas animations
- Efficient particle system management
- Responsive image loading

## Deployment

### Deploying to Netlify

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build command: `npm run build:netlify`
   - Publish directory: `build`
3. Add all environment variables in Netlify dashboard:
   - Go to Site Settings → Environment Variables
   - Add all `REACT_APP_*` variables from your `.env` file
   - Deploy your site

### Backend on Render

If you need to deploy the backend:
1. Create a new Web Service on [Render](https://render.com)
2. Connect your backend repository
3. Add necessary environment variables
4. Deploy and copy the service URL to use as `REACT_APP_BACKEND_URL`

### Production Environment Variables

Ensure all these variables are set in your production environment:
- `REACT_APP_OPENROUTER_API_KEY`
- `REACT_APP_BRAVE_API_KEY`
- `REACT_APP_SUPABASE_URL`
- `REACT_APP_SUPABASE_ANON_KEY`
- `REACT_APP_BACKEND_URL`
- `REACT_APP_GA_ID`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💳 Pricing Tiers - FOUNDING 100 LIMITED OFFER

### Available Plans
1. **PIONEER ($149/month ~~$199~~)**: First-Mover Intelligence for Territory Leaders
   - 25 AI Research Briefs & Precision Outreach Links
   - Competitive Intelligence Dashboard & Predictive Analytics
   - 10 Call Analysis Sessions with AI insights
   - Mobile Command Center access

2. **QUANTUM ($399/month ~~$599~~)**: Exponential Territory Growth Through AI Leverage
   - 100 Strategic Intelligence Reports & 500 Multi-Channel Sequences
   - Territory Heat Mapping with 500+ procedures
   - Innovation Tracker Module for early adopters
   - 5-Seat Team License & Growth Guarantee

3. **NEXUS ($999/month ~~$1,499~~)**: Complete Market Command Center
   - Unlimited Everything - Research, deploy, analyze without limits
   - Custom AI Brain trained on YOUR products and methods
   - Full Communication Suite & Market Movement Radar
   - Executive Access with founder

### 🎯 Add-On Modules
- **Aligner Analytics Pro**: $99/month
- **Aesthetic Intelligence Suite**: $149/month
- **Surgical Innovation Tracker**: $199/month

All plans include lifetime founder pricing. Annual billing saves up to 20%.
**Performance Guarantee**: 2X your close rate in 90 days or we work FREE until you do.

## 🤖 "The Boss" AI Chatbot

### Features
- **Harvey Specter Energy**: Confident, driven messaging that embodies elite sales mentality
- **Premium Design**: Glassmorphic interface with animated gradient borders and floating avatars
- **Advanced Styling**: 
  - Backdrop blur effects and glass-like message bubbles
  - Smooth hover animations and gradient input fields
  - Floating bot avatar with subtle animation
  - Custom scrollbar styling with cyan accents
- **Intelligence**: Powered by 300+ AI models and 15 years of medical industry data
- **Personality**: "Your success is my business" - focused on driving results and winning
- **Integration**: Seamlessly integrated with RepSpheres platform data and insights

### Design Philosophy
The chatbot embodies Harvey Specter's philosophy: confidence, excellence, and results-driven communication. Every interaction is designed to motivate and empower users to achieve their sales goals.

## Recent Updates

### January 2025
- **"The Boss" AI Chatbot**: Complete redesign with Harvey Specter energy and premium glassmorphic styling
- **Chatbot Styling**: Floating avatar animations, glass-effect message bubbles, gradient borders
- **Navigation Enhancement**: Updated module links for Market Data, Canvas, and Sphere oS
- **Google Analytics Integration**: Added comprehensive event tracking across all CTAs
- **Stripe Checkout Integration**: Complete payment flow with success/cancel pages
- **Static Pages**: Added demo booking, contact sales, and elite application pages
- **Fixed Background Rendering**: Resolved black overlay issue in hero section
- **Environment Variables**: Fixed environment variable loading issues
- **Performance Optimization**: Removed duplicate background layers to improve CPU performance
- **CI/CD Pipeline**: Fixed GitHub Actions build failures by aligning with Netlify configuration
- **Code Cleanup**: Removed over 100k cached node_modules files from git tracking

## Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   - Ensure `.env` file is in the root directory
   - Restart the development server after making changes to `.env`
   - Check that all variable names start with `REACT_APP_`

2. **Chatbot Not Working**
   - Verify `REACT_APP_OPENROUTER_API_KEY` is set correctly
   - Ensure you have credits in your OpenRouter account
   - Check browser console for specific error messages

3. **Background Not Displaying Correctly**
   - Clear browser cache and reload
   - Check that no browser extensions are interfering with CSS
   - Verify WebGL is enabled in your browser

4. **Stripe Checkout Not Working**
   - Ensure `REACT_APP_BACKEND_URL` is set correctly (e.g., `https://osbackend-zl1h.onrender.com`)
   - Verify backend is running and has proper Stripe keys configured
   - Check that the backend endpoints use `/api/create-checkout-session`
   - Ensure all Stripe price IDs in PricingSection.js match your Stripe dashboard

5. **Navigation Links Not Working**
   - External modules (Market Data, Canvas, Sphere oS) require separate deployments
   - Internal links use React Router or query parameters
   - Check browser console for any CORS or network errors

## Project Heritage

RepSpheres is built on 15 years of pioneering work in medical aesthetics, including:
- Original CoolSculpting team at Zeltiq
- Revolutionary fat reduction procedures that transformed aesthetic medicine
- Advanced robotics work with Neocis (funded by NVIDIA)
- The largest dataset ever assembled for dental and aesthetic industries

## 📄 License

Copyright © 2025 RepSpheres. All rights reserved.

---

Built with ❤️ by the RepSpheres team  
Powered by Bowery Creative Agency - Empowering physician campaigns for over 15 years
