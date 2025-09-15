import React, { useEffect, useRef } from 'react';
import { type Message } from '../types';
import MessageBubble from './MessageBubble';
import LoadingSpinner from './LoadingSpinner';

interface ChatWindowProps {
    messages: Message[];
    isLoading: boolean;
    onNudgeClick: (prompt: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages, isLoading, onNudgeClick }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    return (
        <div ref={scrollRef} className="flex-1 p-4 lg:p-6 overflow-y-auto bg-vedic-bg">
            <div className="max-w-full lg:max-w-5xl mx-auto space-y-8">
                {messages.map((message) => (
                    <MessageBubble 
                      key={message.id} 
                      message={message} 
                      isProcessing={isLoading} 
                      onNudgeClick={onNudgeClick}
                    />
                ))}
                {isLoading && messages.length > 0 && (
                  <div className="flex justify-start">
                    <div className="flex items-center space-x-3 bg-vedic-surface px-4 py-3 rounded-2xl rounded-tl-none">
                      <LoadingSpinner />
                      <span className="text-sm text-vedic-accent-dark">Professor Arya is thinking...</span>
                    </div>
                  </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
