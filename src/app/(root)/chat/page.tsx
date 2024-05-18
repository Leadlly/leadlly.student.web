"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";
import { Header, TabContent, TabNavItem } from "@/components";

import ChatComponent from "./_components/ChatComponent";
import MeetingsComponent from "./_components/MeetingsComponent";
import RequestMeetingComponent from "./_components/RequestMeetingComponent";

const chatPageTabs = [
  {
    title: "chat",
    id: "chat",
  },
  {
    title: "meetings",
    id: "meetings",
  },
  {
    title: "request meeting",
    id: "requestMeeting",
  },
];

const ChatPage = () => {
  const [activeTab, setActiveTab] = useState("chat");

  const handleTabChange = (tabName: string) => {
    setActiveTab(tabName);
  };

  return (
    <div className="flex flex-col justify-start gap-3 md:gap-6 h-full pt-16 md:pt-0">
      <Header
        title="Connect with mentor"
        titleClassName="text-xl md:text-3xl lg:text-page-title"
      />

      <div className="flex flex-col justify-start gap-4">
        <div className="flex bg-primary/10 rounded-md md:rounded-3xl overflow-hidden shadow-md">
          {chatPageTabs.map((tab) => (
            <TabNavItem
              key={tab.id}
              id={tab.id}
              title={tab.title}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              className={cn(
                "flex items-center justify-between max-w-max mx-auto w-full capitalize  text-base md:text-xl p-3 text-black",
                activeTab === tab.id ? "text-primary" : "text-black"
              )}
              titleClassName="w-full text-center"
              activeTabClassName="h-1 rounded inset-x-0 bottom-0 "
            />
          ))}
        </div>

        <div className="flex-1">
          <TabContent id="chat" activeTab={activeTab}>
            <ChatComponent
              chatData={{
                img: "/assets/images/mentor.png",
                title: "Dhruvi Rawal",
                status: "Last seen today at 11:50 PM",
                messages: [
                  {
                    sender: "user",
                    text: "Hello there!",
                    timestamp: "9:00 AM",
                  },
                  {
                    sender: "mentor",
                    text: "Hi! How can I help you today?",
                    timestamp: "9:05 AM",
                  },
                  {
                    sender: "user",
                    text: "I need some assistance with my project.",
                    timestamp: "9:10 AM",
                  },
                  {
                    sender: "mentor",
                    text: "Sure, I`d be happy to help. What specifically do you need assistance with?",
                    timestamp: "9:15 AM",
                  },
                  {
                    sender: "user",
                    text: "I`m having trouble with the implementation of a feature.",
                    timestamp: "9:20 AM",
                  },
                  {
                    sender: "mentor",
                    text: "Okay, let`s take a look at your code and debug it together.",
                    timestamp: "9:25 AM",
                  },
                  // Add more messages
                ],
              }}
            />
          </TabContent>

          <TabContent id="meetings" activeTab={activeTab}>
            <MeetingsComponent />
          </TabContent>

          <TabContent id="requestMeeting" activeTab={activeTab}>
            <RequestMeetingComponent />
          </TabContent>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
