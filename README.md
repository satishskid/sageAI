# Vedanta AI Platform 🕉️

A spiritual AI wisdom platform featuring **Bring Your Own Key (BYOK)** architecture, Firebase authentication, and invite-only access control.

## ✨ Features

### 🔐 Authentication & Security
- **Firebase Authentication** with Google Sign-in
- **Invite-only whitelist system** using Firestore
- **Admin dashboard** for user management
- Secure Firestore rules with admin-only access controls

### 🔑 BYOK (Bring Your Own Key) Architecture
- Users provide their own AI API keys (stored in localStorage)
- Support for multiple AI providers:
  - **Gemini** (Google Generative AI)
  - **Groq** (Fast inference)
  - **OpenRouter** (Multiple models)
- No server-side API key storage required

### 🎨 Modern UI/UX
- **Vedic-inspired design** with spiritual color themes
- **Fully responsive** chat interface
- **Real-time API health monitoring**
- **Beautiful message bubbles** with optimal spacing
- **Smart user avatars** with fallback to initials

### ⚡ Admin Dashboard
- **User whitelist management**
- **API health monitoring**
- **Payment plan configuration**
- **Pro feature management**
- **Real-time system overview**

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Firebase project with Firestore enabled
- AI API keys from supported providers (Gemini, Groq, OpenRouter)

### 1. Clone & Install
```bash
git clone <your-repo-url>
cd vedanta-byok-integrated
npm install
```

### 2. Firebase Configuration
Create a `.env` file with your Firebase config:
```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### 3. Deploy Firestore Rules
```bash
npm run firebase:deploy:rules
```

### 4. Add Admin Users
```bash
# Add yourself to the whitelist as admin
node add-to-whitelist.mjs your-email@example.com true
```

### 5. Run Development Server
```bash
npm run dev
```

## 🌐 Netlify Deployment

### Step 1: Push to Git Repository
```bash
# If using GitHub
git add .
git commit -m "Initial commit - Vedanta AI Platform"
git branch -M main
git remote add origin https://github.com/yourusername/vedanta-ai-platform.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [Netlify](https://netlify.com) and sign in
2. Click "New site from Git"
3. Choose your Git provider and repository
4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### Step 3: Environment Variables
In Netlify dashboard → Site settings → Environment variables, add:
```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
```

### Step 4: Deploy!
Click "Deploy site" - your platform will be live in minutes! 🎉

## 📱 User Experience

### For Regular Users
1. **Sign in** with Google account
2. **Wait for whitelist approval** (contact admin)
3. **Add API keys** in settings for your preferred AI providers
4. **Start chatting** with Vedanta AI wisdom!

### For Admins
1. Access **admin dashboard** via ⚡ button in header
2. **Manage whitelist** - add/remove users
3. **Monitor API health** across all providers
4. **Configure features** and pricing plans

## 🛠️ Technical Architecture

### Frontend Stack
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** with custom Vedic theme
- **Firebase SDK** for authentication and Firestore

### AI Integration
- **Google Generative AI** (Gemini)
- **Groq SDK** for fast inference
- **OpenRouter API** for multiple model access
- **BYOK pattern** - user-provided API keys

### Security Features
- **Firebase Authentication** with Google provider
- **Firestore security rules** with admin controls
- **Whitelist-based access control**
- **Client-side API key storage** (localStorage)

## 📁 Project Structure

```
vedanta-byok-integrated/
├── components/           # React components
│   ├── AdminDashboard.tsx
│   ├── ChatWindow.tsx
│   ├── MessageBubble.tsx
│   └── ...
├── services/            # AI and Firebase services
│   ├── firebaseService.ts
│   ├── vedantaAIService.ts
│   ├── aiService.ts
│   └── geminiService.ts
├── utils/               # Utility functions
├── types.ts             # TypeScript definitions
├── constants.ts         # App constants
├── firestore.rules      # Firestore security rules
├── netlify.toml         # Netlify configuration
└── package.json
```

## 🔧 Available Scripts

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run firebase:deploy:rules  # Deploy Firestore rules
```

## 🔒 Security & Privacy

- **No server-side API key storage** - users provide their own keys
- **Invite-only access** with admin-controlled whitelist
- **Secure Firestore rules** preventing unauthorized access
- **Firebase Authentication** with Google Sign-in only
- **Local storage** for user preferences and API keys

## 🎯 Firebase Setup Requirements

1. **Create Firebase project** at [Firebase Console](https://console.firebase.google.com)
2. **Enable Authentication** with Google provider
3. **Enable Firestore** database
4. **Deploy security rules** from `firestore.rules`
5. **Add admin users** to whitelist collection

## 📞 Admin Contact

For whitelist access requests or technical support:
- **Email**: satish@skids.health
- **Admin**: Access admin dashboard after approval

## 🌟 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Built with 🕉️ spiritual wisdom and modern technology**

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)