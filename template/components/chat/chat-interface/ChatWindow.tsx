'use client';

import { Button } from '@/components/ui/button';
import { BookOpen, WifiOff, MessageSquare, Clock, PlusCircle, Trash } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import useChat from '@/hooks/useChat';
import { formatDistanceToNow } from 'date-fns';
import { getInterfaceConfig, getCommonConfig } from "@/lib/chat-config";

export default function ChatWindow() {
  const { 
    messages, 
    sendMessage, 
    startNewChat, 
    deleteChat,
    switchChat,
    isLoading, 
    isOnline,
    activeChat,
    chatHistories
  } = useChat();

  const interfaceConfig = getInterfaceConfig();
  const commonConfig = getCommonConfig();



  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  const handleSwitchChat = (chatId: string) => {
    switchChat(chatId);
  };

  const getLayoutClasses = () => {
    const { layout, maxWidth } = interfaceConfig;
    switch (layout) {
      case 'centered':
        return `max-w-[${maxWidth}] mx-auto h-[calc(100vh-8rem)] flex flex-col gap-4 p-4`;
      case 'fullscreen':
        return 'h-[calc(100vh-6rem)] w-full flex flex-col gap-4 p-4';
      default:
        return 'flex flex-col md:flex-row h-[calc(100vh-6rem)] w-full gap-4 p-4';
    }
  };

  const showSidebarInLayout = interfaceConfig.showSidebar && interfaceConfig.layout === 'sidebar';

  return (
    <div className={getLayoutClasses()}>
      {/* Sidebar / Chat History - Separate rounded container */}
      {showSidebarInLayout && (
        <aside className="w-full md:w-80 rounded-xl border border-border bg-card shadow-sm flex flex-col h-full overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="p-4 pb-2 border-b border-border">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-card-foreground">
                  <MessageSquare size={16} />
                  <h2 className="text-md font-semibold">Chat History</h2>
                </div>
                <div className="flex items-center gap-1">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 hover:bg-muted" 
                    onClick={startNewChat}
                    title="Start New Chat"
                  >
                    <PlusCircle size={16} />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {chatHistories.length > 0 ? (
                <div className="space-y-1.5">
                  {chatHistories.map(chat => (
                    <div 
                      key={chat.id}
                      className={`p-3 rounded-md cursor-pointer hover:bg-accent hover:text-accent-foreground flex items-start justify-between group transition-colors ${
                        activeChat === chat.id ? 'bg-primary/10 border border-primary/20' : ''
                      }`}
                      onClick={() => handleSwitchChat(chat.id)}
                    >
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium truncate text-foreground">
                          {chat.title || 'New Chat'}
                        </div>
                        <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <Clock size={12} />
                          {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: true })}
                          <span className="ml-1">• {chat.messages.length} messages</span>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-opacity"
                        onClick={(e) => handleDeleteChat(chat.id, e)}
                      >
                        <Trash size={14} />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground text-sm p-4">
                  <MessageSquare size={24} className="opacity-20 mb-2" />
                  <p>No conversations yet</p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="mt-4"
                    onClick={startNewChat}
                  >
                    <PlusCircle size={14} className="mr-1" />
                    Start a new chat
                  </Button>
                </div>
              )}
            </div>
          </div>
        </aside>
      )}
      
      {/* Main Chat Area - One unified rounded container */}
      <main className="flex-1 rounded-xl border border-border bg-card shadow-sm overflow-hidden flex flex-col h-full">
        {/* Chat Header */}
        <div className="border-b border-border px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-full">
              <BookOpen size={18} className="text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-card-foreground">{commonConfig.branding.title}</h1>
              {commonConfig.branding.subtitle && interfaceConfig.layout !== 'sidebar' && (
                <p className="text-sm text-muted-foreground">{commonConfig.branding.subtitle}</p>
              )}

              {!isOnline && (
                <div className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                  <WifiOff size={12} />
                  <span>Offline Mode - Your messages will be saved</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex gap-1.5">
            <Button 
              variant="outline" 
              size="sm"
              className="h-8 text-xs md:text-sm border-border"
              onClick={startNewChat}
            >
              <PlusCircle size={14} className="mr-1.5 hidden md:inline" />
              <span>New</span>
            </Button>
          </div>
        </div>
        
        {/* Messages Area - Part of unified container */}
        <div className="flex-1 overflow-y-auto p-4 pb-8 mb-2">
          <MessageList 
            messages={messages} 
            isLoading={isLoading} 
            onSendExample={sendMessage}
          />
        </div>
        
        {/* Input Area - Part of unified container */}
        <div className="p-4 pt-2 border-t border-border">
          <MessageInput onSend={sendMessage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
} 
