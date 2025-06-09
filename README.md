# Global RepSpheres

A futuristic React application featuring advanced canvas animations, particle effects, and a cutting-edge UI inspired by modern design principles. This project showcases the intersection of AI and pharmaceutical sales with stunning visual effects and seamless user experience.

## Features

- **Canvas Animations**: Dynamic particle systems with WebGL-accelerated rendering
- **Curved Navigation Bar**: Modern navbar with animated canvas background and curved bottom edge
- **Glassmorphism Effects**: Cutting-edge glass-like UI elements with backdrop filters
- **Performance Optimization**: Toggle between full visual effects and optimized performance mode
- **Responsive Design**: Seamless experience across all device sizes
- **AI-Powered Chatbot**: Integrated medical knowledge assistant powered by Claude Opus 4
- **Web Search Integration**: Real-time web search capabilities via Brave Search API
- **Real-time Analytics**: Live tracking and visualization of user interactions
- **Authentication**: Secure user authentication with Supabase
- **Podcast Integration**: Built-in podcast player with waveform visualization
- **Payment Processing**: Stripe Checkout integration for subscriptions

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
   git clone https://github.com/yourusername/globalrepspheres.git
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
REACT_APP_BACKEND_URL=<your-render-backend-url>
REACT_APP_GA_ID=<your-google-analytics-id>
```

### API Keys Setup

1. **OpenRouter API**: Sign up at [OpenRouter](https://openrouter.ai/) to get an API key for Claude Opus 4
2. **Brave Search API**: Get your API key from [Brave Search API](https://api.search.brave.com/app/keys)
3. **Supabase**: Create a project at [Supabase](https://supabase.com/) for authentication and database
4. **Google Analytics**: Set up GA4 property and get your measurement ID

The `REACT_APP_BACKEND_URL` should point to your deployed backend on Render (e.g. `https://your-backend-service.onrender.com`). This handles Stripe Checkout sessions and other server-side operations.

**Note**: The `.env` file is gitignored and should never be committed to version control.

## Key Components

### Canvas Components
- **CanvasHeader**: Animated particle background with dynamic connections
- **NavBarCanvas**: Subtle particle effects for the navigation bar
- **AnimatedOrbCanvas**: Performance-optimized orb animations
- **AnimatedOrbExact**: High-fidelity orb rendering for hero sections

### UI Components
- **NavBar**: Curved navigation bar with canvas animations
- **HeroSectionEnhanced**: Enhanced hero section with integrated canvas effects
- **MedicalChatbot**: AI-powered medical knowledge assistant
- **AudioPlayer**: Advanced audio player with waveform visualization

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

## License

This project is proprietary software. All rights reserved.

## Acknowledgments

- Canvas animations inspired by modern WebGL techniques
- UI design influenced by contemporary glassmorphism trends
- Built with React and Material-UI
