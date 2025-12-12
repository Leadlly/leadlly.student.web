"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Send,
  Bot,
  User,
  Calendar,
  BarChart3,
  Flame,
  BookOpen,
  FileText,
  Target,
  HelpCircle,
  UserCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MarkdownRenderer } from "@/helpers/utils/markdown";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  toolResults?: ToolResult[];
  toolsUsed?: string[];
  timestamp: Date;
}

interface ToolResult {
  tool: string;
  uiType: string;
  data: any;
  error?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const TOOL_ICONS: Record<string, React.ReactNode> = {
  getUserProfile: <UserCircle className="w-4 h-4" />,
  getPlanner: <Calendar className="w-4 h-4" />,
  getTracker: <BarChart3 className="w-4 h-4" />,
  getStreak: <Flame className="w-4 h-4" />,
  getStudyProgress: <Target className="w-4 h-4" />,
  getQuizzes: <BookOpen className="w-4 h-4" />,
  getQuizReport: <FileText className="w-4 h-4" />,
  getSolvedQuestions: <HelpCircle className="w-4 h-4" />,
};

const TOOL_LABELS: Record<string, string> = {
  getUserProfile: "Profile",
  getPlanner: "Planner",
  getTracker: "Tracker",
  getStreak: "Streak",
  getStudyProgress: "Progress",
  getQuizzes: "Quizzes",
  getQuizReport: "Quiz Report",
  getSolvedQuestions: "Questions",
};

const TypingIndicator = () => (
  <div className="flex items-center gap-1">
    <span
      className="w-2 h-2 bg-primary rounded-full animate-bounce"
      style={{ animationDelay: "0ms" }}
    />
    <span
      className="w-2 h-2 bg-primary rounded-full animate-bounce"
      style={{ animationDelay: "150ms" }}
    />
    <span
      className="w-2 h-2 bg-primary rounded-full animate-bounce"
      style={{ animationDelay: "300ms" }}
    />
  </div>
);

const ToolCallIndicator = ({ tools, isLoading = false }: { tools: string[]; isLoading?: boolean }) => {
  if (tools.length === 0) return null;

  return (
    <div className="flex items-center gap-1 mb-2">
      <span className="text-xs text-muted-foreground mr-1">
        {isLoading ? "Analyzing:" : "Sources:"}
      </span>
      <div className="flex -space-x-1">
        {tools.map((tool, idx) => (
          <div
            key={`${tool}-${idx}`}
            className={cn(
              "w-7 h-7 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center",
              isLoading && "animate-in fade-in-0 zoom-in-50 duration-300"
            )}
            style={{ animationDelay: isLoading ? `${idx * 100}ms` : "0ms", zIndex: tools.length - idx }}
            title={TOOL_LABELS[tool] || tool}
          >
            <span className="text-primary">
              {TOOL_ICONS[tool] || <HelpCircle className="w-4 h-4" />}
            </span>
          </div>
        ))}
      </div>
      {tools.length > 0 && (
        <span className="text-xs text-muted-foreground ml-2">
          {tools.length} {tools.length === 1 ? "source" : "sources"}
        </span>
      )}
    </div>
  );
};

const AIMentorChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom, activeTools]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setActiveTools([]);

    const conversationHistory: ChatMessage[] = messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/ai/chat`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            message: userMessage.content,
            conversationHistory,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      if (data.toolResults && data.toolResults.length > 0) {
        const toolNames = data.toolResults.map((t: ToolResult) => t.tool);
        for (let i = 0; i < toolNames.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          setActiveTools((prev) => [...prev, toolNames[i]]);
        }
        await new Promise((resolve) => setTimeout(resolve, 500));
      }

      const toolsUsed = data.toolResults?.map((t: ToolResult) => t.tool) || [];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.reply,
        toolResults: data.toolResults,
        toolsUsed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setActiveTools([]);
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Sorry, I encountered an error. Please try again in a moment.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setActiveTools([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const renderToolResult = (toolResult: ToolResult) => {
    const { tool, uiType, data, error } = toolResult;

    if (error) {
      return (
        <div className="text-sm text-red-500 bg-red-50 px-3 py-2 rounded-lg mt-2">
          {error}
        </div>
      );
    }

    switch (uiType) {
      case "planner_view":
        return (
          <div className="bg-primary/5 rounded-lg p-3 mt-2 border border-primary/20">
            <div className="flex items-center gap-2 text-xs font-medium text-primary mb-2">
              <Calendar className="w-4 h-4" />
              Your Planner
            </div>
            {data?.today && (
              <div className="text-sm space-y-1">
                <div className="font-medium">Today ({data.today.day}):</div>
                <div className="ml-2 text-muted-foreground text-xs space-y-0.5">
                  <div>
                    📚 {data.today.continuousRevisionTopicsCount || 0} revision
                    topics
                  </div>
                  <div>📖 {data.today.chaptersCount || 0} chapters</div>
                  <div>✅ {data.today.completedCount || 0} completed</div>
                </div>
              </div>
            )}
          </div>
        );

      case "tracker_view":
        return (
          <div className="bg-green-50 rounded-lg p-3 mt-2 border border-green-200">
            <div className="flex items-center gap-2 text-xs font-medium text-green-700 mb-2">
              <BarChart3 className="w-4 h-4" />
              Progress Tracker
            </div>
            {data?.summary &&
              Object.entries(data.summary).map(
                ([subject, stats]: [string, any]) => (
                  <div key={subject} className="text-sm mb-1">
                    <span className="font-medium capitalize">{subject}:</span>
                    <span className="ml-2 text-muted-foreground text-xs">
                      {stats.avgEfficiency}% efficiency, {stats.totalChapters}{" "}
                      chapters
                    </span>
                  </div>
                )
              )}
          </div>
        );

      case "streak_card":
        return (
          <div className="bg-orange-50 rounded-lg p-3 mt-2 border border-orange-200">
            <div className="flex items-center gap-2 text-xs font-medium text-orange-700 mb-2">
              <Flame className="w-4 h-4" />
              Your Stats
            </div>
            <div className="flex gap-4 text-sm">
              <div>
                <span className="font-bold text-lg">{data?.streak || 0}</span>
                <span className="text-muted-foreground text-xs ml-1">
                  day streak
                </span>
              </div>
              <div>
                <span className="font-bold text-lg">{data?.level || 1}</span>
                <span className="text-muted-foreground text-xs ml-1">
                  level
                </span>
              </div>
              <div>
                <span className="font-bold text-lg">{data?.points || 0}</span>
                <span className="text-muted-foreground text-xs ml-1">
                  points
                </span>
              </div>
            </div>
          </div>
        );

      case "progress_chart":
        return (
          <div className="bg-blue-50 rounded-lg p-3 mt-2 border border-blue-200">
            <div className="flex items-center gap-2 text-xs font-medium text-blue-700 mb-2">
              <Target className="w-4 h-4" />
              Study Progress ({data?.period})
            </div>
            {data?.today && (
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session</span>
                  <span className="font-medium">{data.today.session}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Quiz</span>
                  <span className="font-medium">{data.today.quiz}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Overall</span>
                  <span className="font-medium">{data.today.overall}%</span>
                </div>
              </div>
            )}
          </div>
        );

      case "quiz_list":
        return (
          <div className="bg-purple-50 rounded-lg p-3 mt-2 border border-purple-200">
            <div className="flex items-center gap-2 text-xs font-medium text-purple-700 mb-2">
              <BookOpen className="w-4 h-4" />
              Your Quizzes
            </div>
            <div className="text-sm text-muted-foreground">
              {data?.length || 0} quizzes found
            </div>
          </div>
        );

      case "user_profile_card":
        return (
          <div className="bg-indigo-50 rounded-lg p-3 mt-2 border border-indigo-200">
            <div className="flex items-center gap-2 text-xs font-medium text-indigo-700 mb-2">
              <UserCircle className="w-4 h-4" />
              Your Profile
            </div>
            {data && (
              <div className="text-sm space-y-1">
                <div className="font-medium">{data.name}</div>
                {data.academic?.exam && (
                  <div className="text-xs text-muted-foreground">
                    Preparing for {data.academic.exam.toUpperCase()}
                  </div>
                )}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] md:h-[85vh] flex flex-col bg-gradient-to-b from-primary/5 to-white rounded-xl overflow-hidden border">
      {/* Header */}
      <div className="bg-white px-4 py-3 border-b flex items-center gap-3">
        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="font-semibold text-lg">AI Mentor</h2>
          <p className="text-xs text-muted-foreground">
            Your personal study assistant
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto custom__scrollbar px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Welcome to AI Mentor!
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              I'm here to help with your studies, track progress, and provide
              support. Ask me anything about your preparation!
            </p>
            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              {[
                "Show my planner",
                "How's my progress?",
                "What's my streak?",
                "I'm feeling stressed",
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-3 py-1.5 bg-primary/10 text-primary text-sm rounded-full hover:bg-primary/20 transition"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "flex gap-3",
              message.role === "user" ? "justify-end" : "justify-start"
            )}
          >
            {message.role === "assistant" && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-primary text-white">
                  <Bot className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                "max-w-[85%]",
                message.role === "user" ? "order-1" : ""
              )}
            >
              {message.role === "assistant" && message.toolsUsed && message.toolsUsed.length > 0 && (
                <ToolCallIndicator tools={message.toolsUsed} isLoading={false} />
              )}
              <div
                className={cn(
                  "px-4 py-2.5 rounded-2xl",
                  message.role === "user"
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-white border shadow-sm rounded-bl-md"
                )}
              >
                {message.role === "assistant" ? (
                  <MarkdownRenderer content={message.content} />
                ) : (
                  <p className="text-sm whitespace-pre-wrap">
                    {message.content}
                  </p>
                )}
              </div>
              {message.toolResults?.map((toolResult, idx) => (
                <div key={idx}>{renderToolResult(toolResult)}</div>
              ))}
              <span className="text-xs text-muted-foreground mt-1 block">
                {message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>
            {message.role === "user" && (
              <Avatar className="w-8 h-8 shrink-0">
                <AvatarFallback className="bg-secondary">
                  <User className="w-4 h-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 items-start">
            <Avatar className="w-8 h-8 shrink-0">
              <AvatarFallback className="bg-primary text-white">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="max-w-[85%]">
              {activeTools.length > 0 && (
                <ToolCallIndicator tools={activeTools} isLoading={true} />
              )}
              <div className="bg-white border shadow-sm rounded-2xl rounded-bl-md px-4 py-3">
                <TypingIndicator />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-white border-t p-3">
        <div className="flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about your studies..."
            className="resize-none min-h-[44px] max-h-32 border-primary/30 focus:border-primary"
            rows={1}
            disabled={isLoading}
          />
          <Button
            onClick={sendMessage}
            disabled={!input.trim() || isLoading}
            className="h-11 w-11 shrink-0"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AIMentorChat;
