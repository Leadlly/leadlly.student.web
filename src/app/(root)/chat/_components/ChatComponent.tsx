import React from "react";
import Image, { StaticImageData } from "next/image";

import { Smile } from "lucide-react";

import {
  AttachIcon,
  CallIcon,
  MenuIcon,
  MicIcon,
  SendIcon,
} from "@/components";
import { cn } from "@/lib/utils";

interface ChatData {
  img: StaticImageData;
  title: string;
  status: string;
  messages: Array<{
    sender: string;
    text: string;
    timestamp: string;
  }>;
}

const ChatComponent: React.FC<{ chatData: ChatData }> = ({ chatData }) => {
  return (
    <div
      className="flex flex-col my-4 bg-purple-400 bg-opacity-10 rounded-xl overflow-hidden"
      style={{ height: "75vh" }}>
      <div className="bg-white py-4 px-6 border-b border-gray-200 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div className="rounded-full bg-blue-500 w-11 h-11 flex items-center justify-center mr-4">
              <Image
                src={chatData.img}
                width={100}
                height={100}
                alt="User Avatar"
                className="rounded-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-semibold">{chatData.title}</h3>
              <p className="text-sm text-gray-600">{chatData.status}</p>
            </div>
          </div>
          <div className="flex items-center">
            <button className="text-gray-600 hover:text-gray-800 mx-5">
              {/* Add onClick */}
              <CallIcon stroke="rgba(0, 0, 0, 1)" />
            </button>
            <button className="text-gray-600 hover:text-gray-800 ml-5">
              {/* Add onClick */}
              <MenuIcon stroke="rgba(0, 0, 0, 1)" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom__scrollbar">
        {/* Chat messages go here */}
        <div className="flex flex-col p-4">
          {chatData.messages.map((message, index) => (
            <div
              className={cn(
                "flex mb-2",
                message.sender === "mentor" ? "justify-start" : "justify-end"
              )}
              key={index}>
              <div>
                <div
                  className={cn(
                    "py-2 px-4 rounded-lg max-w-sm",
                    message.sender === "mentor" ? "bg-white" : "bg-primary/15"
                  )}>
                  <p>{message.text}</p>
                </div>
                <span className="text-xs text-gray-400 mx-1">
                  {message.sender === "mentor" ? "Mentor, " : "You, "}
                  {message.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center border rounded-lg p-2 mx-6 my-4 bg-white">
        <Smile className="mx-2 hover:cursor-pointer" />
        <input
          type="text"
          placeholder="Type a Message here!..."
          className="flex-1 bg-transparent outline-none mx-3"
        />
        <div className="mx-2 hover:cursor-pointer">
          <AttachIcon stroke="rgba(106, 106, 106, 1)" />
        </div>
        <div className="mx-2 hover:cursor-pointer">
          <MicIcon stroke="rgba(106, 106, 106, 1)" />
        </div>
        <button
          type="submit"
          className="mx-3 px-4 py-2 rounded-lg bg-purple-600 hover:cursor-pointer">
          <SendIcon stroke="rgba(150, 84, 244, 1)" />
        </button>
      </div>
    </div>
  );
};

export default ChatComponent;
