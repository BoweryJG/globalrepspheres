-- Migration: Enable RLS on tables that have policies but RLS disabled
-- Priority: CRITICAL - These tables have security policies that are not being enforced
-- Created: 2025-01-16
-- Issue: policy_exists_rls_disabled

-- Description: This migration enables Row Level Security (RLS) on tables that already 
-- have RLS policies defined but RLS is not enabled on the table itself.
-- This means the policies exist but are not being enforced, creating a security gap.

BEGIN;

-- Enable RLS on tables with existing policies but RLS disabled
-- These are the 15 tables identified in the security advisor results

-- 1. aesthetic_categories
-- Policies: aesthetic_categories_read_policy, select_aesthetic_categories, select_aesthetic_categories_anon
ALTER TABLE public.aesthetic_categories ENABLE ROW LEVEL SECURITY;

-- 2. clinical_categories  
-- Policies: select_clinical_categories, select_clinical_categories_anon
ALTER TABLE public.clinical_categories ENABLE ROW LEVEL SECURITY;

-- 3. consolidated_procedures
-- Policies: select_consolidated_procedures, select_consolidated_procedures_anon
ALTER TABLE public.consolidated_procedures ENABLE ROW LEVEL SECURITY;

-- 4. crm_activities
-- Policies: "Allow full access"
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;

-- 5. crm_campaign_recipients
-- Policies: "Allow full access"
ALTER TABLE public.crm_campaign_recipients ENABLE ROW LEVEL SECURITY;

-- 6. crm_campaigns
-- Policies: "Allow full access"
ALTER TABLE public.crm_campaigns ENABLE ROW LEVEL SECURITY;

-- 7. customer_subscriptions
-- Policies: "Allow full access"
ALTER TABLE public.customer_subscriptions ENABLE ROW LEVEL SECURITY;

-- 8. dental_procedures
-- Policies: "Allow anon select"
ALTER TABLE public.dental_procedures ENABLE ROW LEVEL SECURITY;

-- 9. dental_procedures_simplified
-- Policies: dental_procedures_simplified_read_policy
ALTER TABLE public.dental_procedures_simplified ENABLE ROW LEVEL SECURITY;

-- 10. events
-- Policies: "Allow insert access for anon/authenticated users on events", "Allow public read access to events"
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- 11. news_articles
-- Policies: "Allow all access to news articles", "Allow anon full access to news_articles", "Allow public to read news articles"
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;

-- 12. news_categories
-- Policies: "Allow all access to news categories", "Allow public to read news categories"
ALTER TABLE public.news_categories ENABLE ROW LEVEL SECURITY;

-- 13. public_contacts
-- Policies: "Allow all operations for authenticated users", "Allow anon select"
ALTER TABLE public.public_contacts ENABLE ROW LEVEL SECURITY;

-- 14. trending_topics
-- Policies: "Allow insert access for anon/authenticated users on trending_to", "Allow public read access to trending topics"
ALTER TABLE public.trending_topics ENABLE ROW LEVEL SECURITY;

-- 15. user_usage
-- Policies: "Users can view their own usage"
ALTER TABLE public.user_usage ENABLE ROW LEVEL SECURITY;

-- Log the migration completion
INSERT INTO public.migration_safety_log (migration_name, status, executed_at, notes) 
VALUES (
    '001_enable_rls_on_tables_with_policies',
    'completed',
    NOW(),
    'Enabled RLS on 15 tables that had policies but RLS disabled. This enforces existing security policies.'
);

COMMIT;

-- Verification Query (run this after migration to confirm RLS is enabled)
/*
SELECT 
    schemaname,
    tablename,
    rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
    AND tablename IN (
        'aesthetic_categories', 'clinical_categories', 'consolidated_procedures',
        'crm_activities', 'crm_campaign_recipients', 'crm_campaigns',
        'customer_subscriptions', 'dental_procedures', 'dental_procedures_simplified',
        'events', 'news_articles', 'news_categories', 'public_contacts',
        'trending_topics', 'user_usage'
    )
ORDER BY tablename;
*/