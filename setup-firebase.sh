#!/bin/bash

echo "🔥 Setting up Firebase Firestore Security Rules..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI not found. Installing..."
    npm install -g firebase-tools
fi

# Login to Firebase (if not already logged in)
echo "🔑 Checking Firebase authentication..."
firebase login

# Create firestore.rules file
cat > firestore.rules << 'EOF'
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to whitelist for authenticated users
    match /whitelist/{email} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.token.email in ['satish@skids.health', 'dr.satish@greybrain.ai', 'balwant@greybrain.ai'];
    }
    
    // Allow users to read their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Allow admin access to all documents for admin users
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.token.email in ['satish@skids.health', 'dr.satish@greybrain.ai', 'balwant@greybrain.ai'];
    }
  }
}
EOF

# Deploy the rules
echo "🚀 Deploying Firestore security rules..."
firebase deploy --only firestore:rules --project vedantavision-da2e1

echo "✅ Firebase setup complete!"
echo "🌐 Now you can sign in with: satish@skids.health"
