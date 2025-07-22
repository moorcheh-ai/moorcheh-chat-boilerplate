'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Paperclip } from 'lucide-react';
import { getCommonConfig } from "@/lib/chat-config";

interface MessageInputProps {
  onSend: (text: string) => void;
  isLoading?: boolean;
}

export default function MessageInput({ onSend, isLoading = false }: MessageInputProps) {
  const [text, setText] = useState<string>('');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const commonConfig = getCommonConfig();
  
  // Focus input on component mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim() && !isLoading) {
      onSend(text.trim());
      setText('');
    }
  };
  
  // Handle Enter to send, Shift+Enter for new line
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && !isLoading) {
      e.preventDefault();
      if (text.trim()) {
        onSend(text.trim());
        setText('');
        // Reset height after sending
        if (inputRef.current) {
          inputRef.current.style.height = 'auto';
        }
      }
    }
    // Shift+Enter allows new lines (default behavior)
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <Textarea
          ref={inputRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          disabled={isLoading}
          rows={1}
          className={`flex-1 min-h-[48px] max-h-32 py-3 px-4 bg-background border-border rounded-lg text-sm md:text-base text-foreground placeholder:text-muted-foreground resize-none`}
          style={{
            height: 'auto',
            overflow: text.split('\n').length > 1 || text.length > 50 ? 'auto' : 'hidden'
          }}
          onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
            const target = e.target as HTMLTextAreaElement;
            target.style.height = 'auto';
            target.style.height = `${Math.min(target.scrollHeight, 128)}px`;
          }}
        />
        <Button 
          type="submit" 
          size="sm"
          disabled={isLoading || !text.trim()}
          className="px-3 flex-shrink-0 self-end"
        >
          <Send size={14} />
        </Button>
      </form>
    </div>
  );
} 