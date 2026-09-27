import { LeftArrowIcon, RightArrowIcon } from "@/components";
import { Button } from "@/components/ui/button";
import { PlannerDataProps, TRevisionProps, TDayProps } from "@/helpers/types";
import {
  capitalizeFirstLetter,
  getFormattedDate,
  getMonthDate,
  getMonthDateForProd,
  getTodaysFormattedDate,
} from "@/helpers/utils";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Player from "lottie-react";
import NoPlanner from "../../../../../../../public/assets/planner_waiting_animation.json";

const WeeklyPlan = ({
  data,
  setData,
}: {
  data: PlannerDataProps | null;
  setData: (data: TDayProps | null) => void;
}) => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <div className="custom__scrollbar flex h-full w-full flex-col justify-start gap-4 overflow-x-hidden overflow-y-auto py-2 pr-2">
      <div className="w-full flex justify-between gap-0 md:gap-4 py-2 flex-col items-start xl:justify-normal">
        <div className="px-3 md:px-7">
          <h4 className="text-base md:text-2xl xl:text-3xl leading-none font-semibold text-black">
            Weekly Plan
          </h4>
        </div>

        {data && data.startDate ? (
          <div className="xl:w-full flex items-center justify-between gap-4 md:gap-x-10 px-3 md:px-7">
            <div className="text-xs md:text-xl xl:text-2xl leading-none text-[#6e6e6e] font-semibold text-center">
              <p>
                {process.env.NODE_ENV === "development"
                  ? getMonthDate(new Date(data?.startDate))
                  : getMonthDateForProd(new Date(data.startDate))}{" "}
                -{" "}
                {process.env.NODE_ENV === "development"
                  ? getMonthDate(new Date(data?.endDate))
                  : getMonthDateForProd(new Date(data.endDate))}
              </p>
            </div>
            <div className="flex items-center space-x-4 md:space-x-8">
              <Button
                variant={"secondary"}
                className="w-6 h-6 md:w-7 md:h-7 px-0 flex items-center justify-center rounded-full"
              >
                <LeftArrowIcon className="w-[8px] h-[8px] md:w-3 md:h-3" />
              </Button>

              <Button
                variant={"secondary"}
                className="w-6 h-6 md:w-7 md:h-7 px-0 flex items-center justify-center rounded-full"
              >
                <RightArrowIcon className="w-[8px] h-[8px] md:w-3 md:h-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center text-muted-foreground font-medium px-3 md:px-7 w-full h-full flex flex-col items-center justify-center gap-y-5">
            <div className="size-60">
              <Player animationData={NoPlanner} autoPlay loop />
            </div>
            <p className="text-xl text-primary font-mada-Bold leading-tight px-5">
              Planner will generate shortly...
            </p>
            <p className="text-sm leading-tight font-mada-regular text-tab-item-gray px-5">
              Please hold on.. while your plan is being generated, your
              itinerary will be ready shortly
            </p>
          </div>
        )}
      </div>

      <div className="w-full flex-1 overflow-hidden px-3 md:px-5">
        <ul className="custom__scrollbar flex h-full w-full flex-col gap-3 overflow-x-hidden overflow-y-auto">
          {data?.days.map((plan: TDayProps) => {
            const isToday =
              getFormattedDate(new Date(plan.date)) === getTodaysFormattedDate();
            const names = [
              ...plan.continuousRevisionTopics,
              ...plan.continuousRevisionSubTopics,
              ...plan.backRevisionTopics,
            ].map((topic: TRevisionProps) =>
              capitalizeFirstLetter(
                topic.subtopic?.name && topic.subtopic.name !== topic.topic?.name
                  ? topic.subtopic.name
                  : topic.topic.name
              )
            );
            return (
              <li key={plan._id}>
                <button
                  type="button"
                  onClick={async () => {
                    await setData(null);
                    await setData(plan);
                    setSelectedPlan(plan._id);
                  }}
                  className={cn(
                    "w-full rounded-[22px] px-5 py-4 text-left",
                    isToday
                      ? "bg-leadlly text-white"
                      : "bg-[#F6F3FB] text-dark-primary",
                    !isToday && selectedPlan === plan._id && "ring-2 ring-primary"
                  )}
                >
                  <span className="flex items-start justify-between gap-3">
                    <span className="text-base font-semibold">
                      {plan.day}{" "}
                      <span className={cn("font-medium", isToday ? "text-white/80" : "text-secondary-text")}>
                        {getFormattedDate(new Date(plan.date))}
                      </span>
                    </span>
                    <span className={cn("shrink-0 text-sm", isToday ? "text-white/80" : "text-secondary-text")}>
                      {names.length} topics
                    </span>
                  </span>
                  <span
                    className={cn(
                      "mt-1 block truncate text-sm",
                      isToday ? "text-white/85" : "text-secondary-text"
                    )}
                  >
                    {names.length ? names.join(" / ") : "No topics"}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyPlan;
