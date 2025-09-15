import React from 'react';
import { CloseIcon, StarIcon, CheckCircleIcon } from './Icons';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
}

const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade }) => {
    if (!isOpen) return null;

    const features = [
        "Unlimited messages",
        "Full access to all course modules",
        "Unlock all Guided Workshops & Retreats",
        "Explore Advanced Vedantic Texts",
        "Deepen your study of modern-day parallels"
    ];

    return (
        <div 
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="upgrade-modal-title"
        >
            <div 
                className="bg-vedic-bg w-full max-w-lg rounded-2xl shadow-2xl p-8 flex flex-col transform transition-all border-4 border-yellow-500"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                        <div className="bg-yellow-500 p-2 rounded-full">
                           <StarIcon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 id="upgrade-modal-title" className="text-2xl font-bold font-serif text-vedic-accent-dark">Get your Sage Pass</h2>
                            <p className="text-vedic-secondary-text">Unlock the full wisdom of Vedanta.</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-vedic-secondary-text hover:bg-vedic-border" aria-label="Close">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="my-6">
                    <ul className="space-y-3">
                        {features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-3">
                                <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                                <span className="text-vedic-primary-text">{feature}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                <button 
                    onClick={onUpgrade}
                    className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded-lg bg-yellow-500 text-white text-lg font-bold hover:bg-yellow-600 transition-colors shadow-lg"
                >
                    <StarIcon className="w-5 h-5" />
                    <span>Upgrade Now - $7/month</span>
                </button>
                <p className="text-center text-xs text-vedic-secondary-text mt-3">
                    This is a simulation. Clicking will grant you premium access.
                </p>
            </div>
        </div>
    );
};

export default UpgradeModal;
