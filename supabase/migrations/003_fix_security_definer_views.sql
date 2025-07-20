-- Migration: Fix Security Definer Views
-- Priority: MEDIUM - These views run with creator privileges instead of user privileges
-- Created: 2025-01-16
-- Issue: security_definer_view

-- Description: This migration converts views from SECURITY DEFINER to SECURITY INVOKER
-- to ensure they run with the permissions of the querying user rather than the view creator.
-- This reduces the risk of privilege escalation attacks.

-- SECURITY DEFINER views are sometimes necessary for specific use cases, but most views
-- should use SECURITY INVOKER (the default) for better security.

BEGIN;

-- Dashboard and analytics views
ALTER VIEW public.v_unified_companies SET (security_invoker = true);
ALTER VIEW public.v_combined_companies_market_insights SET (security_invoker = true);
ALTER VIEW public.active_at_risk_accounts SET (security_invoker = true);
ALTER VIEW public.v_top_procedures_dashboard SET (security_invoker = true);
ALTER VIEW public.v_all_news_articles_categories SET (security_invoker = true);
ALTER VIEW public.v_news_articles_dental_categories SET (security_invoker = true);
ALTER VIEW public.v_news_articles_aesthetic_categories SET (security_invoker = true);
ALTER VIEW public.repspheresinteldashboardstartingpoint SET (security_invoker = true);
ALTER VIEW public.v_news_articles_aesthetic_procedures SET (security_invoker = true);
ALTER VIEW public.v_regional_market_insights SET (security_invoker = true);
ALTER VIEW public.v_dashboard_documentation SET (security_invoker = true);
ALTER VIEW public.v_all_news_articles_procedures SET (security_invoker = true);
ALTER VIEW public.v_dashboard_views_summary SET (security_invoker = true);
ALTER VIEW public.v_comprehensive_news_analytics_dashboard SET (security_invoker = true);
ALTER VIEW public.v_category_recommendations SET (security_invoker = true);
ALTER VIEW public.v_industry_trend_insights SET (security_invoker = true);
ALTER VIEW public.v_news_articles_companies SET (security_invoker = true);
ALTER VIEW public.v_news_article_insights SET (security_invoker = true);
ALTER VIEW public.v_procedure_recommendations SET (security_invoker = true);
ALTER VIEW public.v_dental_companies SET (security_invoker = true);
ALTER VIEW public.v_aesthetic_companies SET (security_invoker = true);
ALTER VIEW public.v_news_articles_enhanced SET (security_invoker = true);
ALTER VIEW public.dental_lab_summary SET (security_invoker = true);
ALTER VIEW public.v_aesthetic_market_growth SET (security_invoker = true);
ALTER VIEW public.v_dashboard_procedures SET (security_invoker = true);
ALTER VIEW public.v_procedures SET (security_invoker = true);
ALTER VIEW public.v_procedure_category_mapping SET (security_invoker = true);
ALTER VIEW public.v_enhanced_analytics_dashboard SET (security_invoker = true);
ALTER VIEW public.combined_procedures_view SET (security_invoker = true);
ALTER VIEW public.v_company_performance_dashboard SET (security_invoker = true);
ALTER VIEW public.aesthetic_procedures_view SET (security_invoker = true);
ALTER VIEW public.v_company_market_trends_dashboard SET (security_invoker = true);
ALTER VIEW public.v_comprehensive_company_dashboard SET (security_invoker = true);
ALTER VIEW public.v_news_by_procedure_category SET (security_invoker = true);
ALTER VIEW public.v_dental_news_by_procedure_category SET (security_invoker = true);
ALTER VIEW public.v_aesthetic_news_by_procedure_category SET (security_invoker = true);
ALTER VIEW public.v_top_news_by_procedure_category SET (security_invoker = true);
ALTER VIEW public.v_advanced_market_dashboard SET (security_invoker = true);
ALTER VIEW public.v_dashboard_recommendations SET (security_invoker = true);
ALTER VIEW public.v_market_trends_dashboard SET (security_invoker = true);
ALTER VIEW public.v_integrated_market_dashboard SET (security_invoker = true);
ALTER VIEW public.v_comprehensive_analytics_dashboard SET (security_invoker = true);
ALTER VIEW public.v_top_providers_dashboard SET (security_invoker = true);
ALTER VIEW public.v_dashboard_structure SET (security_invoker = true);
ALTER VIEW public.combined_companies_view SET (security_invoker = true);
ALTER VIEW public.v_procedure_insights SET (security_invoker = true);
ALTER VIEW public.v_industry_recommendations_summary SET (security_invoker = true);
ALTER VIEW public.all_procedures SET (security_invoker = true);
ALTER VIEW public.v_unified_procedures SET (security_invoker = true);
ALTER VIEW public.v_category_insights SET (security_invoker = true);
ALTER VIEW public.v_react_safe_procedures SET (security_invoker = true);
ALTER VIEW public.v_trending_topic_insights SET (security_invoker = true);
ALTER VIEW public.v_dashboard_industry_metrics SET (security_invoker = true);
ALTER VIEW public.dental_categories SET (security_invoker = true);
ALTER VIEW public.v_editable_procedures SET (security_invoker = true);
ALTER VIEW public.v_news_articles_comprehensive SET (security_invoker = true);
ALTER VIEW public.v_market_trend_insights SET (security_invoker = true);
ALTER VIEW public.v_comprehensive_market_growth SET (security_invoker = true);
ALTER VIEW public.v_news_analytics_dashboard SET (security_invoker = true);
ALTER VIEW public.v_dashboard_market_trends SET (security_invoker = true);
ALTER VIEW public.v_industry_trends SET (security_invoker = true);
ALTER VIEW public.v_industry_summary_metrics SET (security_invoker = true);
ALTER VIEW public.v_dashboard_categories SET (security_invoker = true);
ALTER VIEW public.v_top_providers SET (security_invoker = true);
ALTER VIEW public.v_dashboard_trending_topics SET (security_invoker = true);
ALTER VIEW public.news_articles_with_aesthetic_procedures SET (security_invoker = true);
ALTER VIEW public.news_articles_with_dental_procedures SET (security_invoker = true);
ALTER VIEW public.v_news_articles_analytics SET (security_invoker = true);
ALTER VIEW public.v_top_market_trends_dashboard SET (security_invoker = true);
ALTER VIEW public.news_articles_with_categories SET (security_invoker = true);
ALTER VIEW public.v_procedure_market_analytics SET (security_invoker = true);
ALTER VIEW public.v_top_trending_topics_dashboard SET (security_invoker = true);
ALTER VIEW public.v_dashboard_regional_insights SET (security_invoker = true);
ALTER VIEW public.news_articles_with_aesthetic_categories SET (security_invoker = true);
ALTER VIEW public.news_articles_with_dental_categories SET (security_invoker = true);
ALTER VIEW public.v_top_categories_dashboard SET (security_invoker = true);
ALTER VIEW public.v_dashboard_providers SET (security_invoker = true);
ALTER VIEW public.v_news_articles_dental_procedures SET (security_invoker = true);
ALTER VIEW public.v_procedure_trend_analytics SET (security_invoker = true);

-- Subscription and user views
ALTER VIEW public.user_subscription_details SET (security_invoker = true);
ALTER VIEW public.subscription_usage_summary SET (security_invoker = true);
ALTER VIEW public.subscription_plans_summary SET (security_invoker = true);

-- Analytics and intelligence views
ALTER VIEW public.provider_market_insights SET (security_invoker = true);
ALTER VIEW public.linguistics_performance_metrics SET (security_invoker = true);
ALTER VIEW public.enhanced_call_intelligence SET (security_invoker = true);
ALTER VIEW public.rep_analytics_summary SET (security_invoker = true);
ALTER VIEW public.mock_research_tasks SET (security_invoker = true);
ALTER VIEW public.live_research_tasks SET (security_invoker = true);
ALTER VIEW public.contact_research_intelligence SET (security_invoker = true);
ALTER VIEW public.rep_analytics_intelligence SET (security_invoker = true);
ALTER VIEW public.simplified_rep_analytics SET (security_invoker = true);
ALTER VIEW public.rep_analytics_dashboard SET (security_invoker = true);

-- Alerts and monitoring views
ALTER VIEW public.active_alerts SET (security_invoker = true);
ALTER VIEW public.daily_metrics_summary SET (security_invoker = true);
ALTER VIEW public.hourly_metrics_summary SET (security_invoker = true);

-- Procedure and category views
ALTER VIEW public.v_procedures_with_categories SET (security_invoker = true);
ALTER VIEW public.production_queue SET (security_invoker = true);
ALTER VIEW public.high_influence_providers SET (security_invoker = true);
ALTER VIEW public.technology_opportunities SET (security_invoker = true);
ALTER VIEW public.call_intelligence_overview SET (security_invoker = true);
ALTER VIEW public.california_provider_insights SET (security_invoker = true);

-- Log the migration completion
INSERT INTO public.migration_safety_log (migration_name, status, executed_at, notes) 
VALUES (
    '003_fix_security_definer_views',
    'completed',
    NOW(),
    'Converted security definer views to security invoker. Views now run with user permissions instead of creator permissions.'
);

COMMIT;

-- Note: If any of these views specifically need SECURITY DEFINER privileges to access
-- restricted tables or functions, they may need to be individually reviewed and
-- potentially reverted to SECURITY DEFINER with appropriate documentation.