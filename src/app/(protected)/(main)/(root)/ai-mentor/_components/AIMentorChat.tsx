"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Bot, User, HelpCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MarkdownRenderer } from "@/helpers/utils/markdown";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import PlannerIcon from "@/components/icons/PlannerIcon";
import TrackerIcon from "@/components/icons/TrackerIcon";
import QuizIcon from "@/components/icons/QuizIcon";
import DashboardIcon from "@/components/icons/DashboardIcon";
import GrowthMeterIcon from "@/components/icons/GrowthMeterIcon";
import TrophyIcon from "@/components/icons/TrophyIcon";
import ErrorBookIcon from "@/components/icons/ErrorBookIcon";

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
  getUserProfile: <DashboardIcon className="w-4 h-4 stroke-primary" />,
  getPlanner: <PlannerIcon className="w-4 h-4 stroke-primary" />,
  getTracker: <TrackerIcon className="w-4 h-4 stroke-primary" />,
  getStreak: <TrophyIcon className="w-4 h-4" />,
  getStudyProgress: <GrowthMeterIcon className="w-4 h-4 fill-primary" />,
  getQuizzes: <QuizIcon className="w-4 h-4 stroke-primary" />,
  getQuizReport: <QuizIcon className="w-4 h-4 stroke-primary" />,
  getSolvedQuestions: <ErrorBookIcon className="w-4 h-4 stroke-primary" />,
};

const TOOL_LABELS: Record<string, string> = {
  getUserProfile: "Your Profile",
  getPlanner: "Study Planner",
  getTracker: "Progress Tracker",
  getStreak: "Streak & Points",
  getStudyProgress: "Study Progress",
  getQuizzes: "Quiz History",
  getQuizReport: "Quiz Report",
  getSolvedQuestions: "Solved Questions",
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

const ToolCallIndicator = ({ 
  tools, 
  toolResults = [], 
  isLoading = false 
}: { 
  tools: string[]; 
  toolResults?: ToolResult[];
  isLoading?: boolean 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (tools.length === 0) return null;

  const getToolResultData = (toolName: string) => {
    return toolResults.find(r => r.tool === toolName);
  };

  const renderToolData = (toolName: string, result: ToolResult | undefined) => {
    if (!result || result.error) {
      return <p className="text-xs text-muted-foreground">No data available</p>;
    }

    const { data, uiType } = result;

    switch (uiType) {
      case "planner_view":
        return (
          <div className="space-y-2">
            {data?.today ? (
              <>
                <p className="text-sm font-medium">{data.today.day}&apos;s Plan</p>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="bg-blue-50 p-2 rounded-lg text-center">
                    <div className="text-lg font-bold text-blue-600">{data.today.continuousRevisionTopicsCount || 0}</div>
                    <div className="text-muted-foreground">Revision Topics</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-lg text-center">
                    <div className="text-lg font-bold text-purple-600">{data.today.chaptersCount || 0}</div>
                    <div className="text-muted-foreground">Chapters</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded-lg text-center">
                    <div className="text-lg font-bold text-green-600">{data.today.completedCount || 0}</div>
                    <div className="text-muted-foreground">Completed</div>
                  </div>
                </div>
                {data.today.backRevisionTopicsCount > 0 && (
                  <p className="text-xs text-orange-600">⚠️ {data.today.backRevisionTopicsCount} back revision topics pending</p>
                )}
              </>
            ) : (
              <p className="text-xs text-muted-foreground">No planner data for today</p>
            )}
          </div>
        );

      case "tracker_view":
        return (
          <div className="space-y-2">
            {data?.summary && Object.keys(data.summary).length > 0 ? (
              Object.entries(data.summary).map(([subject, stats]: [string, any]) => (
                <div key={subject} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                  <span className="font-medium capitalize">{subject}</span>
                  <div className="flex gap-3 text-xs">
                    <span className={cn(
                      "px-2 py-0.5 rounded",
                      stats.avgEfficiency >= 70 ? "bg-green-100 text-green-700" :
                      stats.avgEfficiency >= 50 ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {stats.avgEfficiency}% efficiency
                    </span>
                    <span className="text-muted-foreground">{stats.totalChapters} chapters</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-xs text-muted-foreground">No tracker data available</p>
            )}
          </div>
        );

      case "streak_card":
        return (
          <div className="flex gap-4 justify-around text-center p-2 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg">
            <div>
              <div className="text-2xl font-bold text-orange-600">{data?.streak || 0}🔥</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600">{data?.level || 1}</div>
              <div className="text-xs text-muted-foreground">Level</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600">{data?.points || 0}</div>
              <div className="text-xs text-muted-foreground">Points</div>
            </div>
          </div>
        );

      case "progress_chart":
        return (
          <div className="space-y-2">
            {data?.today ? (
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs">Session</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${data.today.session}%` }} />
                    </div>
                    <span className="text-xs font-medium w-10">{data.today.session}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs">Quiz</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${data.today.quiz}%` }} />
                    </div>
                    <span className="text-xs font-medium w-10">{data.today.quiz}%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium">Overall</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${data.today.overall}%` }} />
                    </div>
                    <span className="text-xs font-bold w-10">{data.today.overall}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground">No progress data for today</p>
            )}
          </div>
        );

      case "quiz_list":
        return (
          <div className="space-y-1">
            <p className="text-sm font-medium">{data?.length || 0} quizzes found</p>
            {data?.slice?.(0, 3).map((quiz: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-1.5 bg-gray-50 rounded text-xs">
                <span className="capitalize">{quiz.quizType}</span>
                <span className={quiz.attempted ? "text-green-600" : "text-orange-600"}>
                  {quiz.attempted ? "✓ Done" : "Pending"}
                </span>
              </div>
            ))}
          </div>
        );

      case "user_profile_card":
        return (
          <div className="space-y-1">
            <p className="text-sm font-medium">{data?.name}</p>
            {data?.academic?.exam && (
              <p className="text-xs text-muted-foreground">Preparing for {data.academic.exam.toUpperCase()}</p>
            )}
            {data?.academic?.subjects && (
              <div className="flex flex-wrap gap-1 mt-1">
                {data.academic.subjects.map((s: any) => (
                  <span key={s.name} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded capitalize">
                    {s.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return <p className="text-xs text-muted-foreground">Data loaded</p>;
    }
  };

  return (
    <TooltipProvider>
      <div className="mb-3">
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 w-full group"
        >
          <span className="text-xs text-muted-foreground">
            {isLoading ? "Analyzing:" : "Sources:"}
          </span>
          <div className="flex -space-x-1">
            {tools.map((tool, idx) => (
              <Tooltip key={`${tool}-${idx}`}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(
                      "w-7 h-7 rounded-full bg-primary/10 border-2 border-white flex items-center justify-center hover:bg-primary/20 transition-colors",
                      isLoading && "animate-in fade-in-0 zoom-in-50 duration-300"
                    )}
                    style={{ animationDelay: isLoading ? `${idx * 100}ms` : "0ms", zIndex: tools.length - idx }}
                  >
                    {TOOL_ICONS[tool] || <HelpCircle className="w-4 h-4 text-primary" />}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="text-xs">
                  {TOOL_LABELS[tool] || tool}
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
          <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">
            {tools.length} {tools.length === 1 ? "source" : "sources"}
            <span className="ml-1">{isExpanded ? "▲" : "▼"}</span>
          </span>
        </button>
        
        {isExpanded && toolResults.length > 0 && (
          <div className="mt-2 space-y-2 animate-in slide-in-from-top-2 duration-200">
            {tools.map((tool, idx) => {
              const result = getToolResultData(tool);
              return (
                <div 
                  key={`data-${tool}-${idx}`}
                  className="bg-white rounded-lg border p-3 shadow-sm"
                >
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b">
                    {TOOL_ICONS[tool]}
                    <span className="text-sm font-medium text-primary">
                      {TOOL_LABELS[tool] || tool}
                    </span>
                  </div>
                  {renderToolData(tool, result)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};

const AIMentorChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTools, setActiveTools] = useState<string[]>([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [hasMoreHistory, setHasMoreHistory] = useState(false);
  const [oldestCreatedAt, setOldestCreatedAt] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom, activeTools]);

  const fetchChatHistory = useCallback(async (beforeDate?: string) => {
    try {
      const url = new URL(`${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/ai/history`);
      url.searchParams.set('limit', '20');
      if (beforeDate) {
        url.searchParams.set('before', beforeDate);
      }

      const response = await fetch(url.toString(), {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch history');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('History fetch error:', error);
      return { messages: [], hasMore: false };
    }
  }, []);

  useEffect(() => {
    const loadInitialHistory = async () => {
      setIsLoadingHistory(true);
      const data = await fetchChatHistory();
      
      if (data.messages && data.messages.length > 0) {
        const historyMessages: Message[] = [];
        
        data.messages.reverse().forEach((m: any) => {
          historyMessages.push({
            id: `${m._id}-user`,
            role: 'user',
            content: m.userMessage,
            timestamp: new Date(m.createdAt),
          });
          
          historyMessages.push({
            id: `${m._id}-assistant`,
            role: 'assistant',
            content: m.assistantMessage,
            toolResults: m.toolCalls?.map((tc: any) => ({
              tool: tc.tool,
              uiType: tc.uiType,
              data: tc.result,
            })) || [],
            toolsUsed: m.toolCalls?.map((tc: any) => tc.tool) || [],
            timestamp: new Date(m.createdAt),
          });
        });
        
        setMessages(historyMessages);
        setHasMoreHistory(data.hasMore);
        setOldestCreatedAt(data.messages[data.messages.length - 1]?.createdAt || null);
        setTimeout(scrollToBottom, 100);
      }
      setIsLoadingHistory(false);
    };

    loadInitialHistory();
  }, [fetchChatHistory, scrollToBottom]);

  const loadMoreHistory = async () => {
    if (!oldestCreatedAt || !hasMoreHistory) return;
    
    setIsLoadingHistory(true);
    const scrollContainer = messagesContainerRef.current;
    const previousScrollHeight = scrollContainer?.scrollHeight || 0;
    
    const data = await fetchChatHistory(oldestCreatedAt);
    
    if (data.messages && data.messages.length > 0) {
      const olderMessages: Message[] = [];
      
      data.messages.reverse().forEach((m: any) => {
        olderMessages.push({
          id: `${m._id}-user`,
          role: 'user',
          content: m.userMessage,
          timestamp: new Date(m.createdAt),
        });
        
        olderMessages.push({
          id: `${m._id}-assistant`,
          role: 'assistant',
          content: m.assistantMessage,
          toolResults: m.toolCalls?.map((tc: any) => ({
            tool: tc.tool,
            uiType: tc.uiType,
            data: tc.result,
          })) || [],
          toolsUsed: m.toolCalls?.map((tc: any) => tc.tool) || [],
          timestamp: new Date(m.createdAt),
        });
      });
      
      setMessages(prev => [...olderMessages, ...prev]);
      setHasMoreHistory(data.hasMore);
      setOldestCreatedAt(data.messages[data.messages.length - 1]?.createdAt || null);
      
      requestAnimationFrame(() => {
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight - previousScrollHeight;
        }
      });
    }
    setIsLoadingHistory(false);
  };

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
      <div ref={messagesContainerRef} className="flex-1 overflow-y-auto custom__scrollbar px-4 py-4 space-y-4">
        {hasMoreHistory && (
          <div className="flex justify-center pb-2">
            <button
              onClick={loadMoreHistory}
              disabled={isLoadingHistory}
              className="px-4 py-2 text-sm text-primary bg-primary/10 rounded-full hover:bg-primary/20 transition disabled:opacity-50 flex items-center gap-2"
            >
              {isLoadingHistory ? (
                <><Loader2 className="w-4 h-4 animate-spin" /> Loading...</>
              ) : (
                'Load earlier messages'
              )}
            </button>
          </div>
        )}
        
        {isLoadingHistory && messages.length === 0 && (
          <div className="h-full flex items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        )}
        
        {!isLoadingHistory && messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">
              Welcome to AI Mentor!
            </h3>
            <p className="text-muted-foreground text-sm max-w-md">
              I&apos;m here to help with your studies, track progress, and provide
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
                <ToolCallIndicator 
                  tools={message.toolsUsed} 
                  toolResults={message.toolResults}
                  isLoading={false} 
                />
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
