import React from "react";
import Image from "next/image";

import { Smile } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  AttachIcon,
  CallIcon,
  MenuIcon,
  MicIcon,
  SendIcon,
} from "@/components";
import { cn } from "@/lib/utils";
import { ChatData } from "@/helpers/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ChatComponent = ({ chatData }: { chatData: ChatData }) => {
  return (
    <div className="h-[75dvh] flex flex-col border bg-primary/10 rounded-xl overflow-hidden">
      <div className="bg-white p-3 md:py-4 md:px-6 border-b rounded-lg border-gray-200 flex items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <Avatar className="w-11 h-11">
              <AvatarImage src={chatData.img} alt="User Avatar" />
              <AvatarFallback>DR</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{chatData.title}</h3>
              <p className="text-sm text-gray-600">{chatData.status}</p>
            </div>
          </div>
          <div className="flex items-center gap-10">
            <Button variant={"link"} className="px-0 hidden md:block">
              {/* Add onClick */}
              <CallIcon />
            </Button>
            <Button variant={"link"} className="px-0">
              {/* Add onClick */}
              <MenuIcon className="md:w-5 md:h-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom__scrollbar px-3 md:px-10 py-4">
        {/* Chat messages go here */}
        <div className="flex flex-col">
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
      <div className="flex items-center gap-1 md:gap-3 border rounded-lg bg-white mt-2 md:mx-10 md:my-4 p-2">
        <Button variant={"link"} className="text-black/70 px-2">
          <Smile className="cursor-pointer w-5 h-5 md:w-6 md:h-6" />
        </Button>
        <input
          type="text"
          placeholder="Type a Message here!..."
          className="flex-1 bg-transparent outline-none"
        />
        <div className="flex items-center gap-4">
          <Button variant={"link"} className="px-0">
            <AttachIcon className="md:w-4 md:h-7" />
          </Button>
          <Button variant={"link"} className="px-0">
            <MicIcon className="md:w-7 md:h-7" />
          </Button>
          <Button type="submit">
            <SendIcon className="md:w-7 md:h-7" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
