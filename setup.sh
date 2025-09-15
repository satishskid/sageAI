#!/bin/bash

# Vedanta BYOK AI Platform Setup Script
# This script helps you set up the Vedanta BYOK (Bring Your Own Key) AI Platform

echo "🕉️  Welcome to Vedanta BYOK AI Platform Setup"
echo "================================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js (v16 or later) and try again."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm and try again."
    exit 1
fi

echo "✅ Node.js and npm are installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Create .env file from example if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file from example..."
    cp .env.example .env
    echo "✅ .env file created"
    echo ""
    echo "🔧 IMPORTANT: Please configure your Firebase settings in the .env file:"
    echo "   1. Go to https://console.firebase.google.com/"
    echo "   2. Create a new project or select an existing one"
    echo "   3. Enable Authentication with Google Sign-In"
    echo "   4. Copy your Firebase config values to the .env file"
    echo ""
else
    echo "✅ .env file already exists"
    echo ""
fi

# Create Firebase setup instructions
cat > FIREBASE_SETUP.md << EOF
# Firebase Setup Instructions

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Follow the setup wizard

## 2. Enable Authentication

1. In your Firebase project, go to "Authentication" → "Sign-in method"
2. Enable "Google" sign-in provider
3. Add your domain to authorized domains

## 3. Get Configuration

1. Go to Project Settings (gear icon)
2. Scroll down to "Your apps"
3. Click on your web app or create one
4. Copy the config values to your .env file

## 4. Update .env File

Update the following values in your .env file:

\`\`\`
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
\`\`\`

## 5. BYOK Features

This platform uses BYOK (Bring Your Own Key) architecture:
- Users configure their own AI API keys through the Settings interface
- No server-side API keys needed
- Complete privacy and control over AI interactions
- Supports multiple AI providers: Gemini, Groq, OpenAI, Claude, and more
EOF

echo "📋 Created FIREBASE_SETUP.md with detailed instructions"
echo ""

echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Configure Firebase settings in .env file (see FIREBASE_SETUP.md)"
echo "2. Run 'npm run dev' to start the development server"
echo "3. Users will configure their own AI API keys through the Settings interface"
echo ""
echo "🔒 BYOK Benefits:"
echo "   ✓ Complete privacy - no server-side API keys"
echo "   ✓ User control over AI interactions"
echo "   ✓ Support for multiple AI providers"
echo "   ✓ No vendor lock-in"
echo ""
echo "Happy coding! 🚀"
