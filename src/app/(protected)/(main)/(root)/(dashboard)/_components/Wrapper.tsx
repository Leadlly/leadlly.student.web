"use client";

import React from "react";
import DesktopUI from "./DesktopUI";
import MobileUI from "./MobileUI";
import TabletUI from "./TabletUI";
import { useMediaQuery } from "usehooks-ts";
import { useQuery } from "@tanstack/react-query";
import { getPlanner } from "@/actions/planner_actions";
import FreeMeetingBanner from "./FreeMeetingBanner";
import Loader from "@/components/shared/Loader";

const Wrapper = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1280px)");

  const { data, isPending } = useQuery({
    queryKey: ["plannerData"],
    queryFn: getPlanner,
  });

  if (isPending) {
    return <Loader />;
  }

  const plan = data?.data ?? null;

  if (isMobile) {
    return (
      <div className="h-full min-h-0 overflow-y-auto">
        <FreeMeetingBanner />
        <MobileUI plan={plan} />
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="h-full pb-4">
        <FreeMeetingBanner />
        <TabletUI plan={plan} />
      </div>
    );
  }

  return (
    <div className="h-full">
      <FreeMeetingBanner />
      <DesktopUI plan={plan} />
    </div>
  );
};

export default Wrapper;
