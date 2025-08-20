"use server";

import apiClient from "@/apiClient/apiClient";
import { revalidateTag } from "next/cache";

export const buySubscription = async (data: {
  planId: string | string[] | undefined;
  coupon?: string;
}) => {
  try {
    const res = await apiClient.post(
      `/api/subscription/create?planId=${data.planId}&coupon=${data.coupon}`,
      {
        cache: "no-store",
      }
    );

    const responseData = await res.data;

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
  try {
    const res = await apiClient.get(
      `/api/subscription/pricing/get?pricingType=${pricingType}`,
      {
        cache: "no-store",
      }
    );

    const data = await res.data;

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
  try {
    const res = await apiClient.get(`/api/subscription/freetrial`, {
      cache: "no-store",
    });

    const data = await res.data;

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
  try {
    const res = await apiClient.get(
      `/api/subscription/pricing/plan/${planId}`,
      {
        cache: "no-store",
      }
    );

    const responseData = await res.data;
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
  try {
    const res = await apiClient.get(
      `/api/subscription/coupons/get?plan=${data.plan}&category=${data.category}`,
      {
        cache: "no-store",
      }
    );

    const responseData = await res.data;
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
  try {
    const res = await apiClient.post(`/api/subscription/coupons/check`, data, {
      cache: "no-store",
    });

    const responseData = await res.data;
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
