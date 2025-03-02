"use server";

import { getCookie } from "@/actions/cookie_actions";
import { TQuizAnswerProps } from "@/helpers/types";

export const getWeeklyQuiz = async (query: string) => {
  try {
    const token = await getCookie("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/quiz/weekly/get?attempted=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "force-cache",
      }
    );

    const responseData = await res.json();

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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/quiz/weekly/questions/get?quizId=${quizId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "force-cache",
      }
    );

    const responseData = await res.json();

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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/quiz/weekly/questions/save`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    const responseData = await res.json();

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

export const getQuizReport = async (quizId: string) => {
  try {
    const token = await getCookie("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/quiz/weekly/submission?quizId=${quizId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    const responseData = await res.json();

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in getting weekly quiz report: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while getting weekly quiz report!"
      );
    }
  }
};
