"use server";

import { revalidateTag } from "next/cache";
import { getCookie } from "./cookie_actions";

export const buySubscription = async (planId: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/subscription/create?planId=${planId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data.subscription;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error buying subscription: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while buying subscription");
    }
  }
};

export const getPricing = async (pricingType: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/subscription/pricing/get?pricingType=${pricingType}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    const data = await res.json();

    return data.pricing;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching Pricing: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching Pricing");
    }
  }
};

export const getFreeTrialActive = async () => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/subscription/freetrial`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        credentials: "include",
        cache: "no-store",
      }
    );

    const data = await res.json();

    revalidateTag("userData");

    return data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error activating free trial: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while activating free trial!");
    }
  }
};
