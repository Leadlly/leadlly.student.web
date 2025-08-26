"use server";

import apiClient from "@/apiClient/apiClient";
import { revalidatePath } from "next/cache";
import { getCookie } from "./cookie_actions";

export const getErrorBook = async () => {
  try {
    const token = await getCookie("token");
    const res = await apiClient.get(`/api/errorBook/get`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    const responseData = await res.data;

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error fetching Error Book: ${error.message}`);
    } else {
      console.log("An unknown error occurred while fetching Error Book!");
    }
  }
};

export const getChapterErrorBook = async ({ chapter }: { chapter: string }) => {
  try {
    const token = await getCookie("token");
    const res = await apiClient.get(`/api/errorBook/chapter/${chapter}`, {
      next: {
        tags: ["chapterErrorBookData", chapter],
      },
      headers: {
        Cookie: `token=${token}`,
      },
    });

    const responseData = await res.data;
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
  try {
    const token = await getCookie("token");
    const res = await apiClient.post(
      `/api/errorBook/errorNote`,
      {
        note: errorNote,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    const responseData = await res.data;
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
  try {
    const token = await getCookie("token");
    const res = await apiClient.put(
      `/api/errorBook/errorNote/toggle/${errorNoteId}`,
      {},
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    const responseData = await res.data;
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
  try {
    const token = await getCookie("token");
    const res = await apiClient.put(
      `/api/errorBook/update`,
      {
        solvedQuestions: questionIds,
      },
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    const responseData = await res.data;
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
