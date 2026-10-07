"use server";

import apiClient from "@/apiClient/apiClient";
import {
  TStudentOverallReportProps,
  TStudentReportProps,
} from "@/helpers/types";

//====== Fetching Weekly Report ======//
export const getWeeklyReport = async () => {
  try {
    const res = await apiClient.get(`/api/user/report/week`);
    const data: { success: boolean; weeklyReport: TStudentReportProps | null } =
      res.data;
    return { success: Boolean(data?.success), weeklyReport: data?.weeklyReport ?? null };
  } catch (error) {
    console.error("Error fetching weekly report:", error);
    return { success: false, weeklyReport: null };
  }
};

//====== Fetching Monthly Report ======//
export const getMonthlyReport = async () => {
  try {
    const res = await apiClient.get(`/api/user/report/month`);
    const data: { success: boolean; monthlyReport: TStudentReportProps | null } =
      res.data;
    return { success: Boolean(data?.success), monthlyReport: data?.monthlyReport ?? null };
  } catch (error) {
    console.error("Error fetching monthly report:", error);
    return { success: false, monthlyReport: null };
  }
};

//====== Fetching Overall Report ======//
export const getOverallReport = async () => {
  try {
    const res = await apiClient.get(`/api/user/report/overall`);
    const data: {
      success: boolean;
      overallReport: TStudentOverallReportProps[];
    } = res.data;
    return {
      success: Boolean(data?.success),
      overallReport: Array.isArray(data?.overallReport) ? data.overallReport : [],
    };
  } catch (error) {
    console.error("Error fetching overall report:", error);
    return { success: false, overallReport: [] };
  }
};
