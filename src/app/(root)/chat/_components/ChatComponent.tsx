"use client";

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

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

const chatFormSchema = z.object({
  content: z
    .string({ required_error: "Please enter a message to send!" })
    .min(1, { message: "Message must contain at least 1 character(s)" }),
});

const ChatComponent = ({ chatData }: { chatData: ChatData }) => {
  const form = useForm<z.infer<typeof chatFormSchema>>({
    resolver: zodResolver(chatFormSchema),
  });

  const onMessageSubmit = async (data: z.infer<typeof chatFormSchema>) => {
    console.log(data);
  };

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
                    "py-2 px-4 rounded-lg max-w-64 w-full",
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onMessageSubmit)}
          className="flex items-center gap-1 md:gap-3 border rounded-lg bg-white mt-2 md:mx-10 md:my-4 p-2">
          <Button variant={"link"} className="text-black/70 px-2">
            <Smile className="cursor-pointer w-5 h-5 md:w-6 md:h-6" />
          </Button>
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Textarea
                    placeholder="Type a Message here!..."
                    className="resize-none border-none min-h-10 custom__scrollbar outline-none focus:outline-none focus-visible:ring-0 text-base"
                    rows={1}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-4">
            <Button variant={"link"} className="px-0 pl-2">
              <AttachIcon className="md:w-4 md:h-6" />
            </Button>
            <Button variant={"link"} className="px-0">
              <MicIcon className="md:w-7 md:h-7" />
            </Button>
            <Button type="submit">
              <SendIcon className="md:w-7 md:h-7" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatComponent;
