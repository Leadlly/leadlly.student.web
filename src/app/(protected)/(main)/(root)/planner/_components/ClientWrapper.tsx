"use client";

import { useQuery } from "@tanstack/react-query";
import { getPlanner } from "@/actions/planner_actions";
import TodaysPlan from "../../(dashboard)/_components/TodaysPlan";
import Loader from "@/components/shared/Loader";

const ClientWrapper = () => {
  const { data, isPending } = useQuery({
    queryKey: ["plannerData"],
    queryFn: getPlanner,
  });

  if (isPending) {
    return <Loader />;
  }

  return (
    <div className="custom__scrollbar rounded-[28px] border border-[#EFEAF8] bg-white p-4 md:h-full md:min-h-0 md:overflow-y-auto">
      <TodaysPlan plan={data?.data} />
    </div>
  );
};

export default ClientWrapper;
