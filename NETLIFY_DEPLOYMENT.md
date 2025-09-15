# 🚀 Netlify Deployment Guide for Vedanta AI Platform

## 📋 Prerequisites Checklist

Before deploying to Netlify, ensure you have:

- ✅ **GitHub Repository**: Code pushed to `https://github.com/satishskid/sageAI.git`
- ✅ **Firebase Project**: `vedantavision-da2e1` with Firestore enabled
- ✅ **Environment Variables**: Ready to configure in Netlify
- ✅ **Admin Access**: Whitelisted email `satish@skids.health`

## 🌐 Step-by-Step Netlify Deployment

### Step 1: Connect Repository to Netlify

1. **Go to Netlify**: Visit [netlify.com](https://netlify.com) and sign in
2. **Create New Site**: Click "New site from Git"
3. **Choose GitHub**: Select GitHub as your Git provider
4. **Select Repository**: Find and select `satishskid/sageAI`

### Step 2: Configure Build Settings

When prompted, use these exact settings:

```
Base directory: (leave empty)
Build command: npm run build
Publish directory: dist
```

### Step 3: Environment Variables

In **Site settings → Environment variables**, add these **exact** variables:

```env
VITE_FIREBASE_API_KEY=AIzaSyC5wJk-cQ414iZVc6vfdnsEqmtfhGaRbtg
VITE_FIREBASE_AUTH_DOMAIN=vedantavision-da2e1.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vedantavision-da2e1
VITE_FIREBASE_STORAGE_BUCKET=vedantavision-da2e1.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=442833818924
VITE_FIREBASE_APP_ID=1:442833818924:web:91896d85b43e2675ba8889
```

### Step 4: Deploy Site

1. **Click "Deploy site"**
2. **Wait for build** (usually 2-3 minutes)
3. **Check deployment logs** for any errors

### Step 5: Configure Custom Domain (Optional)

1. **Go to Site settings → Domain management**
2. **Add custom domain**: e.g., `vedanta-ai.yourdomain.com`
3. **Update DNS settings** as instructed by Netlify

## 🛠️ Netlify Configuration Details

### netlify.toml Configuration

The project includes a `netlify.toml` file with optimized settings:

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
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## 🔧 Post-Deployment Steps

### 1. Test Authentication
- Visit your deployed site
- Try signing in with Google
- Verify whitelist system works

### 2. Test BYOK Functionality
- Add API keys in settings
- Test Gemini, Groq, and OpenRouter
- Verify chat functionality

### 3. Admin Dashboard Access
- Sign in as `satish@skids.health`
- Click the ⚡ admin button in header
- Verify all admin tabs work

### 4. Add Users to Whitelist
- Use admin dashboard or run locally:
```bash
node add-to-whitelist.mjs user@example.com false
```

## 🚨 Troubleshooting

### Build Fails

**Error**: "Build failed with exit code 1"
**Solution**: Check these common issues:
- Environment variables are set correctly
- No syntax errors in code
- Dependencies are properly installed

### Authentication Issues

**Error**: "Firebase auth not working"
**Solution**: 
- Verify Firebase environment variables
- Check Firebase console for auth configuration
- Ensure Google provider is enabled

### Whitelist Problems

**Error**: "User can't access after signing in"
**Solution**:
- Check if user is in Firestore `whitelist` collection
- Verify Firestore rules are deployed
- Use admin dashboard to add user

### BYOK Not Working

**Error**: "AI responses are empty or gibberish"
**Solution**:
- Ensure user has added valid API keys
- Check browser console for errors
- Verify API key format and permissions

## 📊 Monitoring & Analytics

### Netlify Analytics
- **Enable**: In Site settings → Analytics
- **Monitor**: Page views, performance, errors

### Firebase Console
- **Authentication**: Monitor sign-ins
- **Firestore**: Check whitelist collections
- **Usage**: Monitor API calls and storage

### Error Tracking
- Check Netlify deploy logs
- Monitor browser console errors
- Use Firebase console for auth errors

## 🔄 Continuous Deployment

Once set up, any push to the `main` branch will automatically:

1. **Trigger build** on Netlify
2. **Run tests** (if configured)
3. **Deploy updates** automatically
4. **Invalidate cache** for new content

## 🎯 Performance Optimization

### Automatic Optimizations
- **Asset compression** (Gzip/Brotli)
- **Image optimization** (WebP conversion)
- **CDN distribution** (Global edge locations)
- **Prerendering** (Static HTML generation)

### Manual Optimizations
- **Code splitting** (Already configured in Vite)
- **Lazy loading** (Implemented in components)
- **Bundle analysis** (Run `npm run build` locally)

## 🔐 Security Features

### Netlify Security Headers
- **X-Frame-Options**: Prevents clickjacking
- **X-XSS-Protection**: Prevents XSS attacks
- **X-Content-Type-Options**: Prevents MIME sniffing
- **Referrer-Policy**: Controls referrer information

### Firebase Security
- **Authentication**: Google Sign-in only
- **Firestore Rules**: Admin-only whitelist access
- **Client-side Storage**: API keys in localStorage only

## 📱 Mobile Optimization

The platform is fully responsive and optimized for:
- **iOS Safari** (iPhone/iPad)
- **Android Chrome** (All devices)
- **PWA Support** (Can be installed as app)

## 🌍 Global Deployment

Netlify automatically deploys to:
- **CDN Locations**: 100+ edge locations worldwide
- **Performance**: Sub-100ms response times globally
- **Reliability**: 99.9% uptime SLA

## 🎉 Success Indicators

Your deployment is successful when:

✅ **Build completes** without errors
✅ **Site loads** at your Netlify URL
✅ **Google Sign-in** works properly
✅ **Whitelist system** allows/blocks users correctly
✅ **BYOK functionality** accepts and uses API keys
✅ **Admin dashboard** is accessible to admins
✅ **Chat interface** responds with AI-generated content

## 📞 Support

If you encounter issues:

1. **Check logs**: Netlify deploy logs and browser console
2. **Verify config**: Environment variables and Firebase setup
3. **Test locally**: Ensure everything works in development
4. **Contact admin**: satish@skids.health for access issues

---

**🚀 Your Vedanta AI Platform is now live and ready to serve spiritual wisdom worldwide!**
