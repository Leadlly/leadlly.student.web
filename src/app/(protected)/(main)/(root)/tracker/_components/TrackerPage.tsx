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
    <div className="flex flex-col gap-y-6 md:h-full">
      <Header
        title="Tracker"
        titleClassName="text-2xl md:text-3xl lg:text-page-title"
      />

      <ul className="flex w-full items-center rounded-full border border-[#E4DFF0] bg-white p-1.5">
        {userSubjects?.map((tab) => {
          const active = activeSubject === tab.name;
          return (
            <li key={tab.name} className="flex-1">
              <Link
                href={`/tracker?subject=${encodeURIComponent(tab.name)}`}
                className={cn(
                  "flex h-11 items-center justify-center rounded-full text-base font-semibold capitalize",
                  active ? "bg-primary/10 text-primary" : "text-black"
                )}
              >
                {tab.name}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="custom__scrollbar md:min-h-0 md:flex-1 md:overflow-y-auto md:pr-3">
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
