'use client';

import { useState, useEffect, useCallback } from 'react';
import { fetchAnswer } from "../lib/answer";
import { parseJsonWithDates, generateId } from '../lib/utils';

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isOffline?: boolean;
}

export interface ChatHistory {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  messages: Message[];
}

export default function useChat() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [chatHistories, setChatHistories] = useState<ChatHistory[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  
  // Monitor online status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load chat histories from localStorage on component mount
  useEffect(() => {
    try {
      // Load chat histories list
      const savedHistories = localStorage.getItem('chatHistories');
      let parsedHistories: ChatHistory[] = [];
      
      if (savedHistories) {
        parsedHistories = parseJsonWithDates(savedHistories);
        if (!Array.isArray(parsedHistories)) {
          parsedHistories = [];
        } else {
          // Make sure all chats have proper dates and ids
          parsedHistories = parsedHistories.map(chat => ({
            ...chat,
            id: chat.id || generateId(),
            title: chat.title || 'Untitled Chat',
            createdAt: chat.createdAt || new Date(),
            updatedAt: chat.updatedAt || new Date(),
            messages: Array.isArray(chat.messages) ? chat.messages.map(msg => ({
              ...msg,
              id: msg.id || generateId(),
              timestamp: msg.timestamp || new Date()
            })) : []
          }));
        }
      }
      
      setChatHistories(parsedHistories);
      
      // Check for active chat
      const lastActiveChatId = localStorage.getItem('activeChatId');
      
      if (lastActiveChatId && parsedHistories.some(chat => chat.id === lastActiveChatId)) {
        // If we have an active chat ID and it exists in loaded histories
        setActiveChat(lastActiveChatId);
        const activeHistory = parsedHistories.find(chat => chat.id === lastActiveChatId);
        if (activeHistory) {
          setMessages(activeHistory.messages);
        }
      } else if (parsedHistories.length > 0) {
        // If no active chat but we have histories, use the most recent one
        const mostRecent = parsedHistories.sort((a, b) => 
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        )[0];
        setActiveChat(mostRecent.id);
        setMessages(mostRecent.messages);
      } else {
        // If no histories at all, start with a blank slate
        const newChatId = generateId();
        const newChat = {
          id: newChatId,
          title: 'New Chat',
          createdAt: new Date(),
          updatedAt: new Date(),
          messages: []
        };
        setChatHistories([newChat]);
        setActiveChat(newChatId);
        setMessages([]);
      }
    } catch (error) {
      console.error('Error loading chat histories:', error);
      // Handle corrupt data by starting fresh
      const newChatId = generateId();
      const newChat = {
        id: newChatId,
        title: 'New Chat',
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: []
      };
      setChatHistories([newChat]);
      setActiveChat(newChatId);
      setMessages([]);
      localStorage.removeItem('chatHistories');
      localStorage.removeItem('activeChatId');
    }
  }, []);

  // Save chat histories to localStorage when they change
  useEffect(() => {
    if (chatHistories.length > 0) {
      localStorage.setItem('chatHistories', JSON.stringify(chatHistories));
    }
    
    if (activeChat) {
      localStorage.setItem('activeChatId', activeChat);
    }
  }, [chatHistories, activeChat]);

  // Update the active chat in the chat histories whenever messages change
  useEffect(() => {
    if (activeChat && messages) {
      setChatHistories(prev => {
        // Find and update the active chat
        const updatedHistories = prev.map(chat => {
          if (chat.id === activeChat) {
            // Generate a title from the first user message if there is one
            let title = chat.title;
            if (messages.length > 0 && !title || title === 'New Chat' || title === 'Untitled Chat') {
              const firstUserMsg = messages.find(m => m.sender === 'user');
              if (firstUserMsg) {
                title = firstUserMsg.text.length > 30
                  ? firstUserMsg.text.substring(0, 30) + '...'
                  : firstUserMsg.text;
              }
            }
            
            return {
              ...chat,
              title,
              messages,
              updatedAt: new Date()
            };
          }
          return chat;
        });
        
        return updatedHistories;
      });
    }
  }, [activeChat, messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;
    setError(null);

    const userMessage: Message = { 
      id: generateId(),
      text, 
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    
    // Handle offline mode
    if (!isOnline) {
      setTimeout(() => {
        const offlineMessage: Message = {
          id: generateId(),
          text: 'You appear to be offline. Your message has been saved and will be processed when you reconnect.',
          sender: 'ai',
          timestamp: new Date(),
          isOffline: true
        };
        setMessages(prev => [...prev, offlineMessage]);
        setIsLoading(false);
      }, 500);
      return;
    }
    
    try {
      const data = await fetchAnswer({
        namespace: "Demo-doc",
        query: text,
        type: "text",
        top_k: 3,
        aiModel: "anthropic.claude-3-7-sonnet-20250219-v1:0",
        temperature: 0.7,
        kiosk_mode: true,
        threshold: 0.7,
        chatHistory: [...messages, userMessage].map((m) => ({ role: m.sender, content: m.text })),
        headerPrompt: "You are a helpful AI assistant.",
        footerPrompt: "Provide a clear and concise answer.",
      });
      const aiMessage: Message = {
        id: generateId(),
        text: data.answer || data.response || '(No response)',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(errorMessage);
      
      const errorAiMessage: Message = {
        id: generateId(),
        text: 'Sorry, I encountered an error processing your request. Please try again.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorAiMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [isOnline, messages]);

  const clearMessages = useCallback(() => {
    if (activeChat) {
      setMessages([]);
      setChatHistories(prev => prev.map(chat => 
        chat.id === activeChat 
          ? { ...chat, messages: [], title: 'New Chat', updatedAt: new Date() } 
          : chat
      ));
    }
  }, [activeChat]);

  const startNewChat = useCallback(() => {
    const newChatId = generateId();
    const newChat: ChatHistory = {
      id: newChatId,
      title: 'New Chat',
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: []
    };
    
    setChatHistories(prev => [newChat, ...prev]);
    setActiveChat(newChatId);
    setMessages([]);
  }, []);

  const switchChat = useCallback((chatId: string) => {
    if (chatId && chatHistories.some(chat => chat.id === chatId)) {
      setActiveChat(chatId);
      const chat = chatHistories.find(c => c.id === chatId);
      if (chat) {
        setMessages(chat.messages);
      }
    }
  }, [chatHistories]);

  const deleteChat = useCallback((chatId: string) => {
    // Remove the chat from histories
    setChatHistories(prev => {
      const filtered = prev.filter(chat => chat.id !== chatId);
      return filtered;
    });
    
    // If we deleted the active chat, switch to another one or create new
    if (activeChat === chatId) {
      const remainingChats = chatHistories.filter(chat => chat.id !== chatId);
      if (remainingChats.length > 0) {
        const nextChat = remainingChats[0];
        setActiveChat(nextChat.id);
        setMessages(nextChat.messages);
      } else {
        startNewChat();
      }
    }
  }, [activeChat, chatHistories, startNewChat]);

  return {
    messages,
    sendMessage,
    clearMessages,
    startNewChat,
    switchChat,
    deleteChat,
    isLoading,
    error,
    isOnline,
    activeChat,
    chatHistories
  };
} 