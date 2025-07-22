'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Download, BookOpen, WifiOff, MessageSquare, Clock, PlusCircle, Trash, X } from 'lucide-react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
// import FileUploader from './FileUploader';
import useChat from '@/hooks/useChat';
import { formatDistanceToNow } from 'date-fns';
// import { fetchAnswer } from "@/lib/answer";
import { getInterfaceConfig, getCommonConfig } from "@/lib/chat-config";

export default function ChatWindow() {
  const { 
    messages, 
    sendMessage, 
    clearMessages, 
    startNewChat, 
    deleteChat,
    switchChat,
    isLoading, 
    isOnline,
    activeChat,
    chatHistories
  } = useChat();

  // const [showSidebar, setShowSidebar] = useState(false);
  const interfaceConfig = getInterfaceConfig();
  const commonConfig = getCommonConfig();

  const exportChat = () => {
    const chatText = messages.map(m => 
      `${m.sender.toUpperCase()} (${m.timestamp?.toLocaleString() || 'unknown'}): ${m.text}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Moorcheh-chat-${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteChat = (chatId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteChat(chatId);
  };

  const handleSwitchChat = (chatId: string) => {
    switchChat(chatId);
    // Close sidebar on mobile after selecting a chat
    // setShowSidebar(false);
  };

  const getLayoutClasses = () => {
    const { layout, maxWidth } = interfaceConfig;
    switch (layout) {
      case 'centered':
        return `max-w-[${maxWidth}] mx-auto min-h-screen flex flex-col`;
      case 'fullscreen':
        return 'min-h-screen w-full flex flex-col';
      default:
        return 'flex flex-col md:flex-row min-h-screen w-full';
    }
  };

  const showSidebarInLayout = interfaceConfig.showSidebar && interfaceConfig.layout === 'sidebar';

  return (
    <div className={getLayoutClasses()}>
      {/* Sidebar / Chat History */}
      {showSidebarInLayout && (
        <aside className="w-full md:max-w-xs border-r bg-card flex flex-col">
        <Card className="h-full shadow-sm">
          <CardHeader className="p-4 pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-md flex items-center gap-2">
                <MessageSquare size={16} />
                Chat History
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0" 
                  onClick={startNewChat}
                  title="Start New Chat"
                >
                  <PlusCircle size={16} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 md:hidden"
                  onClick={() => {/* setShowSidebar(false) */}}
                >
                  <X size={16} />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-2 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 120px)' }}>
            {chatHistories.length > 0 ? (
              <div className="space-y-1">
                {chatHistories.map(chat => (
                  <div 
                    key={chat.id}
                    className={`p-3 rounded-md cursor-pointer hover:bg-gray-100 flex items-start justify-between group ${
                      activeChat === chat.id ? 'bg-blue-50 border border-blue-200' : ''
                    }`}
                    onClick={() => handleSwitchChat(chat.id)}
                  >
                    <div className="overflow-hidden">
                      <div className="text-sm font-medium truncate">
                        {chat.title || 'New Chat'}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                        <Clock size={12} />
                        {formatDistanceToNow(new Date(chat.updatedAt), { addSuffix: true })}
                        <span className="ml-1">• {chat.messages.length} messages</span>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-500"
                      onClick={(e) => handleDeleteChat(chat.id, e)}
                    >
                      <Trash size={14} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-500 text-sm p-4">
                No conversations yet
              </div>
            )}
          </CardContent>
        </Card>
        </aside>
      )}
      
      {/* Main Chat Area */}
      <main className={`flex-1 flex flex-col ${interfaceConfig.layout === 'sidebar' ? 'bg-muted/30' : 'bg-background'}`}>
        <Card className="w-full shadow-lg border flex flex-col h-full">
          <CardHeader className="border-b px-3 md:px-6 py-3 md:py-4 flex flex-row justify-between items-center bg-card">
            <div className="flex items-center gap-2">
              <div className="bg-primary/20 p-1 rounded-full">
                <BookOpen size={18} className="text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg md:text-xl">{commonConfig.branding.title}</CardTitle>
                {commonConfig.branding.subtitle && interfaceConfig.layout !== 'sidebar' && (
                  <p className="text-sm text-muted-foreground">{commonConfig.branding.subtitle}</p>
                )}

                {!isOnline && (
                  <div className="flex items-center gap-1 text-xs text-yellow-600 mt-1">
                    <WifiOff size={12} />
                    <span>Offline Mode - Your messages will be saved</span>
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-1 md:gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-xs p-2 h-8 md:text-sm md:p-2"
                onClick={startNewChat}
              >
                <PlusCircle size={14} className="hidden md:inline" />
                <span className="md:inline">New</span>
              </Button>
              {messages.length > 0 && commonConfig.enableExport && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1 text-xs p-2 h-8 md:text-sm md:p-2"
                  onClick={exportChat}
                >
                  <Download size={14} className="hidden md:inline" />
                  <span className="md:inline">Export</span>
                </Button>
              )}
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-xs p-2 h-8 md:text-sm md:p-2"
                onClick={clearMessages}
              >
                <Trash2 size={14} className="hidden md:inline" />
                <span className="md:inline">Clear</span>
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="flex-1 overflow-y-auto px-3 md:px-6 py-4">
            <MessageList 
              messages={messages} 
              isLoading={isLoading} 
              onSendExample={sendMessage}
            />
            
          </CardContent>
          
          <CardFooter className="px-3 md:px-6 py-3 md:py-4 bg-card sticky bottom-0 z-10 border-t flex flex-col md:flex-row gap-2 items-end" style={{ background: 'var(--card)', borderColor: 'var(--border)' }}>

            <div className="flex-1 min-w-0 flex flex-col">
              <MessageInput onSend={sendMessage} isLoading={isLoading} />
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
} 
