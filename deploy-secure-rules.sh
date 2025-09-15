#!/bin/bash

# Secure Firestore Rules Deployment Script
# This script safely deploys secure Firestore rules for the Vedanta BYOK platform

set -e

PROJECT_ID="vedantavision-da2e1"
RULES_FILE="firestore.rules"

echo "🔐 Deploying Secure Firestore Rules for Vedanta BYOK Platform"
echo "=================================================="
echo "Project: $PROJECT_ID"
echo "Rules File: $RULES_FILE"
echo ""

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Check if user is logged in
if ! firebase projects:list --project $PROJECT_ID &> /dev/null; then
    echo "🔑 Please log in to Firebase..."
    firebase login
fi

echo "📋 Current Firestore Rules:"
echo "=============================="
# Show current rules for review
firebase firestore:rules:get --project $PROJECT_ID 2>/dev/null || echo "No existing rules found"

echo ""
echo "🔒 New Secure Rules Preview:"
echo "=============================="
cat $RULES_FILE

echo ""
read -p "🚨 Deploy these secure rules? This will replace current rules. (y/N): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🚀 Deploying secure Firestore rules..."
    
    # Backup current rules first
    firebase firestore:rules:get --project $PROJECT_ID > firestore-backup-$(date +%Y%m%d-%H%M%S).rules 2>/dev/null || true
    
    # Deploy new rules
    firebase deploy --only firestore:rules --project $PROJECT_ID
    
    if [ $? -eq 0 ]; then
        echo "✅ Secure Firestore rules deployed successfully!"
        echo ""
        echo "🔐 Security Features Enabled:"
        echo "  • Whitelist-only access for authenticated users"
        echo "  • Admin-only whitelist management"
        echo "  • User data isolation"
        echo "  • Email format validation"
        echo "  • Rate limiting protection"
        echo ""
        echo "🎯 Next Steps:"
        echo "  1. Test sign-in with whitelisted email: satish@skids.health"
        echo "  2. Access admin panel at: /admin"
        echo "  3. Add more users through the admin interface"
    else
        echo "❌ Failed to deploy rules. Please check for syntax errors."
        exit 1
    fi
else
    echo "❌ Deployment cancelled."
    exit 0
fi
