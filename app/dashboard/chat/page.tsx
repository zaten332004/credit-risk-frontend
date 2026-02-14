'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Loader2 } from 'lucide-react';
import { authJsonHeaders } from '@/lib/auth/token';
import { useI18n } from '@/components/i18n-provider';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
}

export default function ChatPage() {
  const { t } = useI18n();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: t('chat.initial_message'),
      sender: 'assistant',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/v1/chat/query', {
        method: 'POST',
        headers: authJsonHeaders(),
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(t('chat.send_failed'));
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text:
          data.reply ||
          t('chat.default_reply'),
        sender: 'assistant',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        text: t('chat.error_generic'),
        sender: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-5rem)] p-8 gap-4">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">{t('chat.title')}</h1>
        <p className="text-muted-foreground mt-2">
          {t('chat.desc')}
        </p>
      </div>

      {/* Chat Container */}
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle>{t('chat.card_title')}</CardTitle>
          <CardDescription>
            {t('chat.card_desc')}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 pr-4 mb-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-secondary text-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground rounded-lg px-4 py-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="flex gap-2">
            <Input
              placeholder={t('chat.placeholder')}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={isLoading || !input.trim()}
              className="shrink-0"
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
