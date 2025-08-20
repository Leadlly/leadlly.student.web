import apiClient from "@/apiClient/apiClient";
import {
  subjectChaptersProps,
  TopicsWithSubtopicsProps,
} from "@/helpers/types";
import { useQuery } from "@tanstack/react-query";

export const useGetChapters = ({
  activeSubject,
  userStandard,
}: {
  activeSubject: string;
  userStandard: number;
}) => {
  return useQuery({
    queryKey: ["chapters", activeSubject, userStandard],
    queryFn: async () => {
      try {
        const res = await apiClient.get<{ chapters: subjectChaptersProps[] }>(
          `/api/questionbank/chapter?subjectName=${activeSubject}&standard=${userStandard}`
        );
        return res.data;
      } catch (error: any) {
        throw new Error(`${error.message}`);
      }
    },
    enabled: !!activeSubject && !!userStandard,
  });
};

export const useGetTopicsWithSubtopic = ({
  activeSubject,
  userStandard,
  selectedChapter,
}: {
  activeSubject: string;
  userStandard: number;
  selectedChapter: string;
}) => {
  return useQuery({
    queryKey: ["topics", activeSubject, userStandard, selectedChapter],
    queryFn: async () => {
      try {
        const res = await apiClient.get<{ topics: TopicsWithSubtopicsProps[] }>(
          `/api/questionbank/topicwithsubtopic?subjectName=${activeSubject}&chapterId=${selectedChapter}&standard=${userStandard}`
        );
        return res.data;
      } catch (error: any) {
        throw new Error(`${error.message}`);
      }
    },
    enabled: !!activeSubject && !!userStandard && !!selectedChapter,
  });
};
