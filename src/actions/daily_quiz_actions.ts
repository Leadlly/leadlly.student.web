"use server";

import { TQuizAnswerProps } from "@/helpers/types";
import apiClient from "@/apiClient/apiClient";

export const saveDailyQuiz = async (data: {
  data: { name: string; _id: string; isSubtopic: boolean };
  questions: TQuizAnswerProps[];
  questionCount?: number;
}) => {
  try {
    const res = await apiClient.post(`/api/quiz/save`, data);
    const responseData = res.data as { success?: boolean; message?: string };
    return {
      success: responseData?.success !== false,
      message: responseData?.message || "Saved successfully",
    };
  } catch (error) {
    console.error("Error saving daily quiz:", error);
    const responseMessage =
      error && typeof error === "object" && "response" in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
    return {
      success: false,
      message:
        responseMessage ||
        (error instanceof Error ? error.message : "Could not save this quiz."),
    };
  }
};

export const getDailyStreakQuestions = async () => {
  try {
    const res = await apiClient.get(`/api/questionbank/streakquestion`);

    const responseData = await res.data;

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error in fetching daily streak questions: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while fetching daily streak questions!"
      );
    }
  }
};
