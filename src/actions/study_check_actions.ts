"use server";

import apiClient from "@/apiClient/apiClient";
import { revalidateTag } from "next/cache";
import {
  CoachingTest,
  StepId,
  StudyCheckAnswers,
} from "@/lib/study-check/types";
import { StudyDnaProfile } from "@/lib/study-check/dna";

export type StudyCheckPayload = {
  stepId?: StepId;
  answers?: Partial<StudyCheckAnswers>;
};

export const getStudyCheck = async () => {
  const res = await apiClient.get("/api/user/study-check");
  return res.data as {
    success: boolean;
    studyCheck: {
      stepId: StepId;
      completed: boolean;
      answers: StudyCheckAnswers;
    };
  };
};

export const saveStudyCheck = async (data: StudyCheckPayload) => {
  try {
    await apiClient.put("/api/user/study-check", data);
    return { success: true as const };
  } catch (error) {
    console.error("Error saving study check:", error);
    return { success: false as const };
  }
};

export const completeStudyCheck = async (data: StudyCheckPayload) => {
  const res = await apiClient.post("/api/user/study-check/complete", data);
  revalidateTag("userData");
  return res.data;
};

export const saveUpcomingTests = async (tests: CoachingTest[]) => {
  try {
    const res = await apiClient.put("/api/user/study-check/tests", { tests });
    const data = res.data as {
      success?: boolean;
      message?: string;
      tests?: CoachingTest[];
    };
    return {
      success: true as const,
      tests: data.tests || tests,
      message: data.message || "Saved",
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Could not save your tests.";
    return { success: false as const, tests, message };
  }
};

export const getStudyDnaProfile = async () => {
  const res = await apiClient.get("/api/user/study-check/profile");
  return res.data as { success: boolean; profile: StudyDnaProfile };
};
