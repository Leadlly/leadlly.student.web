import apiClient from "@/apiClient/apiClient";
import { TReferralStats } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserReferralStats = () => {
  return useQuery({
    queryKey: ["referral_stats"],
    queryFn: async () => {
      try {
        const res = await apiClient.get<{
          message: string;
          success: boolean;
          stats: TReferralStats;
        }>("/api/refer/stats");
        return res.data;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`${error.message}`);
        } else {
          throw new Error("An unknown error while fetching referral stats!!");
        }
      }
    },
  });
};
