"use client";

import React, { useState } from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import {
  ClockIcon,
  ConferenceMeetingIcon,
  MenuIcon,
  OneOnOneMeetingIcon,
  TabNavItem,
} from "@/components";
import RequestMeetingDesktopComponent from "./RequestMeetingDesktopComponent";

const meetingTabs = [
  {
    id: "upcoming",
    label: "upcoming",
  },
  {
    id: "done",
    label: "done",
  },
];

const MeetingsComponent = () => {
  // Example data for upcoming and done meetings
  const [upcomingMeetings, setUpcomingMeetings] = useState([
    {
      id: 1,
      title: "Meeting on Vector Algebra",
      description:
        "Vector algebra meetings deepen understanding through fundamentals.",
      date: "2024-05-10",
      startTime: "11:00pm",
      endTime: "12:30am",
      meetingType: "One-One Meeting",
    },
    {
      id: 2,
      title: "Meeting on Thermodynamics",
      description: "Thermodynamics Meeting: Principles, Apps, Diverse Fields.",
      date: "2024-05-15",
      startTime: "10:30am",
      endTime: "12:00pm",
      meetingType: "Conference Meeting",
    },
    {
      id: 3,
      title: "Meeting on Thermodynamics",
      description: "Thermodynamics Meeting: Principles, Apps, Diverse Fields.",
      date: "2024-05-15",
      startTime: "10:30am",
      endTime: "12:00pm",
      meetingType: "Conference Meeting",
    },
    {
      id: 4,
      title: "Meeting on Thermodynamics",
      description: "Thermodynamics Meeting: Principles, Apps, Diverse Fields.",
      date: "2024-05-15",
      startTime: "10:30am",
      endTime: "12:00pm",
      meetingType: "Conference Meeting",
    },
    {
      id: 5,
      title: "Meeting on Thermodynamics",
      description: "Thermodynamics Meeting: Principles, Apps, Diverse Fields.",
      date: "2024-05-15",
      startTime: "10:30am",
      endTime: "12:00pm",
      meetingType: "Conference Meeting",
    },
    {
      id: 6,
      title: "Meeting on Thermodynamics",
      description: "Thermodynamics Meeting: Principles, Apps, Diverse Fields.",
      date: "2024-05-15",
      startTime: "10:30am",
      endTime: "12:00pm",
      meetingType: "Conference Meeting",
    },
  ]);

  const [doneMeetings, setDoneMeetings] = useState([
    { id: 3, title: "Done Meeting 1", date: "2024-04-25" },
    { id: 4, title: "Done Meeting 2", date: "2024-04-30" },
  ]);

  const [activeTab, setActiveTab] = useState("upcoming");

  type DateString = string;
  // Function to format date
  function formatDate(dateString: DateString): string {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    return `${day} ${month}`;
  }

  // Function to calculate days left until the meeting
  function calculateDaysLeft(meetingDate: Date): number {
    // Get the current date
    const currentDate = new Date();

    // Calculate the difference in milliseconds
    const differenceInMs = meetingDate.getTime() - currentDate.getTime();

    // Convert milliseconds to days
    const daysLeft = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

    return daysLeft - 1;
  }

  return (
    <div className="flex flex-col lg:flex-row mb-20 md:mb-0 lg:gap-5">
      {/* Upcoming meetings */}
      <div className="py-3 border-2 rounded-xl flex-1 mb-5 h-full">
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
            {upcomingMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="flex items-stretch gap-3 mx-2 md:mx-4 p-2 rounded-xl border-2 shadow-lg"
              >
                <div className="bg-[#56CFE1]/[0.2] rounded-lg w-28 flex flex-col justify-center items-center">
                  <h2 className="text-lg font-semibold">
                    {formatDate(meeting.date)}
                  </h2>
                  <p className="text-gray-600 text-sm">{meeting.startTime}</p>
                </div>
                <div className="w-full flex flex-col justify-start space-y-1">
                  <div className="w-full flex items-center justify-between">
                    <h3 className="text-base md:text-lg font-semibold">
                      {meeting.title}
                    </h3>
                    <MenuIcon className="md:w-5 md:h-5" />
                  </div>
                  <p className="text-xs md:text-sm text-black font-semibold">
                    {meeting.description}
                  </p>
                  <p className="text-gray-600 text-xs md:text-sm my-1">
                    From {meeting.startTime} to {meeting.endTime}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1">
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
                    </div>
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3 h-3 md:w-4 md:h-4" />
                      <p className="text-xs md:text-sm text-primary">
                        More {calculateDaysLeft(new Date(meeting.date))} days to
                        go
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {upcomingMeetings.length === 0 && <p>No upcoming meetings</p>}
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
    <RequestMeetingDesktopComponent/>
    </div>
  );
};

export default MeetingsComponent;
