# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
- `npm start` - Start development server (React)
- `npm run build` - Build for production
- `npm test` - Run tests with Jest
- `npm run eject` - Eject from Create React App (⚠️ one-way operation)

### Deployment
- Frontend: Auto-deploy via Netlify on push to main branch
- Manual deployment: `npm run build` then deploy `build/` folder
- Netlify functions: Auto-deploy from root directory

## Architecture Overview

### Core Application Structure
This is the **RepSpheres Global Homepage** - a React 18 application that serves as the main marketing site and entry point for the RepSpheres ecosystem of sales intelligence applications.

### Key Architectural Patterns

#### 1. Backend Integration (`src/config/api.js`)
Fully integrated with the unified backend:
- **Primary Backend**: `osbackend-zl1h.onrender.com`
- **Fallback URL**: Configurable via `REACT_APP_BACKEND_URL`
- **Subscription System**: Complete Stripe integration
- **Cross-app Authentication**: Supabase Auth with RepSpheres ecosystem

#### 2. Authentication System (`src/contexts/`)
**Multi-context authentication** supporting different auth strategies:
- **SimpleAuthContext**: Lightweight auth for marketing pages
- **SubscriptionContext**: Full subscription management integration
- **Cross-domain Auth**: Shared authentication across RepSpheres apps
- **Magic Link Support**: Seamless login experience

#### 3. Subscription Management (`src/services/subscriptionService.ts`)
**RepX Tier Integration System**:
- **Tier Mapping**: Backend tiers → RepX tiers (RepX1-RepX5)
- **Feature Management**: Canvas access, AI coaching, territory mapping
- **Usage Tracking**: Scans per day, feature access validation
- **Billing Integration**: Stripe checkout and customer portal

#### 4. Component Architecture
**Marketing-focused component structure**:
- **Hero Sections**: Multiple variants (Kinetic, Quantum, Reality Split)
- **Pricing Components**: Unified pricing across ecosystem
- **Auth Modals**: Login, signup, logout modals
- **Navigation**: Global navbar with app switcher

### Component Architecture

#### Hero & Landing Components (`src/components/`)
- **HeroSection**: Main landing hero with multiple variants
- **KineticHeroSection**: Animated kinetic effects
- **RealitySplitHero**: Dramatic split-screen experience
- **MicroHero**: Compact hero for internal pages

#### Navigation Components
- **GlobalNavBar**: Main navigation with cross-app links
- **RepSpheresNavbar**: Shared navbar component
- **KineticNavBar**: Animated navigation variant

#### Subscription & Pricing (`src/components/pricing/`)
- **UnifiedPricingModal**: Ecosystem-wide pricing
- **SubscriptionTiers**: RepX tier management
- **ROICalculator**: Value demonstration tools
- **UsageDashboard**: Feature usage tracking

#### Marketing Components
- **IntelligenceSection**: AI capabilities showcase
- **TransformationSection**: Before/after comparisons  
- **PricingSection**: Subscription plan displays
- **CTASection**: Call-to-action components

### Data Flow

#### 1. Authentication Flow
```
User Action → Auth Context → Supabase Auth → Cross-domain Cookie → App Access
```

#### 2. Subscription Flow
```
Plan Selection → Stripe Checkout → Backend Validation → Feature Access → RepX Tier Mapping
```

#### 3. Cross-App Navigation
```
NavBar Click → Auth Check → Domain Switch → Preserved Session → Target App
```

### Integration Points

#### Backend Synchronization Status
**GlobalRepSpheres ↔ osbackend-zl1h.onrender.com Integration**

**✅ FULLY SYNCHRONIZED ENDPOINTS:**
- `GET /api/subscription-status` - Subscription status (✅ Added)
- `GET /api/usage` - Usage tracking (✅ Added)
- `POST /api/usage/increment` - Usage increments (✅ Added)
- `POST /api/stripe/create-checkout-session` - Stripe checkout (✅ Working)
- `POST /api/stripe/create-portal-session` - Customer portal (✅ Added)
- `GET /api/stripe/repx/plans` - RepX subscription plans (✅ Working)
- `GET /health` - Backend health check (✅ Working)

**🔧 FUNCTIONAL FEATURES:**
- **Subscription Management**: Complete Stripe integration
- **RepX Tier System**: Full RepX1-RepX5 tier mapping
- **Usage Tracking**: Canvas scans, AI queries, feature access
- **Authentication**: Cross-domain with Supabase
- **Email Integration**: Ready for email endpoints
- **Cross-App Navigation**: Seamless ecosystem switching

#### Cross-App Integration
The homepage integrates with the entire RepSpheres ecosystem:
- **CRM** (`crm.repspheres.com`) - Customer relationship management
- **Canvas** (`canvas.repspheres.com`) - Sales intelligence platform
- **Market Data** (`marketdata.repspheres.com`) - Market intelligence hub
- **Shared Authentication**: Single sign-on across all applications
- **Unified Subscriptions**: RepX tiers work across all apps

#### External Services
- **Supabase**: Authentication and user management
- **Stripe**: Subscription billing and payment processing
- **Netlify**: Frontend hosting and serverless functions
- **OpenRouter**: AI model integration for various features

### State Management

#### React Context Usage
- **SubscriptionContext**: Main subscription and feature management
- **SimpleAuthContext**: Lightweight authentication for public pages
- **AuthContext**: Full authentication with user management
- **Cross-domain State**: Shared state across RepSpheres ecosystem

#### Data Persistence
- **Supabase**: User data, subscription status, usage tracking
- **Local Storage**: Theme preferences, user settings
- **Cookies**: Cross-domain authentication tokens
- **Session Storage**: Temporary UI state

### Important Development Notes

#### Environment Variables
**Backend Connection:**
- `REACT_APP_BACKEND_URL=https://osbackend-zl1h.onrender.com` (unified backend)

**Required for full functionality:**
- `REACT_APP_SUPABASE_URL` and `REACT_APP_SUPABASE_ANON_KEY` (authentication)
- `STRIPE_PUBLISHABLE_KEY` (subscription management)
- `REACT_APP_OPENROUTER_API_KEY` (AI features)

#### Build Configuration
- **Create React App**: Standard React build system
- **Netlify deployment** with custom build command
- **Environment-based config**: Development vs production settings
- **Cross-domain CORS**: Proper configuration for RepSpheres ecosystem

#### Error Handling
- **Graceful degradation** when backend services are unavailable
- **Authentication fallbacks** for public content access
- **Subscription validation** with upgrade prompts
- **Cross-app error handling** for navigation failures

#### Performance Considerations
- **Code splitting** for different page components
- **Lazy loading** of heavy marketing components
- **Optimized animations** for kinetic effects
- **Minimal bundle size** for fast initial load

#### Mobile Optimization
- **Responsive design** across all marketing pages
- **Touch-friendly** navigation and interactions
- **Mobile-specific** hero components
- **Progressive Web App** capabilities

### RepX Tier System

#### Tier Mapping
```javascript
// Backend tier → RepX tier mapping
export const REPX_TIER_MAPPING = {
  free: 'repx1',           // Basic professional line
  explorer: 'repx2',       // + Market intelligence  
  professional: 'repx3',   // + Full Canvas + territory
  growth: 'repx4',         // + AI coaching + workflows
  enterprise: 'repx5',     // + Unlimited + custom AI
  elite: 'repx5'           // Elite maps to repx5
};
```

#### Canvas Feature Access
```javascript
// RepX tier feature limits
repx1: { canvasAccess: false, scansPerDay: 0 },
repx2: { canvasAccess: true, scansPerDay: 10 },
repx3: { canvasAccess: true, scansPerDay: 25, territoryMapping: true },
repx4: { canvasAccess: true, scansPerDay: 50, aiCoaching: true },
repx5: { canvasAccess: true, scansPerDay: -1, customAiModels: true }
```

### Testing Strategy
- **Jest**: Unit and integration testing
- **React Testing Library**: Component testing
- **Authentication Testing**: Mock auth contexts
- **Cross-browser Testing**: Compatibility across devices

### Security Implementation
- **Cross-domain Authentication**: Secure token sharing
- **CORS Configuration**: Proper origin validation
- **Environment Secrets**: Secure API key management
- **Content Security Policy**: XSS protection

This architecture enables the RepSpheres homepage to serve as an effective marketing site and ecosystem hub while maintaining seamless integration with all backend services and cross-app functionality.

## Backend Synchronization Status

### Overview
The GlobalRepSpheres homepage is fully synchronized with the unified osbackend-zl1h.onrender.com backend. All subscription management, usage tracking, and cross-app integration functionality is operational.

### GlobalRepSpheres Backend Sync Status - Complete ✅

#### Synchronized API Endpoints
```javascript
// All endpoints now working on osbackend-zl1h.onrender.com:

GET  /api/subscription-status          // ✅ Subscription status (legacy route)
GET  /api/usage                        // ✅ Usage tracking (legacy route)
POST /api/usage/increment              // ✅ Usage increments (legacy route)
POST /api/stripe/create-checkout-session // ✅ Stripe checkout
POST /api/stripe/create-portal-session   // ✅ Customer portal
GET  /api/stripe/repx/plans              // ✅ RepX subscription plans
```

#### Implementation Details
- **Backend**: Endpoints implemented across `index.js` and `routes/stripe.js`
- **Frontend**: Uses `src/config/api.js` configured for osbackend
- **Architecture**: Legacy route compatibility + modern shared routing
- **Features**: Complete subscription system with RepX tier integration

#### RepX Integration
- **Tier Mapping**: Full RepX1-RepX5 tier system operational
- **Canvas Access**: Feature gates based on subscription tier
- **Usage Tracking**: Scans per day, AI queries, feature usage
- **Cross-App**: Consistent subscription across all RepSpheres apps

#### Current Capabilities
- **Homepage Marketing**: Full subscription integration for lead conversion
- **Cross-App Navigation**: Authenticated navigation to CRM, Canvas, Market Data
- **RepX Subscriptions**: Complete Stripe billing with tier-based features
- **Usage Analytics**: Real-time usage tracking and feature access validation
- **Customer Portal**: Full billing management through Stripe

### Environment Configuration
```env
# Frontend Environment Variables
REACT_APP_BACKEND_URL=https://osbackend-zl1h.onrender.com
REACT_APP_SUPABASE_URL=your_supabase_project_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Backend Environment Variables (on Render)
STRIPE_SECRET_KEY=your_stripe_secret_key
FRONTEND_URL=https://repspheres.com
```

### Integration Status Summary
- **Backend Integration**: 100% Complete ✅
- **Subscription System**: Fully Functional ✅
- **RepX Tier System**: Operational ✅
- **Cross-App Navigation**: Seamless ✅
- **Usage Tracking**: Implemented ✅
- **Billing & Payments**: Fully Integrated ✅

The GlobalRepSpheres homepage is now fully integrated with the unified osbackend system and serves as the central hub for the entire RepSpheres ecosystem with complete subscription and cross-app functionality.

## File Naming Conventions

When creating new files:
- **Homepage specific**: Include "global" or "home" in filename
- **Marketing components**: Include "section" or "hero" in filename  
- **Auth components**: Include "auth" or "modal" in filename
- **Shared components**: Use "RepSpheres" prefix for ecosystem components

## Cross-App Navigation

### RepSpheres Ecosystem Apps
- **Homepage**: `repspheres.com` (this app)
- **CRM**: `crm.repspheres.com` 
- **Canvas**: `canvas.repspheres.com`
- **Market Data**: `marketdata.repspheres.com`

### Authentication Flow
- **Single Sign-On**: Supabase auth with cross-domain cookies
- **Session Sharing**: JWT tokens shared across subdomains
- **Seamless Navigation**: Preserved authentication state

## Important Notes

- **Always use osbackend** for subscription and billing features
- **RepX tier system** provides consistent feature access across ecosystem
- **Cross-domain authentication** enables seamless app switching
- **Marketing optimization** for conversion to paid subscriptions
- **Mobile responsive** design throughout all marketing pages

This application serves as the central marketing hub and entry point for the RepSpheres ecosystem, with full integration to the unified osbackend system and seamless cross-app functionality.