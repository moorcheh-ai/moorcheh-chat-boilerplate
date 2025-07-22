'use client';

import { useRef, useEffect } from 'react';
import { Message } from '@/hooks/useChat';
import { CircleUser, Bot, Info } from 'lucide-react';
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
  "What discrepancies were found in last month's books?",
  "How can I improve my profit margins?",
  "Show me my revenue breakdown by category",
  "Explain the bank reconciliation process"
];

export default function MessageList({ messages, isLoading, onSendExample }: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

  // Define markdown components with proper type annotations
  const markdownComponents: Components = {
    p: ({children}) => <p className="mb-2">{children}</p>,
    ul: ({children}) => <ul className="list-disc pl-4 mb-2">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal pl-4 mb-2">{children}</ol>,
    li: ({children}) => <li className="mb-1">{children}</li>,
    h1: ({children}) => <h1 className="text-lg font-bold mb-2 mt-3">{children}</h1>,
    h2: ({children}) => <h2 className="text-md font-bold mb-2 mt-3">{children}</h2>,
    h3: ({children}) => <h3 className="text-sm font-semibold mb-2 mt-2">{children}</h3>,
    strong: ({children}) => <strong className="font-semibold">{children}</strong>,
    a: ({href, children}) => <a href={href} className="text-blue-600 underline">{children}</a>,
    blockquote: ({children}) => <blockquote className="border-l-4 border-gray-200 pl-4 italic my-3">{children}</blockquote>,
    code: ({children}) => <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>,
    pre: ({children}) => <pre className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm my-3">{children}</pre>,
    table: ({children}) => <div className="overflow-x-auto my-3"><table className="min-w-full divide-y divide-gray-200">{children}</table></div>,
    th: ({children}) => <th className="px-2 py-1 bg-gray-100 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">{children}</th>,
    td: ({children}) => <td className="px-2 py-1 whitespace-nowrap text-sm">{children}</td>,
  };

  return (
    <div className="h-[550px] md:h-[550px] overflow-y-auto mb-4 p-2 md:p-4 bg-gray-50 rounded-lg">
    
      
        <>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex mb-3 md:mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="flex-shrink-0 mr-1 md:mr-2 hidden sm:block">
                  <div className="bg-blue-100 rounded-full p-1 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                    <Bot size={14} className="text-blue-600 md:w-4 md:h-4" />
                  </div>
                </div>
              )}
              
              <div
                className={`max-w-[85%] sm:max-w-[80%] p-2 md:p-3 rounded-lg shadow-sm ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-tr-none' 
                    : 'bg-white border border-gray-200 rounded-tl-none'
                }`}
              >
                {msg.sender === 'user' ? (
                  <div className="text-white text-sm md:text-base">{msg.text}</div>
                ) : (
                  <div className="text-gray-800 markdown-content text-sm md:text-base">
                    <ReactMarkdown components={markdownComponents}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
                <div className={`text-xs mt-1 ${
                  msg.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {formatTime(msg.timestamp)}
                  {msg.isOffline && (
                    <span className="ml-2 italic">Offline message</span>
                  )}
                </div>
              </div>
              
              {msg.sender === 'user' && (
                <div className="flex-shrink-0 ml-1 md:ml-2 hidden sm:block">
                  <div className="bg-gray-200 rounded-full p-1 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                    <CircleUser size={14} className="text-gray-600 md:w-4 md:h-4" />
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex mb-4 justify-start">
              <div className="flex-shrink-0 mr-1 md:mr-2 hidden sm:block">
                <div className="bg-blue-100 rounded-full p-1 w-6 h-6 md:w-8 md:h-8 flex items-center justify-center">
                  <Bot size={14} className="text-blue-600 md:w-4 md:h-4" />
                </div>
              </div>
              <div className="max-w-[85%] sm:max-w-[80%] p-2 md:p-3 rounded-lg bg-white border border-gray-200 rounded-tl-none">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </>
    
      <div ref={messagesEndRef} />
    </div>
  );
} 