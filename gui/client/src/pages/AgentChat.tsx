import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronRight, Code2, Play, Settings, Zap } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "agent";
  content: string;
  timestamp: Date;
  codeOutput?: string;
}

export default function AgentChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "agent",
      content: "Hello! I'm AGENT, your AI assistant. I'm ready to help you with code execution, analysis, and more. What would you like me to do?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate agent response
    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "agent",
        content: `I received your message: "${input}". Processing...`,
        timestamp: new Date(),
        codeOutput: "$ python script.py\nExecution completed successfully.",
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 border-r border-border bg-card p-4 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-primary mb-1">AGENT</h1>
          <p className="text-xs text-muted-foreground">AI Code Executor</p>
        </div>

        <div className="space-y-2 mb-8">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Zap className="w-4 h-4" />
                New Chat
              </Button>
            </TooltipTrigger>
            <TooltipContent>Start a new conversation</TooltipContent>
          </Tooltip>
        </div>

        <div className="flex-1">
          <p className="text-xs font-semibold text-muted-foreground mb-3">RECENT</p>
          <div className="space-y-2">
            {/* Placeholder for recent chats */}
            <div className="text-xs text-muted-foreground p-2 rounded hover:bg-background/50 cursor-pointer transition-colors">
              No recent chats
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Button>
            </TooltipTrigger>
            <TooltipContent>Configure AGENT settings</TooltipContent>
          </Tooltip>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b border-border bg-card/50 backdrop-blur-sm px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Chat</h2>
              <p className="text-xs text-muted-foreground">DeepSeek API • Auto-run enabled</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-muted-foreground">Ready</span>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4 max-w-4xl">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 animate-in fade-in slide-in-from-bottom-4 ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 font-bold text-xs ${
                    message.role === "user"
                      ? "bg-secondary text-secondary-foreground"
                      : "bg-primary text-primary-foreground"
                  }`}
                >
                  {message.role === "user" ? "U" : "A"}
                </div>

                {/* Message Content */}
                <div className={`flex-1 ${message.role === "user" ? "text-right" : ""}`}>
                  <Card
                    className={`p-4 ${
                      message.role === "user"
                        ? "bg-secondary/20 border-secondary/30"
                        : "bg-card border-border"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>

                    {/* Code Output */}
                    {message.codeOutput && (
                      <div className="mt-3 pt-3 border-t border-border/50">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="grid w-full grid-cols-2 bg-background/50">
                            <TabsTrigger value="output" className="text-xs">
                              Output
                            </TabsTrigger>
                            <TabsTrigger value="code" className="text-xs">
                              Code
                            </TabsTrigger>
                          </TabsList>
                          <TabsContent value="output" className="mt-2">
                            <div className="bg-background/80 border border-border rounded p-3 font-mono text-xs text-primary overflow-x-auto">
                              <pre>{message.codeOutput}</pre>
                            </div>
                          </TabsContent>
                          <TabsContent value="code" className="mt-2">
                            <div className="bg-background/80 border border-border rounded p-3 font-mono text-xs text-accent overflow-x-auto">
                              <pre>print("Hello, AGENT!")</pre>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </div>
                    )}
                  </Card>

                  <p className="text-xs text-muted-foreground mt-2">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-4 animate-in fade-in">
                <div className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0 bg-primary text-primary-foreground font-bold text-xs">
                  A
                </div>
                <div className="flex-1">
                  <Card className="p-4 bg-card border-border">
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
                      <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.4s" }} />
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t border-border bg-card/50 backdrop-blur-sm p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && e.ctrlKey) {
                    handleSendMessage();
                  }
                }}
                placeholder="Ask AGENT to execute code, analyze data, or help with tasks... (Ctrl+Enter to send)"
                className="resize-none bg-background border-border"
                rows={3}
              />
              <div className="flex flex-col gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={handleSendMessage}
                      disabled={!input.trim() || isLoading}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send message</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Code2 className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Code snippet</TooltipContent>
                </Tooltip>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Play className="w-4 h-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Execute code</TooltipContent>
                </Tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
