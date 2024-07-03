"use client";

import { cn } from "@/lib/utils";
import { useAppSelector } from "@/redux/hooks";
import Link from "next/link";

const TrackerTabs = ({
  activeSubject,
}: {
  activeSubject: string | string[];
}) => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );
  return (
    <ul className="flex items-center justify-between md:justify-start gap-5 md:gap-10 md:mt-8">
      {userSubjects?.map((tab, i) => (
        <Link key={i} href={`/tracker?subject=${tab}`}>
          <li
            className={cn(
              "capitalize border-2 px-5 md:px-7 py-2 rounded-lg md:rounded-xl text-base md:text-2xl leading-none font-semibold transition ease-in-out duration-300",
              activeSubject === tab
                ? "bg-primary/10 border-primary text-primary"
                : "bg-transparent border-[#878787] text-[#878787]"
            )}>
            {tab}
          </li>
        </Link>
      ))}
    </ul>
  );
};

export default TrackerTabs;
