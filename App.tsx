import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import { User, onAuthStateChange, signInWithGoogle, signOut } from './services/firebaseService';
import { getCurrentProvider, hasValidApiKey } from './services/aiService';
import { createVedantaChatSession, sendVedantaMessageStream, getVedantaIntroduction, VedantaChatSession } from './services/vedantaAIService';
import { type Message, Role } from './types';
import { COURSE_STRUCTURE, FREE_TIER_MESSAGE_LIMIT } from './constants';
import AnalyticsService from './services/analyticsService';

// Import existing Vedanta components
import Sidebar from './components/Sidebar';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import JourneyMapModal from './components/JourneyMapModal';
import AdminDashboard from './components/AdminDashboard';
import APIHealthIndicator from './components/APIHealthIndicator';
import LandingPage from './components/LandingPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import SupportPage from './components/SupportPage';

// Import BYOK components
import SettingsView from './components/SettingsView';
import ApiKeyWarning from './components/ApiKeyWarning';

import { MapIcon } from './components/Icons';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [chatSession, setChatSession] = useState<VedantaChatSession | null>(null);

  // Firebase authentication state
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authLoading, setAuthLoading] = useState<boolean>(true);

  // BYOK state
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [hasApiKeys, setHasApiKeys] = useState<boolean>(false);

  // Check for API keys on component mount
  useEffect(() => {
    setHasApiKeys(hasValidApiKey());
  }, []);

  // Firebase authentication effect
  useEffect(() => {
    const unsubscribe = onAuthStateChange((firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthenticated(!!firebaseUser);
      setAuthLoading(false);
      
      if (firebaseUser) {
        const analytics = AnalyticsService.getInstance();
        analytics.trackUserSession(firebaseUser.uid);
      }
    });

    return unsubscribe;
  }, []);

  // For backward compatibility, we'll treat all authenticated users as having basic access
  // You can extend this logic to check user roles/subscriptions from Firebase
  const isPaidSubscriber = false;

  // State for daily message limit for free users
  const [dailyMessageCount, setDailyMessageCount] = useState<number>(0);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);
  const [isJourneyMapOpen, setIsJourneyMapOpen] = useState(false);

  // Check if user is admin - update with your admin email addresses
  const isAdmin = user?.email === 'dr.satish@greybrain.ai' || 
                  user?.email === 'balwant@greybrain.ai' ||
                  user?.email === 'satish@skids.health' ||
                  user?.email === 'satish.rath@gmail.com' ||
                  user?.email === 'drpratichi@skids.health';

  const handleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error('Sign in failed:', error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      setMessages([]);
      setChatSession(null);
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const initializeChat = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log("🚀 Initializing Vedanta chat session...");

      if (!hasValidApiKey()) {
        console.log("❌ No valid API keys found");
        setMessages([{
          id: `warning-${Date.now()}`,
          role: Role.MODEL,
          text: `Welcome to Vedanta Vision: The Sage AI! 🙏

I'm Professor Arya, your guide to the profound wisdom of Vedic scriptures and Vedanta philosophy.

⚠️ **BYOK (Bring Your Own Key) Notice**: To interact with me, you'll need to configure your own AI API keys. This ensures your privacy and gives you full control over your AI interactions.

Please click the Settings button to configure your API keys, then return to begin your spiritual journey.

**What I offer:**
- Interactive lessons on Vedic texts (Upanishads, Bhagavad Gita, etc.)
- Personalized spiritual guidance  
- Structured learning paths from beginner to advanced
- Q&A sessions on philosophical concepts

*Your keys, your data, your spiritual journey.*`
        }]);
        setIsLoading(false);
        return;
      }

      const chat = createVedantaChatSession();
      console.log("✅ Vedanta chat session created:", getCurrentProvider());
      setChatSession(chat);

      const introduction = getVedantaIntroduction();
      console.log("📤 Getting Vedanta introduction...");

      const initialMessageId = `model-${Date.now()}`;
      setMessages([{ id: initialMessageId, role: Role.MODEL, text: introduction }]);

      console.log("✅ Chat initialization complete!");

    } catch (error) {
      console.error("❌ Initialization failed:", error);
      setMessages([{
        id: `error-${Date.now()}`,
        role: Role.MODEL,
        text: `Welcome to Vedanta Vision: The Sage AI! 🙏

I'm Professor Arya, your guide to the profound wisdom of Vedic scriptures and Vedanta philosophy.

**What I offer:**
- Interactive lessons on Vedic texts (Upanishads, Bhagavad Gita, etc.)
- Personalized spiritual guidance
- Structured learning paths from beginner to advanced
- Q&A sessions on philosophical concepts

**Note:** I'm currently experiencing some connectivity issues, but you can still explore the course structure in the sidebar and I'll be back online shortly!

How would you like to begin your spiritual journey today?`
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [hasApiKeys]);

  useEffect(() => {
    if (isAuthenticated && hasApiKeys) {
      initializeChat();
    }
  }, [isAuthenticated, hasApiKeys, initializeChat]);
  
  const handleSendMessage = useCallback(async (text: string, topicId?: string) => {
    if (!text.trim() || isLoading || !chatSession || !isAuthenticated) return;
    
    // Enforce free tier message limit for non-paid users
    if (!isPaidSubscriber && dailyMessageCount >= FREE_TIER_MESSAGE_LIMIT) {
      alert(`You've reached your daily limit of ${FREE_TIER_MESSAGE_LIMIT} messages. Please try again tomorrow, or consider upgrading for unlimited access!`);
      return;
    }

    if (topicId && !completedTopics.includes(topicId)) {
      setCompletedTopics(prev => [...prev, topicId]);
    }

    const userMessage: Message = { id: `user-${Date.now()}`, role: Role.USER, text };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    if (!isPaidSubscriber) {
      setDailyMessageCount(prev => prev + 1);
    }

    const modelMessageId = `model-${Date.now()}`;
    setMessages(prev => [...prev, { id: modelMessageId, role: Role.MODEL, text: '' }]);

    try {
      const stream = await sendVedantaMessageStream(chatSession, text, user?.uid);
      for await (const chunk of stream) {
         setMessages(prev => prev.map(m => m.id === modelMessageId ? { ...m, text: m.text + chunk } : m));
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => prev.map(m => m.id === modelMessageId ? { ...m, text: "I seem to have encountered an error. My apologies. Please try a different question or check your API configuration in Settings." } : m));
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, chatSession, completedTopics, isAuthenticated, isPaidSubscriber, dailyMessageCount, user]);
  
  const handleTopicSelect = (prompt: string, id: string, _isPremium: boolean) => {
    if (!isAuthenticated) {
      alert("Please log in to begin a lesson.");
      return;
    }
    if (!hasApiKeys) {
      alert("Please configure your API keys in Settings before starting a lesson.");
      return;
    }
    handleSendMessage(prompt, id);
  };

  // Calculate messages left for free users
  const messagesLeft = FREE_TIER_MESSAGE_LIMIT - dailyMessageCount;

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-vedic-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-vedic-accent"></div>
          <p className="mt-4 text-vedic-primary-text">Loading Vedanta Vision...</p>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsOfService />} />
      <Route path="/support" element={<SupportPage />} />

      {/* Admin route */}
      <Route path="/admin" element={
        isAdmin ? <AdminDashboard /> : <div>Access Denied</div>
      } />

      {/* Main app route */}
      <Route path="/*" element={
        <>
          {/* Show landing page for non-authenticated users */}
          {!isAuthenticated ? (
            <LandingPage onSignIn={handleSignIn} />
          ) : (
            /* Show main app for authenticated users */
            <div className="flex h-screen font-sans bg-vedic-bg text-vedic-primary-text">
              <Sidebar
                course={COURSE_STRUCTURE}
                onSelectTopic={handleTopicSelect}
                disabled={isLoading}
                completedTopics={completedTopics}
                isAuthenticated={isAuthenticated}
                isPaidSubscriber={isPaidSubscriber}
              />
              <main className="flex flex-col flex-1 h-screen">
                <header className="flex justify-between items-center p-4 bg-vedic-surface border-b border-vedic-accent/20">
                  <div className="flex items-center space-x-4">
                    <h1 className="text-xl font-bold text-vedic-primary">Vedanta Vision: The Sage AI</h1>
                    {!hasApiKeys && <ApiKeyWarning onOpenSettings={() => setShowSettings(true)} />}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="px-3 py-1 bg-vedic-accent text-white rounded-md hover:bg-vedic-accent/80 transition-colors text-sm"
                    >
                      Settings
                    </button>
                    <APIHealthIndicator />
                    <button
                      onClick={() => setIsJourneyMapOpen(true)}
                      className="p-2 rounded-lg bg-vedic-accent/20 hover:bg-vedic-accent/30 transition-colors"
                      title="Journey Map"
                    >
                      <MapIcon className="w-5 h-5 text-vedic-accent" />
                    </button>
                    {!isPaidSubscriber && (
                      <div className="text-sm text-vedic-secondary-text bg-vedic-surface px-3 py-1 rounded-full border border-vedic-border">
                        {messagesLeft} messages left today
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user?.displayName || 'User'}
                          className="w-8 h-8 rounded-full"
                          onError={(e) => {
                            // Fallback to a simple div with initials if image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-vedic-accent text-white flex items-center justify-center text-sm font-semibold">
                          {(user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U').toUpperCase()}
                        </div>
                      )}
                      <span className="text-sm text-vedic-secondary-text">
                        {user?.displayName || user?.email || 'User'}
                      </span>
                      {isAdmin && (
                        <button
                          onClick={() => {
                            window.location.href = '/admin';
                          }}
                          className="text-xs px-2 py-1 bg-vedic-accent/10 text-vedic-accent rounded border border-vedic-accent/20 hover:bg-vedic-accent/20 transition-colors"
                          title="Admin Panel"
                        >
                          ⚡
                        </button>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="text-sm text-vedic-secondary-text hover:text-vedic-primary-text"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </header>

                {showSettings ? (
                  <SettingsView 
                    isOpen={showSettings}
                    onClose={() => {
                      setShowSettings(false);
                      setHasApiKeys(hasValidApiKey());
                      if (hasValidApiKey() && !chatSession) {
                        initializeChat();
                      }
                    }}
                  />
                ) : (
                  <>
                    <ChatWindow 
                      messages={messages} 
                      isLoading={isLoading}
                      onNudgeClick={handleSendMessage}
                    />
                    <ChatInput 
                      onSendMessage={(text: string) => handleSendMessage(text)} 
                      isLoading={isLoading}
                      isAuthenticated={isAuthenticated}
                      isPaidSubscriber={isPaidSubscriber}
                      messagesLeft={messagesLeft}
                      onUpgradeClick={() => {
                        // Could implement upgrade functionality here
                        alert('Upgrade functionality would be implemented here');
                      }}
                    />
                  </>
                )}
              </main>

              {isJourneyMapOpen && (
                <JourneyMapModal
                  isOpen={isJourneyMapOpen}
                  course={COURSE_STRUCTURE}
                  completedTopics={completedTopics}
                  onClose={() => setIsJourneyMapOpen(false)}
                />
              )}
            </div>
          )}
        </>
      } />
    </Routes>
  );
};

export default App;