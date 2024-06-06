"use client";

import { Container, DownArrowIcon, TabContent, TabNavItem } from "@/components";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ArrowLeftIcon, CalendarDaysIcon, Settings } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AccountPersonalInfo from "./AccountPersonalInfo";
import AccountSubjectOverview from "./AccountSubjectOverview";

const manageAccountTabs = [
  {
    id: "personal-info",
    label: "Personal Info",
  },
  {
    id: "subject-overview",
    label: "Subject Overview",
  },
];

const ManageAccount = () => {
  const [date, setDate] = useState<Date>();
  const [activeTab, setActiveTab] = useState("personal-info");

  return (
    <Sheet>
      <SheetTrigger className="w-40 xl:w-full h-8 xl:h-7 border rounded text-primary hover:bg-primary/5 text-base xl:text-xs font-medium flex items-center justify-center">
        Manage Account
      </SheetTrigger>
      <SheetContent
        className="min-w-full py-0 px-0 overflow-y-auto"
        icon={<ArrowLeftIcon className="w-4 h-4" />}
        sheetCloseClassName="left-11 2xl:left-20 border-2 rounded w-7 h-7 flex items-center justify-center">
        <Container className="h-full flex flex-col">
          <h3 className="text-2xl font-semibold ml-24 2xl:ml-16 pt-4">
            Manage Account
          </h3>

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
                <TabNavItem
                  key={tab.id}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                  id={tab.id}
                  layoutIdPrefix="manage_account"
                  title={tab.label}
                  className={cn(
                    "text-2xl font-medium",
                    activeTab === tab.id ? "text-primary" : "text-black"
                  )}
                  activeTabClassName="h-1 w-full bottom-0 inset-x-0"
                />
              ))}
            </ul>
          </div>

          <div className="flex-1 px-16 py-6">
            <TabContent activeTab={activeTab} id="personal-info">
              <AccountPersonalInfo />
            </TabContent>
            <TabContent activeTab={activeTab} id="subject-overview">
              <AccountSubjectOverview />
            </TabContent>
          </div>
        </Container>
      </SheetContent>
    </Sheet>
  );
};

export default ManageAccount;
