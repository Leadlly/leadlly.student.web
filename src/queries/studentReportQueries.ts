import apiClient from "@/apiClient/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetWeeklyReport = () => {
  return useQuery({
    queryKey: ["weeklyReport"],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/api/user/report/week`);
        const data = await res.data;
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`${error.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while fetching student weekly report"
          );
        }
      }
    },
  });
};

export const useGetMonthlyReport = () => {
  return useQuery({
    queryKey: ["monthlyReport"],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/api/user/report/month`);
        const data = await res.data;
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`${error.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while fetching student monthly report"
          );
        }
      }
    },
  });
};

export const useGetOverallReport = () => {
  return useQuery({
    queryKey: ["overallReport"],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/api/user/report/overall`);
        const data = await res.data;
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`${error.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while fetching student overall report"
          );
        }
      }
    },
  });
};
