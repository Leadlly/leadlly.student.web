import apiClient from "@/apiClient/apiClient";
import { ICoupon, Plan } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscriptionPricing = (pricingType: string) => {
  return useQuery({
    queryKey: ["subscriptionPricing", pricingType],
    queryFn: async () => {
      try {
        const res = await apiClient.get(
          `/api/subscription/pricing/get?pricingType=${pricingType}`
        );

        const responseData: { pricing: Plan[]; success: boolean } = res.data;

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
        const res = await apiClient.get(
          `/api/subscription/coupons/get?plan=${data.plan}&category=${data.category}`
        );

        const responseData: { coupons: ICoupon[]; success: boolean } = res.data;

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
