-- SAFE CHECK: This just looks at your current security setup
-- This script makes NO CHANGES, just shows you what's happening

-- Check 1: Tables with RLS policies but RLS disabled (the critical ones)
SELECT 
    'CRITICAL ISSUE' as issue_type,
    schemaname,
    tablename,
    'Has policies but RLS disabled' as problem
FROM pg_tables t
WHERE schemaname = 'public' 
    AND rowsecurity = false
    AND tablename IN (
        'aesthetic_categories', 'clinical_categories', 'consolidated_procedures',
        'crm_activities', 'crm_campaign_recipients', 'crm_campaigns',
        'customer_subscriptions', 'dental_procedures', 'dental_procedures_simplified',
        'events', 'news_articles', 'news_categories', 'public_contacts',
        'trending_topics', 'user_usage'
    );

-- Check 2: Count total tables without RLS
SELECT 
    'INFO' as issue_type,
    'Total tables without RLS' as problem,
    count(*) as count
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = false;

-- Check 3: Show existing policies (so we know what we have)
SELECT 
    'INFO' as issue_type,
    schemaname,
    tablename,
    policyname,
    'Policy exists' as status
FROM pg_policies 
WHERE schemaname = 'public'
ORDER BY tablename;

-- This is what we'll see and what it means:
-- - Tables with "CRITICAL ISSUE" = need RLS enabled immediately
-- - Tables with policies = already have some security rules
-- - Tables without policies = will need policies after we enable RLS