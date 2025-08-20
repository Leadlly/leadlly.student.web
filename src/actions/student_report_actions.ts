"use server";

import apiClient from "@/apiClient/apiClient";

export const getWeeklyReport = async () => {
  try {
    const res = await apiClient.get(`/api/user/report/week`, {
      cache: "force-cache",
      next: {
        tags: ["weeklyReport"],
      },
    });

    const data = await res.data;

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Error in fetching student weekly report: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while fetching student weekly report"
      );
    }
  }
};

export const getMonthlyReport = async () => {
  try {
    const res = await apiClient.get(`/api/user/report/month`, {
      cache: "force-cache",
      next: {
        tags: ["monthlyReport"],
      },
    });

    const data = await res.data;

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Error in fetching student monthly report: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while fetching student monthly report"
      );
    }
  }
};

export const getOverallReport = async () => {
  try {
    const res = await apiClient.get(`/api/user/report/overall`, {
      cache: "force-cache",
      next: {
        tags: ["overallReport"],
      },
    });

    const data = await res.data;

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Error in fetching student overall report: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while fetching student overall report"
      );
    }
  }
};
