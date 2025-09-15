import React, { useState } from 'react';
import { BookOpenIcon, ChevronDownIcon, WalkIcon, CheckCircleIcon, LockIcon } from './Icons';

interface Topic {
    id: string;
    title: string;
    prompt: string;
}

interface CourseModule {
    moduleTitle: string;
    isPremium: boolean;
    topics: Topic[];
}

interface SidebarProps {
    course: CourseModule[];
    onSelectTopic: (prompt: string, id: string, isPremium: boolean) => void;
    disabled: boolean;
    completedTopics: string[];
    isAuthenticated: boolean;
    isPaidSubscriber: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ course, onSelectTopic, disabled, completedTopics, isAuthenticated, isPaidSubscriber: _isPaidSubscriber }) => {
    const [openModules, setOpenModules] = useState<string[]>([]);

    const toggleModule = (moduleTitle: string) => {
        setOpenModules(prev =>
            prev.includes(moduleTitle)
                ? prev.filter(m => m !== moduleTitle)
                : [...prev, moduleTitle]
        );
    };

    const expandAll = () => setOpenModules(course.map(m => m.moduleTitle));
    const collapseAll = () => setOpenModules([]);

    const handleTopicClick = (prompt: string, id: string, isPremium: boolean) => {
        if (!isAuthenticated) {
            // Show a more helpful message and highlight the login button
            alert("Please sign in using the Login button in the top-right corner to access the course topics and chat with Professor Arya!");
            console.log("Please log in to select a topic.");
            return;
        }

        // Remove premium gating - all content accessible with message limits
        onSelectTopic(prompt, id, isPremium);
    }


    return (
        <aside className="w-96 bg-vedic-bg-alt p-6 hidden md:flex flex-col border-r border-vedic-border overflow-y-auto">
            {/* Login prompt for unauthenticated users */}
            {!isAuthenticated && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <h3 className="font-semibold text-blue-800">Sign In Required</h3>
                    </div>
                    <p className="text-sm text-blue-700 mb-2">
                        Please sign in to access course topics and chat with Professor Arya.
                    </p>
                    <p className="text-xs text-blue-600">
                        👆 Use the "Login" button in the top-right corner
                    </p>
                </div>
            )}

            <div>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold font-serif text-vedic-accent-dark">Course Outline</h2>
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={expandAll}
                            className="text-xs font-semibold text-vedic-accent hover:text-vedic-accent-dark transition-colors"
                            title="Expand all sections"
                        >
                            Expand All
                        </button>
                        <span className="text-vedic-border text-sm">|</span>
                        <button 
                            onClick={collapseAll}
                            className="text-xs font-semibold text-vedic-accent hover:text-vedic-accent-dark transition-colors"
                            title="Collapse all sections"
                        >
                            Collapse All
                        </button>
                    </div>
                </div>
                <p className="text-base text-vedic-secondary-text mb-6">Select a topic to begin your lesson.</p>

                <div className="space-y-4">
                    {course.map((module, index) => (
                        <div key={index}>
                            <button
                                onClick={() => toggleModule(module.moduleTitle)}
                                className="w-full flex justify-between items-center text-left text-sm font-bold uppercase text-vedic-secondary-text tracking-wider mb-3 px-1 hover:text-vedic-accent-dark transition-colors"
                            >
                                <span>{module.moduleTitle}</span>
                                <ChevronDownIcon className={`w-5 h-5 transition-transform ${openModules.includes(module.moduleTitle) ? 'rotate-180' : ''}`} />
                            </button>
                            {openModules.includes(module.moduleTitle) && (
                               <ul className="space-y-3 pl-2 border-l-2 border-vedic-border ml-1">
                                {module.topics.map((topic) => {
                                    const isCompleted = completedTopics.includes(topic.id);
                                    const isWorkshop = module.moduleTitle.includes("Workshops");
                                    const Icon = isWorkshop ? WalkIcon : BookOpenIcon;
                                    // Remove premium lock - all content accessible
                                    const showLock = false;

                                    return (
                                        <li key={topic.id} className="ml-2">
                                            <button
                                                onClick={() => handleTopicClick(topic.prompt, topic.id, module.isPremium)}
                                                disabled={disabled || !isAuthenticated}
                                                className={`w-full flex items-center gap-3 text-left px-3 py-2.5 rounded-lg transition-colors duration-200 shadow-sm border border-vedic-border/70 ${
                                                    !isAuthenticated
                                                        ? 'bg-gray-100 text-gray-500 cursor-not-allowed opacity-60'
                                                        : 'bg-white/60 hover:bg-vedic-surface text-vedic-accent-dark font-semibold disabled:opacity-50 disabled:cursor-not-allowed'
                                                }`}
                                            >
                                                <Icon className="w-5 h-5 flex-shrink-0" />
                                                <span className={`text-sm flex-1 ${isCompleted ? 'italic text-vedic-secondary-text' : ''} ${showLock || !isAuthenticated ? 'opacity-70' : ''}`}>{topic.title}</span>
                                                {isCompleted && !showLock && isAuthenticated && <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />}
                                                {showLock && <LockIcon className="w-4 h-4 text-vedic-secondary-text flex-shrink-0" />}
                                                {!isAuthenticated && <LockIcon className="w-4 h-4 text-gray-400 flex-shrink-0" />}
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <footer className="mt-auto pt-6 border-t border-vedic-border/70">
                <p className="text-xs text-vedic-secondary-text/80 italic">
                    Disclaimer: This is an academic exploration of philosophies for educational purposes. The content is not intended to prove or disprove any belief system.
                </p>
            </footer>
        </aside>
    );
};

export default Sidebar;