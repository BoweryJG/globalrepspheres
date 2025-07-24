# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Start development server
npm start

# Production build (standard)
npm run build

# Production build for Netlify (disables ESLint)
npm run build:netlify

# Run tests
npm test
```

### Build System
- Uses `react-app-rewired` instead of standard CRA scripts for custom webpack configuration
- Environment variables are managed through `config-overrides.js` 
- Custom Jest configuration includes wavesurfer.js mocking

## Architecture Overview

### Project Structure
RepSpheres is the **Global Homepage** component of a larger medical sales intelligence ecosystem. This React application serves as the main portal and authentication hub connecting to:

- **SphereOS CRM** (crm.repspheres.com) - Medical sales CRM
- **Market Data Intelligence** (marketdata.repspheres.com) - Real-time analytics  
- **Canvas AI Research** (canvas.repspheres.com) - AI-powered research assistant
- **OSBackend** (https://osbackend-zl1h.onrender.com) - Node.js API backend

### Key Technologies
- **React 19.1.0** with Material-UI (MUI) v7.1.0
- **GSAP 3.13.0** for kinetic animations (luxury-mechanical aesthetic)
- **Three.js** for 3D elements (AnimatedOrb components)
- **Supabase** for authentication and database
- **WaveSurfer.js** for podcast audio integration
- **Google Analytics 4** for tracking
- **Stripe** integration for 5-tier subscription system

### Core Features
- **"The Boss" AI Chatbot**: Harvey Specter-inspired AI with premium glassmorphic design
- **Kinetic Design System**: Luxury-mechanical aesthetic with animated gauge needles
- **Subscription Management**: 5 tiers from Explorer ($49) to Elite ($1,499)
- **Cross-platform Authentication**: Secure cookies with cross-domain support

## Environment Configuration

Required environment variables in `.env`:
```bash
REACT_APP_SUPABASE_URL=https://cbopynuvhcymbumjnvay.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
REACT_APP_BACKEND_URL=https://osbackend-zl1h.onrender.com
REACT_APP_GA_ID=your_google_analytics_id
REACT_APP_OPENROUTER_API_KEY=your_openrouter_key
REACT_APP_BRAVE_API_KEY=your_brave_api_key
```

## Design System Guidelines

Follow the **STYLE_GUIDE.md** for:
- **Brand Aesthetic**: "Luxury-mechanical kinetic interface"
- **Typography**: Orbitron, Space Grotesk, JetBrains Mono
- **Animation**: GSAP with elastic easing principles
- **Color System**: CSS custom properties with jewel accent system

## Component Architecture

### Performance Optimization
- Multiple component variants exist for different performance modes
- Performance monitoring component tracks rendering metrics
- AnimatedOrb and kinetic elements are GPU-accelerated

### Key Component Types
- **Kinetic Components**: AnimatedOrb, KineticNeedles (GPU-accelerated)
- **Context-Based State**: AuthContext, SubscriptionContext for global state
- **Audio Integration**: WaveSurfer.js components for podcast functionality

## Testing Strategy

### Jest Configuration
- Custom moduleNameMapper for wavesurfer.js mocking: `<rootDir>/src/__mocks__/wavesurfer.js.js`
- React Testing Library with Jest
- Comprehensive testing checklist exists in `TESTING_CHECKLIST.md`

### Running Tests
```bash
npm test  # Run all tests
```

## Deployment

### Netlify Configuration
- Build command: `npm run build:netlify` (disables ESLint for production)
- Uses `netlify.toml` for configuration
- Security headers and redirects configured
- Custom domain: repspheres.com

### Database
- **Supabase Project**: `cbopynuvhcymbumjnvay`
- **Migrations**: Located in `supabase/migrations/` (execute chronologically)
- **Row Level Security**: Implemented for data protection

## Integration Points

### Backend Communication
- Primary API: OSBackend on Render
- Endpoints: Authentication, Stripe payments, Twilio services, AI processing
- WebSocket support for real-time updates

### Third-Party Services
- **Stripe**: 5-tier subscription system with usage tracking
- **Google Analytics**: Event tracking for conversions and feature usage
- **AI Services**: OpenRouter API for multi-model access (Claude Opus 4)

## Development Notes

### Routing
- Uses React Router DOM v7.6.2
- Key routes: `/`, `/login`, `/signup`, `/podcast`, `/admin-analytics`, `/elite-application`

### State Management
- Context-based architecture (AuthContext, SubscriptionContext)
- No external state management library (Redux/Zustand)

### Security
- JWT-based authentication through Supabase
- API keys encrypted at rest
- CORS configured for specific origins
- Rate limiting implemented

## Video Marketing Content

### Iconic Championship Video Concept (10-second commercial)
**Theme:** "Championship Guidance" - Connecting football coaching to RepSpheres Whisper sales coaching

**Scene 1 (0-4s):** Quarterback in championship fourth-and-one situation
- Close-up on intense face in helmet, alert darting eyes
- Coach voice through headset: "Blue 22! Blue 22! Look for the gap on the left, Tommy!"
- QB's eyes snap left showing coach-player connection and trust

**Transition (4-5s):** Eyes stay focused, helmet reflections dissolve to office lighting
- Same intensity, same trust, different arena

**Scene 2 (5-10s):** Same actor as sales rep on doctor call
- Mid-conversation, talking rapidly: "So this new product has incredible market penetration and our latest marketing data shows—"
- **RepSpheres Whisper interrupts (only he hears):** "Slow down, Tommy. Focus on clinical outcomes, not features."
- Eyes dart, he pauses, refocuses: "Let me focus on the clinical data that matters to your patients..."

**Final Frame:** RepSpheres logo with tagline "Championship coaching in your ear."

**Key Message:** RepSpheres Whisper provides real-time sales coaching with the same trust and guidance as championship-level sports coaching.