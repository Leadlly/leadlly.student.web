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

export const saveStudyData = async (data: StudyDataProps) => {
  try {
    const res = await apiClient.post(`/api/user/progress/save`, data);

    const responseData = await res.data;

    revalidateTag("unrevised_topics");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error saving study data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred saving study data!");
    }
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
      cache: "force-cache",
      next: {
        tags: ["unrevised_topics"],
      },
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
