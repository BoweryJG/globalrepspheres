import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU';

// Create a single supabase client with cross-domain auth support
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'repspheres-auth',
    storage: {
      getItem: (key) => {
        // Try to get from localStorage first (persists across domains if same origin)
        const localItem = localStorage.getItem(key);
        if (localItem) return localItem;
        
        // For cross-domain, we'll use a different approach
        return null;
      },
      setItem: (key, value) => {
        localStorage.setItem(key, value);
        
        // Broadcast auth change to other tabs/domains
        if (window.BroadcastChannel) {
          const channel = new BroadcastChannel('repspheres-auth');
          channel.postMessage({ type: 'auth-update', key, value });
        }
      },
      removeItem: (key) => {
        localStorage.removeItem(key);
        
        // Broadcast auth removal
        if (window.BroadcastChannel) {
          const channel = new BroadcastChannel('repspheres-auth');
          channel.postMessage({ type: 'auth-remove', key });
        }
      },
    },
  },
});

// Listen for auth changes from other tabs/domains
if (window.BroadcastChannel) {
  const channel = new BroadcastChannel('repspheres-auth');
  channel.onmessage = (event) => {
    if (event.data.type === 'auth-update') {
      // Refresh auth state when changes detected
      supabase.auth.getSession();
    }
  };
}

export default supabase;
