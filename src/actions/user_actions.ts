"use server";

import { getCookie } from "./cookie_actions";

export const getUser = async () => {
  const token = await getCookie("token");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/auth/user`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    const data = await res.json();

    return data;
  } catch (error) {
    console.log("Get User Error:: ", error);
  }
};
