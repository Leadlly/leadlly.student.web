"use server";

import apiClient from "@/apiClient/apiClient";
import { revalidatePath } from "next/cache";

export const getErrorBook = async () => {
  try {
    const res = await apiClient.get(`/api/errorBook/get`);

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
    const res = await apiClient.get(`/api/errorBook/chapter/${chapter}`, {
      next: {
        tags: ["chapterErrorBookData", chapter],
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
    const res = await apiClient.post(`/api/errorBook/errorNote`, {
      note: errorNote,
    });

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
    const res = await apiClient.put(
      `/api/errorBook/errorNote/toggle/${errorNoteId}`
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
    const res = await apiClient.put(`/api/errorBook/update`, {
      solvedQuestions: questionIds,
    });

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
