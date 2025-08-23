"use server";

import { revalidateTag } from "next/cache";
import apiClient from "@/apiClient/apiClient";

export const getPlanner = async () => {
  try {
    const res = await apiClient.get(`/api/planner/get`, {
      cache: "force-cache",
      next: {
        tags: ["plannerData"],
      },
    });

    const responseData = await res.data;

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(`Error fetching planner data: ${error.message}`);
    } else {
      console.log("An unknown error occurred while fetching planner data!");
    }
  }
};

export const createPlanner = async () => {
  try {
    const res = await apiClient.get(`/api/planner/create`);

    const responseData = await res.data;

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating planner: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating planner!");
    }
  }
};

export const updatePlanner = async () => {
  try {
    const res = await apiClient.get(`/api/planner/update`);

    const responseData = await res.data;

    revalidateTag("plannerData");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating planner: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating planner!");
    }
  }
};

export const allocateBackTopics = async () => {
  try {
    const res = await apiClient.get(`/api/planner/allocateTopics`);

    const responseData = await res.data;
    revalidateTag("plannerData");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error creating planner: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while creating planner!");
    }
  }
};
