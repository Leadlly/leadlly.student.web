"use client";

import React from "react";
import { getFormattedDate, getFormattedDateForProd } from "@/helpers/utils";
import DesktopUI from "./DesktopUI";
import MobileUI from "./MobileUI";
import TabletUI from "./TabletUI";
import { PlannerDataProps } from "@/helpers/types";
import { useMediaQuery } from "usehooks-ts";

const Wrapper = ({ data }: { data: PlannerDataProps }) => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1280px)");

  if (isMobile) {
    return (
      <div className="h-full">
        <MobileUI
          quizTopics={
            data?.days.filter((item) =>
              process.env.NODE_ENV === "development"
                ? getFormattedDate(new Date(item.date)) ===
                  getFormattedDate(new Date(Date.now()))
                : getFormattedDateForProd(new Date(item.date)) ===
                  getFormattedDateForProd(new Date(Date.now()))
            )[0]
          }
        />
      </div>
    );
  }

  if (isTablet) {
    return (
      <div className="h-full pb-4">
        <TabletUI
          quizTopics={
            data?.days.filter((item) =>
              process.env.NODE_ENV === "development"
                ? getFormattedDate(new Date(item.date)) ===
                  getFormattedDate(new Date(Date.now()))
                : getFormattedDateForProd(new Date(item.date)) ===
                  getFormattedDateForProd(new Date(Date.now()))
            )[0]
          }
        />
      </div>
    );
  }

  return (
    <div className="h-full">
      <DesktopUI
        quizTopics={
          data?.days.filter((item) =>
            process.env.NODE_ENV === "development"
              ? getFormattedDate(new Date(item.date)) ===
                getFormattedDate(new Date(Date.now()))
              : getFormattedDateForProd(new Date(item.date)) ===
                getFormattedDateForProd(new Date(Date.now()))
          )[0]
        }
      />
    </div>
  );
};

export default Wrapper;
