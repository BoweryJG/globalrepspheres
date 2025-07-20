-- EMERGENCY ROLLBACK: All Security Migrations
-- This script rolls back ALL security migrations if critical issues occur
-- USE WITH EXTREME CAUTION - This will disable all security enforcement

-- WARNING: This script will make your database completely open to PostgREST access
-- Only use this in emergency situations where the application is completely broken

-- =============================================================================
-- SAFETY CHECKS
-- =============================================================================
DO $$
BEGIN
    RAISE NOTICE '============================================';
    RAISE NOTICE 'EMERGENCY SECURITY ROLLBACK INITIATED';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'This will disable ALL security enforcement';
    RAISE NOTICE 'Database will be completely open to PostgREST';
    RAISE NOTICE 'Only proceed if this is an emergency';
    RAISE NOTICE '============================================';
END $$;

-- Uncomment the next line only if you're absolutely sure you want to proceed
-- SET session_replication_role = replica; -- Disable triggers if needed

BEGIN;

-- =============================================================================
-- ROLLBACK 1: Disable RLS on tables with policies
-- =============================================================================
RAISE NOTICE 'Rolling back RLS on tables with policies...';

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

-- =============================================================================
-- ROLLBACK 2: Disable RLS on all public tables
-- =============================================================================
RAISE NOTICE 'Rolling back RLS on all public tables...';

-- This is a massive operation - we'll do it programmatically
DO $$
DECLARE
    table_record record;
BEGIN
    FOR table_record IN 
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname = 'public' AND rowsecurity = true
    LOOP
        EXECUTE format('ALTER TABLE %I.%I DISABLE ROW LEVEL SECURITY', 
                      table_record.schemaname, table_record.tablename);
    END LOOP;
END $$;

-- =============================================================================
-- ROLLBACK 3: Revert views to SECURITY DEFINER
-- =============================================================================
RAISE NOTICE 'Rolling back views to SECURITY DEFINER...';

-- Note: This is more complex as we need to know which views were originally SECURITY DEFINER
-- For now, we'll revert the main dashboard views that likely need elevated privileges

DO $$
DECLARE
    view_record record;
    view_names text[] := ARRAY[
        'v_unified_companies', 'v_combined_companies_market_insights',
        'active_at_risk_accounts', 'v_top_procedures_dashboard',
        'v_dashboard_views_summary', 'v_comprehensive_analytics_dashboard',
        'rep_analytics_dashboard', 'active_alerts', 'daily_metrics_summary'
    ];
    view_name text;
BEGIN
    FOREACH view_name IN ARRAY view_names
    LOOP
        BEGIN
            EXECUTE format('ALTER VIEW public.%I SET (security_invoker = false)', view_name);
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Could not revert view %: %', view_name, SQLERRM;
        END;
    END LOOP;
END $$;

-- =============================================================================
-- LOG THE ROLLBACK
-- =============================================================================
INSERT INTO public.migration_safety_log (migration_name, status, executed_at, notes) 
VALUES (
    'emergency_rollback_all_security_migrations',
    'completed',
    NOW(),
    'EMERGENCY ROLLBACK: All security migrations have been rolled back. Database is now completely open!'
);

COMMIT;

-- =============================================================================
-- POST-ROLLBACK VERIFICATION
-- =============================================================================
DO $$
DECLARE
    rls_enabled_count integer;
    total_tables_count integer;
BEGIN
    SELECT count(*) INTO rls_enabled_count
    FROM pg_tables 
    WHERE schemaname = 'public' AND rowsecurity = true;
    
    SELECT count(*) INTO total_tables_count
    FROM pg_tables 
    WHERE schemaname = 'public';
    
    RAISE NOTICE '============================================';
    RAISE NOTICE 'ROLLBACK VERIFICATION';
    RAISE NOTICE '============================================';
    RAISE NOTICE 'Total public tables: %', total_tables_count;
    RAISE NOTICE 'Tables with RLS enabled: %', rls_enabled_count;
    
    IF rls_enabled_count = 0 THEN
        RAISE NOTICE 'SUCCESS: All RLS has been disabled';
    ELSE
        RAISE NOTICE 'WARNING: % tables still have RLS enabled', rls_enabled_count;
    END IF;
    
    RAISE NOTICE '============================================';
    RAISE NOTICE 'CRITICAL: Database is now completely open!';
    RAISE NOTICE 'All security enforcement has been disabled';
    RAISE NOTICE 'Re-enable security as soon as possible';
    RAISE NOTICE '============================================';
END $$;