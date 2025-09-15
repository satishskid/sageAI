# 🚀 Deployment Guide

## 📋 **Pre-Deployment Checklist**

- ✅ Firebase project configured and rules deployed
- ✅ Environment variables properly set
- ✅ Build tested locally
- ✅ Admin access configured
- ✅ Whitelist users added
- ✅ Git repository ready

## 🔧 **Step-by-Step Deployment**

### **1. Final Build Test**
```bash
# Clean build
npm run build

# Test build locally
npm run preview
```

### **2. Environment Variables for Netlify**
When setting up on Netlify, add these environment variables:

```
VITE_FIREBASE_API_KEY=AIzaSyC5wJk-cQ414iZVc6vfdnsEqmtfhGaRbtg
VITE_FIREBASE_AUTH_DOMAIN=vedantavision-da2e1.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=vedantavision-da2e1
VITE_FIREBASE_STORAGE_BUCKET=vedantavision-da2e1.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=442833818924
VITE_FIREBASE_APP_ID=1:442833818924:web:91896d85b43e2675ba8889
VITE_DEV_MODE=false
```

### **3. Git Setup & Push**
```bash
# Add all files
git add .

# Commit with meaningful message
git commit -m "🚀 Production ready: BYOK Vedanta platform with admin dashboard"

# Push to main branch
git push origin main
```

### **4. Netlify Deployment Options**

#### **Option A: GitHub/GitLab Integration (Recommended)**
1. Push code to GitHub/GitLab
2. Go to Netlify Dashboard
3. Click "New site from Git"
4. Connect your repository
5. Set build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Add environment variables
7. Deploy!

#### **Option B: Direct Deploy**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from dist folder
netlify deploy --prod --dir=dist
```

## 🔐 **Post-Deployment Configuration**

### **1. Firebase Security Rules**
Ensure Firestore rules are deployed:
```bash
firebase deploy --only firestore:rules
```

### **2. Admin Access**
Test admin functionality:
1. Visit `/admin` route
2. Sign in with admin email
3. Verify all tabs work correctly

### **3. User Whitelist**
Add initial users via admin dashboard or script:
```bash
node add-to-whitelist.mjs "user@example.com"
```

### **4. API Health Check**
Visit admin dashboard and verify:
- API health monitoring works
- User analytics display correctly
- Whitelist management functions properly

## 📊 **Monitoring & Maintenance**

### **Analytics Setup**
1. Add Google Analytics ID to environment variables
2. Monitor user engagement through admin dashboard
3. Track API usage and costs

### **Regular Maintenance**
- Monitor Firebase usage quotas
- Update API keys as needed
- Review user whitelist regularly
- Check system performance metrics

## 🐛 **Common Deployment Issues**

### **Build Failures**
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json dist
npm install
npm run build
```

### **Environment Variable Issues**
- Ensure all VITE_ prefixed variables are set
- Check for typos in variable names
- Verify Firebase config is correct

### **Routing Issues**
- Netlify redirects should be automatic via netlify.toml
- Check that _redirects file is in public folder if needed

### **Firebase Permission Issues**
```bash
# Re-deploy Firebase rules
firebase deploy --only firestore:rules

# Check Firebase project settings
firebase projects:list
```

## 🎯 **Success Criteria**

Deployment is successful when:
- ✅ Landing page loads correctly
- ✅ Google Sign-in works
- ✅ Whitelisted users can access platform
- ✅ Settings page allows API key configuration
- ✅ Chat functionality works with user's API keys
- ✅ Admin dashboard accessible to authorized users
- ✅ All admin tabs function properly
- ✅ User whitelist management works
- ✅ No console errors in production

## 🔗 **Important URLs**

After deployment, verify these URLs work:
- `https://your-site.netlify.app/` - Landing page
- `https://your-site.netlify.app/admin` - Admin dashboard
- `https://your-site.netlify.app/privacy` - Privacy policy
- `https://your-site.netlify.app/terms` - Terms of service
- `https://your-site.netlify.app/support` - Support page

## 📞 **Support**

If you encounter issues:
1. Check Netlify build logs
2. Review Firebase console for errors
3. Test locally with production build
4. Check environment variables are correctly set
5. Verify Firebase rules are deployed

---

**Ready to launch your BYOK Vedanta platform! 🙏✨**
