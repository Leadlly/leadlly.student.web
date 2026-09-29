"use server";

import apiClient from "@/apiClient/apiClient";
import { revalidateTag } from "next/cache";

type StudyDataProps = {
  tag: string;
  topics: Array<{
    _id: string;
    name: string;
    subtopics:
      | {
          _id: string;
          name: string;
        }[]
      | undefined;
  }>;
  chapter: {
    _id?: string;
    name?: string;
  };
  subject: string;
  standard: number;
};

const actionErrorMessage = (error: unknown, fallback: string) => {
  if (error && typeof error === "object" && "response" in error) {
    const data = (error as { response?: { data?: { message?: string } } }).response
      ?.data;
    if (typeof data?.message === "string" && data.message) return data.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

export const saveStudyData = async (data: StudyDataProps) => {
  try {
    const res = await apiClient.post(`/api/user/progress/save`, data);
    const message =
      typeof res.data?.message === "string" && res.data.message
        ? res.data.message
        : "Saved";

    return { success: true as const, message };
  } catch (error: unknown) {
    console.error("Error saving study data:", error);
    return {
      success: false as const,
      message: actionErrorMessage(error, "Could not save this topic."),
    };
  }
};

export const saveTaggedChapters = async (data: {
  tag: string;
  subject: string;
  standard: number;
  chapters: Array<{
    chapterId: string;
    status: string;
    standard: number;
  }>;
}) => {
  try {
    await apiClient.post(`/api/user/unrevisedtopics/save`, data);
    return { success: true as const, message: "Saved" };
  } catch (error) {
    console.error("Error saving chapters:", error);
    const responseMessage =
      error && typeof error === "object" && "response" in error
        ? (error as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
    return {
      success: false as const,
      message:
        responseMessage ||
        (error instanceof Error ? error.message : "Could not save your syllabus."),
    };
  }
};

export const setUnrevisedTopics = async (data: {
  chapterIds: string[];
  tag: string;
  subject: string;
  standard: number;
}) => {
  try {
    const res = await apiClient.post(`/api/user/unrevisedtopics/save`, data);

    const responseData = await res.data;

    revalidateTag("unrevised_topics");

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error saving unrevised topics: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while saving unrevised topics!"
      );
    }
  }
};

export const getUnrevisedTopics = async () => {
  try {
    const res = await apiClient.get(`/api/user/topics/get`, {
      cache: "no-store",
    });

    const responseData = await res.data;

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching unrevised topics: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching unrevised topics!"
      );
    }
  }
};

export const deleteUnrevisedTopics = async (data: { chapterName: string }) => {
  try {
    const res = await apiClient.delete(`/api/user/topics/delete`, {
      data,
    });

    const responseData = await res.data;

    revalidateTag("unrevised_topics");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error deleting unrevised topics: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while deleting unrevised topics!"
      );
    }
  }
};
