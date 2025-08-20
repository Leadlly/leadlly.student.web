import apiClient from "@/apiClient/apiClient";
import { Plan } from "@/helpers/types";
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
