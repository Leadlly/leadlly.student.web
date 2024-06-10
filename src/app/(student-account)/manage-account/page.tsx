"use client";

import { DownArrowIcon } from "@/components";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeft, CalendarDaysIcon, Settings } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AccountPersonalInfo from "./_components/AccountPersonalInfo";
import AccountSubjectOverview from "./_components/AccountSubjectOverview";
import AccountStudyProgress from "./_components/AccountStudyProgress";
import Link from "next/link";
import { MotionDiv } from "@/components/shared/MotionDiv";
import AccountMentorInfo from "./_components/AccountMentorInfo";

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
  phone: 1234567890,
  email: "adil@gmail.com",
  gender: "male",
  dateOfBirth: new Date("06-04-1996"),
};

const ManageAccount = ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const [date, setDate] = useState<Date>();

  const activeManageAccountTab = searchParams["tab"] ?? "personal-info";

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-6 px-4">
        <Link
          href={"/"}
          className="border rounded-md w-8 h-8 flex items-center justify-center">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h3 className="text-2xl font-semibold">Manage Account</h3>
      </div>

      <section className="my-6 bg-primary/15 px-16 py-8 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Image
            src={"/assets/images/student_image.png"}
            alt="student_profile"
            width={124}
            height={124}
            className="rounded-full object-contain"
          />

          <div className="space-y-5">
            <h2 className="capitalize text-3xl font-bold">
              <span className="text-primary">hello,</span> john musk
            </h2>

            <p className="text-xl max-w-lg">
              Embrace the course as a catalyst for personal growth and
              empowerment, propelling.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-10">
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

      <div className="border-b-2 px-16">
        <ul className="flex items-center gap-10">
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
                  "flex items-center justify-between w-full capitalize text-base md:text-2xl font-medium px-3 text-black",
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

      <div className="flex-1 px-16 py-6">
        {activeManageAccountTab === "personal-info" && (
          <>
            <AccountPersonalInfo user={userPersonalInfo} />
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
