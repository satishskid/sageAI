import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy: React.FC = () => {
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
          <h1 className="text-3xl font-bold text-vedic-accent-dark mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-vedic-secondary-text mb-6">
              <strong>Effective Date:</strong> January 1, 2024<br />
              <strong>Last Updated:</strong> January 1, 2024
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">1. Introduction</h2>
              <p className="text-vedic-secondary-text mb-4">
                Vedanta Vision ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy 
                explains how we collect, use, disclose, and safeguard your information when you use our spiritual 
                learning platform developed by GreyBrain.ai.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium text-vedic-accent-dark mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>Email address (for account creation)</li>
                <li>Name (optional, for personalization)</li>
                <li>Authentication data (managed by Clerk)</li>
              </ul>
              
              <h3 className="text-xl font-medium text-vedic-accent-dark mb-3">Usage Information</h3>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>Conversations with Professor Arya (for improving responses)</li>
                <li>Learning progress and completed topics</li>
                <li>Daily message count (for usage limits)</li>
                <li>Device and browser information</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>Provide and maintain our spiritual learning service</li>
                <li>Personalize your learning experience</li>
                <li>Improve Professor Arya's responses and accuracy</li>
                <li>Monitor usage for service optimization</li>
                <li>Communicate important updates about the service</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">4. Information Sharing</h2>
              <p className="text-vedic-secondary-text mb-4">
                We do not sell, trade, or rent your personal information. We may share information only in these circumstances:
              </p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and safety</li>
                <li>With service providers (Clerk for authentication, AI providers for responses)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">5. Data Security</h2>
              <p className="text-vedic-secondary-text mb-4">
                We implement appropriate security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>Encrypted data transmission (HTTPS)</li>
                <li>Secure authentication via Clerk</li>
                <li>Regular security assessments</li>
                <li>Limited access to personal data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">6. Your Rights</h2>
              <p className="text-vedic-secondary-text mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 text-vedic-secondary-text mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and data</li>
                <li>Export your data</li>
                <li>Opt out of communications</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">7. Contact Us</h2>
              <p className="text-vedic-secondary-text mb-4">
                For privacy-related questions or requests, please contact us at:
              </p>
              <p className="text-vedic-secondary-text">
                <strong>Email:</strong> balwant@greybrain.ai<br />
                <strong>Developer:</strong> GreyBrain.ai
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-vedic-accent-dark mb-4">8. Changes to This Policy</h2>
              <p className="text-vedic-secondary-text">
                We may update this Privacy Policy periodically. We will notify you of any material changes 
                by posting the new Privacy Policy on this page and updating the "Last Updated" date.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
