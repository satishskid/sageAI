import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  User, 
  onAuthStateChanged,
  signOut as firebaseSignOut 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  addDoc,
  serverTimestamp 
} from 'firebase/firestore';

// Export User type for use in other components
export type { User };

// Replace with your Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Whitelist interface
export interface WhitelistUser {
  email: string;
  addedBy: string;
  addedAt: any;
  status: 'active' | 'inactive';
  notes?: string;
}

// Whitelist Management Functions
export const checkUserWhitelist = async (email: string): Promise<boolean> => {
  try {
    // Validate email format first
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.warn('Invalid email format:', email);
      return false;
    }
    
    // Rate limiting check (simple in-memory cache)
    const now = Date.now();
    const cacheKey = `whitelist_check_${email}`;
    const lastCheck = (globalThis as any)[cacheKey];
    
    if (lastCheck && (now - lastCheck) < 5000) { // 5 second rate limit
      console.warn('Rate limited whitelist check for:', email);
      return false;
    }
    
    (globalThis as any)[cacheKey] = now;
    
    const userDoc = await getDoc(doc(db, 'whitelist', email));
    if (userDoc.exists()) {
      const userData = userDoc.data() as WhitelistUser;
      return userData.status === 'active';
    }
    return false;
  } catch (error) {
    console.error('Error checking whitelist:', error);
    return false;
  }
};

export const addUserToWhitelist = async (
  email: string, 
  addedBy: string, 
  notes?: string
): Promise<void> => {
  try {
    const whitelistUser: WhitelistUser = {
      email,
      addedBy,
      addedAt: serverTimestamp(),
      status: 'active',
      notes: notes || ''
    };
    
    await setDoc(doc(db, 'whitelist', email), whitelistUser);
    console.log(`User ${email} added to whitelist`);
  } catch (error) {
    console.error('Error adding user to whitelist:', error);
    throw error;
  }
};

export const removeUserFromWhitelist = async (email: string): Promise<void> => {
  try {
    await setDoc(doc(db, 'whitelist', email), { status: 'inactive' }, { merge: true });
    console.log(`User ${email} removed from whitelist`);
  } catch (error) {
    console.error('Error removing user from whitelist:', error);
    throw error;
  }
};

export const logUserAccess = async (email: string): Promise<void> => {
  try {
    await addDoc(collection(db, 'access_logs'), {
      email,
      loginTime: serverTimestamp(),
      action: 'login'
    });
  } catch (error) {
    console.error('Error logging user access:', error);
  }
};

export const signInWithGoogle = async (): Promise<User | null> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    
    // Check if user is whitelisted
    if (user?.email) {
      const isWhitelisted = await checkUserWhitelist(user.email);
      if (!isWhitelisted) {
        await firebaseSignOut(auth);
        throw new Error('Access denied. Your email is not in the approved list. Please contact the administrator.');
      }
      
      // Log the successful login
      await logUserAccess(user.email);
    }
    
    return user;
  } catch (error) {
    console.error('Google sign-in failed:', error);
    throw error;
  }
};

export const signOut = async (): Promise<void> => {
  try {
    await firebaseSignOut(auth);
  } catch (error) {
    console.error('Sign out failed:', error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
