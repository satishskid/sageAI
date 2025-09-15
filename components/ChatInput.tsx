import React, { useState, useRef, useEffect } from 'react';
import { SendIcon, StarIcon } from './Icons';

interface ChatInputProps {
    onSendMessage: (text: string) => void;
    isLoading: boolean;
    isAuthenticated: boolean;
    isPaidSubscriber: boolean;
    messagesLeft: number;
    onUpgradeClick: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading, isAuthenticated, isPaidSubscriber, messagesLeft, onUpgradeClick }) => {
    const [text, setText] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const isInputDisabled = isLoading || !isAuthenticated;
    const isLimitReached = !isPaidSubscriber && messagesLeft <= 0;

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${scrollHeight}px`;
        }
    }, [text]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim() && !isInputDisabled && !isLimitReached) {
            onSendMessage(text);
            setText('');
        }
    };

    const getPlaceholderText = () => {
        if (!isAuthenticated) return "Please log in to start chatting.";
        if (isLimitReached) return "You've reached your daily message limit.";
        return "Ask Professor Arya a question...";
    }

    return (
        <div className="p-4 bg-vedic-bg-alt border-t border-vedic-border">
            <div className="max-w-full lg:max-w-5xl mx-auto px-2">
                <form onSubmit={handleSubmit} className="flex items-end space-x-3">
                    <div className="flex-1">
                        <textarea
                            ref={textareaRef}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSubmit(e);
                                }
                            }}
                            placeholder={getPlaceholderText()}
                            className="w-full p-3 border border-vedic-accent/50 rounded-lg focus:ring-2 focus:ring-vedic-accent focus:outline-none bg-white/80 resize-none overflow-y-auto max-h-40 text-base disabled:bg-gray-100"
                            rows={1}
                            disabled={isInputDisabled || isLimitReached}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isInputDisabled || isLimitReached || !text.trim()}
                        className="p-3 rounded-full bg-vedic-accent text-white hover:bg-vedic-accent-dark transition-colors disabled:bg-vedic-secondary-text disabled:cursor-not-allowed"
                        aria-label="Send message"
                    >
                        <SendIcon className="w-6 h-6" />
                    </button>
                </form>
                {isAuthenticated && !isPaidSubscriber && isLimitReached && (
                    <div className="text-center text-xs text-vedic-secondary-text pt-2">
                        <div className="flex items-center justify-center gap-2">
                           <span>Daily message limit reached.</span>
                           <button onClick={onUpgradeClick} className="flex items-center gap-1.5 font-bold text-yellow-600 hover:text-yellow-700">
                               <StarIcon className="w-3.5 h-3.5" />
                               Upgrade to continue
                           </button>
                       </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatInput;
