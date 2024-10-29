"use server";

import { revalidateTag } from "next/cache";
import { getCookie } from "./cookie_actions";

export const buySubscription = async (data: {
  planId: string | string[] | undefined;
  coupon?: string;
}) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/subscription/create?planId=${data.planId}&coupon=${data.coupon}`,
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

    const responseData = await res.json();

    return responseData.subscription;
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

export const getSubscriptionPricingByPlanId = async (planId: string) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/subscription/pricing/plan/${planId}`,
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

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(
        `Error fetching subscription pricing by planId: ${error.message}`
      );
    } else {
      throw new Error(
        "An unknown error occurred while fetching subscription pricing by planId"
      );
    }
  }
};

export const getCoupon = async (data: {
  plan: string | string[] | undefined;
  category: string;
}) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/subscription/coupons/get?plan=${data.plan}&category=${data.category}`,
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

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error fetching coupons: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred while fetching coupons");
    }
  }
};

export const validateCustomCoupon = async (data: { code: string }) => {
  const token = await getCookie("token");

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/subscription/coupons/check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
        cache: "no-store",
      }
    );

    const responseData = await res.json();
    return responseData;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Error validating custom coupon: ${error.message}`);
    } else {
      throw new Error(
        "An unknown error occurred while validating custom coupon!"
      );
    }
  }
};
