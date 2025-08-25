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
export const getChapters = async (
  activeSubject: string,
  userStandard: number
) => {
  try {
    const res = await apiClient.get<{ chapters: any[] }>(
      `/api/questionbank/chapter?subjectName=${activeSubject}&standard=${userStandard}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};

//====== Fetching Topics with Subtopic with React Query replacement ======//
export const getTopicsWithSubtopic = async (
  activeSubject: string,
  userStandard: number,
  selectedChapter: string
) => {
  try {
    const res = await apiClient.get<{ topics: any[] }>(
      `/api/questionbank/topicwithsubtopic?subjectName=${activeSubject}&chapterId=${selectedChapter}&standard=${userStandard}`
    );
    return res.data;
  } catch (error: any) {
    throw new Error(`${error.message}`);
  }
};
