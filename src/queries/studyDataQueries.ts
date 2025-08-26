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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STUDENT_WEB_BASE_URL}/api/chapters?subjectName=${activeSubject}&standard=${userStandard}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data: { chapters: subjectChaptersProps[] } = await res.json();
        return data;
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
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STUDENT_WEB_BASE_URL}/api/topics?subjectName=${activeSubject}&chapterId=${selectedChapter}&standard=${userStandard}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data: { topics: TopicsWithSubtopicsProps[] } = await res.json();
        return data;
      } catch (error: any) {
        throw new Error(`${error.message}`);
      }
    },
    enabled: !!activeSubject && !!userStandard && !!selectedChapter,
  });
};
