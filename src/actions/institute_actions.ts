"use server";

import { getCookie } from "./cookie_actions";

export const getUserInstitute = async () => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/user/institute/info`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "force-cache",
        next: {
          tags: ["instituteData"],
        },
      }
    );

    const data = await res.json();

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
