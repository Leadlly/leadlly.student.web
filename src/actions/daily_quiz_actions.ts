"use server";

import { TQuizAnswerProps } from "@/helpers/types";
import { revalidateTag } from "next/cache";
import apiClient from "@/apiClient/apiClient";

export const saveDailyQuiz = async (data: {
  data: { name: string; _id: string; isSubtopic: boolean };
  questions: TQuizAnswerProps[];
}) => {
  try {
    const res = await apiClient.post(`/api/quiz/save`, data);

    const responseData = await res.data;
    revalidateTag("userData");
    revalidateTag("weeklyReport");
    revalidateTag("monthlyReport");
    revalidateTag("overallReport");
    revalidateTag("plannerData");
    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in saving daily quiz answers: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while saving daily quiz answers!"
      );
    }
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
