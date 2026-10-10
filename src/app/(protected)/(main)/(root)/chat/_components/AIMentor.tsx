"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Bot, Loader2, Send, User } from "lucide-react";
import { getAIChatHistory, sendAIChatMessage } from "@/actions/ai_actions";
import { cn } from "@/lib/utils";

type ChatItem = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

const suggestions = [
  "Show my planner",
  "How's my progress?",
  "What's my streak?",
  "I'm feeling stressed",
];

const AIMentor = () => {
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [draft, setDraft] = useState("");
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [sending, setSending] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAIChatHistory({ limit: 20 })
      .then((data) => {
        const items: ChatItem[] = [];
        [...(data.messages ?? [])].reverse().forEach((message) => {
          items.push({
            id: `${message._id}-user`,
            role: "user",
            content: message.userMessage,
            timestamp: new Date(message.createdAt),
          });
          items.push({
            id: `${message._id}-assistant`,
            role: "assistant",
            content: message.assistantMessage,
            timestamp: new Date(message.createdAt),
          });
        });
        setMessages(items);
      })
      .catch(() => setMessages([]))
      .finally(() => setLoadingHistory(false));
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const send = async (text: string) => {
    const message = text.trim();
    if (!message || sending) return;

    const history = messages.slice(-10).map((item) => ({
      role: item.role,
      content: item.content,
    }));
    setMessages((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: "user", content: message, timestamp: new Date() },
    ]);
    setDraft("");
    setSending(true);

    try {
      const response = await sendAIChatMessage({ message, conversationHistory: history });
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-assistant`,
          role: "assistant",
          content: response.reply,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: `${Date.now()}-error`,
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again in a moment.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    send(draft);
  };

  return (
    <div className="flex h-[calc(100dvh-250px)] min-h-[380px] flex-col rounded-[34px] bg-white md:h-full md:min-h-0">
      <div className="custom__scrollbar min-h-0 flex-1 overflow-y-auto px-4 py-4">
        {loadingHistory ? (
          <div className="flex h-full flex-col items-center justify-center text-secondary-text">
            <Loader2 className="size-6 animate-spin text-primary" />
            <p className="mt-2 text-sm">Loading chat history...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center px-6 text-center">
            <span className="mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
              <Bot className="size-8" />
            </span>
            <p className="text-lg font-semibold">Welcome to AI Mentor</p>
            <p className="mt-2 max-w-md text-sm text-secondary-text">
              I&apos;m here to help with your studies, track progress, and provide support.
              Ask me anything about your preparation!
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setDraft(suggestion)}
                  className="rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {messages.map((item) => (
              <div
                key={item.id}
                className={cn("flex items-end gap-2", item.role === "user" && "justify-end")}
              >
                {item.role === "assistant" ? (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <Bot className="size-4" />
                  </span>
                ) : null}
                <div className="max-w-[85%]">
                  <div
                    className={cn(
                      "rounded-2xl px-4 py-2.5 text-sm",
                      item.role === "user"
                        ? "bg-primary text-white"
                        : "border border-[#E6E1F0] bg-white text-dark-primary"
                    )}
                  >
                    {item.content}
                  </div>
                  <p className="mt-1 text-[11px] text-secondary-text">
                    {item.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {item.role === "user" ? (
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#9CA3AF] text-white">
                    <User className="size-4" />
                  </span>
                ) : null}
              </div>
            ))}
            {sending ? (
              <div className="flex items-center gap-2 text-sm text-secondary-text">
                <span className="flex size-8 items-center justify-center rounded-full bg-primary text-white">
                  <Bot className="size-4" />
                </span>
                <span className="rounded-2xl border border-[#E6E1F0] px-4 py-2">Typing...</span>
              </div>
            ) : null}
            <div ref={endRef} />
          </div>
        )}
      </div>

      <form onSubmit={onSubmit} className="p-3">
        <div className="rounded-xl border border-[#E6E1F0] p-2">
          <textarea
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Write a message"
            rows={2}
            className="w-full resize-none bg-transparent px-2 py-1 text-sm outline-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={sending || !draft.trim()}
              className="flex size-10 items-center justify-center rounded-full bg-primary text-white disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="size-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AIMentor;
