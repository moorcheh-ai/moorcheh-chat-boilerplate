'use client';

import { useRef, useEffect } from 'react';
import { Message } from '@/hooks/useChat';
import { CircleUser, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import { useIsMobile } from '@/hooks/use-mobile';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSendExample?: (text: string) => void;
}

const EXAMPLE_QUESTIONS = [
  "What can you help me with?",
  "How does this work?",
  "Tell me about your features",
  "Can you assist with questions?"
];

export default function MessageList({ messages, isLoading, onSendExample }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendExample = (question: string) => {
    if (onSendExample) {
      onSendExample(question);
    }
  };

  // Define markdown components with theme-aware styling and mobile optimization
  const markdownComponents: Components = {
    p: ({children}) => <p className="mb-2 text-foreground leading-relaxed">{children}</p>,
    ul: ({children}) => <ul className="list-disc pl-4 mb-2 text-foreground space-y-1">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal pl-4 mb-2 text-foreground space-y-1">{children}</ol>,
    li: ({children}) => <li className="mb-1 text-foreground leading-relaxed">{children}</li>,
    h1: ({children}) => <h1 className="text-base sm:text-lg font-bold mb-2 mt-3 text-foreground">{children}</h1>,
    h2: ({children}) => <h2 className="text-sm sm:text-md font-bold mb-2 mt-3 text-foreground">{children}</h2>,
    h3: ({children}) => <h3 className="text-sm font-semibold mb-2 mt-2 text-foreground">{children}</h3>,
    strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
    a: ({href, children}) => <a href={href} className="text-primary hover:text-primary/80 underline break-words">{children}</a>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-border pl-3 sm:pl-4 italic my-3 text-muted-foreground">{children}</blockquote>,
    code: ({children}) => <code className="bg-muted px-1.5 py-0.5 rounded text-xs sm:text-sm text-foreground font-mono break-words">{children}</code>,
    pre: ({children}) => <pre className="bg-muted p-2 sm:p-3 rounded-md overflow-x-auto text-xs sm:text-sm my-3 text-foreground font-mono">{children}</pre>,
    table: ({children}) => <div className="overflow-x-auto my-3"><table className="min-w-full divide-y divide-border text-xs sm:text-sm">{children}</table></div>,
    th: ({children}) => <th className="px-2 py-1 bg-muted text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{children}</th>,
    td: ({children}) => <td className="px-2 py-1 whitespace-nowrap text-xs sm:text-sm text-foreground">{children}</td>,
  };

  // Show welcome message if no messages
  const showWelcomeMessage = messages.length === 0 && !isLoading;

  return (
    <div className="w-full h-full flex flex-col space-y-3 sm:space-y-4 py-2">
      {/* Welcome message when no messages */}
      {showWelcomeMessage && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-4 sm:p-6 space-y-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Bot size={isMobile ? 20 : 24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-medium text-foreground">How can I help you today?</h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Ask me anything or try one of these examples</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full max-w-md mt-4">
            {EXAMPLE_QUESTIONS.map((question, index) => (
              <Button 
                key={index} 
                variant="outline"
                className="text-left justify-start h-auto py-2 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm font-normal border-border hover:bg-muted touch-manipulation"
                onClick={() => handleSendExample(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Message list */}
      {(messages.length > 0 || isLoading) && (
        <div className="space-y-3 sm:space-y-4 w-full">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {/* Desktop avatars only */}
              {msg.sender === 'ai' && !isMobile && (
                <div className="flex-shrink-0 mr-2 sm:mr-3">
                  <div className="bg-primary/10 rounded-full p-1 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Bot size={14} className="text-primary sm:w-4 sm:h-4" />
                  </div>
                </div>
              )}
              
              <div
                className={`${
                  isMobile 
                    ? `max-w-[90%] p-2.5 rounded-lg shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                          : 'text-foreground' // No background for AI messages on mobile
                      }`
                    : `max-w-[85%] md:max-w-[75%] p-2.5 sm:p-3 rounded-lg shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-primary text-primary-foreground rounded-tr-sm' 
                          : 'bg-card border border-border rounded-tl-sm'
                      }`
                }`}
              >
                {msg.sender === 'user' ? (
                  <div className={`${
                    isMobile 
                      ? 'text-primary-foreground text-sm leading-relaxed break-words'
                      : 'text-primary-foreground text-sm sm:text-base leading-relaxed break-words'
                  }`}>
                    {msg.text}
                  </div>
                ) : (
                  <div className={`${
                    isMobile 
                      ? 'text-foreground markdown-content text-sm'
                      : 'text-card-foreground markdown-content text-sm sm:text-base'
                  }`}>
                    <ReactMarkdown components={markdownComponents}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
              
              {/* Desktop avatars only */}
              {msg.sender === 'user' && !isMobile && (
                <div className="flex-shrink-0 ml-2 sm:ml-3">
                  <div className="bg-secondary rounded-full p-1 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <CircleUser size={14} className="text-secondary-foreground sm:w-4 sm:h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              {/* Desktop avatar only */}
              {!isMobile && (
                <div className="flex-shrink-0 mr-2 sm:mr-3">
                  <div className="bg-primary/10 rounded-full p-1 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Bot size={14} className="text-primary sm:w-4 sm:h-4" />
                  </div>
                </div>
              )}
              <div className={`${
                isMobile 
                  ? 'max-w-[90%] p-2.5 rounded-lg text-foreground' // No background on mobile
                  : 'max-w-[90%] sm:max-w-[85%] md:max-w-[75%] p-2.5 sm:p-3 rounded-lg bg-card border border-border rounded-tl-sm'
              }`}>
                <div className="flex space-x-2 items-center h-5 sm:h-6">
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary/60 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* This invisible element is used for scrolling to bottom with extra spacing */}
      <div ref={messagesEndRef} className="h-4 sm:h-8" />
    </div>
  );
} 