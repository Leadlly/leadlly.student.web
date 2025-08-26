import apiClient from "@/apiClient/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useGetWeeklyReport = () => {
  return useQuery({
    queryKey: ["weeklyReport"],
    queryFn: async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STUDENT_WEB_BASE_URL}/api/user/report/week`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STUDENT_WEB_BASE_URL}/api/user/report/month`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STUDENT_WEB_BASE_URL}/api/user/report/overall`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();
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
