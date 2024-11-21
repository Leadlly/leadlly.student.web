"use server"

import { getCookie } from "@/actions/cookie_actions";

const API_BASE_URL = process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL;

export const createCustomQuiz = async (quizData) => {
  try {
    const token = await getCookie("token");
    const res = await fetch(
      `${API_BASE_URL}/api/quiz/custom/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify(quizData),
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error in creating custom quiz: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while creating custom quiz!"
      );
    }
  }
}

export const getCustomQuizzes = async () => {
  try {
    const token = await getCookie("token");
    const res = await fetch(
      `${API_BASE_URL}/api/quiz/custom/get`,
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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error in fetching custom quizzes: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while fetching custom quizzes!"
      );
    }
  }
}

export const getCustomQuizQuestions = async (quizId) => {
  try {
    const token = await getCookie("token");
    const res = await fetch(
      `${API_BASE_URL}/api/quiz/custom/${quizId}/questions`,
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

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error in fetching custom quiz questions: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while fetching custom quiz questions!"
      );
    }
  }
}

export const saveCustomQuizAnswers = async (answerData : any) => {
  try {
    const token = await getCookie("token");
    const res = await fetch(
      `${API_BASE_URL}/api/quiz/custom/question/save`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify(answerData),
        credentials: "include",
      }
    );

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        `Error in saving custom quiz answers: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while saving custom quiz answers!"
      );
    }
  }
}