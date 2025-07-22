'use client';

import { useRef, useEffect } from 'react';
import { Message } from '@/hooks/useChat';
import { CircleUser, Bot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSendExample?: (text: string) => void;
}

const EXAMPLE_QUESTIONS = [
  "How can you help me today?",
  "What can you do?",
  "Tell me something interesting",
  "Help me get started"
];

export default function MessageList({ messages, isLoading, onSendExample }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Format timestamp
  const formatTime = (timestamp?: Date) => {
    if (!timestamp) return '';
    
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return '';
    }
  };

  const handleSendExample = (question: string) => {
    if (onSendExample) {
      onSendExample(question);
    }
  };

  // Define markdown components with theme-aware styling
  const markdownComponents: Components = {
    p: ({children}) => <p className="mb-2 text-foreground">{children}</p>,
    ul: ({children}) => <ul className="list-disc pl-4 mb-2 text-foreground">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal pl-4 mb-2 text-foreground">{children}</ol>,
    li: ({children}) => <li className="mb-1 text-foreground">{children}</li>,
    h1: ({children}) => <h1 className="text-lg font-bold mb-2 mt-3 text-foreground">{children}</h1>,
    h2: ({children}) => <h2 className="text-md font-bold mb-2 mt-3 text-foreground">{children}</h2>,
    h3: ({children}) => <h3 className="text-sm font-semibold mb-2 mt-2 text-foreground">{children}</h3>,
    strong: ({children}) => <strong className="font-semibold text-foreground">{children}</strong>,
    a: ({href, children}) => <a href={href} className="text-primary hover:text-primary/80 underline">{children}</a>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-border pl-4 italic my-3 text-muted-foreground">{children}</blockquote>,
    code: ({children}) => <code className="bg-muted px-1 py-0.5 rounded text-sm text-foreground">{children}</code>,
    pre: ({children}) => <pre className="bg-muted p-3 rounded-md overflow-x-auto text-sm my-3 text-foreground">{children}</pre>,
    table: ({children}) => <div className="overflow-x-auto my-3"><table className="min-w-full divide-y divide-border">{children}</table></div>,
    th: ({children}) => <th className="px-2 py-1 bg-muted text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">{children}</th>,
    td: ({children}) => <td className="px-2 py-1 whitespace-nowrap text-sm text-foreground">{children}</td>,
  };

  // Show welcome message if no messages
  const showWelcomeMessage = messages.length === 0 && !isLoading;

  return (
    <div className="w-full h-full flex flex-col space-y-4 py-2">
      {/* Welcome message when no messages */}
      {showWelcomeMessage && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 space-y-4">
          <div className="bg-primary/10 p-3 rounded-full">
            <Bot size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-foreground">How can I help you today?</h3>
            <p className="text-sm text-muted-foreground mt-1">Ask me anything or try one of these examples</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full max-w-md mt-4">
            {EXAMPLE_QUESTIONS.map((question, index) => (
              <Button 
                key={index} 
                variant="outline"
                className="text-left justify-start h-auto py-3 px-4 text-sm font-normal border-border hover:bg-muted"
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
        <div className="space-y-4 w-full">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="flex-shrink-0 mr-2 hidden sm:block">
                  <div className="bg-primary/10 rounded-full p-1 w-8 h-8 flex items-center justify-center">
                    <Bot size={16} className="text-primary" />
                  </div>
                </div>
              )}
              
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-3 rounded-lg shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-card border border-border rounded-tl-none'
                }`}
              >
                {msg.sender === 'user' ? (
                  <div className="text-primary-foreground text-sm md:text-base">{msg.text}</div>
                ) : (
                  <div className="text-card-foreground markdown-content text-sm md:text-base">
                    <ReactMarkdown components={markdownComponents}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
                <div className={`text-xs mt-1.5 ${
                  msg.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                }`}>
                  {formatTime(msg.timestamp)}
                  {msg.isOffline && (
                    <span className="ml-2 italic">Offline message</span>
                  )}
                </div>
              </div>
              
              {msg.sender === 'user' && (
                <div className="flex-shrink-0 ml-2 hidden sm:block">
                  <div className="bg-secondary rounded-full p-1 w-8 h-8 flex items-center justify-center">
                    <CircleUser size={16} className="text-secondary-foreground" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex-shrink-0 mr-2 hidden sm:block">
                <div className="bg-primary/10 rounded-full p-1 w-8 h-8 flex items-center justify-center">
                  <Bot size={16} className="text-primary" />
                </div>
              </div>
              <div className="max-w-[85%] sm:max-w-[75%] p-3 rounded-lg bg-card border border-border rounded-tl-none">
                <div className="flex space-x-2 items-center h-6">
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-primary/60 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* This invisible element is used for scrolling to bottom with extra spacing */}
      <div ref={messagesEndRef} className="h-8" />
    </div>
  );
} 