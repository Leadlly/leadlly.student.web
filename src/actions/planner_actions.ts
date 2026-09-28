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

export const createPlanner = async () => {
  try {
    const res = await apiClient.get(`/api/planner/create`);

    const responseData = await res.data;
    revalidateTag("plannerData");
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating planner: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating planner!");
    }
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

    const responseData = await res.data;
    revalidateTag("plannerData");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating planner: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating planner!");
    }
  }
};
