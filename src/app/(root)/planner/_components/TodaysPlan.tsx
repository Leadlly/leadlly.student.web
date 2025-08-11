import {
  capitalizeFirstLetter,
  getFormattedDate,
  getTodaysDay,
  getTodaysFormattedDate,
} from "@/helpers/utils";
import { TDayProps } from "@/helpers/types";
import { useAppSelector } from "@/redux/hooks";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Player from "lottie-react";
import NoTopic from "../../../../../public/assets/no_topics_animations.json";

const TodaysPlan = ({ todaysTopics }: { todaysTopics: TDayProps | null }) => {
  const userSubjects = useAppSelector(
    (state) => state.user.user?.academic.subjects
  );

  function getBackRevisionTopicsForSubject(subject: string) {
    const topics = todaysTopics?.backRevisionTopics
      .filter((topic) => topic.subject.name === subject)
      .map((topic) => capitalizeFirstLetter(topic.topic.name));

    return !topics?.length && !todaysTopics?.continuousRevisionTopics.length
      ? "No plans today!"
      : topics?.join(", ");
  }

  function getContinuousRevisionTopicsForSubject(subject: string) {
    const topics = todaysTopics?.continuousRevisionTopics
      .filter((topic) => topic.subject.name === subject)
      .map((topic) => capitalizeFirstLetter(topic.topic.name));

    return !topics?.length && !todaysTopics?.backRevisionTopics.length
      ? "No plans today!"
      : topics?.join(", ");
  }

  return (
    <div className="rounded-xl border flex flex-col justify-start overflow-hidden">
      <div className="flex items-center justify-between px-7 py-4 bg-sidebar-background rounded-t-xl">
        <div className="flex flex-col justify-start gap-1">
          <h4 className="text-base md:text-2xl leading-none font-semibold text-black">
            {!todaysTopics?.day && todaysTopics?.day !== getTodaysDay()
              ? "Today"
              : todaysTopics?.day && todaysTopics.day === getTodaysDay()
                ? "Today"
                : todaysTopics.day}
            &apos;s Plan
          </h4>
          <p className="text-xs font-semibold text-[#9E9C9C]">
            {todaysTopics?.day ? todaysTopics.day : getTodaysDay()}{" "}
            {todaysTopics?.date
              ? getFormattedDate(new Date(todaysTopics?.date!))
              : getTodaysFormattedDate()}
          </p>
        </div>
      </div>

      <div className="flex-1 max-h-[365px] overflow-y-auto custom__scrollbar">
        <ul className="h-full flex flex-col justify-start">
          {userSubjects?.map((subject) => (
            <li
              key={subject.name}
              className="border-b md:border-none xl:border-b border-b-[#717171] border-opacity-[0.11] last:border-none py-4 px-7"
            >
              <h4 className="text-sm md:text-xl leading-tight font-medium text-black capitalize">
                {subject.name}
              </h4>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <>
                      {todaysTopics &&
                      (todaysTopics?.backRevisionTopics.length > 0 ||
                        todaysTopics.continuousRevisionTopics.length > 0) ? (
                        <p className="text-xs md:text-sm leading-tight font-normal truncate text-[#454545] cursor-pointer">
                          {getContinuousRevisionTopicsForSubject(subject.name)}
                          {todaysTopics?.backRevisionTopics.length &&
                          todaysTopics.continuousRevisionTopics.length
                            ? ", "
                            : !todaysTopics.continuousRevisionTopics.length
                              ? ""
                              : "."}
                          {getBackRevisionTopicsForSubject(subject.name)}
                        </p>
                      ) : (
                        <div className="flex flex-col items-center justify-center gap-y-2">
                          <div className="size-16">
                            <Player animationData={NoTopic} autoPlay loop />
                          </div>
                          <p className="text-secondary-text font-mada-medium -mt-4">
                            No topics for today!
                          </p>
                        </div>
                      )}
                    </>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-md w-full">
                    <p className="text-xs md:text-sm leading-tight font-normal whitespace-normal text-[#454545]">
                      {todaysTopics &&
                      (todaysTopics?.backRevisionTopics.length > 0 ||
                        todaysTopics.continuousRevisionTopics.length > 0) ? (
                        <>
                          {getContinuousRevisionTopicsForSubject(subject.name)}
                          {todaysTopics?.backRevisionTopics.length &&
                          todaysTopics.continuousRevisionTopics.length
                            ? ", "
                            : !todaysTopics.continuousRevisionTopics.length
                              ? ""
                              : "."}
                          {getBackRevisionTopicsForSubject(subject.name)}
                        </>
                      ) : (
                        "No plans today!"
                      )}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodaysPlan;
