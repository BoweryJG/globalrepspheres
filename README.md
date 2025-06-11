# RepSpheres Platform Ecosystem

A comprehensive medical sales intelligence platform serving the dental and aesthetic industries. RepSpheres combines AI-powered analytics, CRM functionality, market intelligence, and educational resources into a unified ecosystem designed to accelerate sales performance and market understanding.

Last updated: June 11, 2025

🚀 **Live Platform**: [repspheres.com](https://www.repspheres.com)

## 🌐 Platform Architecture

The RepSpheres ecosystem consists of multiple integrated applications and services:

```
┌─────────────────────────────────────────────────────────────────┐
│                    RepSpheres Global Homepage                    │
│                     (globalrepspheres)                          │
│                  Main portal & authentication                    │
└─────────────────────┬───────────────────────────────────────────┘
                      │
        ┌─────────────┴──────────────┬─────────────────┬──────────────────┐
        │                           │                  │                  │
   ┌────▼─────┐            ┌───────▼──────┐   ┌──────▼─────┐   ┌────────▼───────┐
   │  CRM     │            │Market Data   │   │  Canvas    │   │   Podcasts     │
   │SphereOS  │            │Intelligence  │   │AI Research │   │  Education     │
   └────┬─────┘            └───────┬──────┘   └──────┬─────┘   └────────────────┘
        │                          │                  │
        └──────────────┬───────────┴──────────────────┘
                       │
                  ┌────▼────┐
                  │Backend  │
                  │OSBackend│
                  └─────────┘
```

## 🚀 Core Modules

### 1. Global RepSpheres (Homepage & Portal)
**Location**: `/globalrepspheres`  
**URL**: [repspheres.com](https://www.repspheres.com)  
**Purpose**: Main entry point, authentication, and navigation hub

**Features**:
- Hero section with animated 3D elements
- User authentication (login/signup)
- Navigation to all platform modules
- Subscription management
- Company information and blog
- Podcast integration
- Analytics tracking

**Tech Stack**:
- React 18 with TypeScript
- Three.js for 3D animations
- Supabase for authentication
- Google Analytics integration
- Netlify hosting

### 2. SphereOS CRM
**Location**: `/SphereOsCrM`  
**URL**: [crm.repspheres.com](https://crm.repspheres.com)  
**Purpose**: Comprehensive CRM for medical sales professionals

**Features**:
- **Contact Management**: Track healthcare professionals and practices
- **SUIS Intelligence System**: AI-powered insights and recommendations
- **Call Analytics**: Recording, transcription, and linguistic analysis
- **External Recording Upload**: Support for PLAUD and manual recordings
- **Sales Pipeline**: Track deals, activities, and performance
- **Procedure Knowledge Base**: Dental and aesthetic procedure database
- **Market Intelligence**: Real-time industry insights
- **Team Collaboration**: Multi-user support with role-based access

**Subscription Tiers**:
- Explorer ($49/mo): Essential features
- Professional ($149/mo): Full CRM access
- Growth ($349/mo): Advanced analytics
- Enterprise ($749/mo): Team features
- Elite ($1,499/mo): AI acceleration

### 3. Market Data Intelligence
**Location**: `/Market Data - RepSpheres`  
**URL**: [marketdata.repspheres.com](https://marketdata.repspheres.com)  
**Purpose**: Real-time market analytics and competitive intelligence

**Features**:
- **Live Market Metrics**: Procedure volumes, pricing trends
- **Regional Analytics**: State and city-level market data
- **Competitive Landscape**: Company market share analysis
- **Growth Projections**: AI-powered market forecasting
- **Provider Database**: NPI-verified healthcare professionals
- **Practice Intelligence**: Detailed practice profiles
- **Export Capabilities**: CSV/PDF reports

**Data Sources**:
- NPI Registry
- Industry reports
- Web scraping
- User contributions
- AI predictions

### 4. Canvas AI Research
**Location**: `/CascadeProjects/RepSpheresAiWorkspace`  
**URL**: [canvas.repspheres.com](https://canvas.repspheres.com)  
**Purpose**: AI-powered research assistant and content generation

**Features**:
- **Research Assistant**: Multi-model AI for market research
- **Content Generator**: Sales materials, emails, presentations
- **Prompt Library**: Industry-specific templates
- **Document Analysis**: Extract insights from PDFs
- **Competitive Analysis**: AI-driven market reports
- **Integration**: OpenRouter, GPT-4, Claude, Gemini

**Use Cases**:
- Generate sales pitches
- Analyze competitor materials
- Create market reports
- Draft follow-up communications
- Research new procedures

### 5. Podcasts & Education
**Location**: `/globalrepspheres/public/podcasts`  
**URL**: [repspheres.com/podcasts](https://www.repspheres.com/podcasts)  
**Purpose**: Educational content and industry insights

**Content Types**:
- Expert interviews
- Market analysis episodes
- Procedure deep-dives
- Sales training content
- Success stories
- Industry news updates

## 🔧 Backend Infrastructure

### OSBackend (Node.js API)
**Location**: `/osbackend`  
**URL**: `https://osbackend-zl1h.onrender.com`  
**Hosting**: Render

**Core Services**:
- **Authentication**: JWT-based user auth
- **Stripe Integration**: Payment processing, webhooks
- **Twilio Services**: Voice calls, SMS, call recordings
- **AI Processing**: OpenAI, Gemini integration
- **File Storage**: Recording uploads, document processing
- **WebSocket**: Real-time updates
- **Database**: Supabase PostgreSQL

**Key Endpoints**:
- `/api/auth/*` - Authentication
- `/api/stripe/*` - Payment processing
- `/api/twilio/*` - Communication services
- `/api/upload-external-recording` - Audio processing
- `/api/market-data/*` - Market intelligence
- `/api/ai/*` - AI services

## 🗄️ Database Architecture

### Supabase Schema
**Project**: `cbopynuvhcymbumjnvay`

**Core Tables**:
```sql
-- Users & Authentication
- profiles
- api_keys
- user_settings

-- CRM Data
- contacts
- practices
- companies
- procedures

-- Sales Activities
- sales_activities
- call_recordings
- call_analysis
- tasks

-- SUIS Intelligence
- suis_intelligence_profiles
- suis_insights
- suis_market_feeds
- suis_recommendations

-- Market Data
- market_metrics
- regional_analytics
- provider_database
- competitive_intelligence

-- Subscriptions
- subscriptions
- usage_logs
- billing_history
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18+ required
- **npm**: v8+ (comes with Node.js)
- **Supabase Account**: For database and auth
- **Stripe Account**: For payment processing
- **Render Account**: For backend hosting
- **Netlify Account**: For frontend hosting

### Local Development Setup

1. **Clone Repositories**:
```bash
# Clone all repositories
git clone https://github.com/BoweryJG/globalrepspheres.git
git clone https://github.com/BoweryJG/SphereOsCrM.git
git clone https://github.com/BoweryJG/market-data-repspheres.git
git clone https://github.com/BoweryJG/canvas-intel-module.git
git clone https://github.com/BoweryJG/osbackend.git
```

2. **Environment Configuration**:

Create `.env` files in each project:

**globalrepspheres/.env**:
```bash
REACT_APP_SUPABASE_URL=https://cbopynuvhcymbumjnvay.supabase.co
REACT_APP_SUPABASE_KEY=your_anon_key
REACT_APP_BACKEND_URL=https://osbackend-zl1h.onrender.com
REACT_APP_GA_ID=your_google_analytics_id
```

**SphereOsCrM/.env.local**:
```bash
# Supabase
REACT_APP_SUPABASE_URL=https://cbopynuvhcymbumjnvay.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

# Backend
REACT_APP_BACKEND_URL=https://osbackend-zl1h.onrender.com

# Stripe
STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_SECRET_KEY=sk_live_xxx
# All price IDs...

# AI Services
REACT_APP_OPENROUTER_API_KEY=sk-or-v1-xxx
```

**osbackend/.env**:
```bash
# Supabase
SUPABASE_URL=https://cbopynuvhcymbumjnvay.supabase.co
SUPABASE_SERVICE_KEY=your_service_key

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Twilio
TWILIO_ACCOUNT_SID=ACxxx
TWILIO_AUTH_TOKEN=xxx
TWILIO_API_KEY=SKxxx
TWILIO_API_SECRET=xxx

# AI
OPENAI_API_KEY=sk-xxx
GEMINI_API_KEY=xxx
OPENROUTER_API_KEY=sk-or-v1-xxx
```

3. **Install Dependencies**:
```bash
# For each project
npm install
```

4. **Database Setup**:
```bash
# Run migrations in order
cd SphereOsCrM/supabase/migrations
# Execute each .sql file in chronological order
```

5. **Start Development Servers**:
```bash
# Terminal 1: Backend
cd osbackend
npm start

# Terminal 2: Homepage
cd globalrepspheres
npm start

# Terminal 3: CRM
cd SphereOsCrM
npm start

# Terminal 4: Market Data
cd market-data-repspheres
npm start
```

## 🌍 Deployment

### Frontend Deployment (Netlify)

Each frontend app has a `netlify.toml` configuration:

1. **Connect GitHub Repository** to Netlify
2. **Configure Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `build` (React) or `dist` (Vite)
3. **Set Environment Variables** in Netlify dashboard
4. **Configure Custom Domain**:
   - globalrepspheres → repspheres.com
   - SphereOsCrM → crm.repspheres.com
   - market-data → marketdata.repspheres.com
   - canvas → canvas.repspheres.com

### Backend Deployment (Render)

1. **Create Web Service** on Render
2. **Connect GitHub Repository**
3. **Configure Environment**:
   - Build Command: `npm install`
   - Start Command: `node index.js`
4. **Add Environment Variables**
5. **Configure Health Check Path**: `/health`

## 🔌 Third-Party Integrations

### Stripe Integration
- **Products**: 5 subscription tiers
- **Webhook Events**: 
  - `checkout.session.completed`
  - `customer.subscription.updated`
  - `customer.subscription.deleted`
- **Customer Portal**: Self-service subscription management

### Twilio Integration
- **Voice**: Outbound calls with recording
- **SMS**: Two-way messaging
- **Call Recording**: Automatic transcription
- **Webhook URLs**: Configure in Twilio console

### AI Services
- **OpenAI**: GPT-4 for analysis
- **Google Gemini**: Alternative AI provider
- **OpenRouter**: Multi-model access
- **Whisper**: Audio transcription

### Analytics
- **Google Analytics 4**: User behavior tracking
- **Custom Events**: 
  - Subscription conversions
  - Feature usage
  - API calls
- **Conversion Tracking**: Revenue attribution

## 🔐 Security

### Authentication
- **Supabase Auth**: JWT-based authentication
- **Row Level Security**: Database-level access control
- **API Key Management**: User-specific API keys
- **Session Management**: Secure cookie handling

### Data Protection
- **Encryption**: All API keys encrypted at rest
- **HTTPS**: Enforced on all endpoints
- **CORS**: Configured for specific origins
- **Rate Limiting**: API request throttling

## 📊 Monitoring & Analytics

### Application Monitoring
- **Render Metrics**: Backend performance
- **Netlify Analytics**: Frontend traffic
- **Supabase Dashboard**: Database metrics
- **Stripe Dashboard**: Payment analytics

### Error Tracking
- **Console Logging**: Structured logs
- **Error Boundaries**: React error handling
- **API Error Responses**: Standardized format

## 🚀 Development Workflow

### Git Workflow
1. **Feature Branches**: `feature/description`
2. **Pull Requests**: Required for main
3. **CI/CD**: Automatic deployment on merge
4. **Version Tags**: Semantic versioning

### Testing
- **Unit Tests**: Jest for components
- **Integration Tests**: API endpoints
- **E2E Tests**: Critical user flows
- **Manual QA**: Before releases

### Documentation
- **Code Comments**: JSDoc standards
- **API Documentation**: Endpoint specs
- **User Guides**: Platform documentation
- **Change Logs**: Version history

## 🆘 Support & Resources

### Documentation
- Platform Docs: [docs.repspheres.com](https://docs.repspheres.com)
- API Reference: [api.repspheres.com/docs](https://api.repspheres.com/docs)
- Video Tutorials: YouTube channel

### Community
- Support Email: support@repspheres.com
- Discord Server: [discord.gg/repspheres](https://discord.gg/repspheres)
- Office Hours: Weekly Zoom calls

### Development
- GitHub: [github.com/BoweryJG](https://github.com/BoweryJG)
- Issues: Report bugs and feature requests
- Contributing: See CONTRIBUTING.md

## 📈 Roadmap

### Q3 2025
- [ ] Mobile app (React Native)
- [ ] Salesforce integration
- [ ] Advanced team analytics
- [ ] AI voice assistant

### Q4 2025
- [ ] International expansion
- [ ] Multi-language support
- [ ] Partner API program
- [ ] Enterprise SSO

### 2026
- [ ] Predictive analytics
- [ ] Automated workflows
- [ ] Custom integrations
- [ ] White-label options

## 📄 License

Copyright © 2025 RepSpheres. All rights reserved.

---

Built with ❤️ by the RepSpheres team
