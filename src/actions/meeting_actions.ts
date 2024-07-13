"use server";

import { revalidateTag } from "next/cache";
import { getCookie } from "./cookie_actions";

type DataProps = {
  date: Date;
  time: string;
  message: string;
};

export const requestMeeting = async (data: DataProps) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/meeting/request`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    const responseData = await res.json();

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

export const getMeetings = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/meeting/get`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "force-cache",
        next: {
          tags: ["meetingData"],
        },
      }
    );

    const responseData = await res.json();

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching meetings: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching meetings!");
    }
  }
};
