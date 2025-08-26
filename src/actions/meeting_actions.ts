"use server";

import apiClient from "@/apiClient/apiClient";
import { revalidateTag } from "next/cache";
import { getCookie } from "./cookie_actions";

type DataProps = {
  date: Date;
  time: string;
  message: string;
};

export const requestMeeting = async (data: DataProps) => {
  try {
    const token = await getCookie("token");
    const res = await apiClient.post(`/api/meeting/request`, data, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

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
    const token = await getCookie("token");
    const res = await apiClient.post(`/api/meeting/get?meeting=${meeting}`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

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
