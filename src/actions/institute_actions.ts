"use server";

import apiClient from "@/apiClient/apiClient";
import { IClassesProps } from "@/helpers/types";

//====== Fetching User Institute ======//
export const getUserInstitute = async () => {
  try {
    const res = await apiClient.get(`/api/user/institute/info`);

    const data = await res.data;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching user institute: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching user institute"
      );
    }
  }
};

//====== Fetching Classes by Status ======//
export const getClassesByStatus = async (status: string) => {
  try {
    const res = await apiClient.get(`/api/user/classes?status=${status}`);
    const data: {
      classes: IClassesProps[];
      status: string;
      success: boolean;
    } = await res.data;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching user classes: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching user classes"
      );
    }
  }
};

export const joinInstitute = async (instituteCode: string) => {
  const res = await apiClient.post("/api/user/institute/join", { instituteCode });
  return res.data;
};

export const getStudentBatches = async () => {
  const res = await apiClient.get("/api/batch/student/batches");
  return res.data as { data?: Array<Record<string, unknown>>; success: boolean };
};

export const getInstituteBatches = async () => {
  const res = await apiClient.get("/api/batch/institute/batches");
  return res.data as { data?: Array<Record<string, unknown>>; success: boolean };
};

export const requestBatch = async (batchId: string) => {
  const res = await apiClient.post("/api/batch/request", { batchId });
  return res.data;
};

export const getBatchClasses = async (batchId: string) => {
  const res = await apiClient.get(`/api/batch/classes/${batchId}`);
  return res.data as { data?: Array<Record<string, unknown>> };
};

export const getBatchAnnouncements = async (batchId: string) => {
  const res = await apiClient.get(`/api/batch/announcements?batchId=${batchId}`);
  return res.data as { data?: Array<Record<string, unknown>> };
};

export const getClassNotes = async (classId: string) => {
  const res = await apiClient.get(`/api/batch/notes?classId=${classId}`);
  return res.data as { data?: Array<Record<string, unknown>> };
};

export const getClassWork = async (classId: string) => {
  const res = await apiClient.get(`/api/batch/work?classId=${classId}`);
  return res.data as { data?: Array<Record<string, unknown>> };
};

export const getClassReport = async (classId: string) => {
  const res = await apiClient.get(`/api/batch/class/report/${classId}`);
  return res.data as { data?: Record<string, unknown> };
};

export const getBatchQuizzes = async () => {
  const res = await apiClient.get("/api/quiz/batch/get");
  return res.data as { data?: Array<Record<string, unknown>>; weeklyQuiz?: unknown[] };
};
