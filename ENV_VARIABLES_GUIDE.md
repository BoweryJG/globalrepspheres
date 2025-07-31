# Environment Variables Guide for RepSpheres Apps

## Variables SHARED across all apps (same values):
```
REACT_APP_SUPABASE_URL=https://cbopynuvhcymbumjnvay.supabase.co
REACT_APP_SUPABASE_ANON_KEY=[same anon key for all]
REACT_APP_BACKEND_URL=https://osbackend-zl1h.onrender.com
```

## Variables UNIQUE to each app:

### Global RepSpheres (Homepage)
```
REACT_APP_GA_ID=[Google Analytics ID for homepage]
REACT_APP_OPENROUTER_API_KEY=[API key for Harvey chatbot]
REACT_APP_BRAVE_API_KEY=[If Harvey uses web search]
```

### Canvas
```
VITE_API_BASE_URL=https://osbackend-zl1h.onrender.com
VITE_SUPABASE_URL=[same as above]
VITE_SUPABASE_ANON_KEY=[same as above]
VITE_ANTHROPIC_API_KEY=[Canvas-specific Claude key]
VITE_OPENAI_API_KEY=[Canvas-specific OpenAI key]
VITE_BRAVE_SEARCH_API_KEY=[Canvas web research]
VITE_FIRECRAWL_API_KEY=[Canvas web scraping]
VITE_PERPLEXITY_API_KEY=[Canvas research]
```

### CRM
```
REACT_APP_SUPABASE_URL=[same]
REACT_APP_SUPABASE_ANON_KEY=[same]
REACT_APP_BACKEND_URL=[same]
[CRM-specific API keys]
```

### Market Data
```
REACT_APP_SUPABASE_URL=[same]
REACT_APP_SUPABASE_ANON_KEY=[same]
REACT_APP_BACKEND_URL=[same]
[Market data API keys]
```

### RepConnect
```
REACT_APP_SUPABASE_URL=[same]
REACT_APP_SUPABASE_ANON_KEY=[same]
REACT_APP_BACKEND_URL=[same]
[RepConnect-specific keys]
```

## Important Notes:
- Each app has its OWN Netlify environment variables
- Only auth-related variables are shared
- API keys should be unique per app for security/usage tracking
- The .env.local file is only for local development (not committed to git)