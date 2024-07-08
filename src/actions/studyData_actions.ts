"use server";

import { revalidateTag } from "next/cache";
import { getCookie } from "./cookie_actions";

type StudyDataProps = {
  tag: string;
  topics: Array<{ name: string }>;
  chapter: {
    name: string;
    level?: string;
  };
  subject: string;
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
      }
    );

    const responseData = await res.json();

    revalidateTag("unrevised_topics");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving study data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred saving study data!");
    }
  }
};

export const getUnrevisedTopics = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/user/topics/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "force-cache",
        next: {
          tags: ["unrevised_topics"],
        },
      }
    );

    const responseData = await res.json();

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching unrevised topics: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching unrevised topics!"
      );
    }
  }
};

export const deleteUnrevisedTopics = async (data: { chapterName: string }) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/user/topics/delete`,
      {
        method: "DELETE",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },

        credentials: "include",
      }
    );

    const responseData = await res.json();

    revalidateTag("unrevised_topics");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error deleting unrevised topics: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while deleting unrevised topics!"
      );
    }
  }
};
