# 🕉️ Vedanta Vision: The Sage AI

> **AI-powered Vedanta learning platform with Professor Arya - Complete with Pro features, payment integration, and admin dashboard**

An intelligent platform for learning Vedanta, Sanskrit, and ancient Indian philosophy through interactive conversations with Professor Arya, your personal AI guru. Built with modern web technologies and ready for production deployment.

[![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge&logo=github)](https://github.com/satishskid/vedanta-vision-ai)
[![Netlify](https://img.shields.io/badge/Deploy-Netlify-00C7B7?style=for-the-badge&logo=netlify)](https://app.netlify.com/start/deploy?repository=https://github.com/satishskid/vedanta-vision-ai)

## ✨ Features

### 🤖 **AI-Powered Learning**
- **Professor Arya**: Your personal AI guru trained in Vedantic wisdom
- **Multi-API Support**: Gemini, Groq, and OpenRouter with intelligent fallbacks
- **Contextual Conversations**: Maintains learning context across sessions
- **Sanskrit Integration**: Authentic Sanskrit texts with translations

### 💳 **Payment & Subscription System**
- **Multi-Currency Support**: USD and INR pricing with automatic conversion
- **Stripe Integration**: International payment processing
- **Razorpay Integration**: Optimized for Indian users
- **Flexible Plans**: Free, Pro (₹1,499/month), Enterprise (₹3,999/month)

### ⭐ **Pro Features System**
- **Feature Gating**: Intelligent access control based on subscription
- **Unlimited Messages**: No daily limits for Pro subscribers
- **Advanced Content**: Premium courses and Sanskrit dictionary
- **Priority API Access**: Faster response times
- **Learning Analytics**: Progress tracking and insights

### 🛡️ **Admin Dashboard**
- **API Management**: Configure and monitor multiple AI providers
- **Payment Plans**: Create and manage subscription tiers
- **Pro Features Control**: Enable/disable features and modules
- **Real-time Analytics**: User engagement and system metrics
- **Payment Simulation**: Test subscription workflows

### 📱 **Mobile-First Design**
- **Responsive UI**: Optimized for mobile devices (primary user base)
- **PWA Support**: Install as mobile app
- **Touch-Friendly**: Designed for touch interactions
- **Offline Capability**: Core features work offline

### 🌐 **SEO & Performance**
- **SEO Optimized**: Structured data, meta tags, sitemap
- **Fast Loading**: Optimized bundle size and lazy loading
- **Accessibility**: WCAG compliant design
- **Analytics Ready**: Google Analytics and custom tracking

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Clerk account for authentication
- At least one AI API key (Gemini/Groq/OpenRouter)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/satishskid/vedanta-vision-ai.git
   cd vedanta-vision-ai/vedanta-vision_-the-sage-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   ```
   http://localhost:5731
   ```

## 🔧 Configuration

### Required Environment Variables

```env
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here

# AI API Keys (at least one required)
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_GROQ_API_KEY=your_groq_api_key_here
VITE_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## 💰 Pricing Strategy

### 🇮🇳 **India-Optimized Pricing**
- **Free**: ₹0/month - 10 messages/day
- **Pro**: ₹1,499/month (~$18 USD) - Unlimited access
- **Enterprise**: ₹3,999/month (~$48 USD) - Advanced features

### 🇺🇸 **International Pricing**
- **Free**: $0/month - 10 messages/day  
- **Pro**: $19.99/month - Unlimited access
- **Enterprise**: $49.99/month - Advanced features

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom Vedic theme
- **Authentication**: Clerk with user management
- **AI Integration**: Multiple providers with fallback system
- **State Management**: React hooks + localStorage
- **Deployment**: Netlify with optimized build

## 🔌 Payment Integration

### Pro Features Activation
```typescript
// Automatic activation on successful payment
const proService = ProFeaturesService.getInstance();

// Activate Pro plan
proService.activateProPlan();

// Activate Enterprise plan  
proService.activateEnterprisePlan();

// Deactivate on cancellation
proService.deactivateProFeatures();
```

## 🎯 Deployment

### Netlify Deployment (Recommended)

1. **Connect Repository**
   - Fork this repository
   - Connect to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`

2. **Environment Variables**
   - Add all required environment variables in Netlify dashboard
   - Ensure API keys are properly configured

## 🔐 Security Features

- **API Key Protection**: Environment variables only
- **Authentication**: Clerk-based secure auth
- **Payment Security**: Webhook signature verification
- **XSS Protection**: Content Security Policy headers
- **HTTPS Only**: Secure connections enforced

## �� Analytics & Monitoring

### Built-in Analytics
- User session tracking
- Message usage analytics  
- API performance monitoring
- Payment conversion tracking

### Admin Dashboard Metrics
- Active users count
- Daily message volume
- API health status
- Revenue analytics

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Vedantic Texts**: Based on authentic Sanskrit sources
- **AI Providers**: Gemini, Groq, and OpenRouter for AI capabilities
- **Community**: Open source libraries and contributors

---

**Made with 🙏 for spiritual seekers worldwide**

*Bridging ancient wisdom with modern technology*
