import React, { useState } from 'react';

interface LandingPageProps {
  onSignIn: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSignIn }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-vedic-bg via-vedic-bg-alt to-vedic-surface">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm border-b border-vedic-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-vedic-accent">🕉️ Vedanta Vision</div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-vedic-primary-text hover:text-vedic-accent transition-colors">Features</a>
              <a href="#faculty" className="text-vedic-primary-text hover:text-vedic-accent transition-colors">Faculty</a>
              <a href="#spiritual-health" className="text-vedic-primary-text hover:text-vedic-accent transition-colors">Spiritual Health</a>
              <a href="#about" className="text-vedic-primary-text hover:text-vedic-accent transition-colors">About</a>
              <button 
                onClick={onSignIn}
                className="text-vedic-accent hover:text-vedic-accent-dark transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={onSignIn}
                className="bg-vedic-accent text-white px-6 py-2 rounded-lg hover:bg-vedic-accent-dark transition-colors"
              >
                Start Learning
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-vedic-primary-text hover:text-vedic-accent"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-vedic-border">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#features" className="block px-3 py-2 text-vedic-primary-text hover:text-vedic-accent">Features</a>
                <a href="#faculty" className="block px-3 py-2 text-vedic-primary-text hover:text-vedic-accent">Faculty</a>
                <a href="#spiritual-health" className="block px-3 py-2 text-vedic-primary-text hover:text-vedic-accent">Spiritual Health</a>
                <a href="#about" className="block px-3 py-2 text-vedic-primary-text hover:text-vedic-accent">About</a>
                <div className="flex flex-col space-y-2 px-3 py-2">
                  <button 
                    onClick={onSignIn}
                    className="text-left text-vedic-accent hover:text-vedic-accent-dark"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={onSignIn}
                    className="bg-vedic-accent text-white px-4 py-2 rounded-lg hover:bg-vedic-accent-dark text-center"
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-vedic-accent-dark mb-6">
                Master Ancient Wisdom with
                <span className="block text-vedic-accent">AI-Powered Vedanta</span>
              </h1>
              <p className="text-xl sm:text-2xl text-vedic-secondary-text mb-8">
                Explore the profound teachings of Vedanta with Professor Arya - your contemplative AI guide.
                Experience authentic spiritual wisdom adapted for modern understanding.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
                <button 
                  onClick={onSignIn}
                  className="bg-vedic-accent text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-vedic-accent-dark transition-all transform hover:scale-105 shadow-lg w-full sm:w-auto"
                >
                  🚀 Start Your Journey Free
                </button>
                <button 
                  onClick={onSignIn}
                  className="border-2 border-vedic-accent text-vedic-accent px-8 py-4 rounded-lg text-lg font-semibold hover:bg-vedic-accent hover:text-white transition-all w-full sm:w-auto"
                >
                  📚 Continue Learning
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-sm text-vedic-secondary-text">
                <div className="flex items-center gap-2">
                  <span className="text-vedic-accent">•</span>
                  <span>Authentic Sanskrit Sources</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-vedic-accent">•</span>
                  <span>Contemplative Learning</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-vedic-accent">•</span>
                  <span>Timeless Wisdom</span>
                </div>
              </div>
            </div>

            {/* Right side - Vedic Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                {/* Main Image Container */}
                <div className="w-80 h-80 lg:w-96 lg:h-96 relative overflow-hidden rounded-full bg-gradient-to-br from-vedic-accent/20 to-vedic-surface shadow-2xl">
                  {/* Sacred Geometry Pattern */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-64 h-64 text-vedic-accent/30" viewBox="0 0 200 200" fill="currentColor">
                      {/* Sri Yantra inspired pattern */}
                      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      <circle cx="100" cy="100" r="30" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                      
                      {/* Lotus petals */}
                      <g transform="translate(100,100)">
                        {Array.from({length: 8}).map((_, i) => (
                          <g key={i} transform={`rotate(${i * 45})`}>
                            <path d="M0,-80 Q10,-70 0,-60 Q-10,-70 0,-80" fill="currentColor" opacity="0.3"/>
                          </g>
                        ))}
                      </g>
                      
                      {/* Inner triangles */}
                      <g transform="translate(100,100)">
                        <polygon points="0,-40 35,20 -35,20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                        <polygon points="0,40 -35,-20 35,-20" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
                      </g>
                      
                      {/* Central Om */}
                      <text x="100" y="110" textAnchor="middle" className="text-4xl font-bold text-vedic-accent">ॐ</text>
                    </svg>
                  </div>
                  
                  {/* Floating Sanskrit Text */}
                  <div className="absolute top-4 left-4 text-vedic-accent/40 text-sm font-light transform -rotate-12">
                    सत्यम्
                  </div>
                  <div className="absolute top-8 right-8 text-vedic-accent/40 text-sm font-light transform rotate-12">
                    ज्ञानम्
                  </div>
                  <div className="absolute bottom-8 left-8 text-vedic-accent/40 text-sm font-light transform rotate-12">
                    आनन्दम्
                  </div>
                </div>
                
                {/* Subtle glow effect */}
                <div className="absolute inset-0 rounded-full bg-vedic-accent/5 blur-xl scale-110"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-vedic-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-vedic-accent/5 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-vedic-accent-dark mb-4">
              Why Choose Vedanta Vision?
            </h2>
            <p className="text-xl text-vedic-secondary-text max-w-2xl mx-auto">
              Experience the perfect blend of ancient wisdom and modern AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-vedic-bg p-8 rounded-xl border border-vedic-border hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🧘‍♂️</div>
              <h3 className="text-xl font-semibold text-vedic-accent-dark mb-3">Personal AI Guru</h3>
              <p className="text-vedic-secondary-text">
                Professor Arya provides personalized guidance based on authentic Vedantic texts and your learning pace.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-vedic-bg p-8 rounded-xl border border-vedic-border hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">📜</div>
              <h3 className="text-xl font-semibold text-vedic-accent-dark mb-3">Authentic Sources</h3>
              <p className="text-vedic-secondary-text">
                Explore authentic Vedantic texts and commentaries by great masters like Adi Shankaracharya.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-vedic-bg p-8 rounded-xl border border-vedic-border hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold text-vedic-accent-dark mb-3">Structured Learning</h3>
              <p className="text-vedic-secondary-text">
                Progressive curriculum from basic concepts to advanced philosophy, tailored to your spiritual journey.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-vedic-bg p-8 rounded-xl border border-vedic-border hover:shadow-lg transition-all">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold text-vedic-accent-dark mb-3">Interactive Dialogue</h3>
              <p className="text-vedic-secondary-text">
                Engage in meaningful conversations, ask questions, and receive detailed explanations in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Faculty Section */}
      <section id="faculty" className="py-16 lg:py-24 bg-vedic-bg-alt">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-vedic-accent-dark mb-4">
              Distinguished Faculty
            </h2>
            <p className="text-lg text-vedic-secondary-text max-w-2xl mx-auto">
              Guided by renowned scientists who bridge the wisdom of ancient traditions with modern understanding
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Dr. Prathosh A P */}
            <div className="text-center group">
              <div className="relative mx-auto mb-6 w-40 h-40">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-vedic-accent/20 to-vedic-surface border-4 border-vedic-accent/20 overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img 
                    src="/images/faculty/prathosh.jpg" 
                    alt="Prof. Prathosh A P" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="w-full h-full bg-vedic-accent/10 flex items-center justify-center hidden">
                    <span className="text-4xl text-vedic-accent">👨‍🔬</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-vedic-accent/5 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-vedic-accent-dark mb-2">Prof. Prathosh A P</h3>
              <p className="text-vedic-secondary-text text-sm mb-4">PhD, Computer Sciences, AI | Scientist, IISc</p>
              <p className="text-vedic-secondary-text text-sm leading-relaxed">
                Distinguished researcher bridging computational sciences with contemplative wisdom traditions.
              </p>
            </div>

            {/* Dr. Satish Prasad Rath */}
            <div className="text-center group">
              <div className="relative mx-auto mb-6 w-40 h-40">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-vedic-accent/20 to-vedic-surface border-4 border-vedic-accent/20 overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <img 
                    src="/images/faculty/satish.jpg" 
                    alt="Dr. Satish Prasad Rath" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                  <div className="w-full h-full bg-vedic-accent/10 flex items-center justify-center hidden">
                    <span className="text-4xl text-vedic-accent">👨‍⚕️</span>
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-vedic-accent/5 blur-xl scale-110 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h3 className="text-xl font-semibold text-vedic-accent-dark mb-2">Dr. Satish Prasad Rath</h3>
              <p className="text-vedic-secondary-text text-sm mb-4">MD, Physician, Scientist, Entrepreneur</p>
              <p className="text-vedic-secondary-text text-sm leading-relaxed">
                Pioneering physician-scientist integrating medical expertise with ancient healing wisdom.
              </p>
            </div>
          </div>

          {/* Coming Soon Note */}
          <div className="text-center mt-12">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 rounded-full border border-vedic-border shadow-sm">
              <span className="text-vedic-accent">🎙️</span>
              <span className="text-sm text-vedic-secondary-text font-medium">Podcasts Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* Science of Spiritual Health Section */}
      <section id="spiritual-health" className="py-16 lg:py-24 bg-gradient-to-br from-white via-vedic-bg/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-vedic-accent-dark mb-6">
              Science of Spiritual Health
            </h2>
            <p className="text-xl text-vedic-secondary-text max-w-4xl mx-auto leading-relaxed">
              An Academic Exploration for Healthcare Professionals
            </p>
          </div>

          {/* Academic Introduction */}
          <div className="max-w-6xl mx-auto mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 lg:p-12 shadow-lg border border-vedic-border/20">
              <h3 className="text-2xl lg:text-3xl font-semibold text-vedic-accent-dark mb-6 text-center">
                Defining Spiritual Health in Modern Healthcare
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-8">
                <div>
                  <h4 className="text-xl font-semibold text-vedic-accent-dark mb-4">WHO's Recognition</h4>
                  <p className="text-vedic-secondary-text leading-relaxed mb-4">
                    The World Health Organization acknowledges spiritual well-being as a fundamental component of health, 
                    yet academic frameworks for understanding and measuring spiritual health remain underdeveloped.
                  </p>
                  <p className="text-vedic-secondary-text leading-relaxed">
                    This platform serves as an academic exercise to explore how ancient wisdom traditions, 
                    particularly Vedanta, can inform evidence-based approaches to spiritual health.
                  </p>
                </div>
                
                <div className="bg-vedic-accent/5 rounded-xl p-6 border border-vedic-accent/10">
                  <h4 className="text-lg font-semibold text-vedic-accent-dark mb-4">Key Research Areas</h4>
                  <ul className="space-y-3 text-vedic-secondary-text">
                    <li className="flex items-start gap-3">
                      <span className="text-vedic-accent mt-1">•</span>
                      <span>Contemplative practices and neuroplasticity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-vedic-accent mt-1">•</span>
                      <span>Mind-body integration in healing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-vedic-accent mt-1">•</span>
                      <span>Philosophical frameworks for patient care</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-vedic-accent mt-1">•</span>
                      <span>Integrative approaches to wellness</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Faculty Expertise */}
          <div className="max-w-6xl mx-auto mb-16">
            <h3 className="text-2xl lg:text-3xl font-semibold text-vedic-accent-dark mb-8 text-center">
              Bridging Ancient Wisdom with Modern Medicine
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-vedic-border/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-vedic-accent/10 flex items-center justify-center">
                    <span className="text-2xl">👨‍⚕️</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-vedic-accent-dark">Clinical Perspective</h4>
                    <p className="text-vedic-secondary-text">Dr. Satish Prasad Rath, MD</p>
                  </div>
                </div>
                <p className="text-vedic-secondary-text leading-relaxed">
                  Exploring how contemplative practices from Vedantic traditions can complement conventional 
                  medical treatments, with focus on holistic patient care and physician well-being.
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-vedic-border/20">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-vedic-accent/10 flex items-center justify-center">
                    <span className="text-2xl">👨‍🔬</span>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-vedic-accent-dark">Research Framework</h4>
                    <p className="text-vedic-secondary-text">Prof. Prathosh A P, PhD</p>
                  </div>
                </div>
                <p className="text-vedic-secondary-text leading-relaxed">
                  Developing computational models and AI-driven approaches to understand and measure 
                  the impact of spiritual practices on health outcomes and cognitive well-being.
                </p>
              </div>
            </div>
          </div>

          {/* Academic Disclaimer */}
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-vedic-accent/5 rounded-xl p-8 border border-vedic-accent/20">
              <p className="text-vedic-secondary-text leading-relaxed">
                <span className="font-semibold">Academic Exercise:</span> This platform represents an ongoing academic exploration 
                of spiritual health concepts. All interactions with Professor Arya should be considered educational content 
                for healthcare professionals interested in integrative approaches to patient care and personal well-being.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Announcements Carousel Section */}
      <section className="py-16 bg-vedic-bg-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-vedic-accent-dark mb-4">
              Academic Programs & Resources
            </h2>
            <p className="text-lg text-vedic-secondary-text max-w-2xl mx-auto">
              Upcoming seminars, research publications, and educational content for healthcare professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Seminar Announcement */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-vedic-border hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎓</span>
                <span className="bg-vedic-accent/10 text-vedic-accent px-3 py-1 rounded-full text-sm font-medium">Upcoming</span>
              </div>
              <h3 className="text-xl font-semibold text-vedic-accent-dark mb-3">
                Contemplative Medicine Seminar
              </h3>
              <p className="text-vedic-secondary-text mb-4">
                A deep dive into integrating contemplative practices with clinical care. 
                Exploring evidence-based approaches to spiritual health in healthcare settings.
              </p>
              <div className="text-sm text-vedic-secondary-text">
                <p className="mb-2"><span className="font-medium">Date:</span> Coming Soon</p>
                <p><span className="font-medium">Format:</span> Academic Webinar</p>
              </div>
            </div>

            {/* Research Publication */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-vedic-border hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">📚</span>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">Published</span>
              </div>
              <h3 className="text-xl font-semibold text-vedic-accent-dark mb-3">
                AI-Guided Contemplative Learning
              </h3>
              <p className="text-vedic-secondary-text mb-4">
                Research paper exploring the efficacy of AI-assisted contemplative education 
                in healthcare professional development and patient care enhancement.
              </p>
              <div className="text-sm text-vedic-secondary-text">
                <p className="mb-2"><span className="font-medium">Journal:</span> Digital Health & Wellness</p>
                <p><span className="font-medium">Authors:</span> Rath, S.P. et al.</p>
              </div>
            </div>

            {/* Podcast Series */}
            <div className="bg-white rounded-xl p-8 shadow-lg border border-vedic-border hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">🎙️</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">In Development</span>
              </div>
              <h3 className="text-xl font-semibold text-vedic-accent-dark mb-3">
                Wisdom & Wellness Podcast
              </h3>
              <p className="text-vedic-secondary-text mb-4">
                Monthly discussions on integrating ancient wisdom with modern healthcare. 
                Featuring interviews with leading researchers and practitioners.
              </p>
              <div className="text-sm text-vedic-secondary-text">
                <p className="mb-2"><span className="font-medium">Launch:</span> Q2 2025</p>
                <p><span className="font-medium">Hosts:</span> Dr. Rath & Prof. Prathosh</p>
              </div>
            </div>
          </div>

          {/* Call to Action for Professionals */}
          <div className="text-center mt-12">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-vedic-accent/20 max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-vedic-accent-dark mb-4">
                Join the Academic Community
              </h3>
              <p className="text-vedic-secondary-text mb-6">
                Connect with fellow healthcare professionals exploring the intersection of 
                spiritual wisdom and modern medicine.
              </p>
              <button 
                onClick={onSignIn}
                className="bg-vedic-accent text-white px-8 py-3 rounded-lg font-semibold hover:bg-vedic-accent-dark transition-all"
              >
                Access Academic Platform
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-vedic-accent-dark mb-8">
            Vedanta Vision
          </h2>
          <p className="text-lg text-vedic-secondary-text leading-relaxed mb-8">
            A digital sanctuary bridging ancient Vedantic wisdom with modern understanding. 
            Each conversation deepens your exploration of timeless truths that have guided seekers for millennia.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-vedic-accent text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">
            Begin Your Journey Within
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Your exploration of Vedantic truth awaits.
          </p>

          <button 
            onClick={onSignIn}
            className="bg-white text-vedic-accent px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
          >
            🕉️ Enter the Sanctuary
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-vedic-accent-dark text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold mb-4">🕉️ Vedanta Vision</div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Created with reverence for the timeless teachings of Vedanta.
            </p>
          </div>

          <div className="border-t border-gray-600 pt-8 text-center text-gray-300">
            <p>&copy; 2025 Vedanta Vision. All rights reserved.</p>
            <p className="text-sm mt-2 text-gray-400">
              Made with 🙏 by <span className="text-vedic-accent">GreyBrain.ai</span> for sincere seekers of wisdom
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
