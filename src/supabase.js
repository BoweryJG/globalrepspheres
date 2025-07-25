import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU';

// Create supabase client with cross-domain auth
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'repspheres-auth',
    storage: window.localStorage,
    cookieOptions: {
      domain: window.location.hostname === 'localhost' ? 'localhost' : '.repspheres.com',
      sameSite: 'lax',
      secure: window.location.protocol === 'https:',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    }
  },
});

export default supabase;