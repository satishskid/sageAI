import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-vedic-accent-dark mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-vedic-secondary-text mb-6">
              <strong>Effective Date:</strong> January 1, 2024<br />
              <strong>Last Updated:</strong> January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">1. Acceptance of Terms</h2>
              <p className="text-vedic-secondary-text mb-4">
                By accessing and using Vedanta Vision (the "Service"), developed by GreyBrain.ai, you accept and agree 
                to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">2. Description of Service</h2>
              <p className="text-vedic-secondary-text mb-4">
                Vedanta Vision is a digital platform for spiritual learning that provides:
              </p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>AI-powered conversations with Professor Arya about Vedantic philosophy</li>
                <li>Structured courses on ancient wisdom traditions</li>
                <li>Access to authentic Sanskrit sources and commentaries</li>
                <li>Contemplative learning experiences</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">3. Academic and Educational Purpose</h2>
              <p className="text-vedic-secondary-text mb-4">
                <strong>Important Disclaimer:</strong> Our discussions and content are for academic and reflective purposes only. 
                The goal is to understand profound philosophical traditions, not to establish any single view as definitive. 
                This service is not a substitute for:
              </p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>Personal spiritual guidance from qualified teachers</li>
                <li>Religious or spiritual counseling</li>
                <li>Medical or psychological advice</li>
                <li>Professional consultation on life decisions</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">4. User Responsibilities</h2>
              <p className="text-vedic-secondary-text mb-4">You agree to:</p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>Use the service respectfully and in the spirit of sincere learning</li>
                <li>Respect the sacred nature of the wisdom traditions discussed</li>
                <li>Not misuse or abuse the AI conversation system</li>
                <li>Maintain the confidentiality of your account credentials</li>
                <li>Comply with daily message limits and usage guidelines</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">5. Usage Limits</h2>
              <p className="text-vedic-secondary-text mb-4">
                The service currently provides 10 daily messages for all users. These limits help us:
              </p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>Maintain service quality and availability</li>
                <li>Encourage contemplative rather than compulsive usage</li>
                <li>Manage operational costs</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">6. Intellectual Property</h2>
              <p className="text-vedic-secondary-text mb-4">
                The ancient wisdom traditions discussed are part of humanity's shared heritage. However:
              </p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>The platform design and AI responses are proprietary to GreyBrain.ai</li>
                <li>Users retain rights to their questions and personal learning journey</li>
                <li>Traditional texts and teachings remain in the public domain</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">7. Limitation of Liability</h2>
              <p className="text-vedic-secondary-text mb-4">
                Vedanta Vision and GreyBrain.ai shall not be liable for any indirect, incidental, special, 
                consequential, or punitive damages resulting from your use of the service. The service is 
                provided "as is" without warranties of any kind.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibent text-vedic-accent-dark mb-4">8. Termination</h2>
              <p className="text-vedic-secondary-text mb-4">
                We reserve the right to terminate or suspend access to our service immediately, without prior 
                notice, for conduct that we believe violates these Terms of Service or is harmful to other users.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">9. Contact Information</h2>
              <p className="text-vedic-secondary-text mb-4">
                For questions about these Terms of Service, please contact:
              </p>
              <p className="text-vedic-secondary-text">
                <strong>Email:</strong> balwant@greybrain.ai<br />
                <strong>Developer:</strong> GreyBrain.ai
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">10. Changes to Terms</h2>
              <p className="text-vedic-secondary-text">
                We reserve the right to modify these terms at any time. We will notify users of any material 
                changes by posting the new Terms of Service on this page and updating the "Last Updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
