import { UpArrowIcon } from "@/components";
import { Progress } from "@/components/ui/progress";
import { TLevelPointProps } from "@/helpers/types";
import clsx from "clsx";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const LevelPoints = ({
  cardBgColor,
  iconImageSrc,
  iconAltText,
  iconShadowColor,
  chevronBgColor,
  pointsColor,
  points,
  pointsText,
  progressValue,
  pointsProgressText,
  pointsProgressTextColor,
  progressIndicatorBg,
  progressIconStroke,
}: TLevelPointProps) => {
  return (
    <div
      className={clsx(
        "border rounded-md p-2 flex flex-col justify-start gap-3",
        cardBgColor
      )}>
      <div className="flex items-center justify-between">
        <Image
          src={iconImageSrc}
          alt={iconAltText}
          width={pointsText === "Streak" ? 11 : 14}
          height={pointsText === "Streak" ? 11 : 14}
          className={clsx("shadow-lg", iconShadowColor)}
        />

        <ChevronRight
          width={12}
          height={12}
          className={clsx("rounded-full border-none p-[2px]", chevronBgColor)}
        />
      </div>

      <div className="flex-1 flex flex-col justify-center items-center gap-1">
        <h3
          className={clsx("leading-[0.5] text-xl font-semibold", pointsColor)}>
          {points}
        </h3>
        <p className="text-sm font-medium text-[#6B6B6B]">{pointsText}</p>

        <Progress
          value={progressValue}
          className="h-[5px]"
          indicatorClassName={progressIndicatorBg}
        />

        {pointsText !== "Streak" && (
          <div className="flex items-center gap-[2px]">
            <UpArrowIcon stroke={progressIconStroke} />
            <span
              className={clsx(
                "text-[9px] font-bold mt-[0.5px]",
                pointsProgressTextColor
              )}>
              {pointsProgressText}
            </span>
          </div>
        )}

        {pointsText === "Streak" && (
          <>
            <div className=" w-full text-[6px] text-black font-semibold flex items-center justify-between -mt-1">
              <span>Jan12</span>
              <span>Feb12</span>
            </div>

            <p className="text-[8px] text-black font-semibold -mt-1">
              Good Work
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default LevelPoints;
