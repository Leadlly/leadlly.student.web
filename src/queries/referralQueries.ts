import apiClient from "@/apiClient/apiClient";
import { TReferralStats } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserReferralStats = () => {
  return useQuery({
    queryKey: ["referral_stats"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STUDENT_WEB_BASE_URL}/api/refer/stats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data: {
          message: string;
          success: boolean;
          stats: TReferralStats;
        } = await res.json();

        if (!data.success) {
          throw new Error(data.message);
        }

        return data;
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
