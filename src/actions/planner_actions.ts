"use server";

import { revalidateTag } from "next/cache";
import apiClient from "@/apiClient/apiClient";
import { DailyPlan } from "@/lib/planner/types";

export const getPlanner = async () => {
  try {
    const res = await apiClient.get(`/api/planner/get`, {
      cache: "no-store",
    });

    const responseData = res.data as { success: boolean; data: DailyPlan | null };
    return JSON.parse(
      JSON.stringify({
        success: Boolean(responseData?.success),
        data: responseData?.data ?? null,
      })
    ) as { success: boolean; data: DailyPlan | null };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error fetching planner data: ${error.message}`);
      return { success: false, data: null };
    } else {
      console.log("An unknown error occurred while fetching planner data!");
      return { success: false, data: null };
    }
  }
};

const plannerMessage = (error: unknown, fallback: string) => {
  if (error && typeof error === "object" && "response" in error) {
    const data = (error as { response?: { data?: { message?: string } } }).response?.data;
    if (typeof data?.message === "string" && data.message) return data.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

export const createPlanner = async () => {
  try {
    const res = await apiClient.get(`/api/planner/create`);
    const message =
      typeof res.data?.message === "string" && res.data.message
        ? res.data.message
        : "Planner created";
    return { success: true as const, message };
  } catch (error: unknown) {
    console.error("Error creating planner:", error);
    return {
      success: false as const,
      message: plannerMessage(error, "Could not create your planner."),
    };
  }
};

export const updatePlanner = async () => {
  try {
    const res = await apiClient.get(`/api/planner/update`);
    const message =
      typeof res.data?.message === "string" && res.data.message
        ? res.data.message
        : "Today's plan";

    return { success: true as const, message };
  } catch (error: unknown) {
    console.error("Error updating planner:", error);
    const message =
      error instanceof Error ? error.message : "Could not refresh today's plan.";
    return { success: false as const, message };
  }
};

export const completePlannerItem = async (itemId: string) => {
  const res = await apiClient.post(`/api/planner/items/${itemId}/complete`);
  revalidateTag("plannerData");
  return res.data as { success: boolean; quizId: string; questionCount?: number };
};

export const skipPlannerItem = async (itemId: string) => {
  const res = await apiClient.post(`/api/planner/items/${itemId}/skip`);
  revalidateTag("plannerData");
  return res.data as { success: boolean };
};

export const allocateBackTopics = async () => {
  try {
    const res = await apiClient.get(`/api/planner/allocateTopics`);
    const message =
      typeof res.data?.message === "string" && res.data.message
        ? res.data.message
        : "Planner updated";
    return { success: true as const, message };
  } catch (error: unknown) {
    console.error("Error allocating planner topics:", error);
    return {
      success: false as const,
      message: plannerMessage(error, "Could not update your planner."),
    };
  }
};
