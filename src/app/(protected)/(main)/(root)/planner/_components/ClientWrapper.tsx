"use client";

import { useState } from "react";
import { TDayProps } from "@/helpers/types";
import WeeklyPlan from "./WeeklyPlan";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlanner } from "@/actions/planner_actions";

const ClientWrapper = () => {
  const [, setTodaysData] = useState<TDayProps | null>(null);

  const { data } = useSuspenseQuery({
    queryKey: ["plannerData"],
    queryFn: getPlanner,
  });

  return (
    <div className="h-full min-h-0">
      <WeeklyPlan data={data?.data} setData={setTodaysData} />
    </div>
  );
};

export default ClientWrapper;
