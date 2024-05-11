import Link from "next/link";
import { getTodaysFormattedDate } from "@/helpers/utils";
import { RightArrowIcon } from "@/components";

type TTodaysTopic = {
  subject: string;
  topics: string;
};

const TodaysPlan = ({ todaysTopics }: { todaysTopics: TTodaysTopic[] }) => {
  return (
    <>
      <div className="flex items-center justify-between px-7 py-4 bg-sidebar-background rounded-t-xl">
        <div className="flex flex-col justify-start gap-1">
          <h4 className="text-2xl font-semibold text-black">
            Today&apos;s Plan
          </h4>
          <p className="text-xs font-semibold text-[#9E9C9C]">
            {getTodaysFormattedDate()}
          </p>
        </div>
        <Link
          href={"/"}
          className="text-[#A36AF5] text-base font-medium flex items-center gap-4">
          View all
          <RightArrowIcon stroke="#A36AF5" />
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto custom__scrollbar">
        <ul className="h-full flex md:grid md:grid-cols-2 xl:flex flex-col justify-start">
          {todaysTopics.map((plan) => (
            <li
              key={plan.subject}
              className="border-b md:border-none xl:border-b border-b-[#717171] border-opacity-[0.11] last:border-none py-4 px-7">
              <h4 className="text-xl font-medium text-black">{plan.subject}</h4>
              <p className="text-sm font-normal text-[#454545]">
                {plan.topics}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TodaysPlan;
