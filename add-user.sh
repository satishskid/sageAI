#!/bin/bash

# Quick Whitelist User Setup Script
# Usage: ./add-user.sh email@domain.com "Optional notes"

if [ $# -eq 0 ]; then
    echo "Usage: ./add-user.sh email@domain.com \"Optional notes\""
    echo "Example: ./add-user.sh john@example.com \"Beta tester\""
    exit 1
fi

EMAIL=$1
NOTES=${2:-"Added via script"}

echo "🔥 Adding user to Vedanta BYOK whitelist..."
echo "📧 Email: $EMAIL"
echo "📝 Notes: $NOTES"
echo ""

# Use Firebase CLI to add to Firestore
firebase firestore:write "whitelist/$EMAIL" "{
  \"email\": \"$EMAIL\",
  \"addedAt\": {
    \"_seconds\": $(date +%s),
    \"_nanoseconds\": 0
  },
  \"addedBy\": \"admin-script\",
  \"notes\": \"$NOTES\"
}" --project vedantavision-da2e1

if [ $? -eq 0 ]; then
    echo "✅ Successfully added $EMAIL to whitelist!"
    echo "🚀 User can now access the Vedanta BYOK platform"
else
    echo "❌ Failed to add user. Make sure Firebase CLI is installed and logged in."
    echo "Run: npm install -g firebase-tools && firebase login"
fi
