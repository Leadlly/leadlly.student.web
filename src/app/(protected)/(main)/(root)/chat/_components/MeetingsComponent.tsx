"use client";

import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { ClockIcon, TabNavItem } from "@/components";
import RequestMeetingDesktopComponent from "./RequestMeetingDesktopComponent";
import { meetingTabs } from "@/helpers/constants";
import { TMeetingsProps } from "@/helpers/types";
import {
  calculateDaysLeft,
  convertDateString,
  formatDate,
} from "@/helpers/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MeetingsComponent = ({
  upcomingMeetings,
  doneMeetings,
}: {
  upcomingMeetings: TMeetingsProps[];
  doneMeetings: TMeetingsProps[];
}) => {
  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="flex flex-col lg:flex-row lg:gap-5">
      {/* Upcoming meetings */}
      <div className="flex-1 rounded-[34px] bg-white py-3">
        <ul className="mx-4 flex items-center rounded-full bg-[#F4F1FB] p-1">
          {meetingTabs.map((tab) => (
            <TabNavItem
              key={tab.id}
              id={tab.id}
              title={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              layoutIdPrefix="meetings"
              className="flex-1 rounded-full px-6 py-2 text-center text-sm font-semibold capitalize text-black md:text-base"
              activeTabClassName="h-full inset-0 rounded-full bg-white"
            />
          ))}
        </ul>

        <div className="custom__scrollbar mt-3 md:max-h-[470px] md:overflow-y-auto lg:max-h-[700px] xl:max-h-[470px]">
          {/* Upcoming Meetings Tab */}
          <div
            className="flex flex-col justify-start gap-3"
            style={{ display: activeTab === "upcoming" ? "flex" : "none" }}
          >
            {upcomingMeetings && upcomingMeetings.length ? (
              upcomingMeetings.map((meeting, index) => (
                <div
                  key={meeting._id}
                  className="mx-2 flex min-h-28 gap-3 rounded-[28px] border border-[#E6E1F0] p-3 md:mx-4"
                >
                  <div className="bg-[#56CFE1]/[0.2] rounded-lg w-28 flex flex-col justify-center items-center">
                    <h2 className="text-lg font-semibold">
                      {meeting.rescheduled && meeting.rescheduled.isRescheduled
                        ? formatDate(meeting.rescheduled.date)
                        : formatDate(new Date(meeting.date))}
                    </h2>
                    <p className="text-gray-600 text-sm">
                      {meeting.rescheduled && meeting.rescheduled.isRescheduled
                        ? meeting.rescheduled.time
                        : meeting.time}
                    </p>
                  </div>
                  <div className="w-full flex flex-col justify-between space-y-1">
                    <div className="w-full flex items-center justify-between">
                      <h3 className="text-base md:text-lg font-semibold capitalize">
                        {meeting.message ? meeting.message : "New Meeting"}
                      </h3>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-3 h-3 md:w-4 md:h-4" />
                          <p className="text-xs md:text-sm text-primary">
                            {meeting.isCompleted
                              ? "Meeting Over"
                              : "Upcoming Meeting"}
                          </p>
                        </div>
                        <Link
                          href={
                            meeting.gmeet && meeting.gmeet.link
                              ? meeting.gmeet.link
                              : "#"
                          }
                          target={
                            meeting.gmeet && meeting.gmeet.link ? "_blank" : ""
                          }
                          className={cn(
                            (!meeting.accepted || !meeting.gmeet.link) &&
                              "pointer-events-none opacity-70"
                          )}
                        >
                          <Button size={"sm"}>Join Meeting</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-lg text-muted-foreground font-semibold">
                No meetings yet!
              </div>
            )}
          </div>

          {/* Done Meetings Tab */}
          <div style={{ display: activeTab === "done" ? "block" : "none" }}>
            {doneMeetings && doneMeetings.length ? (
              doneMeetings.map((meeting) => (
                <div key={meeting._id} className="mb-4 mx-4">
                  <h3 className="text-lg font-semibold">{meeting.message}</h3>
                  <p className="text-gray-600">
                    Date:{" "}
                    {meeting.rescheduled && meeting.rescheduled.isRescheduled
                      ? convertDateString(new Date(meeting.rescheduled.date))
                      : convertDateString(new Date(meeting.date))}
                  </p>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-lg text-muted-foreground font-medium">
                <p>No meetings done yet!</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* About meetings */}
      <RequestMeetingDesktopComponent />
    </div>
  );
};

export default MeetingsComponent;
