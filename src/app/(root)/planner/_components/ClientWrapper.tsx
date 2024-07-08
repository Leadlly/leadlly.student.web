"use client";

import { PlannerDataProps, TDayProps } from "@/helpers/types";
import DesktopUI from "./DesktopUI";
import MobileUI from "./MobileUI";
import TabletUI from "./TabletUI";
import { useState } from "react";
import { getFormattedDate } from "@/helpers/utils";

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
  return (
    <>
      <DesktopUI
        plannerData={data}
        todaysTopics={todaysData}
        setData={setTodaysData}
      />

      <TabletUI
        plannerData={data}
        todaysTopics={todaysData}
        setData={setTodaysData}
      />

      <MobileUI
        plannerData={data}
        todaysTopics={todaysData}
        setData={setTodaysData}
      />
    </>
  );
};

export default ClientWrapper;
