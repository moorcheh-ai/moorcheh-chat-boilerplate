'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Minimize2, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { fetchAnswer } from '../../../lib/answer';
import { getWidgetConfig, getCommonConfig } from '../../../lib/chat-config';
import { cn } from '../../../lib/utils';

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const widgetConfig = getWidgetConfig();
  const commonConfig = getCommonConfig();

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      // Use the new API configuration system
      const data = await fetchAnswer({
        query: userMessage.content,
        chatHistory: messages.map((m) => ({ role: m.role, content: m.content })),
        // Fallback parameters for backward compatibility
        namespace: commonConfig.api.namespace,
        top_k: commonConfig.api.topK,
        aiModel: commonConfig.api.model,
        temperature: commonConfig.api.temperature,
        threshold: commonConfig.api.threshold,
      });

      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer || data.response || "(No response)",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  // Widget is now positioned by parent container, so we just need relative positioning
  const getPositionClasses = () => {
    return 'relative';
  };

  // Size classes based on config
  const getSizeClasses = () => {
    const { size } = widgetConfig;
    switch (size) {
      case 'small':
        return 'w-12 h-12';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-14 h-14';
    }
  };

  const getChatSizeClasses = () => {
    const { size } = widgetConfig;
    switch (size) {
      case 'small':
        return 'w-80 h-96';
      case 'large':
        return 'w-96 h-[32rem]';
      default:
        return 'w-88 h-[28rem]';
    }
  };

  return (
    <div className={getPositionClasses()}>
      {/* Chat Window - Positioned absolutely above the button */}
      {isOpen && (
        <div 
          className={cn(
            'absolute bottom-16 right-0 transition-all duration-300 ease-in-out',
            isMinimized ? 'scale-95 opacity-75' : 'scale-100 opacity-100',
            getChatSizeClasses()
          )}
        >
          <Card className="h-full flex flex-col shadow-2xl border border-border bg-card">
            {/* Header */}
            <CardHeader className="flex flex-row items-center justify-between p-3 pb-2 border-b bg-primary text-primary-foreground rounded-t-lg">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <Bot size={16} className="text-primary-foreground" />
                </div>
                <div>
                  <CardTitle className="text-sm font-semibold">
                    {commonConfig.branding.title}
                  </CardTitle>
                  {commonConfig.branding.subtitle && (
                    <p className="text-xs opacity-80">
                      {commonConfig.branding.subtitle}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-primary-foreground/20 text-primary-foreground"
                  onClick={isMinimized ? maximizeChat : minimizeChat}
                >
                  {isMinimized ? <Maximize2 size={12} /> : <Minimize2 size={12} />}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 w-6 p-0 hover:bg-primary-foreground/20 text-primary-foreground"
                  onClick={toggleChat}
                >
                  <X size={12} />
                </Button>
              </div>
            </CardHeader>

            {/* Messages */}
            {!isMinimized && (
              <>
                <CardContent className="flex-1 overflow-y-auto p-3 space-y-3">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <Bot size={32} className="mx-auto mb-2 opacity-50" />
                      <p className="text-sm">
                        {commonConfig.branding.subtitle || "Hi! How can I help you today?"}
                      </p>
                    </div>
                  )}
                  
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className={cn(
                        'flex gap-2 items-start',
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      )}
                    >
                      {message.role === 'assistant' && (
                        <Avatar className="h-6 w-6 mt-1">
                          <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      )}
                      
                      <div
                        className={cn(
                          'max-w-[80%] px-3 py-2 rounded-lg text-sm',
                          message.role === 'user'
                            ? 'bg-primary text-primary-foreground rounded-br-sm'
                            : 'bg-muted text-foreground rounded-bl-sm'
                        )}
                      >
                        {message.content}
                        <div
                          className={cn(
                            'text-xs mt-1 opacity-70',
                            message.role === 'user' ? 'text-primary-foreground' : 'text-muted-foreground'
                          )}
                        >
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </div>
                      </div>
                      
                      {message.role === 'user' && (
                        <Avatar className="h-6 w-6 mt-1">
                          <AvatarFallback className="text-xs bg-secondary text-secondary-foreground">
                            U
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {isLoading && (
                    <div className="flex gap-2 items-start justify-start">
                      <Avatar className="h-6 w-6 mt-1">
                        <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                          AI
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-muted text-foreground px-3 py-2 rounded-lg rounded-bl-sm">
                        <div className="flex space-x-1">
                          <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                          <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                          <div className="h-1.5 w-1.5 bg-primary rounded-full animate-bounce"></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {error && (
                    <div className="text-center text-destructive text-xs bg-destructive/10 p-2 rounded">
                      {error}
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </CardContent>

                {/* Input */}
                <div className="p-3 border-t bg-card">
                  <div className="flex items-end gap-2">
                    <Textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      rows={1}
                      className="flex-1 min-h-[36px] max-h-24 py-2 px-3 text-sm resize-none"
                      style={{
                        height: 'auto',
                        overflow: input.split('\n').length > 1 || input.length > 30 ? 'auto' : 'hidden'
                      }}
                      onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${Math.min(target.scrollHeight, 96)}px`;
                      }}
                    />
                    <Button
                      onClick={handleSend}
                      disabled={isLoading || !input.trim()}
                      size="sm"
                      className="px-3 flex-shrink-0 self-end"
                    >
                      <Send size={14} />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {/* Toggle Button */}
      <Button
        onClick={toggleChat}
        className={cn(
          'rounded-full shadow-lg hover:scale-105 transition-all duration-200',
          'bg-primary hover:bg-primary/90 text-primary-foreground',
          getSizeClasses(),
          widgetConfig.animations && 'animate-pulse'
        )}
        style={{ zIndex: widgetConfig.zIndex + 1 }}
      >
        {isOpen ? (
          <X size={widgetConfig.size === 'small' ? 16 : widgetConfig.size === 'large' ? 24 : 20} />
        ) : (
          <MessageCircle size={widgetConfig.size === 'small' ? 16 : widgetConfig.size === 'large' ? 24 : 20} />
        )}
      </Button>
    </div>
  );
} 