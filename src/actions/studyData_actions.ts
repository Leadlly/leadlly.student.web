"use server";

import { getCookie } from "./cookie_actions";

type StudyDataProps = {
  tag: string;
  topics: Array<{ name: string }>;
  chapter: {
    name: string;
    level?: string;
  };
  subject: string | string[];
  standard: number;
};

export const saveStudyData = async (data: StudyDataProps) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/user/progress/save`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await res.json();

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving study data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred saving study data!");
    }
  }
};
