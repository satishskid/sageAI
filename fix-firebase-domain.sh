#!/bin/bash

# Firebase Domain Authorization Fix
# This script will help you add your Netlify domain to Firebase authorized domains

echo "🔥 Firebase Domain Authorization Fix"
echo "=================================="
echo ""
echo "Your Netlify domain 'vedvision.netlify.app' needs to be added to Firebase authorized domains."
echo ""
echo "MANUAL STEPS REQUIRED:"
echo "1. Go to Firebase Console: https://console.firebase.google.com/project/vedantavision-da2e1"
echo "2. Click on 'Authentication' in the left sidebar"
echo "3. Click on 'Settings' tab"
echo "4. Scroll down to 'Authorized domains'"
echo "5. Click 'Add domain'"
echo "6. Add: vedvision.netlify.app"
echo "7. Click 'Done'"
echo ""
echo "OR use Firebase CLI (if you have firebase-tools installed):"
echo ""
echo "firebase auth:domain:add vedvision.netlify.app --project vedantavision-da2e1"
echo ""
echo "After adding the domain, your authentication will work!"
