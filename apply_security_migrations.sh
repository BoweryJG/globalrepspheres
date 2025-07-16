#!/bin/bash

# Security Migration Application Script
# This script applies all security migrations in the correct order
# Run this in your development environment first!

set -e  # Exit on any error

echo "============================================"
echo "SUPABASE SECURITY MIGRATIONS"
echo "============================================"
echo "This script will apply critical security fixes"
echo "to address Supabase security advisor issues"
echo ""
echo "IMPORTANT: Run this in development first!"
echo "============================================"

# Check if we're in the right directory
if [ ! -f "supabase/migrations/001_enable_rls_on_tables_with_policies.sql" ]; then
    echo "ERROR: Migration files not found!"
    echo "Please run this script from the project root directory"
    exit 1
fi

# Function to run SQL file
run_sql_file() {
    local file=$1
    local description=$2
    
    echo ""
    echo "Running: $description"
    echo "File: $file"
    
    if [ -f "$file" ]; then
        # Use your preferred method to run SQL files
        # Examples:
        # supabase db reset  # if you want to reset first
        # psql -d your_db -f "$file"
        # supabase db push
        
        echo "Please run: supabase db push"
        echo "Or manually execute: $file"
        read -p "Press Enter when you've applied this migration..."
    else
        echo "ERROR: File not found: $file"
        exit 1
    fi
}

# Function to run test
run_test() {
    echo ""
    echo "Running validation tests..."
    echo "Please run: psql -d your_db -f test_security_migrations.sql"
    read -p "Press Enter when you've run the tests..."
}

echo ""
echo "Step 1: Enable RLS on tables with policies (CRITICAL)"
echo "This fixes the most critical security issue"
run_sql_file "supabase/migrations/001_enable_rls_on_tables_with_policies.sql" "Enable RLS on tables with policies"

echo ""
echo "Step 2: Enable RLS on all public tables (CRITICAL)"
echo "This enables RLS on all public tables without it"
echo "WARNING: Tables without policies will become inaccessible"
run_sql_file "supabase/migrations/002_enable_rls_on_all_public_tables.sql" "Enable RLS on all public tables"

echo ""
echo "Step 3: Fix security definer views (MEDIUM)"
echo "This converts views to use user permissions instead of creator permissions"
run_sql_file "supabase/migrations/003_fix_security_definer_views.sql" "Fix security definer views"

echo ""
echo "Step 4: Run validation tests"
run_test

echo ""
echo "============================================"
echo "MIGRATION COMPLETE!"
echo "============================================"
echo ""
echo "Next steps:"
echo "1. Review test results"
echo "2. Create policies for tables without them"
echo "3. Test your application thoroughly"
echo "4. Run security advisor again to verify fixes"
echo ""
echo "Emergency rollback available in:"
echo "- emergency_rollback_all_security_migrations.sql"
echo ""
echo "Documentation:"
echo "- SECURITY_IMPLEMENTATION_GUIDE.md"
echo "============================================"