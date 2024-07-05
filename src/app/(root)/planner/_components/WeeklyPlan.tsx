import { getPlanner } from "@/actions/planner_actions";
import { LeftArrowIcon, RightArrowIcon } from "@/components";
import { Button } from "@/components/ui/button";
import {
  PlannerDataProps,
  TBackRevisionProps,
  TDayProps,
} from "@/helpers/types";
import {
  capitalizeFirstLetter,
  getFormattedDate,
  getMonthDate,
  getTodaysFormattedDate,
} from "@/helpers/utils";
import { cn } from "@/lib/utils";

const WeeklyPlan = ({
  data,
  setData,
}: {
  data: PlannerDataProps;
  setData: (data: TDayProps | null) => void;
}) => {
  return (
    <div className="w-full flex flex-col justify-start gap-5 h-full py-4 border rounded-xl overflow-x-hidden overflow-y-auto custom__scrollbar">
      <div className="w-full flex items-center justify-between gap-0 md:gap-4 py-2 xl:flex-col xl:items-start xl:justify-normal">
        <div className="px-3 md:px-7">
          <h4 className="text-base md:text-2xl xl:text-3xl leading-none font-semibold text-black">
            Weekly Plan
          </h4>
        </div>

        <div className="xl:w-full flex items-center justify-between gap-4 md:gap-x-10 px-3 md:px-7">
          <div className="text-xs md:text-xl xl:text-2xl leading-none text-[#6e6e6e] font-semibold text-center">
            <p>
              {getMonthDate(new Date(data?.startDate))} -{" "}
              {getMonthDate(new Date(data?.endDate))}
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
      </div>

      <div className="w-full flex-1 overflow-hidden md:px-5">
        <ul className="w-full flex flex-col justify-start gap-3 h-full overflow-x-hidden overflow-y-auto custom__scrollbar px-3 md:px-2">
          {data?.days.map((plan: TDayProps) => (
            <li
              key={plan._id}
              className={cn(
                "w-full rounded-xl md:text-center border-2 cursor-pointer",
                getFormattedDate(new Date(plan.date)) ===
                  getTodaysFormattedDate()
                  ? "bg-primary text-white"
                  : "bg-white text-black"
              )}
              onClick={async () => {
                await setData(null);
                await setData(plan);
              }}
            >
              <p className="py-2 border-b border-b-slate-300 text-sm md:text-xl flex items-center justify-between md:justify-center gap-4 px-4">
                <span className="font-semibold">{plan.day}</span>
                <span>{getFormattedDate(new Date(plan.date))}</span>
              </p>
              <p className="w-full py-2 text-xs md:text-base px-4 truncate overflow-hidden">
                {plan.backRevisionTopics.length > 0 ? (
                  plan.backRevisionTopics
                    .map((topics: TBackRevisionProps) =>
                      capitalizeFirstLetter(topics.topic.name)
                    )
                    .join(" / ")
                ) : (
                  <>No topics</>
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WeeklyPlan;
