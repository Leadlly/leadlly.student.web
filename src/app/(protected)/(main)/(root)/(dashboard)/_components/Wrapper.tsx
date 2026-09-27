"use client";

import React from "react";
import DesktopUI from "./DesktopUI";
import MobileUI from "./MobileUI";
import TabletUI from "./TabletUI";
import { useMediaQuery } from "usehooks-ts";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getPlanner } from "@/actions/planner_actions";
import FreeMeetingBanner from "./FreeMeetingBanner";

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
        <MobileUI plan={data?.data} />
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="h-full pb-4">
        <FreeMeetingBanner />
        <TabletUI plan={data?.data} />
      </div>
    );
  }

  return (
    <div className="h-full">
      <FreeMeetingBanner />
      <DesktopUI plan={data?.data} />
    </div>
  );
};

export default Wrapper;
