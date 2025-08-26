import apiClient from "@/apiClient/apiClient";
import { ICoupon, Plan } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscriptionPricing = (pricingType: string) => {
  return useQuery({
    queryKey: ["subscriptionPricing", pricingType],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STUDENT_WEB_BASE_URL}/api/subscription/pricing?pricingType=${pricingType}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData: { pricing: Plan[]; success: boolean } =
          await res.json();

        return responseData;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`${error.message}`);
        } else {
          throw new Error(
            "An unknown error while fetching subscription pricing!"
          );
        }
      }
    },
  });
};

export const useGetCoupon = (data: { plan: string; category: string }) => {
  return useQuery({
    queryKey: ["coupon", data.plan],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STUDENT_WEB_BASE_URL}/api/subscription/coupons?plan=${data.plan}&category=${data.category}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const responseData: { coupons: ICoupon[]; success: boolean } =
          await res.json();

        if (!responseData.success) {
          throw new Error("Failed to fetch coupons!");
        }

        return responseData;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`${error?.message}`);
        } else {
          throw new Error("An unknown error while fetching coupons!");
        }
      }
    },
    enabled: !!data.plan,
  });
};
