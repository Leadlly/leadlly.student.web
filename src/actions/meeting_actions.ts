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

const apiMessage = (error: unknown, fallback: string) => {
  if (error && typeof error === "object" && "response" in error) {
    const data = (error as { response?: { data?: { message?: string } } }).response
      ?.data;
    if (data?.message) return data.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};

export const getFreeMeetingSlots = async (date: string) => {
  try {
    const res = await apiClient.get(`/api/meeting/free/slots`, {
      cache: "no-store",
      params: { date },
    });
    return res.data as {
      success: boolean;
      date: string;
      slots: Array<{ time: string; available: boolean }>;
    };
  } catch (error) {
    throw new Error(apiMessage(error, "Could not load meeting slots."));
  }
};

export const claimFreeMeeting = async (data: {
  date: string;
  time: string;
  message: string;
}) => {
  try {
    const res = await apiClient.post(`/api/meeting/free/claim`, data);
    return res.data as {
      success?: boolean;
      message?: string;
      meeting?: { _id?: string };
    };
  } catch (error) {
    throw new Error(apiMessage(error, "Could not book this meeting."));
  }
};
