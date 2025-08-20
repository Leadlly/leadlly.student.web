"use server";

import apiClient from "@/apiClient/apiClient";

export const getUserTracker = async (subject: string | string[]) => {
  try {
    const res = await apiClient.get(`/api/tracker/get?subject=${subject}`, {
      cache: "force-cache",
      next: {
        tags: ["userTracker"],
      },
    });

    const data = await res.data;

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching user tracker: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching user tracker!");
    }
  }
};
