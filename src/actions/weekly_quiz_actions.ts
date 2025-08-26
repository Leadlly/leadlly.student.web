"use server";

import apiClient from "@/apiClient/apiClient";
import { TQuizAnswerProps } from "@/helpers/types";
import { getCookie } from "./cookie_actions";

export const getWeeklyQuiz = async (query: string) => {
  try {
    const token = await getCookie("token");
    const res = await apiClient.get(`/api/quiz/weekly/get?attempted=${query}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

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

export const getWeeklyQuizQuestions = async (quizId: string) => {
  try {
    const token = await getCookie("token");
    const res = await apiClient.get(
      `/api/quiz/weekly/questions/get?quizId=${quizId}`,
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
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
    const token = await getCookie("token");
    const res = await apiClient.post(`/api/quiz/weekly/questions/save`, data, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

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
