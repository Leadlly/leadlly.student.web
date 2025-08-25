"use server";

import apiClient from "@/apiClient/apiClient";
import { getCookie } from "./cookie_actions";

//====== Fetching Chapters ======//
export const getSubjectChapters = async (
  subject: string | string[],
  standard: number
) => {
  const token = await getCookie("token");

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
  const token = await getCookie("token");

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
