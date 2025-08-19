import apiClient from "@/apiClient/apiClient";
import { IClassesProps } from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";

export const useGetClassesByStatus = ({
  instituteId,
  status,
}: {
  status: string;
  instituteId: string | null | undefined;
}) => {
  return useQuery({
    queryKey: ["classes", status],
    queryFn: async () => {
      try {
        const res = await apiClient.get(`/api/user/classes?status=${status}`);
        const data: {
          classes: IClassesProps[];
          status: string;
          success: boolean;
        } = await res.data;
        return data;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(`Error in fetching user classes: ${error.message}`);
        } else {
          throw new Error(
            "An unknown error occurred while fetching user classes"
          );
        }
      }
    },
    enabled: !!instituteId,
  });
};
