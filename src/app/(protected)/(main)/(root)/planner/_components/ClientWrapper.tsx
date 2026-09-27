"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlanner } from "@/actions/planner_actions";
import TodaysPlan from "../../(dashboard)/_components/TodaysPlan";

const ClientWrapper = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["plannerData"],
    queryFn: getPlanner,
  });

  return (
    <div className="h-full min-h-0 overflow-y-auto rounded-[28px] border border-[#EFEAF8] bg-white p-4">
      <TodaysPlan plan={data?.data} />
    </div>
  );
};

export default ClientWrapper;
