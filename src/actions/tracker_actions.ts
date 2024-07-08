"use server";

import { getCookie } from "./cookie_actions";

export const getUserTracker = async (subject: string | string[]) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/tracker/get?subject=${subject}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        next: {
          tags: ["userTracker"],
        },
      }
    );

    const data = await res.json();

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching user tracker: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching user tracker!");
    }
  }
};
