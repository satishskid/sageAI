import React from 'react';
import { CloseIcon, CheckCircleIcon } from './Icons';

interface Topic {
    id: string;
    title: string;
    prompt: string;
}

interface CourseModule {
    moduleTitle: string;
    topics: Topic[];
}

interface JourneyMapModalProps {
    isOpen: boolean;
    onClose: () => void;
    course: CourseModule[];
    completedTopics: string[];
}

const JourneyMapModal: React.FC<JourneyMapModalProps> = ({ isOpen, onClose, course, completedTopics }) => {
    if (!isOpen) return null;

    const completedCount = completedTopics.length;
    const totalTopics = course.reduce((sum, module) => sum + module.topics.length, 0);
    const progressPercentage = totalTopics > 0 ? Math.round((completedCount / totalTopics) * 100) : 0;
    
    const completedModules = course.map(module => ({
        ...module,
        completedTopicsInModule: module.topics.filter(topic => completedTopics.includes(topic.id))
    })).filter(module => module.completedTopicsInModule.length > 0);

    return (
        <div 
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="journey-map-title"
        >
            <div 
                className="bg-vedic-bg w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl p-8 flex flex-col transform transition-all"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 id="journey-map-title" className="text-3xl font-bold font-serif text-vedic-accent-dark">My Learning Journey</h2>
                    <button onClick={onClose} className="p-1 rounded-full text-vedic-secondary-text hover:bg-vedic-border" aria-label="Close">
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between items-center text-vedic-secondary-text mb-1">
                        <span className="font-semibold">Progress</span>
                        <span className="font-semibold">{completedCount} / {totalTopics} Topics</span>
                    </div>
                    <div className="w-full bg-vedic-border rounded-full h-2.5">
                        <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${progressPercentage}%` }}></div>
                    </div>
                </div>

                <div className="overflow-y-auto pr-4 -mr-4 space-y-6">
                    {completedModules.length > 0 ? (
                        completedModules.map((module) => (
                            <div key={module.moduleTitle}>
                                <h3 className="text-lg font-serif font-bold text-vedic-accent-dark border-b-2 border-vedic-border pb-2 mb-3">
                                    {module.moduleTitle}
                                </h3>
                                <ul className="space-y-2">
                                    {module.completedTopicsInModule.map(topic => (
                                        <li key={topic.id} className="flex items-center text-vedic-primary-text">
                                            <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 flex-shrink-0" />
                                            <span>{topic.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-10">
                            <p className="text-vedic-secondary-text">You haven't completed any topics yet.</p>
                            <p className="text-sm text-vedic-secondary-text/80 mt-2">Select a topic from the sidebar to begin your journey!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default JourneyMapModal;