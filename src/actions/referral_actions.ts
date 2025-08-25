"use server";

import apiClient from "@/apiClient/apiClient";
import { ICoupon } from "@/helpers/types";

export const generateReferralCode = async (data: {
  ReferralCode?: string;
  update?: boolean;
  expiredBy?: string;
}) => {
  try {
    const res = await apiClient.post<{
      success: boolean;
      message: string;
      referralCode: ICoupon;
    }>("/api/refer/code/generate", data);

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error generating referral code: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while generating referral code!"
      );
    }
  }
};

export const requestCashOut = async () => {
  try {
    const res = await apiClient.post<{
      success: boolean;
      message: string;
    }>("/api/refer/cashout");

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error requesting cash out: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while requesting cash out!");
    }
  }
};
