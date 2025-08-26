"use server";

import apiClient from "@/apiClient/apiClient";
import { getCookie } from "./cookie_actions";

export const getWeeklyReport = async () => {
  try {
    const token = await getCookie("token");
    const res = await apiClient.get(`/api/user/report/week`, {
      cache: "force-cache",
      next: {
        tags: ["weeklyReport"],
      },
      headers: {
        Cookie: `token=${token}`,
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
    const token = await getCookie("token");
    const res = await apiClient.get(`/api/user/report/month`, {
      cache: "force-cache",
      next: {
        tags: ["monthlyReport"],
      },
      headers: {
        Cookie: `token=${token}`,
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
    const token = await getCookie("token");
    const res = await apiClient.get(`/api/user/report/overall`, {
      cache: "force-cache",
      next: {
        tags: ["overallReport"],
      },
      headers: {
        Cookie: `token=${token}`,
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
