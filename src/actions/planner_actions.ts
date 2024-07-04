"use server";

import { getCookie } from "./cookie_actions";
import { revalidateTag } from "next/cache";

export const getPlanner = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/planner/get`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "force-cache",
        next: {
          tags: ["plannerData"],
        },
      }
    );

    console.log("this is planner data", res)

    const responseData = await res.json();

    console.log(responseData, "HIHII")

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("here is the error", error)
      throw new Error(`Error fetching planner data: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching planner data!");
    }
  }
};

export const createPlanner = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/planner/create`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
      }
    );

    const responseData = await res.json();

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating planner: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating planner!");
    }
  }
};
