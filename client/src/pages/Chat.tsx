import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Send, Sparkles, Loader2, User, Bot } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import type { ChatMessage } from "@shared/schema";

const suggestedPrompts = [
  "Suggest an outfit for a job interview",
  "What makeup look works for a summer wedding?",
  "How do I style my hair for my face shape?",
  "What colors should I avoid with my undertone?",
];

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hi! I'm your AI stylist assistant. I can help you with outfit suggestions, makeup tips, and personalized style advice. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      return await apiRequest<ChatMessage>("POST", "/api/chat", { content: message });
    },
    onSuccess: (response) => {
      setMessages((prev) => [...prev, response]);
    },
  });

  const handleSend = async () => {
    if (!input.trim() || chatMutation.isPending) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    chatMutation.mutate(input);
  };

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold mb-2" data-testid="heading-ai-assistant">AI Style Assistant</h1>
          <p className="text-lg text-muted-foreground" data-testid="text-assistant-description">
            Get personalized fashion and beauty advice powered by AI
          </p>
        </div>

        <Card className="shadow-xl">
          <CardContent className="p-0">
            {/* Messages Container */}
            <div className="h-[600px] overflow-y-auto p-6 space-y-6" data-testid="chat-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  data-testid={`message-${message.role}-${message.id}`}
                >
                  {message.role === "assistant" && (
                    <Avatar className="h-8 w-8 mt-1" data-testid={`avatar-assistant-${message.id}`}>
                      <AvatarFallback className="bg-primary/10">
                        <Bot className="h-4 w-4 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className={`max-w-[80%] space-y-2 ${message.role === "user" ? "items-end" : "items-start"}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                      data-testid={`message-bubble-${message.id}`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap" data-testid={`message-content-${message.id}`}>{message.content}</p>
                    </div>
                    <div className="text-xs text-muted-foreground px-2" data-testid={`message-time-${message.id}`}>
                      {new Date(message.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>

                  {message.role === "user" && (
                    <Avatar className="h-8 w-8 mt-1" data-testid={`avatar-user-${message.id}`}>
                      <AvatarFallback className="bg-chart-2/10">
                        <User className="h-4 w-4 text-chart-2" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}

              {chatMutation.isPending && (
                <div className="flex gap-3 justify-start">
                  <Avatar className="h-8 w-8 mt-1">
                    <AvatarFallback className="bg-primary/10">
                      <Bot className="h-4 w-4 text-primary" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span className="text-sm text-muted-foreground">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Prompts */}
            {messages.length === 1 && (
              <div className="px-6 pb-4 border-t border-border pt-4">
                <div className="text-sm font-medium mb-3" data-testid="text-try-asking">Try asking:</div>
                <div className="flex flex-wrap gap-2">
                  {suggestedPrompts.map((prompt, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover-elevate active-elevate-2 transition-all px-3 py-1.5"
                      onClick={() => handleSuggestedPrompt(prompt)}
                      data-testid={`suggested-prompt-${index}`}
                    >
                      {prompt}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  placeholder="Ask me anything about fashion, makeup, or styling..."
                  className="flex-1 rounded-full"
                  disabled={chatMutation.isPending}
                  data-testid="input-chat-message"
                />
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || chatMutation.isPending}
                  size="icon"
                  className="rounded-full"
                  data-testid="button-send-message"
                >
                  {chatMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Feature Info */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="font-semibold text-sm">Personalized Advice</div>
                <div className="text-xs text-muted-foreground">Based on your analysis</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-2/10 flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-chart-2" />
              </div>
              <div>
                <div className="font-semibold text-sm">AI-Powered</div>
                <div className="text-xs text-muted-foreground">Smart fashion insights</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-chart-3/10 flex items-center justify-center flex-shrink-0">
                <User className="h-5 w-5 text-chart-3" />
              </div>
              <div>
                <div className="font-semibold text-sm">Always Available</div>
                <div className="text-xs text-muted-foreground">24/7 style support</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
