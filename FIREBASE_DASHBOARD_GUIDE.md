# 🔥 Firebase Dashboard Quick Access Guide

## 📊 Your Firebase Project URLs

Replace `YOUR_PROJECT_ID` with your actual Firebase project ID (e.g., `vedanta-byok-platform`)

### Core Firebase Services
- **🏠 Project Dashboard**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID`
- **👤 Authentication**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication`
- **📊 Firestore Database**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore`
- **⚙️ Project Settings**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/settings/general`
- **🔑 Service Accounts**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/settings/serviceaccounts`

### Whitelist Management URLs
- **📋 Whitelist Collection**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data/whitelist`
- **📝 Access Logs**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data/access_logs`
- **🔒 Security Rules**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/rules`
- **🔍 Firestore Indexes**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/indexes`

### Authentication Management
- **📋 User List**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/users`
- **⚙️ Sign-in Methods**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/providers`
- **📧 Templates**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/emails`
- **🌐 Authorized Domains**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/settings`

## 🚀 Quick Actions

### Add New User to Whitelist
1. Go to: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data/whitelist`
2. Click "Add document"
3. Document ID: `user-email@domain.com`
4. Add fields:
   ```
   email: "user-email@domain.com"
   addedBy: "your-admin-email@domain.com"  
   addedAt: (use server timestamp)
   status: "active"
   notes: "Reason for access"
   ```

### Remove User Access
1. Go to: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data/whitelist`
2. Find the user's document (their email)
3. Edit the document
4. Change `status` from "active" to "inactive"

### Check Access Logs
1. Go to: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data/access_logs`
2. View all login attempts and successful authentications
3. Sort by `loginTime` to see recent activity

### Manage Authentication Settings
1. Go to: `https://console.firebase.Google.com/project/YOUR_PROJECT_ID/authentication/providers`
2. Configure Google Sign-in settings
3. Add/remove authorized domains for your app

## 📱 Mobile Bookmarks

Save these URLs as bookmarks on your phone for quick access:

**Whitelist Management**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data/whitelist`

**User Authentication**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/users`

**Access Logs**: `https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data/access_logs`

## 🔧 Common Tasks

### Emergency: Disable All Access
1. Go to Authentication → Sign-in method
2. Disable Google provider temporarily
3. Re-enable when ready

### Bulk User Management
1. Export whitelist data from Firestore
2. Modify in spreadsheet
3. Import back using Firebase Admin SDK or scripts

### Monitor Platform Usage
1. Check access_logs collection regularly
2. Review authentication user list
3. Monitor for unusual login patterns

---

**💡 Pro Tip**: Replace `YOUR_PROJECT_ID` with your actual project ID and bookmark these URLs for instant access to your Vedanta BYOK platform management!
