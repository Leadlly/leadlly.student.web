"use server";

import apiClient from "@/apiClient/apiClient";
import { AttemptedQuizProps, TQuizAnswerProps, UnattemptedChapterQuizProps } from "@/helpers/types";

type RawChapterQuiz = {
  _id?: string;
  id?: string | number;
  chapterName?: string;
  description?: string;
  subject?: string;
  questions?: number | Record<string, unknown[] | unknown>;
  chapter?: { name?: string; subject?: string };
  topicsBySubject?: Record<string, string[]>;
  completedDate?: string;
  efficiency?: number;
  endDate?: string;
  updatedAt?: string;
};

const countChapterQuestions = (
  questions?: number | Record<string, unknown[] | unknown>
) => {
  if (typeof questions === "number") return questions;
  if (!questions || typeof questions !== "object") return 0;
  return Object.values(questions).reduce<number>((sum, value) => {
    return sum + (Array.isArray(value) ? value.length : 0);
  }, 0);
};

const normalizeChapterQuiz = (
  quiz: RawChapterQuiz
): UnattemptedChapterQuizProps & Pick<AttemptedQuizProps, "completedDate" | "efficiency"> => {
  const questionCount = countChapterQuestions(quiz.questions);
  const subject =
    (typeof quiz.subject === "string" && quiz.subject) ||
    quiz.chapter?.subject ||
    Object.keys(quiz.topicsBySubject ?? {})[0] ||
    "General";

  return {
    id: String(quiz.id ?? quiz._id ?? ""),
    chapterName: quiz.chapterName || quiz.chapter?.name || "Chapter quiz",
    description:
      quiz.description ||
      (questionCount > 0
        ? `${questionCount} questions from this chapter`
        : "Chapter practice quiz"),
    subject,
    questions: questionCount,
    completedDate: quiz.completedDate || quiz.endDate || quiz.updatedAt || "",
    efficiency: quiz.efficiency ?? 0,
  };
};

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
    if (!quizId || quizId === "undefined" || quizId === "null") {
      return {
        success: false,
        data: null,
        message: "Invalid quiz id",
      };
    }

    const res = await apiClient.get(
      `/api/quiz/weekly/questions/get?quizId=${quizId}`
    );

    const responseData = await res.data;
    const data = responseData?.data ?? null;

    return {
      success: Boolean(responseData?.success ?? data),
      data: data
        ? {
            weeklyQuestions: Array.isArray(data.weeklyQuestions)
              ? data.weeklyQuestions
              : [],
            startDate: data.startDate ?? data.createdAt ?? null,
            endDate: data.endDate ?? null,
            quizType: data.quizType ?? "weekly",
          }
        : null,
      message: responseData?.message,
    };
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response
      ?.status;
    if (status === 404) {
      return {
        success: false,
        data: null,
        message: "Quiz not found",
      };
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
    const raw = (res.data?.chapterQuizzes ?? []) as RawChapterQuiz[];
    return {
      success: true as const,
      chapterQuizzes: raw
        .map(normalizeChapterQuiz)
        .filter((quiz) => Boolean(quiz.id)),
    };
  } catch (error) {
    const status = (error as { response?: { status?: number } })?.response
      ?.status;
    if (status === 404) {
      return { success: true as const, chapterQuizzes: [] };
    }
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
