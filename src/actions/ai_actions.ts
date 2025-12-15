"use server";

import apiClient from "@/apiClient/apiClient";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ToolResult {
  tool: string;
  uiType: string;
  data: any;
  error?: string;
}

interface ChatResponse {
  reply: string;
  toolResults?: ToolResult[];
}

interface HistoryMessage {
  _id: string;
  userMessage: string;
  assistantMessage: string;
  toolCalls?: {
    tool: string;
    uiType: string;
    result: any;
  }[];
  createdAt: string;
}

interface HistoryResponse {
  messages: HistoryMessage[];
  hasMore: boolean;
}

//====== Send AI Chat Message ======//
export const sendAIChatMessage = async (data: {
  message: string;
  conversationHistory: ChatMessage[];
}): Promise<ChatResponse> => {
  try {
    const res = await apiClient.post<ChatResponse>(`/api/ai/chat`, data);

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error sending AI chat message: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while sending AI chat message");
    }
  }
};

//====== Fetch AI Chat History ======//
export const getAIChatHistory = async (params?: {
  limit?: number;
  before?: string;
}): Promise<HistoryResponse> => {
  try {
    const queryParams: Record<string, string | number> = {
      limit: params?.limit || 20,
    };

    if (params?.before) {
      queryParams.before = params.before;
    }

    const res = await apiClient.get<HistoryResponse>(`/api/ai/history`, {
      params: queryParams,
    });

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error fetching AI chat history: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching AI chat history"
      );
    }
  }
};
