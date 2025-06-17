import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU';

// Create supabase client with local-only auth
const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'repspheres-auth',
    storage: window.localStorage,
    // No domain-wide cookies - each app handles its own auth
  },
});

export default supabase;