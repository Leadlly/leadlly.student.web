"use client";

import { Header } from "@/components";
import React, { useEffect, useState } from "react";
import TrackerComponent from "./Tracker";
import { TTrackerProps } from "@/helpers/types";
import { useSearchParams } from "next/navigation";
import { subjectsForExam } from "@/lib/subjects";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getUserTracker } from "@/actions/tracker_actions";
import { toast } from "sonner";
import Loader from "@/components/shared/Loader";

const TrackerPage = () => {
  const [trackerData, setTrackerData] = useState<TTrackerProps[] | null>(null);
  const [subjectStats, setSubjectStats] = useState<{
    questionsInBank?: number;
    overall_progress?: number;
    overall_efficiency?: number;
  } | null>(null);
  const [isTrackerLoading, setIsTrackerLoading] = useState(false);

  const user = useAppSelector((state) => state.user.user);
  const userSubjects = subjectsForExam(
    user?.academic?.subjects,
    user?.academic?.competitiveExam
  );
  const searchParams = useSearchParams();
  const activeSubject = searchParams.get("subject") ?? userSubjects?.[0]?.name;

  useEffect(() => {
    const geTrackerData = async () => {
      setIsTrackerLoading(true);
      try {
        const data = await getUserTracker(activeSubject!);
        setTrackerData(data.tracker ?? []);
        setSubjectStats(data.subjectStats ?? null);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsTrackerLoading(false);
      }
    };

    geTrackerData();
  }, [activeSubject]);

  return (
    <div className="h-full flex flex-col gap-y-4">
      <Header
        title="Tracker"
        titleClassName="text-2xl md:text-3xl lg:text-page-title"
      />

      <ul className="flex items-center gap-3 overflow-x-auto">
        {userSubjects?.map((tab, i) => (
          <Link key={i} href={`/tracker?subject=${encodeURIComponent(tab.name)}`}>
            <li
              className={cn(
                "whitespace-nowrap rounded-full px-5 py-2 text-base font-semibold capitalize",
                activeSubject === tab.name
                  ? "bg-primary/15 text-primary"
                  : "text-dark-primary"
              )}
            >
              {tab.name}
            </li>
          </Link>
        ))}
      </ul>

      <div className="h-full overflow-y-auto custom__scrollbar pr-3 mb-16 md:mb-0">
        {isTrackerLoading ? (
          <Loader />
        ) : (
          activeSubject && (
            <TrackerComponent
              activeSubject={activeSubject}
              trackerData={trackerData ?? []}
              userSubjects={userSubjects?.map((subject) =>
                subject.name === activeSubject
                  ? {
                      ...subject,
                      overall_progress:
                        subjectStats?.overall_progress ?? subject.overall_progress,
                      overall_efficiency:
                        subjectStats?.overall_efficiency ?? subject.overall_efficiency,
                      total_questions_solved: {
                        ...subject.total_questions_solved,
                        total:
                          subjectStats?.questionsInBank && subjectStats.questionsInBank > 0
                            ? subjectStats.questionsInBank
                            : subject.total_questions_solved?.total,
                      },
                    }
                  : subject
              )}
            />
          )
        )}
      </div>
    </div>
  );
};

export default TrackerPage;
