"use server";

import apiClient from "@/apiClient/apiClient";
import { revalidateTag } from "next/cache";

type DataProps = {
  date: Date;
  time: string;
  message: string;
};

export const requestMeeting = async (data: DataProps) => {
  try {
    const res = await apiClient.post(`/api/meeting/request`, data);

    const responseData = await res.data;

    revalidateTag("meetingData");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in requesting a meeting: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while requesting a meeting!");
    }
  }
};

export const getMeetings = async (meeting: string) => {
  try {
    const res = await apiClient.post(`/api/meeting/get?meeting=${meeting}`, {});

    const responseData = await res.data;

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching meetings: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching meetings!");
    }
  }
};
