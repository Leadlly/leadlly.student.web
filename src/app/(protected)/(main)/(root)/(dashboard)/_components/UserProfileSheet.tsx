"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ArrowLeft } from "lucide-react";
import ProfileBox from "./ProfileBox";
import PointsBox from "./PointsBox";
// import TodaysVibe from "./TodaysVibe";
// import DailyStreakQuestions from "./DailyStreakQuestions";
// import UpcomingWorkshops from "./UpcomingWorkshops";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useAppSelector } from "@/redux/hooks";
import Institute from "./institute";
import CustomizePlanner from "./customizePlanner";
import ReferAndEarn from "./referAndEarn";

const UserProfileSheet = () => {
  const user = useAppSelector((state) => state.user.user);
  const { institute } = useAppSelector((state) => state.institute);

  return (
    <Sheet>
      <SheetTrigger>
        <Avatar className="w-10 h-10">
          <AvatarImage
            src={user?.avatar?.url}
            alt={`${user?.firstname}'s profile image`}
          />
          <AvatarFallback className="text-sm font-bold capitalize">
            {user?.firstname?.[0]}
            <span className="capitalize">
              {user?.lastname ? user.lastname?.[0] : ""}
            </span>
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent
        className="w-full sm:min-w-full py-4 flex flex-col gap-y-4 overflow-y-auto custom__scrollbar"
        icon={<ArrowLeft className="w-5 h-5" />}
        sheetCloseClassName="left-4"
      >
        <SheetHeader className="text-left ml-10 text-xl font-semibold -mt-1">
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <ProfileBox />
        <PointsBox />

        {institute && institute._id && (
          <div className="w-full">
            <div>
              <h4 className="text-lg font-semibold mb-1">Your Institute</h4>
            </div>
            <Institute />
          </div>
        )}

        <CustomizePlanner />

        <ReferAndEarn />
        {/* <TodaysVibe />
        <DailyStreakQuestions />
        <UpcomingWorkshops /> */}
      </SheetContent>
    </Sheet>
  );
};

export default UserProfileSheet;
