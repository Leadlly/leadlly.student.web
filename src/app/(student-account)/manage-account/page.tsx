import { ArrowLeft } from "lucide-react";

import AccountPersonalInfo from "./_components/AccountPersonalInfo";
import AccountStudyProgress from "./_components/AccountStudyProgress";
import Link from "next/link";
import { MotionDiv } from "@/components/shared/MotionDiv";

import { cn } from "@/lib/utils";

import { manageAccountTabs } from "@/helpers/constants";
import LogoutButton from "@/components/shared/LogoutButton";
import AccountUserProfile from "./_components/AccountUserProfile";
import { getUnrevisedTopics } from "@/actions/studyData_actions";

const ManageAccount = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const activeManageAccountTab = searchParams["tab"] ?? "personal-info";

  const data = await getUnrevisedTopics();

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-6 px-4 pt-2">
        <Link
          href={"/"}
          className="border rounded-md w-8 h-8 flex items-center justify-center"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h3 className="text-2xl font-semibold">Manage Account</h3>
      </div>

      <section className="my-6 bg-primary/15 text-center lg:text-left lg:px-16 py-4 lg:py-8 flex flex-col lg:flex-row items-center justify-between">
        <AccountUserProfile />

        <div className="flex items-center gap-10 mt-5">
          <div>
            {/*<Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[206px] h-14 text-left font-normal flex items-center justify-between",
                    !date && "text-muted-foreground"
                  )}
                >
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
            </Popover>*/}
          </div>

          <LogoutButton />
        </div>
      </section>

      <div className="border-b-2 px-2 lg:px-16">
        <ul className="flex items-center justify-center lg:justify-normal gap-3 lg:gap-10 overflow-x-auto no-scrollbar">
          {manageAccountTabs.map((tab) => (
            <Link
              key={tab.id}
              href={`/manage-account?tab=${tab.id}`}
              className="relative pb-1"
            >
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
                )}
              >
                {tab.label}
              </li>
            </Link>
          ))}
        </ul>
      </div>

      <div className="flex-1 px-2 lg:px-16 py-6">
        {activeManageAccountTab === "personal-info" && (
          <>
            <AccountPersonalInfo />
          </>
        )}

        {activeManageAccountTab === "study-progress" && (
          <>
            <AccountStudyProgress unrevisedTopics={data.data} />
          </>
        )}

        {/* {activeManageAccountTab === "subject-overview" && (
          <>
            <AccountSubjectOverview />
          </>
        )} */}

        {/* {activeManageAccountTab === "your-mentor" && (
          <>
            <AccountMentorInfo />
          </>
        )} */}
      </div>
    </div>
  );
};

export default ManageAccount;
