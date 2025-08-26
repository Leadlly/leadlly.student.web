"use server";

import apiClient from "@/apiClient/apiClient";
import { getCookie } from "./cookie_actions";

//====== Fetching Weekly Report ======//
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching student weekly report"
      );
    }
  }
};

//====== Fetching Monthly Report ======//
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching student monthly report"
      );
    }
  }
};

//====== Fetching Overall Report ======//
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
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching student overall report"
      );
    }
  }
};
