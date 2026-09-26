"use server";

import apiClient from "@/apiClient/apiClient";
import { revalidateTag } from "next/cache";
import {
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
  const res = await apiClient.put("/api/user/study-check", data);
  return res.data;
};

export const completeStudyCheck = async (data: StudyCheckPayload) => {
  const res = await apiClient.post("/api/user/study-check/complete", data);
  revalidateTag("userData");
  return res.data;
};

export const getStudyDnaProfile = async () => {
  const res = await apiClient.get("/api/user/study-check/profile");
  return res.data as { success: boolean; profile: StudyDnaProfile };
};
