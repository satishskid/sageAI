#!/usr/bin/env node

// Quick admin script to add user to whitelist
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5wJk-cQ414iZVc6vfdnsEqmtfhGaRbtg",
  authDomain: "vedantavision-da2e1.firebaseapp.com",
  projectId: "vedantavision-da2e1",
  storageBucket: "vedantavision-da2e1.firebasestorage.app",
  messagingSenderId: "442833818924",
  appId: "1:442833818924:web:91896d85b43e2675ba8889"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function addUserToWhitelist(email, addedBy = 'admin-script', notes = 'Added via admin script') {
  try {
    const whitelistUser = {
      email: email,
      addedBy: addedBy,
      addedAt: serverTimestamp(),
      status: 'active',
      notes: notes
    };
    
    await setDoc(doc(db, 'whitelist', email), whitelistUser);
    console.log(`✅ Successfully added ${email} to whitelist!`);
    console.log(`📧 Email: ${email}`);
    console.log(`👤 Added by: ${addedBy}`);
    console.log(`📝 Notes: ${notes}`);
  } catch (error) {
    console.error('❌ Error adding user to whitelist:', error);
  }
}

// Get email from command line argument
const email = process.argv[2];

if (!email) {
  console.log('Usage: node add-to-whitelist.mjs your-email@example.com');
  console.log('Example: node add-to-whitelist.mjs satish@skids.health');
  process.exit(1);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  console.error('❌ Invalid email format:', email);
  process.exit(1);
}

console.log(`🔥 Adding ${email} to Vedanta BYOK whitelist...`);
addUserToWhitelist(email).then(() => {
  console.log('🚀 Done! User can now access the platform.');
  process.exit(0);
});
