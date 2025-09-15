# 🕉️ Vedanta Vision: The Sage AI - BYOK Platform

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site-name/deploys)

A sophisticated AI-powered platform for exploring Vedantic philosophy and ancient wisdom, built with **BYOK (Bring Your Own Key)** architecture for complete privacy and control.

## 🌟 **Features**

### **🔐 BYOK (Bring Your Own Key) Architecture**
- **Complete Privacy**: Your API keys, your data, your conversations
- **Multi-Provider Support**: Gemini, Groq, OpenRouter, HuggingFace, Ollama
- **No Subscription Fees**: You only pay for what you use directly to AI providers
- **Full Control**: Switch providers anytime, manage your own costs

### **🙏 Spiritual Learning Platform**
- **Interactive AI Guru**: Professor Arya guides your spiritual journey
- **Structured Courses**: Progressive learning from beginner to advanced
- **Vedic Texts**: Upanishads, Bhagavad Gita, Brahma Sutras
- **Personalized Paths**: Adaptive learning based on your progress

### **🔥 Firebase Authentication & Whitelist**
- **Invite-Only Access**: Secure whitelist-based user management
- **Google Sign-In**: Seamless authentication experience
- **Admin Dashboard**: Complete user and system management
- **Real-time Analytics**: Track usage and engagement

### **✨ Beautiful Vedic UI**
- **Warm Spiritual Theme**: Carefully crafted color palette
- **Responsive Design**: Perfect on all devices
- **Smooth Animations**: Engaging user experience
- **Accessibility**: WCAG compliant design

## 🚀 **Live Demo**

**Production URL**: [https://vedanta-byok.netlify.app](https://vedanta-byok.netlify.app)
**Admin Panel**: [https://vedanta-byok.netlify.app/admin](https://vedanta-byok.netlify.app/admin)

### **Demo Access**
- **Public Demo**: Available on landing page
- **Admin Access**: Contact admin for whitelist inclusion
- **Test API Keys**: Use your own keys for full functionality

## 🛠️ **Technology Stack**

### **Frontend**
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **React Router** for navigation

### **Backend Services**
- **Firebase Auth** for authentication
- **Firestore** for user management and whitelist
- **Multiple AI Providers** via user-provided API keys

### **Deployment**
- **Netlify** for hosting and CI/CD
- **Firebase** for authentication and database
- **Git** for version control

## 📋 **Prerequisites**

Before you begin, ensure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Git** for version control
- **Firebase Account** (free tier is sufficient)
- **Netlify Account** (free tier is sufficient)
- **AI Provider API Keys** (user-provided)

## 🔧 **Installation & Setup**

### **1. Clone the Repository**
```bash
git clone https://github.com/yourusername/vedanta-byok-platform.git
cd vedanta-byok-platform
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Configuration**
```bash
# Copy the environment template
cp .env.template .env

# Edit .env with your Firebase configuration
nano .env
```

**Required Environment Variables:**
```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# Optional
VITE_GA_TRACKING_ID=your_google_analytics_id
VITE_DEV_MODE=true
```

### **4. Firebase Setup**
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project
firebase init

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

### **5. Development Server**
```bash
npm run dev
```

Visit `http://localhost:5173` to see the application.

## 🏗️ **Building & Deployment**

### **Build for Production**
```bash
npm run build
```

### **Deploy to Netlify**

#### **Option 1: Git-based Deployment (Recommended)**
1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Netlify will auto-deploy on every push

#### **Option 2: Manual Deployment**
```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy to Netlify
netlify deploy --prod --dir=dist
```

### **Netlify Configuration**
The project includes `netlify.toml` with optimized settings:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/dist/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## 👥 **Admin Management**

### **Admin Access**
Admin privileges are granted to specific email addresses defined in the code:
- `dr.satish@greybrain.ai`
- `balwant@greybrain.ai`
- `satish@skids.health`

### **Admin Features**
- **User Whitelist Management**: Add/remove users
- **API Health Monitoring**: Real-time status of AI providers
- **Analytics Dashboard**: Usage statistics and insights
- **System Configuration**: Settings and preferences
- **Data Export/Import**: Backup and restore capabilities

### **Adding Admin Users**
```bash
# Via script (recommended)
node add-to-whitelist.mjs "newadmin@example.com"

# Via Admin Dashboard
# 1. Login as existing admin
# 2. Go to /admin
# 3. Navigate to "User Whitelist" tab
# 4. Add new user email
```

## 🔑 **BYOK Setup Guide**

### **Supported AI Providers**

#### **1. Google Gemini**
```
URL: https://aistudio.google.com
Key Format: AIza...
Models: gemini-2.0-flash-exp, gemini-1.5-pro, gemini-1.5-flash
```

#### **2. Groq**
```
URL: https://console.groq.com
Key Format: gsk_...
Models: llama-3.3-70b-versatile, llama-3.1-8b-instant
```

#### **3. OpenRouter**
```
URL: https://openrouter.ai
Key Format: sk-or-...
Models: Multiple providers accessible
```

#### **4. Ollama (Local)**
```
URL: https://ollama.ai
Key: Not required (local installation)
Models: llama3.2, phi3.5, gemma2, codellama
```

### **Setting Up API Keys**
1. **Sign In** to the platform
2. **Click Settings** ⚙️ in the top-right
3. **Choose Provider** from the dropdown
4. **Enter API Key** from your provider
5. **Select Model** for optimal performance
6. **Save Configuration**

## 📊 **Analytics & Monitoring**

### **Built-in Analytics**
- **User Sessions**: Track active users and engagement
- **Message Statistics**: Monitor conversation volumes
- **API Usage**: Provider performance and costs
- **Error Tracking**: System health monitoring

### **Google Analytics Integration**
```bash
# Add tracking ID to .env
VITE_GA_TRACKING_ID=G-XXXXXXXXXX
```

## 🔒 **Security Features**

### **Authentication**
- **Firebase Auth** with Google Sign-in
- **Whitelist-based Access** control
- **Admin-only Routes** protection

### **Data Privacy**
- **No API Keys Stored Server-side**
- **Local Storage Only** for user credentials
- **Firebase Rules** for data protection

### **Firebase Security Rules**
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Whitelist collection - admin only
    match /whitelist/{email} {
      allow read, write: if request.auth != null && 
        request.auth.token.email in [
          'dr.satish@greybrain.ai',
          'balwant@greybrain.ai', 
          'satish@skids.health'
        ];
    }
  }
}
```

## 🐛 **Troubleshooting**

### **Common Issues**

#### **Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### **Firebase Connection Issues**
```bash
# Check Firebase configuration
firebase projects:list
firebase use your-project-id
```

#### **API Key Problems**
- Verify key format matches provider requirements
- Check key permissions and quotas
- Test key validity in provider console

#### **Deployment Issues**
- Ensure all environment variables are set
- Check Netlify build logs for errors
- Verify Firebase rules are deployed

### **Debug Mode**
```bash
# Enable debug logging
VITE_DEV_MODE=true npm run dev
```

## 📈 **Performance Optimization**

### **Build Optimization**
- **Code Splitting**: Automatic route-based splitting
- **Tree Shaking**: Remove unused code
- **Asset Optimization**: Compressed images and fonts
- **Caching Strategy**: Long-term caching for static assets

### **Runtime Performance**
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo and useMemo optimizations
- **Virtual Scrolling**: Efficient large list rendering
- **Image Optimization**: WebP format with fallbacks

## 🤝 **Contributing**

### **Development Workflow**
1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** thoroughly
5. **Submit** a pull request

### **Code Standards**
- **TypeScript**: Strict type checking
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code style
- **Husky**: Pre-commit hooks

### **Testing**
```bash
# Run tests
npm test

# Run linting
npm run lint

# Type checking
npm run type-check
```

## 📞 **Support**

### **Documentation**
- **Setup Guide**: `COMPLETE_SETUP_GUIDE.md`
- **Firebase Guide**: `FIREBASE_DASHBOARD_GUIDE.md`
- **Whitelist Setup**: `WHITELIST_SETUP.md`

### **Contact**
- **Email**: support@vedantavision.com
- **GitHub Issues**: [Report bugs and feature requests](https://github.com/yourusername/vedanta-byok-platform/issues)
- **Discord**: [Join our community](https://discord.gg/vedanta-community)

## 📄 **License**

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 **Acknowledgments**

- **Vedantic Tradition**: Ancient wisdom that inspires this platform
- **Open Source Community**: Libraries and tools that make this possible
- **Contributors**: Everyone who helps improve this platform
- **Users**: The spiritual seekers who give this project meaning

---

**Om Shanti Shanti Shanti** 🕉️

*"सत्यमेव जयते" - Truth Alone Triumphs*

---

## 🔄 **Changelog**

### **v1.0.0** (Current)
- ✅ Complete BYOK architecture implementation
- ✅ Firebase authentication and whitelist system
- ✅ Multi-provider AI integration
- ✅ Admin dashboard with full management capabilities
- ✅ Beautiful Vedic-themed responsive UI
- ✅ Comprehensive documentation and deployment guides

### **Coming Soon**
- 🔄 Advanced analytics dashboard
- 🔄 Mobile app companion
- 🔄 Offline mode capabilities
- 🔄 Voice interaction features
- 🔄 Multiple language support
