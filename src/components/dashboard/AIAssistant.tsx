import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, X, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hi! I'm your AI assistant. I can help you create content, analyze campaigns, suggest influencers, and more. What would you like to do today?",
      isBot: true,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getBotResponse(inputMessage),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    if (lowerInput.includes('campaign') && lowerInput.includes('suggest')) {
      return "Based on your recent activity, I suggest creating a spring fashion campaign targeting Gen Z. The best performing creators in this niche are currently Sarah Johnson and Lisa Wang. Would you like me to help you set this up?";
    }
    
    if (lowerInput.includes('caption') || lowerInput.includes('content')) {
      return "I can help you generate engaging captions! For best results, tell me: 1) What's the content about? 2) What's your brand tone? 3) Target audience? I'll create multiple options with relevant hashtags.";
    }
    
    if (lowerInput.includes('analytics') || lowerInput.includes('performance')) {
      return "Your current campaign performance looks great! Engagement is up 23% this month. Your top-performing content includes lifestyle posts and behind-the-scenes content. Should I create a detailed report?";
    }
    
    if (lowerInput.includes('influencer') || lowerInput.includes('creator')) {
      return "I found 12 creators matching your criteria. Based on engagement rates and audience alignment, I recommend Sarah Johnson (Instagram, 125K followers, 4.2% engagement) and Mike Chen (TikTok, 89K followers, 6.8% engagement). Want to see their full profiles?";
    }
    
    return "I can help you with content creation, campaign management, influencer discovery, analytics, and more. Could you be more specific about what you'd like assistance with?";
  };

  return (
    <>
      {/* Floating Assistant Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gradient-primary shadow-brand animate-glow-pulse"
            >
              <Bot className="w-6 h-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20, y: 20 }}
            className={`fixed bottom-6 right-6 z-50 ${
              isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
            } transition-all duration-300`}
          >
            <Card className="h-full shadow-xl border-primary/20">
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-primary text-primary-foreground">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5" />
                  <CardTitle className="text-lg">AI Assistant</CardTitle>
                  {isTyping && (
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <div className="w-2 h-2 bg-primary-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  )}
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={() => setIsMinimized(!isMinimized)}
                  >
                    {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-primary-foreground hover:bg-primary-foreground/20"
                    onClick={() => setIsOpen(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>

              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="flex flex-col h-full"
                  >
                    <CardContent className="flex-1 flex flex-col p-0">
                      <ScrollArea className="flex-1 p-4">
                        <div className="space-y-4">
                          {messages.map((message) => (
                            <motion.div
                              key={message.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                            >
                              <div
                                className={`max-w-[80%] p-3 rounded-lg ${
                                  message.isBot
                                    ? 'bg-muted text-foreground'
                                    : 'bg-primary text-primary-foreground'
                                }`}
                              >
                                <p className="text-sm">{message.content}</p>
                                <p className="text-xs opacity-70 mt-1">
                                  {message.timestamp.toLocaleTimeString([], { 
                                    hour: '2-digit', 
                                    minute: '2-digit' 
                                  })}
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </ScrollArea>

                      <div className="p-4 border-t">
                        <div className="flex gap-2">
                          <Input
                            placeholder="Ask me anything..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                            disabled={isTyping}
                          />
                          <Button 
                            onClick={sendMessage} 
                            disabled={isTyping || !inputMessage.trim()}
                            className="bg-gradient-primary"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}