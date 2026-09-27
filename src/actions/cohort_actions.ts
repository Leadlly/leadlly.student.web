"use server";

import apiClient from "@/apiClient/apiClient";

export const getCohortWhatsappLink = async () => {
  try {
    const res = await apiClient.get<{ success: boolean; url?: string }>(
      "/api/cohort/link"
    );
    const url = String(res.data?.url || "").trim();
    if (!url) {
      throw new Error("Join link is not available yet.");
    }
    return url;
  } catch (error: unknown) {
    const data = (
      error as { response?: { data?: { message?: string } } }
    )?.response?.data;
    throw new Error(data?.message || "Could not load the cohort link.");
  }
};

export const markCohortJoined = async () => {
  try {
    const res = await apiClient.post<{
      success: boolean;
      cohortJoinedAt?: string;
    }>("/api/cohort/joined");
    return res.data?.cohortJoinedAt || new Date().toISOString();
  } catch (error: unknown) {
    const data = (
      error as { response?: { data?: { message?: string } } }
    )?.response?.data;
    throw new Error(data?.message || "Could not save your join.");
  }
};
