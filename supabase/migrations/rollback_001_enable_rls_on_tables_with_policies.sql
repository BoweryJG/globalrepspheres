-- Rollback Migration: Disable RLS on tables with policies
-- This rollback script reverses the changes made in 001_enable_rls_on_tables_with_policies.sql
-- USE WITH CAUTION: This will disable security enforcement on these tables

BEGIN;

-- Disable RLS on the tables that were enabled in the forward migration
-- WARNING: This will disable security policy enforcement!

ALTER TABLE public.aesthetic_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.consolidated_procedures DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_campaign_recipients DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_campaigns DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_subscriptions DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.dental_procedures DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.dental_procedures_simplified DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.events DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_articles DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_categories DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.public_contacts DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.trending_topics DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_usage DISABLE ROW LEVEL SECURITY;

-- Log the rollback
INSERT INTO public.migration_safety_log (migration_name, status, executed_at, notes) 
VALUES (
    'rollback_001_enable_rls_on_tables_with_policies',
    'completed',
    NOW(),
    'ROLLBACK: Disabled RLS on 15 tables. Security policies are no longer enforced on these tables.'
);

COMMIT;