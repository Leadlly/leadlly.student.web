"use client";

import React, { useState } from "react";

import { cn } from "@/lib/utils";

import {
  ClockIcon,
  ConferenceMeetingIcon,
  MenuIcon,
  OneOnOneMeetingIcon,
  TabNavItem,
} from "@/components";
import RequestMeetingDesktopComponent from "./RequestMeetingDesktopComponent";
import { meetingTabs } from "@/helpers/constants";
import { TMeetingsProps } from "@/helpers/types";
import { calculateDaysLeft, formatDate } from "@/helpers/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const MeetingsComponent = ({
  upcomingMeetings,
}: {
  upcomingMeetings: TMeetingsProps[];
}) => {
  const [doneMeetings, setDoneMeetings] = useState([
    { id: 3, title: "Done Meeting 1", date: "2024-04-25" },
    { id: 4, title: "Done Meeting 2", date: "2024-04-30" },
  ]);

  const [activeTab, setActiveTab] = useState("upcoming");

  return (
    <div className="flex flex-col lg:flex-row lg:gap-5">
      {/* Upcoming meetings */}
      <div className="py-3 border-2 rounded-xl flex-1 h-full">
        <ul className="flex justify-around">
          {meetingTabs.map((tab) => (
            <TabNavItem
              key={tab.id}
              id={tab.id}
              title={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              layoutIdPrefix="meetings"
              className="text-base md:text-lg lg:text-xl text-black font-medium leading-none capitalize px-6 py-2.5"
              activeTabClassName="h-full inset-0 rounded-full bg-primary/25"
            />
          ))}
        </ul>

        <hr className="border-gray-300 my-3" />

        <div className="max-h-[470px] lg:max-h-[700px] xl:max-h-[470px] h-full overflow-y-auto custom__scrollbar">
          {/* Upcoming Meetings Tab */}
          <div
            className="flex flex-col justify-start gap-3 h-full "
            style={{ display: activeTab === "upcoming" ? "flex" : "none" }}
          >
            {upcomingMeetings && upcomingMeetings.length ? (
              upcomingMeetings.map((meeting) => (
                <div
                  key={meeting._id}
                  className="min-h-28 flex gap-3 mx-2 md:mx-4 p-2 rounded-xl border-2 shadow-lg"
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
                        {meeting.message}
                      </h3>
                      {/* <MenuIcon className="md:w-4 md:h-4" /> */}
                    </div>
                    {/* <p className="text-xs md:text-sm text-black font-semibold">
                    {meeting.description}
                  </p> */}
                    {/* <p className="text-gray-600 text-xs md:text-sm my-1">
                    From {meeting.startTime} to {meeting.endTime}
                  </p> */}
                    <div className="flex justify-between items-center">
                      {/* <div className="flex items-center gap-1">
                      {meeting.meetingType.includes("One") ? (
                        <OneOnOneMeetingIcon className="w-[10px] h-[10px] md:w-[14px] md:h-[14px]" />
                      ) : (
                        <ConferenceMeetingIcon className="w-[10px] h-[10px] md:w-[14px] md:h-[14px]" />
                      )}
                      <p
                        className={cn(
                          "text-[10px] md:text-sm",
                          meeting.meetingType.includes("One")
                            ? "text-[#57D0E1]"
                            : "text-[#6399D6]"
                        )}
                      >
                        {meeting.meetingType}
                      </p>
                    </div> */}
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-3 h-3 md:w-4 md:h-4" />
                          <p className="text-xs md:text-sm text-primary">
                            {calculateDaysLeft(
                              meeting.rescheduled &&
                                meeting.rescheduled.isRescheduled
                                ? new Date(meeting.rescheduled.date)
                                : new Date(meeting.date)
                            ) > 0 ? (
                              <>
                                More{" "}
                                {calculateDaysLeft(
                                  meeting.rescheduled &&
                                    meeting.rescheduled.isRescheduled
                                    ? new Date(meeting.rescheduled.date)
                                    : new Date(meeting.date)
                                )}{" "}
                                days to go
                              </>
                            ) : (
                              "Meeting Over"
                            )}
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
            {doneMeetings.map((meeting) => (
              <div key={meeting.id} className="mb-4 mx-4">
                <h3 className="text-lg font-semibold">{meeting.title}</h3>
                <p className="text-gray-600">Date: {meeting.date}</p>
              </div>
            ))}
            {doneMeetings.length === 0 && <p>No done meetings</p>}
          </div>
        </div>
      </div>
      {/* About meetings */}
      <RequestMeetingDesktopComponent />
    </div>
  );
};

export default MeetingsComponent;
