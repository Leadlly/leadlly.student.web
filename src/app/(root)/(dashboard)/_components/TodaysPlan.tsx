import Link from "next/link";
import { getTodaysFormattedDate } from "@/helpers/utils";
import { RightArrowIcon } from "@/components";
import clsx from "clsx";
import { Check } from "lucide-react";

type TTodaysTopic = {
  label: string;
  completed: boolean;
};

const TodaysPlan = ({ todaysTopics }: { todaysTopics: TTodaysTopic[] }) => {
  return (
    <>
      <div className="flex items-center justify-between py-3 px-6">
        <div>
          <h4 className="text-xl font-semibold">Today&apos;s Plan</h4>
          <p className="text-xs font-medium text-[#9E9C9C]">
            {getTodaysFormattedDate()}
          </p>
        </div>
        <Link href="/" className="flex items-center gap-4 text-[#A36AF5]">
          View all
          <RightArrowIcon stroke="#A36AF5" />
        </Link>
      </div>

      <div className="w-full flex-1 px-6 overflow-y-auto custom__scrollbar">
        <ul className="w-full h-full flex flex-col justify-start">
          {todaysTopics.map((topic, i) => (
            <div key={i} className="flex items-start justify-between">
              <li className="flex items-start gap-2 w-full py-1">
                <div
                  className={clsx(
                    "w-4 h-4 border-2 rounded bg-transparent mt-[2px] cursor-pointer"
                  )}>
                  <input type="checkbox" className="hidden" />
                  <span
                    className={clsx(
                      "w-full h-full flex items-center justify-center",
                      topic.completed ? "bg-green-200" : ""
                    )}>
                    {topic.completed && <Check width={12} color="#A36AF5" />}
                  </span>
                </div>
                <div className="capitalize font-medium">
                  <p>{topic.label}</p>
                </div>
              </li>
              {topic.completed && (
                <div className="text-xs py-1 px-2 text-green-500 bg-green-400 bg-opacity-10 rounded-full">
                  <p>complete</p>
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodaysPlan;
