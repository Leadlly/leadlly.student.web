"use server";

import { getCookie } from "./cookie_actions";
import { revalidatePath, revalidateTag } from "next/cache";

export const getErrorBook = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/errorBook/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        next: {
          tags: ["errorBookData"],
        },
      }
    );

    const responseData = await res.json();

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching Error Book: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching Error Book!");
    }
  }
};
export const getChapterErrorBook = async ({ chapter }: { chapter: string }) => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/errorBook/chapter/${chapter}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        next: {
          tags: ["chapterErrorBookData", chapter],
        },
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching Error Book: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching Error Book!");
    }
  }
};
export const createErrorNote = async ({ errorNote }: { errorNote: string }) => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/errorBook/errorNote`,
      {
        method: "POST",
        body: JSON.stringify({ note: errorNote }),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating errorNote: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating errorNote!");
    }
  } finally {
    revalidatePath("/error-notes");
  }
};
export const toggleErrorNote = async ({
  errorNoteId,
}: {
  errorNoteId: string;
}) => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/errorBook/errorNote/toggle/${errorNoteId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error toggling errorNote: ${error.message}`);
    } else {
      throw new Error("An unknown error   occurred while toggling errorNote!");
    }
  } finally {
    revalidatePath("/error-notes");
  }
};
export const updateErrorNote = async ({
  questionIds,
}: {
  questionIds: string[];
}) => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/errorBook/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        body: JSON.stringify({ solvedQuestions: questionIds }),
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error updating error note: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while updating error note!");
    }
  } finally {
    revalidatePath("/error-notes");
  }
};
