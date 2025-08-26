"use server";

import apiClient from "@/apiClient/apiClient";
import { getCookie } from "./cookie_actions";
import { IClassesProps } from "@/helpers/types";

//====== Fetching User Institute ======//
export const getUserInstitute = async () => {
  try {
    const token = await getCookie("token");
    const res = await apiClient.get(`/api/user/institute/info`, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

    const data = await res.data;

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

//====== Fetching Classes by Status ======//
export const getClassesByStatus = async (status: string) => {
  try {
    const res = await apiClient.get(`/api/user/classes?status=${status}`);
    const data: {
      classes: IClassesProps[];
      status: string;
      success: boolean;
    } = await res.data;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching user classes: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching user classes"
      );
    }
  }
};
