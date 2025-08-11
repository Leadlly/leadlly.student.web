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
          `/api/chapters?subject=${activeSubject}&standard=${userStandard}`
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
          `/api/topics?subjectName=${activeSubject}&chapterId=${selectedChapter}&standard=${userStandard}`
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
