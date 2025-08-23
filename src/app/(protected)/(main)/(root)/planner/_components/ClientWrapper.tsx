"use client";

import React, { useState } from "react";
import { PlannerDataProps, TDayProps } from "@/helpers/types";
import DesktopUI from "./DesktopUI";
import MobileUI from "./MobileUI";
import TabletUI from "./TabletUI";
import { getFormattedDate } from "@/helpers/utils";
import { useMediaQuery } from "usehooks-ts";

const ClientWrapper = ({ data }: { data: PlannerDataProps }) => {
  const [todaysData, setTodaysData] = useState<TDayProps | null>(
    (data &&
      data.days &&
      data.days.filter(
        (day) =>
          getFormattedDate(new Date(day.date)) ===
          getFormattedDate(new Date(Date.now()))
      )[0]) ||
      null
  );

  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1280px)");

  if (isMobile) {
    return (
      <MobileUI
        plannerData={data}
        todaysTopics={todaysData}
        setData={setTodaysData}
      />
    );
  }

  if (isTablet) {
    return (
      <TabletUI
        plannerData={data}
        todaysTopics={todaysData}
        setData={setTodaysData}
      />
    );
  }

  return (
    <DesktopUI
      plannerData={data}
      todaysTopics={todaysData}
      setData={setTodaysData}
    />
  );
};

export default ClientWrapper;
