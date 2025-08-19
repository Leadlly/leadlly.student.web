"use server";

import {
  ForgotPasswordProps,
  ResetPasswordProps,
  SignUpDataProps,
  StudentPersonalInfoProps,
  UserDataProps,
} from "@/helpers/types";
import { revalidateTag } from "next/cache";
import apiClient, { ApiResponse } from "@/apiClient/apiClient";

export const signUpUser = async (data: SignUpDataProps) => {
  try {
    const response = await apiClient.post("/api/auth/register", data);

    const responseData = await response.data;

    return responseData;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error registering user: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while registering user!");
    }
  }
};

export const resendOtp = async (email: string) => {
  try {
    const res = await apiClient.post("/api/auth/resend", { email });

    const data = res.data;
    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error re-sending OTP: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while re-sending OTP!");
    }
  }
};

export const forgotPassword = async (data: ForgotPasswordProps) => {
  try {
    const res = await apiClient.post(`/api/auth/forgetpassword`, data);

    const responseData = await res.data;
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Error sending password resetting link: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while sending password resetting link!"
      );
    }
  }
};

export const resetPassword = async (
  data: ResetPasswordProps,
  token: string
) => {
  try {
    const res = await apiClient.post(`/api/auth/resetpassword/${token}`, data);

    const responseData = await res.data;
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error resetting password: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while resetting password!");
    }
  }
};

export const verifyAuthToken = async (token: string) => {
  try {
    const res = await apiClient.post(`/api/auth/token/verify`, { token });

    const responseData = await res.data;
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error verifying auth token: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while verifying auth token!");
    }
  }
};

export const getUser = async () => {
  try {
    const res = await apiClient.get<{ user: UserDataProps }>(`/api/auth/user`, {
      cache: "force-cache",
      next: {
        tags: ["userData"],
      },
    });

    const data = res.data;

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in fetching logged in user: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while fetching logged in user"
      );
    }
  }
};

export const studentPersonalInfo = async (data: StudentPersonalInfoProps) => {
  try {
    const res = await apiClient.post(`/api/user/profile/save`, data);

    const responseData = await res.data;

    revalidateTag("userData");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in saving student info: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while saving student info");
    }
  }
};

export const setTodaysVibe = async (data: { todaysVibe: string }) => {
  try {
    const res = await apiClient.post(`/api/user/todaysVibe/save`, data);

    const responseData = await res.data;
    revalidateTag("userData");

    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error in saving student current mood: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while saving student current mood!"
      );
    }
  }
};
