"use server";

import { getCookie } from "@/actions/cookie_actions";

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
