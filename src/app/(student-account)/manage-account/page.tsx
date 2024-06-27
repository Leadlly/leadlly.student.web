"use client";

import { useEffect, useState } from "react";

import { ArrowLeft, CalendarDaysIcon, Settings } from "lucide-react";

import { DownArrowIcon } from "@/components";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import AccountPersonalInfo from "./_components/AccountPersonalInfo";
import AccountSubjectOverview from "./_components/AccountSubjectOverview";
import AccountStudyProgress from "./_components/AccountStudyProgress";
import Link from "next/link";
import { MotionDiv } from "@/components/shared/MotionDiv";
import AccountMentorInfo from "./_components/AccountMentorInfo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { getUser } from "@/actions/user_actions";

import { UserDataProps } from "@/helpers/types";

import { cn } from "@/lib/utils";

import { format } from "date-fns";
import { useAppSelector } from "@/redux/hooks";

const manageAccountTabs = [
  {
    id: "personal-info",
    label: "Personal Info",
  },
  {
    id: "study-progress",
    label: "Study Progress",
  },
  {
    id: "subject-overview",
    label: "Subject Overview",
  },
  {
    id: "your-mentor",
    label: "Your Mentor",
  },
];

const userPersonalInfo = {
  firstName: "adil",
  lastName: "khursheed",
  class: "10th",
  phone: "0123456789",
  email: "adil@gmail.com",
  gender: "male",
  dateOfBirth: "06-04-1996",
  isPhoneVerified: true,
  isEmailVerified: true,
};

const ManageAccount = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [date, setDate] = useState<Date>();

  const activeManageAccountTab = searchParams["tab"] ?? "personal-info";

  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-6 px-4 pt-2">
        <Link
          href={"/"}
          className="border rounded-md w-8 h-8 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h3 className="text-2xl font-semibold">Manage Account</h3>
      </div>

      <section className="my-6 bg-primary/15 text-center lg:text-left lg:px-16 py-4 lg:py-8 flex flex-col lg:flex-row items-center justify-between">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <Avatar className="w-20 h-20 lg:w-32 lg:h-32">
            <AvatarImage src={user?.avatar?.url} />
            <AvatarFallback className="text-3xl font-semibold capitalize">
              {user?.firstname[0]}
              <span className="capitalize">
                {user?.lastname ? user.lastname[0] : ""}
              </span>
            </AvatarFallback>
          </Avatar>

          <div className="space-y-3 lg:space-y-5">
            <h2 className="capitalize text-2xl lg:text-3xl font-bold">
              <span className="text-primary">hello,</span> {user?.firstname}{" "}
              {user?.lastname}
            </h2>

            <p className="text-base lg:text-xl max-w-lg">
              Embrace the course as a catalyst for personal growth and
              empowerment, propelling.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-10 mt-5">
          <div>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[206px] h-14 text-left font-normal flex items-center justify-between",
                    !date && "text-muted-foreground"
                  )}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-primary/25">
                      <CalendarDaysIcon className="h-4 w-4 text-primary" />
                    </div>
                    {date ? format(date, "PPP") : format(new Date(), "PPP")}
                  </div>

                  <DownArrowIcon className="w-4 h-1.5" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          <Settings className="w-5 h-5" />
        </div>
      </section>

      <div className="border-b-2 px-2 lg:px-16">
        <ul className="flex items-center gap-3 lg:gap-10 overflow-x-auto no-scrollbar">
          {manageAccountTabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/manage-account?tab=${tab.id}`}
              className="relative pb-1">
              {activeManageAccountTab === tab.id && (
                <MotionDiv
                  layoutId="active_manage_account_tab"
                  transition={{
                    type: "spring",
                    duration: 0.6,
                  }}
                  className="absolute rounded h-1 bg-primary inset-x-0 bottom-0"
                />
              )}
              <li
                className={cn(
                  "flex items-center justify-between w-full capitalize text-[17px] md:text-2xl font-medium px-3 text-black whitespace-nowrap",
                  activeManageAccountTab === tab.id
                    ? "text-primary"
                    : "text-black"
                )}>
                {tab.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex-1 px-2 lg:px-16 py-6">
        {activeManageAccountTab === "personal-info" && (
          <>
            <AccountPersonalInfo user={user} />
          </>
        )}

        {activeManageAccountTab === "study-progress" && (
          <>
            <AccountStudyProgress />
          </>
        )}

        {activeManageAccountTab === "subject-overview" && (
          <>
            <AccountSubjectOverview />
          </>
        )}

        {activeManageAccountTab === "your-mentor" && (
          <>
            <AccountMentorInfo />
          </>
        )}
      </div>
    </div>
  );
};

export default ManageAccount;
