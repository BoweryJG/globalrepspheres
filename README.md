# Global RepSpheres

A futuristic React application featuring advanced canvas animations, particle effects, and a cutting-edge UI inspired by modern design principles. This project showcases the intersection of AI and pharmaceutical sales with stunning visual effects and seamless user experience.

## Features

- **Canvas Animations**: Dynamic particle systems with WebGL-accelerated rendering
- **Curved Navigation Bar**: Modern navbar with animated canvas background and curved bottom edge
- **Glassmorphism Effects**: Cutting-edge glass-like UI elements with backdrop filters
- **Performance Optimization**: Toggle between full visual effects and optimized performance mode
- **Responsive Design**: Seamless experience across all device sizes
- **AI-Powered Chatbot**: Integrated medical knowledge assistant
- **Real-time Analytics**: Live tracking and visualization of user interactions
- **Authentication**: Secure user authentication with Supabase
- **Podcast Integration**: Built-in podcast player with waveform visualization

## Tech Stack

- **Frontend**: React 18, Material-UI (MUI)
- **Animations**: Canvas API, WebGL, CSS3 Animations
- **Backend**: Supabase (Auth, Database)
- **Analytics**: Google Analytics 4
- **Deployment**: Netlify
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

## Environment variables

The app expects environment variables to reach both the Supabase backend and your custom backend on Render:

```bash
REACT_APP_SUPABASE_URL=<your-supabase-url>
REACT_APP_SUPABASE_KEY=<your-supabase-key>
REACT_APP_BACKEND_URL=<your-backend-url>
REACT_APP_GA_ID=<your-ga-id>
```

You can place them in a local `.env` file or configure them in your deployment environment.

The `REACT_APP_BACKEND_URL` variable should point to your deployed backend on Render (e.g. `https://your-backend-service.onrender.com`). The app uses this URL to create Stripe Checkout sessions when visitors click **Subscribe** in the call-to-action section.

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

## Deploying to Netlify

A basic configuration is provided in `netlify.toml`. Netlify should use the build command `npm run build:netlify` and publish the `build` folder. Be sure to add the `REACT_APP_SUPABASE_URL`, `REACT_APP_SUPABASE_KEY` and `REACT_APP_GA_ID` variables in the Netlify UI under **Site settings → Environment variables**.

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
