import { Button } from "@/components/ui/button";
import { chapterOverviewProps, TTrackerProps } from "@/helpers/types";
import { capitalizeFirstLetter, convertDateString } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import React from "react";

const ChapterRevisionDateTable = ({
  chapterData,
  setViewMore,
}: {
  chapterData: TTrackerProps;
  setViewMore: (viewMore: boolean) => void;
}) => {
  const onBackButtonClickHandler = () => {
    setViewMore(false);
  };
  return (
    <div
      className={cn(
        "border rounded-xl relative p-4 lg:p-0",
        chapterData.chapter.overall_efficiency! <= 40
          ? "bg-[#ff2e2e]/10 border-[#ff2e2e]"
          : chapterData.chapter.overall_efficiency! > 40 &&
              chapterData.chapter.overall_efficiency! < 80
            ? "bg-[#ff9900]/10 border-[#ff9900]"
            : "bg-[#0fd679]/10 border-[#0fd679]"
      )}
    >
      <Button
        variant={"ghost"}
        className="absolute left-2 top-2 lg:hidden"
        onClick={onBackButtonClickHandler}
      >
        <ArrowLeft size={20} />
      </Button>

      <p className="lg:hidden capitalize w-full text-center text-lg md:text-xl leading-tight font-semibold">
        {chapterData.chapter.name}
      </p>

      <div className="hidden lg:flex items-center p-4">
        <div className="w-96 text-[28px] font-semibold leading-tight capitalize whitespace-nowrap truncate pl-4">
          <p>{chapterData.chapter.name}</p>
        </div>
        <div className="relative flex-grow text-center text-xl font-medium leading-tight">
          <p>Last Revision Date and Efficiency</p>

          <Button
            className="absolute top-0 right-0 h-7"
            variant={"outline"}
            onClick={onBackButtonClickHandler}
          >
            Back
          </Button>
        </div>
      </div>

      <div className="border lg:border-none mt-3 lg:mt-0 rounded-lg pb-2 bg-white lg:mx-4 lg:mb-4">
        <p className="text-sm md:text-base font-medium text-primary leading-tight text-center lg:hidden border-b py-4 px-3 bg-primary/5">
          Last Revision Date and Efficiency
        </p>

        <div className="h-40 overflow-y-auto custom__scrollbar p-2 lg:px-4">
          <ul className="flex flex-col justify-start gap-y-3">
            {chapterData && chapterData.topics.length ? (
              chapterData.topics.map((topic) => (
                <li
                  key={topic.name}
                  className="text-xs md:text-lg lg:text-xl leading-tight font-normal gap-1 flex md:flex-row flex-col md:items-center md:gap-x-3"
                >
                  <p className="w-36 md:w-56 lg:w-96">
                    {capitalizeFirstLetter(topic.name)}
                  </p>

                  <div className="flex-1 flex items-center gap-x-3 overflow-x-auto no-scrollbar">
                    {topic.studiedAt.map((revisionDate, index) => (
                      <span
                        key={index}
                        className={cn(
                          "whitespace-nowrap px-2 py-1.5 rounded text-xs md:text-base",
                          revisionDate.efficiency! <= 40
                            ? "bg-[#ff2e2e]/10 text-[#ff2e2e]"
                            : revisionDate.efficiency! > 40 &&
                                revisionDate.efficiency! < 80
                              ? "bg-[#ff9900]/10 text-[#ff9900]"
                              : "bg-[#0fd679]/10 text-[#0fd679]"
                        )}
                      >
                        {convertDateString(revisionDate.date!)}
                      </span>
                    ))}
                    <div className="flex flex-col gap-0.5 whitespace-nowrap bg-primary/10 rounded px-2 py-1.5 text-[8px] md:text-xs leading-tight font-medium">
                      <span>
                        Overall Eff:{" "}
                        <span
                          className={cn(
                            "font-bold",
                            topic.overall_efficiency! <= 40
                              ? "text-[#ff2e2e]"
                              : topic.overall_efficiency! > 40 &&
                                  topic.overall_efficiency! < 80
                                ? "text-[#ff9900]"
                                : "text-[#0fd679]"
                          )}
                        >
                          {topic.overall_efficiency?.toFixed(0)}%
                        </span>
                      </span>
                      <span>
                        No. of Revisions:{" "}
                        <span className="font-bold">
                          {topic.plannerFrequency}
                        </span>
                      </span>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <div>No topic to track!</div>
            )}
          </ul>

          {/* <ul className="flex-1 flex flex-col gap-y-3 overflow-x-auto">
            {chapterData.topics.map((topic) => (
              <div key={topic.title} className="flex items-center gap-x-3">
                {topic.revisionDates.map((revisionDate, i) => (
                  <li key={i} className="whitespace-nowrap">
                    {convertDateString(revisionDate.date)}
                  </li>
                ))}
              </div>
            ))}
          </ul> */}
        </div>
      </div>
    </div>
  );
};

export default ChapterRevisionDateTable;
