-- Migration: Enable RLS on all public tables without RLS
-- Priority: CRITICAL - These tables are exposed to PostgREST without security
-- Created: 2025-01-16
-- Issue: rls_disabled_in_public

-- Description: This migration enables Row Level Security (RLS) on all public schema tables
-- that don't currently have RLS enabled. This is critical for production security as
-- public tables are exposed to PostgREST and need proper access controls.

-- NOTE: After enabling RLS, you'll need to create appropriate policies for each table
-- based on your application's access requirements.

BEGIN;

-- Core business tables
ALTER TABLE public.aesthetic_industry_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aesthetic_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aesthetic_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aesthetic_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aesthetic_gender_distribution ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aesthetic_industry_news ENABLE ROW LEVEL SECURITY;

-- Dental industry tables
ALTER TABLE public.dental_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dental_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dental_procedure_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dental_gender_distribution ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dental_labs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dental_procedures_backup_20250108 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dental_procedures_backup_maturity_20250108 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dental_companies_backup ENABLE ROW LEVEL SECURITY;

-- Companies and procedures
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_types ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_growth_by_location ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.procedure_enrichment_staging ENABLE ROW LEVEL SECURITY;

-- CRM and sales tables
ALTER TABLE public.crm_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.crm_campaign_recipients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_reps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_coach_agents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.salesman_targets ENABLE ROW LEVEL SECURITY;

-- Subscription and billing tables
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscription_benefits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.customer_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.billing_info ENABLE ROW LEVEL SECURITY;

-- User and authentication tables
ALTER TABLE public.user_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

-- News and content tables
ALTER TABLE public.news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_article_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_article_aesthetic_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_article_dental_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_article_aesthetic_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_article_dental_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.news_to_procedure_category_mapping ENABLE ROW LEVEL SECURITY;

-- Events and trending topics
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trending_topics ENABLE ROW LEVEL SECURITY;

-- Market and regional data
ALTER TABLE public.market_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_territories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_procedures_v1 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_data_verification ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.market_verification_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regional_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nyc_top_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nyc_market_trends ENABLE ROW LEVEL SECURITY;

-- Provider and practice data
ALTER TABLE public.public_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enriched_public_contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.doctors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services_offered ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_equipment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.provider_time_slots ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.availability ENABLE ROW LEVEL SECURITY;

-- Communications and calls
ALTER TABLE public.twilio_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.twilio_recordings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.twilio_sms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.voice_calls ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_summaries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.call_procedure_mentions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.callback_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.emergency_calls ENABLE ROW LEVEL SECURITY;

-- Transcription and AI
ALTER TABLE public.transcriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.real_time_transcriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_prompts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_generated_assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chatbot_conversations ENABLE ROW LEVEL SECURITY;

-- Training and education
ALTER TABLE public.training_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nsg_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nsg_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nsg_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.module_access ENABLE ROW LEVEL SECURITY;

-- Content and resources
ALTER TABLE public.industry_resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_resource_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.industry_trends_v1 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcasts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcast_engagement ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcast_title_candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.podcast_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.private_knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intelligence_vault ENABLE ROW LEVEL SECURITY;

-- Campaigns and marketing
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaign_performance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_generation_queue ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.redemptions ENABLE ROW LEVEL SECURITY;

-- Analytics and metrics
ALTER TABLE public.metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metric_aggregates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.metric_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dashboard_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consolidated_market_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.realself_metrics ENABLE ROW LEVEL SECURITY;

-- Coaching and performance
ALTER TABLE public.coaching_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coaching_performance_impact ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rep_coach_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rep_personality_assessment ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_phone_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_knowledge_base ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_device_expertise ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_procedure_specializations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.practice_scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instant_coaching_sessions ENABLE ROW LEVEL SECURITY;

-- Research and analysis
ALTER TABLE public.research_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.repspheres_linguistics_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.advanced_linguistics_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.competitor_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consolidated_competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consolidated_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consolidated_procedures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.standardized_procedure_categories ENABLE ROW LEVEL SECURITY;

-- Teams and organizational
ALTER TABLE public.repspheres_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rep_campaign_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.revenue_goals ENABLE ROW LEVEL SECURITY;

-- External data and integrations
ALTER TABLE public.brave_search_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jgbank ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sphere_1a ENABLE ROW LEVEL SECURITY;

-- Logging and monitoring
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.api_usage_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.migration_safety_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.changelog ENABLE ROW LEVEL SECURITY;

-- Miscellaneous and support
ALTER TABLE public.lead_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resource_downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.manufacturer_devices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_id_mapping ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.category_hierarchy ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.psych_triggers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trigger_engagement_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.strategy_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_transactions ENABLE ROW LEVEL SECURITY;

-- Archive and backup tables
ALTER TABLE public.archive_aesthetic_companies_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archive_aesthetic_procedures_backup ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archive_aesthetic_procedures_backup_20250108 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.archive_aesthetic_procedures_backup_maturity_20250108 ENABLE ROW LEVEL SECURITY;

-- California-specific tables
ALTER TABLE public.california_tech_stack ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.california_providers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.california_social_influence ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.california_website_discovery ENABLE ROW LEVEL SECURITY;

-- Profile and content
ALTER TABLE public.profile_content ENABLE ROW LEVEL SECURITY;

-- Test and temporary tables
ALTER TABLE public.temp_test_table ENABLE ROW LEVEL SECURITY;

-- Log the migration completion
INSERT INTO public.migration_safety_log (migration_name, status, executed_at, notes) 
VALUES (
    '002_enable_rls_on_all_public_tables',
    'completed',
    NOW(),
    'Enabled RLS on all public tables without RLS. WARNING: Default policies may need to be created for proper access control.'
);

COMMIT;

-- Important Note: 
-- After running this migration, you MUST create appropriate RLS policies for each table
-- based on your application's access requirements. Without policies, these tables will
-- be completely inaccessible to users (except superusers).

-- Common policy patterns you might need:
-- 1. Public read access: CREATE POLICY "public_read" ON table_name FOR SELECT USING (true);
-- 2. User owns records: CREATE POLICY "user_data" ON table_name FOR ALL USING (auth.uid() = user_id);
-- 3. Admin access: CREATE POLICY "admin_access" ON table_name FOR ALL USING (is_admin());
-- 4. Authenticated users: CREATE POLICY "authenticated" ON table_name FOR ALL TO authenticated USING (true);