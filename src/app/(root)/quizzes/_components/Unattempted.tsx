"use client";

import { TabNavItem } from "@/components";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";

const unattemptTabs = [
  {
    id: "weeklyquiz",
    label: "Weekly Quiz",
  },
  {
    id: "chapterquiz",
    label: "Chapter Quiz",
  },
];

const Unattempted = () => {
  // Example data for upcoming quizzes
  const [upcomingQuizzes, setUpcomingQuizzes] = useState([
    {
      id: 1,
      description:
        "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion,Chemical Bonding",
      startDate: "2024-01-05",
      endDate: "2024-01-11",
      subjects: [
        { name: "Maths", color: "bg-blue-500" },
        { name: "Physics", color: "bg-green-500" },
        { name: "Chemistry", color: "bg-red-500" },
      ],
      questions: 30,
    },
    {
      id: 2,
      description:
        "Vector Algebra, Matrices and Determinants, Electromagnetic Induction, Laws of Motion,Chemical Bonding",
      startDate: "2024-12-21",
      endDate: "2024-12-27",
      subjects: [
        { name: "Maths", color: "bg-blue-500" },
        { name: "Physics", color: "bg-green-500" },
        { name: "Chemistry", color: "bg-red-500" },
      ],
      questions: 30,
    },
  ]);

  const [activeTab, setActiveTab] = useState("weeklyquiz");

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
    <div className="flex flex-col lg:flex-row mb-20 md:mb-0">
      {/* Upcoming meetings */}
      <div className="py-3 border-2 rounded-xl flex-1 mb-5 h-full">
        <ul className="flex justify-around">
          {unattemptTabs.map((tab) => (
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
            style={{ display: activeTab === "weeklyquiz" ? "flex" : "none" }}
          >
            {upcomingQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="flex items-stretch gap-3 mx-2 md:mx-4 p-3 rounded-xl border-2 shadow-lg"
              >
                <div className="w-full flex flex-col justify-start space-y-1">
                  <div className="w-full flex items-center justify-between">
                    <h1 className="text-base md:text-2xl font-semibold">
                      {formatDate(quiz.startDate)} - {formatDate(quiz.endDate)}
                    </h1>
                    <p className="text-xs md:text-sm text-primary">
                      Remaining {calculateDaysLeft(new Date(quiz.endDate))} days
                      to Take Quiz
                    </p>
                  </div>
                  <div className="flex justify-between space-y-1 space-x-4 items-end">
                    {/* Left Side */}
                    <div className="w-full md:w-2/3">
                      <p className="text-gray-600 text-xs md:text-sm my-1">
                        {quiz.description}
                      </p>
                      <div className="mt-5 mb-1">
                        {quiz.subjects.map((subject, index) => (
                          <Label
                            key={index}
                            className={`text-white py-1 px-2 mx-1 rounded ${subject.color}`}
                          >
                            {subject.name}
                          </Label>
                        ))}
                      </div>
                    </div>
                    {/* Right Side */}
                    <div>
                      <p className="text-gray-600 my-1">
                        {quiz.questions} Quiz Questions
                      </p>
                      <Button>Attempt Now</Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center"></div>
                </div>
              </div>
            ))}
            {upcomingQuizzes.length === 0 && <p>No upcoming quizzes</p>}
          </div>

          {/* Done Meetings Tab */}
          {/* <div style={{ display: activeTab === "done" ? "block" : "none" }}>
            {doneMeetings.map((meeting) => (
              <div key={meeting.id} className="mb-4 mx-4">
                <h3 className="text-lg font-semibold">{meeting.title}</h3>
                <p className="text-gray-600">Date: {meeting.date}</p>
              </div>
            ))}
            {doneMeetings.length === 0 && <p>No done meetings</p>}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Unattempted;
