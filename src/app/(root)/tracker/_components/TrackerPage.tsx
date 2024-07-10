"use client";

import { Header } from "@/components";
import React, { useEffect, useState } from "react";
import TrackerComponent from "./Tracker";
import { TTrackerProps } from "@/helpers/types";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getUserTracker } from "@/actions/tracker_actions";
import { toast } from "sonner";

const TrackerPage = () => {
  const [trackerData, setTrackerData] = useState<TTrackerProps[] | null>(null);

  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );
  const searchParams = useSearchParams();
  const activeSubject = searchParams.get("subject") ?? userSubjects?.[0].name;

  useEffect(() => {
    const geTrackerData = async () => {
      try {
        const data = await getUserTracker(activeSubject!);
        setTrackerData(data.tracker);
      } catch (error: any) {
        toast.error(error.message);
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

      <ul className="flex items-center justify-between md:justify-start gap-5 md:gap-10 md:mt-8">
        {userSubjects?.map((tab, i) => (
          <Link key={i} href={`/tracker?subject=${tab.name}`}>
            <li
              className={cn(
                "capitalize border-2 px-5 md:px-7 py-2 rounded-lg md:rounded-xl text-base md:text-2xl leading-none font-semibold transition ease-in-out duration-300",
                activeSubject === tab.name
                  ? "bg-primary/10 border-primary text-primary"
                  : "bg-transparent border-[#878787] text-[#878787]"
              )}
            >
              {tab.name}
            </li>
          </Link>
        ))}
      </ul>

      <hr className="border" />

      <div className="h-full overflow-y-auto custom__scrollbar pr-3 mb-16 md:mb-0">
        {activeSubject && (
          <TrackerComponent
            activeSubject={activeSubject}
            trackerData={trackerData!}
            userSubjects={userSubjects}
          />
        )}
      </div>
    </div>
  );
};

export default TrackerPage;
