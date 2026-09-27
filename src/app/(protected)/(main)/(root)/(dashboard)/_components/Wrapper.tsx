"use client";

import React from "react";
import { getFormattedDate, getFormattedDateForProd } from "@/helpers/utils";
import DesktopUI from "./DesktopUI";
import MobileUI from "./MobileUI";
import TabletUI from "./TabletUI";
import { useMediaQuery } from "usehooks-ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlanner } from "@/actions/planner_actions";
import { TDayProps } from "@/helpers/types";
import FreeMeetingBanner from "./FreeMeetingBanner";

const todaysQuiz = (days?: TDayProps[]) =>
  (days ?? []).filter((item) =>
    process.env.NODE_ENV === "development"
      ? getFormattedDate(new Date(item.date)) ===
        getFormattedDate(new Date(Date.now()))
      : getFormattedDateForProd(new Date(item.date)) ===
        getFormattedDateForProd(new Date(Date.now()))
  )[0];

const Wrapper = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1280px)");

  const { data } = useSuspenseQuery({
    queryKey: ["plannerData"],
    queryFn: getPlanner,
  });

  if (isMobile) {
    return (
      <div className="h-full">
        <FreeMeetingBanner />
        <MobileUI
          quizTopics={todaysQuiz(data?.data?.days)}
        />
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="h-full pb-4">
        <FreeMeetingBanner />
        <TabletUI
          quizTopics={todaysQuiz(data?.data?.days)}
        />
      </div>
    );
  }

  return (
    <div className="h-full">
      <FreeMeetingBanner />
      <DesktopUI
        quizTopics={todaysQuiz(data?.data?.days)}
      />
    </div>
  );
};

export default Wrapper;
