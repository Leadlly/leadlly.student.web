"use client";

import Link from "next/link";
import { getTodaysFormattedDate } from "@/helpers/utils";
import { RightArrowIcon } from "@/components";
import clsx from "clsx";
import { Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

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
            <div key={i} className="flex items-center justify-between">
              <li className="flex items-start gap-2 w-full py-1">
                <Checkbox
                  className="h-[18px] w-[18px] mt-[2px] border-[2px] border-[#787878] data-[state=checked]:bg-green-400 data-[state=checked]:text-white"
                  checked={topic.completed}
                  onChange={(e) => console.log("checked!")}
                />
                <div className="capitalize font-medium">
                  <p>{topic.label}</p>
                </div>
              </li>
              {topic.completed && (
                <div className="text-[10px] py-[2px] px-1 text-green-500 bg-green-400/10 rounded capitalize">
                  <p>completed</p>
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
