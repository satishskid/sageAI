import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { type Message, Role } from '../types';
import { ProfessorIcon, SparklesIcon } from './Icons';

interface MessageBubbleProps {
    message: Message;
    isProcessing?: boolean;
    onNudgeClick?: (prompt: string) => void;
}

const NUDGE_REGEX = /\[NUDGE\](.*?)\]/g;

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isProcessing, onNudgeClick }) => {
    const isModel = message.role === Role.MODEL;

    const markdownComponents = {
      p: ({...props}: any) => <p className="mb-2 last:mb-0" {...props} />,
      strong: ({...props}: any) => <strong className="font-bold text-vedic-accent-dark" {...props} />,
      ul: ({...props}: any) => <ul className="list-disc list-inside my-3 pl-4 space-y-1" {...props} />,
      ol: ({...props}: any) => <ol className="list-decimal list-inside my-3 pl-4 space-y-1" {...props} />,
      li: ({...props}: any) => <li className="mb-1" {...props} />,
      a: ({...props}: any) => <a className="text-blue-700 underline hover:text-blue-500" target="_blank" rel="noopener noreferrer" {...props} />,
    };
    
    const messageParts = useMemo(() => {
        if (!isModel) return [{ type: 'text', content: message.text }];

        const parts: { type: 'text' | 'nudge'; content: any }[] = [];
        let lastIndex = 0;
        let match;

        while ((match = NUDGE_REGEX.exec(message.text)) !== null) {
            if (match.index > lastIndex) {
                parts.push({ type: 'text', content: message.text.slice(lastIndex, match.index) });
            }
            
            const [buttonText, prompt] = match[1].split('|');
            parts.push({ type: 'nudge', content: { buttonText, prompt } });
            
            lastIndex = match.index + match[0].length;
        }

        if (lastIndex < message.text.length) {
            parts.push({ type: 'text', content: message.text.slice(lastIndex) });
        }

        return parts;
    }, [message.text, isModel]);

    return (
        <div className={`flex items-start gap-3 ${isModel ? 'justify-start' : 'justify-end'}`}>
            {isModel && (
                <div className="flex-shrink-0 pt-1">
                    <div className="w-10 h-10 rounded-full bg-vedic-border flex items-center justify-center text-vedic-accent-dark">
                        <ProfessorIcon className="w-6 h-6" />
                    </div>
                </div>
            )}
            <div
                className={`w-full max-w-xs sm:max-w-md lg:max-w-2xl xl:max-w-3xl px-5 py-3 rounded-2xl shadow-md text-base leading-relaxed ${
                    isModel
                        ? 'bg-vedic-surface text-vedic-primary-text rounded-tl-none'
                        : 'bg-user-bg text-user-text rounded-br-none'
                }`}
            >
                {isModel ? (
                    <div>
                        {messageParts.map((part, index) => {
                            if (part.type === 'text') {
                                return (
                                    <ReactMarkdown key={index} remarkPlugins={[remarkGfm]} components={markdownComponents}>
                                        {part.content}
                                    </ReactMarkdown>
                                );
                            }
                            if (part.type === 'nudge') {
                                return (
                                    <div key={index} className="my-3">
                                        <button
                                            onClick={() => onNudgeClick?.(part.content.prompt)}
                                            disabled={isProcessing}
                                            className="inline-flex items-center gap-2 text-sm font-semibold bg-white/80 border border-vedic-accent/50 text-vedic-accent-dark px-3 py-1.5 rounded-full hover:bg-vedic-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <SparklesIcon className="w-4 h-4" />
                                            {part.content.buttonText}
                                        </button>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                ) : (
                    message.text
                )}
            </div>
        </div>
    );
};

export default MessageBubble;
