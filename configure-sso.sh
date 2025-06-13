#!/bin/bash

echo "🔧 RepSpheres SSO Configuration Script"
echo "====================================="
echo ""
echo "This script will help you configure cross-domain authentication for RepSpheres."
echo ""
echo "⚠️  MANUAL STEPS REQUIRED IN SUPABASE DASHBOARD:"
echo ""
echo "1. Go to: https://supabase.com/dashboard/project/cbopynuvhcymbumjnvay/auth/url-configuration"
echo ""
echo "2. Add these URLs to 'Redirect URLs' (one per line):"
echo "   - https://repspheres.com/*"
echo "   - https://www.repspheres.com/*"
echo "   - https://market.repspheres.com/*"
echo "   - https://canvas.repspheres.com/*"
echo "   - https://crm.repspheres.com/*"
echo "   - http://localhost:3000/*"
echo "   - http://localhost:3001/*"
echo "   - http://localhost:3002/*"
echo "   - http://localhost:3003/*"
echo ""
echo "3. Go to: https://supabase.com/dashboard/project/cbopynuvhcymbumjnvay/auth/providers"
echo ""
echo "4. For Google OAuth:"
echo "   - Make sure it's enabled"
echo "   - Set Authorized redirect URI to: https://repspheres.com/auth/callback"
echo ""
echo "5. For Facebook OAuth:"
echo "   - Make sure it's enabled"
echo "   - Set Authorized redirect URI to: https://repspheres.com/auth/callback"
echo ""
echo "📝 CODE UPDATES COMPLETED:"
echo "✅ globalrepspheres - Supabase client configured"
echo "✅ SphereOsCrM - Supabase client configured"
echo ""
echo "📝 REMAINING CODE UPDATES:"
echo ""
echo "For market-data-jg and canvasheader, update your Supabase client configuration:"
echo ""
cat << 'EOF'
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cbopynuvhcymbumjnvay.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU';

const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    storageKey: 'repspheres-auth',
    storage: window.localStorage,
    cookieOptions: {
      domain: '.repspheres.com',
      sameSite: 'lax',
      secure: true,
      maxAge: 60 * 60 * 24 * 7 // 7 days
    },
    ...(window.location.hostname === 'localhost' && {
      cookieOptions: {
        domain: 'localhost',
        sameSite: 'lax',
        secure: false,
        maxAge: 60 * 60 * 24 * 7
      }
    })
  },
});

export default supabase;
EOF

echo ""
echo "🚀 Once all steps are complete, SSO will work across all domains!"
echo ""
echo "Press Enter to open the Supabase dashboard..."
read -p ""

open "https://supabase.com/dashboard/project/cbopynuvhcymbumjnvay/auth/url-configuration"