"use server";

import apiClient from "@/apiClient/apiClient";
import { getCookie } from "./cookie_actions";

//====== Fetching Chapters ======//
export const getSubjectChapters = async (
  subject: string | string[],
  standard: number
) => {
  // const token = await getCookie("token");

  try {
    const res = await apiClient.get(
      `/api/questionbank/chapter?subjectName=${subject}&standard=${standard}`
    );

    const data = await res.data;

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching chapters: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching chapters");
    }
  }
};

//====== Fetching Topics ======//
export const getChapterTopics = async (
  subject: string | string[],
  chapterName: string,
  standard: number
) => {
  // const token = await getCookie("token");

  try {
    const res = await apiClient.get(
      `/api/questionbank/topic?subjectName=${subject}&chapterName=${chapterName}&standard=${standard}`
    );

    const data = await res.data;

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching chapters: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching chapters");
    }
  }
};

//====== Fetching Chapters with React Query replacement ======//
const plain = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const fetchError = (error: unknown, fallback: string) => {
  if (error && typeof error === "object" && "response" in error) {
    const data = (error as { response?: { data?: { message?: string } } }).response
      ?.data;
    if (typeof data?.message === "string" && data.message) return data.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

export const getChapters = async (
  activeSubject: string,
  userStandard: number
): Promise<{ chapters: any[]; error?: string }> => {
  try {
    const res = await apiClient.get<{ chapters: any[] }>(
      `/api/questionbank/chapter?subjectName=${activeSubject}&standard=${userStandard}`
    );
    return plain(res.data ?? { chapters: [] });
  } catch (error: unknown) {
    console.error("Error fetching chapters:", error);
    return { chapters: [], error: fetchError(error, "Could not load chapters.") };
  }
};

//====== Fetching Topics with Subtopic with React Query replacement ======//
export const getTopicsWithSubtopic = async (
  activeSubject: string,
  userStandard: number,
  selectedChapter: string
): Promise<{ topics: any[]; error?: string }> => {
  try {
    const res = await apiClient.get<{ topics: any[] }>(
      `/api/questionbank/topicwithsubtopic?subjectName=${activeSubject}&chapterId=${selectedChapter}&standard=${userStandard}`
    );
    return plain(res.data ?? { topics: [] });
  } catch (error: unknown) {
    console.error("Error fetching topics:", error);
    return { topics: [], error: fetchError(error, "Could not load topics.") };
  }
};
