"use server";

import apiClient from "@/apiClient/apiClient";
import { ICoupon } from "@/helpers/types";
import { getCookie } from "./cookie_actions";

export const generateReferralCode = async (data: {
  ReferralCode?: string;
  update?: boolean;
  expiredBy?: string;
}) => {
  try {
    const token = await getCookie("token");

    const res = await apiClient.post<{
      success: boolean;
      message: string;
      referralCode: ICoupon;
    }>("/api/refer/code/generate", data, {
      headers: {
        Cookie: `token=${token}`,
      },
    });

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
    const token = await getCookie("token");
    const res = await apiClient.post<{
      success: boolean;
      message: string;
    }>(
      "/api/refer/cashout",
      {},
      {
        headers: {
          Cookie: `token=${token}`,
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Error requesting cash out: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while requesting cash out!");
    }
  }
};
