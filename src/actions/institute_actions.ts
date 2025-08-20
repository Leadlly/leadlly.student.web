"use server";

import apiClient from "@/apiClient/apiClient";

export const getUserInstitute = async () => {
  try {
    const res = await apiClient.get(`/api/user/institute/info`);

    const data = await res.data;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching user institute: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching user institute"
      );
    }
  }
};
