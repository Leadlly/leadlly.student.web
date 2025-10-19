"use client";

import React, { useEffect, useState } from "react";
import { PlannerDataProps, TDayProps } from "@/helpers/types";
import DesktopUI from "./DesktopUI";
import MobileUI from "./MobileUI";
import TabletUI from "./TabletUI";
import { getFormattedDate } from "@/helpers/utils";
import { useMediaQuery } from "usehooks-ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlanner } from "@/actions/planner_actions";

const ClientWrapper = () => {
  const [todaysData, setTodaysData] = useState<TDayProps | null>(null);

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1280px)");

  const { data, isLoading } = useSuspenseQuery({
    queryKey: ["plannerData"],
    queryFn: getPlanner,
  });

  useEffect(() => {
    if (isLoading) return;

    if (data && data.data && data.data.days) {
      setTodaysData(
        data.data.days.filter(
          (day) =>
            getFormattedDate(new Date(day.date)) ===
            getFormattedDate(new Date(Date.now()))
        )[0]
      );
    }
  }, [isLoading, data]);

  if (isMobile) {
    return (
      <MobileUI
        plannerData={data?.data}
        todaysTopics={todaysData}
        setData={setTodaysData}
      />
    );
  }

  if (isTablet) {
    return (
      <TabletUI
        plannerData={data?.data}
        todaysTopics={todaysData}
        setData={setTodaysData}
      />
    );
  }

  return (
    <DesktopUI
      plannerData={data?.data}
      todaysTopics={todaysData}
      setData={setTodaysData}
    />
  );
};

export default ClientWrapper;
