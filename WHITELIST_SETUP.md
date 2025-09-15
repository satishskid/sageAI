# 🔐 Vedanta BYOK - Invite-Only Setup Guide

## Overview
Your Vedanta BYOK platform is now configured as an **invite-only system**. Users can only sign in if their email address is in your Firebase whitelist.

## 🔗 Important Firebase URLs
- **Main Firebase Console**: https://console.firebase.google.com/
- **Your Project Dashboard**: https://console.firebase.google.com/project/YOUR_PROJECT_ID
- **Authentication Settings**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication
- **Firestore Database**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore
- **Whitelist Collection**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data/whitelist
- **Access Logs Collection**: https://console.firebase.google.com/project/YOUR_PROJECT_ID/firestore/data/access_logs

*(Replace `YOUR_PROJECT_ID` with your actual Firebase project ID)*

## 🚀 Quick Setup Steps

### 1. Enable Firebase Firestore

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project** (vedanta-byok-platform)
3. **Navigate to Firestore Database**:
   - Click "Firestore Database" in the left sidebar
   - Click "Create database"
   - Choose "Start in test mode" for now
   - Select your preferred region
   - Click "Done"

### 2. Set Firestore Security Rules

Replace the default rules with these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Whitelist collection - only authenticated users can read their own status
    match /whitelist/{email} {
      allow read: if request.auth != null && request.auth.token.email == email;
      allow write: if false; // Only admin can write via server/console
    }
    
    // Access logs - only admin can read/write
    match /access_logs/{document} {
      allow read, write: if false; // Only admin via console
    }
    
    // Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### 3. Add Your First Admin User

Use the Firebase Console to manually add your admin email:

1. **Go to Firestore Database**
2. **Create Collection**: Click "Start collection"
   - Collection ID: `whitelist`
   - Click "Next"
3. **Add Document**:
   - Document ID: `your-admin-email@domain.com` (use your actual email)
   - Fields:
     ```
     email: "your-admin-email@domain.com"
     addedBy: "system"
     addedAt: (current timestamp)
     status: "active"
     notes: "Admin user"
     ```
4. **Click "Save"**

## 📧 Managing Users

### Method 1: Using the Admin Interface (Recommended)

1. **Sign in to your platform** with your admin email
2. **Navigate to the admin whitelist manager** (you may need to add this to your app)
3. **Add users one by one** or **bulk add multiple users**

### Method 2: Firebase Console (Manual)

For each user you want to invite:

1. **Go to Firestore Database**
2. **Navigate to the `whitelist` collection**
3. **Add new document**:
   - Document ID: `user-email@domain.com`
   - Fields:
     ```
     email: "user-email@domain.com"
     addedBy: "your-admin-email@domain.com"
     addedAt: (current timestamp)
     status: "active"
     notes: "Invited user - [reason]"
     ```

### Method 3: Programmatic (Advanced)

Use the admin utility functions in your console:

```javascript
import { WhitelistAdmin } from './utils/whitelistAdmin';

const admin = new WhitelistAdmin('your-admin@domain.com');

// Add single user
await admin.addUser('teacher@school.edu', 'Faculty member');

// Add multiple users
await admin.bulkAddUsers([
  'student1@university.edu',
  'student2@university.edu',
  'researcher@institute.org'
], 'Educational access');
```

## 🎯 User Experience Flow

### For New Users (Not Whitelisted):
1. User clicks "Sign In with Google"
2. Google authentication completes
3. System checks whitelist
4. **Access denied message** appears
5. User is automatically signed out
6. Error message: "Access denied. Your email is not in the approved list. Please contact the administrator."

### For Whitelisted Users:
1. User clicks "Sign In with Google" 
2. Google authentication completes
3. System checks whitelist ✅
4. User is signed in successfully
5. Access is logged to `access_logs` collection

## 📊 Monitoring Access

### View Access Logs
In Firebase Console → Firestore → `access_logs` collection

Each log entry contains:
- `email`: User's email address
- `loginTime`: When they signed in
- `action`: "login"

### Check User Status
```javascript
// In browser console (when signed in as admin)
import { checkUserWhitelist } from './services/firebaseService';
const isWhitelisted = await checkUserWhitelist('user@example.com');
console.log('User whitelisted:', isWhitelisted);
```

## 🔧 Configuration Options

### Disable Whitelist (for testing)
To temporarily disable the whitelist system, modify `firebaseService.ts`:

```javascript
// Comment out the whitelist check
export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // TEMPORARILY DISABLED: Check if user is whitelisted
    // if (user?.email) {
    //   const isWhitelisted = await checkUserWhitelist(user.email);
    //   if (!isWhitelisted) {
    //     await firebaseSignOut(auth);
    //     throw new Error('Access denied...');
    //   }
    //   await logUserAccess(user.email);
    // }
    
    return user;
  } catch (error) {
    console.error('Google sign-in failed:', error);
    throw error;
  }
};
```

## 📝 Sample Email Template

When inviting users, you can send them this email:

---

**Subject**: Invitation to Vedanta BYOK AI Platform

Hi [Name],

You've been invited to access the Vedanta BYOK (Bring Your Own Key) AI Platform - an advanced Vedantic wisdom and AI learning system.

**Your Access:**
- Email: [their-email@domain.com] ✅ (Whitelisted)
- Platform: https://your-vedanta-platform.com

**Getting Started:**
1. Visit the platform URL above
2. Click "Sign In with Google"
3. Use the email address: [their-email@domain.com]
4. Set up your AI API keys in Settings (you'll need your own Gemini/OpenAI/Groq keys)

**What you'll get:**
- Access to Vedantic AI conversations
- Jagannatha Tatva wisdom modules  
- BYOK architecture (complete data privacy)
- Advanced spiritual learning tools

Questions? Reply to this email.

Welcome to your Vedantic AI journey! 🕉️

---

## 🆘 Troubleshooting

### User Can't Sign In
1. **Check whitelist**: Verify their email is in the `whitelist` collection
2. **Check status**: Ensure `status: "active"` (not "inactive")
3. **Check email match**: Email in whitelist must exactly match their Google account email

### Firestore Permission Errors
1. **Check Firestore rules**: Ensure rules are set correctly
2. **Check authentication**: User must be signed in to read their whitelist status

### Need to Bulk Add Users?
Use the admin interface or create a script with the `WhitelistAdmin` utility class.

---

**Your platform is now secure and invite-only! 🔐**
