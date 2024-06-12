"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import ProfileBox from "./ProfileBox";
import PointsBox from "./PointsBox";
import TodaysVibe from "./TodaysVibe";
import DailyStreakQuestions from "./DailyStreakQuestions";
import UpcomingWorkshops from "./UpcomingWorkshops";

const UserProfileSheet = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src={"/assets/images/student_image.png"}
          alt="Student Profile"
          width={40}
          height={40}
          className="rounded-full object-cover"
        />
      </SheetTrigger>
      <SheetContent
        className="w-full sm:min-w-full py-4 flex flex-col gap-y-4 overflow-y-auto custom__scrollbar"
        icon={<ArrowLeft className="w-5 h-5" />}
        sheetCloseClassName="left-4">
        <SheetHeader className="text-left ml-10 text-xl font-semibold -mt-1">
          Profile
        </SheetHeader>
        <ProfileBox />
        <PointsBox />
        <TodaysVibe />
        <DailyStreakQuestions />
        <UpcomingWorkshops />
      </SheetContent>
    </Sheet>
  );
};

export default UserProfileSheet;
