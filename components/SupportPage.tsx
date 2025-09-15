import React from 'react';
import { Link } from 'react-router-dom';

const SupportPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-vedic-bg text-vedic-primary-text">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Link
              to="/"
              className="flex items-center text-vedic-accent hover:text-vedic-accent-dark transition-colors mr-4"
            >
              ← Back to Home
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-vedic-accent-dark mb-8">Support & Guidance</h1>
          
          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">🙏 Welcome to Our Support Sanctuary</h2>
              <p className="text-vedic-secondary-text mb-4">
                We're here to support your spiritual learning journey. Whether you have technical questions 
                or need guidance on using the platform, we're committed to helping you explore the profound 
                wisdom of Vedanta.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">📚 Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-vedic-accent pl-4">
                  <h3 className="text-lg font-medium text-vedic-accent-dark mb-2">How do I start learning?</h3>
                  <p className="text-vedic-secondary-text">
                    Simply sign in and explore the course modules in the left sidebar. Each topic is designed 
                    to guide you through authentic Vedantic teachings with Professor Arya.
                  </p>
                </div>

                <div className="border-l-4 border-vedic-accent pl-4">
                  <h3 className="text-lg font-medium text-vedic-accent-dark mb-2">What are the daily message limits?</h3>
                  <p className="text-vedic-secondary-text">
                    Currently, all users receive 10 daily messages. This encourages contemplative learning 
                    and helps us maintain service quality for everyone.
                  </p>
                </div>

                <div className="border-l-4 border-vedic-accent pl-4">
                  <h3 className="text-lg font-medium text-vedic-accent-dark mb-2">Are the teachings authentic?</h3>
                  <p className="text-vedic-secondary-text">
                    Yes, all content is based on authentic Sanskrit sources, traditional commentaries, and 
                    established Vedantic texts. Professor Arya draws from the Prasthana Trayi and classical works.
                  </p>
                </div>

                <div className="border-l-4 border-vedic-accent pl-4">
                  <h3 className="text-lg font-medium text-vedic-accent-dark mb-2">Is this a religious service?</h3>
                  <p className="text-vedic-secondary-text">
                    No, this is an academic and philosophical platform. We explore Vedantic wisdom for 
                    understanding and reflection, not to promote any particular religious practice.
                  </p>
                </div>

                <div className="border-l-4 border-vedic-accent pl-4">
                  <h3 className="text-lg font-medium text-vedic-accent-dark mb-2">How is my privacy protected?</h3>
                  <p className="text-vedic-secondary-text">
                    We prioritize your privacy. Your conversations are used only to improve the service, 
                    and we never share personal information. See our Privacy Policy for details.
                  </p>
                </div>

                <div className="border-l-4 border-vedic-accent pl-4">
                  <h3 className="text-lg font-medium text-vedic-accent-dark mb-2">Can I access this on mobile?</h3>
                  <p className="text-vedic-secondary-text">
                    Yes! The platform is designed mobile-first and works beautifully on all devices. 
                    Learn anywhere, anytime.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">🛠️ Technical Support</h2>
              <p className="text-vedic-secondary-text mb-4">
                If you encounter technical issues:
              </p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>Try refreshing your browser</li>
                <li>Clear your browser cache</li>
                <li>Ensure you have a stable internet connection</li>
                <li>Try signing out and signing back in</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">📧 Contact Us</h2>
              <p className="text-vedic-secondary-text mb-4">
                For additional support or questions not covered here:
              </p>
              
              <div className="bg-vedic-bg-alt p-6 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-vedic-accent-dark mb-2">General Support</h3>
                    <p className="text-vedic-secondary-text">balwant@greybrain.ai</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-vedic-accent-dark mb-2">Technical Issues</h3>
                    <p className="text-vedic-secondary-text">balwant@greybrain.ai</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-vedic-accent-dark mb-2">Content Questions</h3>
                    <p className="text-vedic-secondary-text">dr.satish@greybrain.ai</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-vedic-accent-dark mb-2">Developer</h3>
                    <p className="text-vedic-secondary-text">GreyBrain.ai</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">🕉️ Learning Guidance</h2>
              <p className="text-vedic-secondary-text mb-4">
                For the best learning experience:
              </p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>Approach each topic with an open and contemplative mind</li>
                <li>Take time to reflect on the teachings between sessions</li>
                <li>Start with foundational topics before exploring advanced concepts</li>
                <li>Remember that understanding deepens with time and practice</li>
                <li>Use the Journey Map to track your progress</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">🔄 Response Times</h2>
              <p className="text-vedic-secondary-text mb-4">
                We aim to respond to all inquiries within:
              </p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li><strong>Technical Issues:</strong> 24-48 hours</li>
                <li><strong>General Questions:</strong> 2-3 business days</li>
                <li><strong>Content Inquiries:</strong> 3-5 business days</li>
              </ul>
            </section>

            <div className="bg-vedic-accent/10 p-6 rounded-lg border border-vedic-accent/20">
              <p className="text-vedic-accent-dark font-medium text-center">
                "The teacher appears when the student is ready. We're honored to support your journey of discovery." 🙏
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;
