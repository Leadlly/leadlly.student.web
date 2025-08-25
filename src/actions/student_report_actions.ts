"use server";

import apiClient from "@/apiClient/apiClient";

//====== Fetching Weekly Report ======//
export const getWeeklyReport = async () => {
  try {
    const res = await apiClient.get(`/api/user/report/week`);
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
    const res = await apiClient.get(`/api/user/report/month`);
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
    const res = await apiClient.get(`/api/user/report/overall`);
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
