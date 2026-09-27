"use server";

import apiClient from "@/apiClient/apiClient";
import { TQuizAnswerProps } from "@/helpers/types";

export const getWeeklyQuiz = async (query: string) => {
  try {
    const res = await apiClient.get(`/api/quiz/weekly/get?attempted=${query}`);

    const responseData = await res.data;

    return responseData;
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response
      ?.status;
    // The API returns 404 when this student has no quizzes in that list.
    if (status === 404) {
      return { success: true, weeklyQuiz: [] };
    }
    if (error instanceof Error) {
      throw new Error(
        `Error in fetching weekly quiz questions: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while fetching weekly quiz questions!"
      );
    }
  }
};

export const getWeeklyQuizQuestions = async (quizId: string) => {
  try {
    const res = await apiClient.get(
      `/api/quiz/weekly/questions/get?quizId=${quizId}`
    );

    const responseData = await res.data;

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error in fetching weekly quiz questions: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while fetching weekly quiz questions!"
      );
    }
  }
};

export const saveWeeklyQuizQuestion = async (data: {
  quizId: string;
  topic: { name: string };
  question: TQuizAnswerProps;
}) => {
  try {
    const res = await apiClient.post(`/api/quiz/weekly/questions/save`, data);

    const responseData = await res.data;

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in saving weekly quiz question: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while saving weekly quiz question!"
      );
    }
  }
};

export const getChapterQuizzes = async (query: string) => {
  try {
    const res = await apiClient.get(`/api/quiz/chapter/get?attempted=${query}`);
    return res.data as {
      chapterQuizzes?: Array<{
        id: string | number;
        chapterName: string;
        description: string;
        subject: string;
        questions: number;
        completedDate?: string;
        efficiency?: number;
      }>;
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching chapter quizzes: ${error.message}`);
    }
    throw new Error("An unknown error occurred while fetching chapter quizzes!");
  }
};

export const getQuizReport = async (quizId: string) => {
  try {
    const res = await apiClient.get(`/api/quiz/report?quizId=${quizId}`);
    return res.data as {
      report: {
        totalMarks: number;
        correctCount: number;
        incorrectCount: number;
        unattemptedCount: number;
        maxScore: number;
        overallEfficiency: number;
        timeTaken: number;
        createdAt: string;
        subjectWiseReport?: Record<
          string,
          {
            efficiency: number;
            topics: Record<string, { efficiency: number; totalQuestions: number }>;
          }
        >;
        questions?: Array<{
          question?: { question?: string; options?: Array<{ name: string }> };
          studentAnswer?: string;
          isCorrect?: boolean;
        }>;
      };
    };
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in getting quiz report: ${error.message}`);
    }
    throw new Error("An unknown error occurred while getting the quiz report!");
  }
};

export const submitQuiz = async (quizId: string) => {
  try {
    const res = await apiClient.get(`/api/quiz/submission?quizId=${quizId}`);
    return res.data as Awaited<ReturnType<typeof getQuizReport>>;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in submitting quiz: ${error.message}`);
    }
    throw new Error("An unknown error occurred while submitting the quiz!");
  }
};
