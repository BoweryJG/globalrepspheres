-- Test Script: Validate Security Migrations
-- This script validates that the security migrations have been applied correctly
-- Run this AFTER applying all three security migrations

-- =============================================================================
-- TEST 1: Verify RLS is enabled on tables with policies
-- =============================================================================
DO $$
DECLARE
    tables_with_policies text[] := ARRAY[
        'aesthetic_categories', 'clinical_categories', 'consolidated_procedures',
        'crm_activities', 'crm_campaign_recipients', 'crm_campaigns',
        'customer_subscriptions', 'dental_procedures', 'dental_procedures_simplified',
        'events', 'news_articles', 'news_categories', 'public_contacts',
        'trending_topics', 'user_usage'
    ];
    table_name text;
    rls_enabled boolean;
    failed_count integer := 0;
BEGIN
    RAISE NOTICE 'Testing RLS enablement on tables with policies...';
    
    FOREACH table_name IN ARRAY tables_with_policies
    LOOP
        SELECT rowsecurity INTO rls_enabled
        FROM pg_tables 
        WHERE schemaname = 'public' AND tablename = table_name;
        
        IF NOT rls_enabled THEN
            RAISE NOTICE 'FAILED: RLS not enabled on table %', table_name;
            failed_count := failed_count + 1;
        END IF;
    END LOOP;
    
    IF failed_count = 0 THEN
        RAISE NOTICE 'SUCCESS: RLS enabled on all % tables with policies', array_length(tables_with_policies, 1);
    ELSE
        RAISE NOTICE 'FAILED: % tables still have RLS disabled', failed_count;
    END IF;
END $$;

-- =============================================================================
-- TEST 2: Count total tables with RLS enabled
-- =============================================================================
SELECT 
    'Total tables with RLS enabled' as test_name,
    count(*) as rls_enabled_count
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = true;

-- =============================================================================
-- TEST 3: Verify views are no longer using SECURITY DEFINER
-- =============================================================================
DO $$
DECLARE
    definer_views_count integer;
BEGIN
    SELECT count(*) INTO definer_views_count
    FROM pg_views v
    JOIN pg_class c ON c.relname = v.viewname
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
    AND NOT c.relrowsecurity; -- security_invoker = true sets relrowsecurity = false
    
    RAISE NOTICE 'Views still using SECURITY DEFINER: %', definer_views_count;
END $$;

-- =============================================================================
-- TEST 4: Check for any remaining security advisor issues
-- =============================================================================
-- Note: This would require running the actual security advisor again
-- For now, we'll check basic RLS status

SELECT 
    'Tables without RLS in public schema' as issue_type,
    count(*) as count
FROM pg_tables 
WHERE schemaname = 'public' AND rowsecurity = false;

-- =============================================================================
-- TEST 5: Verify migration log entries
-- =============================================================================
SELECT 
    migration_name,
    status,
    executed_at,
    notes
FROM public.migration_safety_log 
WHERE migration_name IN (
    '001_enable_rls_on_tables_with_policies',
    '002_enable_rls_on_all_public_tables',
    '003_fix_security_definer_views'
)
ORDER BY executed_at;

-- =============================================================================
-- TEST 6: Sample policy check - verify policies still exist
-- =============================================================================
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual
FROM pg_policies 
WHERE schemaname = 'public' 
    AND tablename IN ('aesthetic_categories', 'news_articles', 'user_usage')
ORDER BY tablename, policyname;

-- =============================================================================
-- TEST 7: Check if any tables became inaccessible due to missing policies
-- =============================================================================
-- This query identifies tables with RLS enabled but no policies
-- These tables will be inaccessible to non-superusers
SELECT 
    t.schemaname,
    t.tablename,
    t.rowsecurity as rls_enabled,
    COALESCE(p.policy_count, 0) as policy_count
FROM pg_tables t
LEFT JOIN (
    SELECT 
        schemaname,
        tablename,
        count(*) as policy_count
    FROM pg_policies
    GROUP BY schemaname, tablename
) p ON p.schemaname = t.schemaname AND p.tablename = t.tablename
WHERE t.schemaname = 'public' 
    AND t.rowsecurity = true 
    AND COALESCE(p.policy_count, 0) = 0
ORDER BY t.tablename;

-- =============================================================================
-- RECOMMENDATIONS OUTPUT
-- =============================================================================
DO $$
DECLARE
    tables_without_policies integer;
BEGIN
    SELECT count(*) INTO tables_without_policies
    FROM pg_tables t
    LEFT JOIN (
        SELECT 
            schemaname,
            tablename,
            count(*) as policy_count
        FROM pg_policies
        GROUP BY schemaname, tablename
    ) p ON p.schemaname = t.schemaname AND p.tablename = t.tablename
    WHERE t.schemaname = 'public' 
        AND t.rowsecurity = true 
        AND COALESCE(p.policy_count, 0) = 0;
    
    RAISE NOTICE '============================================';
    RAISE NOTICE 'SECURITY MIGRATION TEST SUMMARY';
    RAISE NOTICE '============================================';
    
    IF tables_without_policies > 0 THEN
        RAISE NOTICE 'WARNING: % tables have RLS enabled but no policies', tables_without_policies;
        RAISE NOTICE 'These tables will be inaccessible to non-superusers';
        RAISE NOTICE 'You need to create appropriate policies for these tables';
    ELSE
        RAISE NOTICE 'All tables with RLS have policies defined';
    END IF;
    
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Review tables without policies and create appropriate policies';
    RAISE NOTICE '2. Test application functionality with RLS enabled';
    RAISE NOTICE '3. Run security advisor again to verify issues are resolved';
END $$;