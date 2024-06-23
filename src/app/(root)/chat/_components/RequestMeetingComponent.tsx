"use client";

import React, { useState } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { CalendarIcon, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const RequestMeetingFormSchema = z.object({
  date_of_meeting: z.date({
    required_error: "A date is required to request meeting.",
  }),
  time: z.string({ required_error: "A time is required to request meeting!" }),
  meeting_agenda: z.string({
    required_error: "Please enter your meeting agenda",
  }),
});

const RequestMeetingComponent = () => {
  // const [selectedMeetingTime, setSelectedMeetingTime] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const form = useForm<z.infer<typeof RequestMeetingFormSchema>>({
    resolver: zodResolver(RequestMeetingFormSchema),
  });

  const onSubmit = (data: z.infer<typeof RequestMeetingFormSchema>) => {
    // Include the selected meeting time in the form submission data
    const formData = { ...data };
    toast.success("You submitted the following values:", {
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(formData, null, 2)}
          </code>
        </pre>
      ),
    });
    setSubmitted(true);
  };

  return (
    <div>
      {!submitted ? (
        <div className="h-[74dvh] flex flex-col gap-y-5 md:gap-y-7 border bg-[url('/assets/images/programmer.png')] bg-no-repeat bg-right-top bg-[length:200px] md:bg-[length:300px] rounded-xl overflow-y-auto custom__scrollbar px-3 md:px-7 pb-4">
          {/* Request Meet */}
          <div className="flex justify-center gap-x-2 py-3">
            <Image
              className=""
              src="/assets/images/video_call.png"
              alt="VideoCall"
              width={30}
              height={30}
            />
            <h1 className="font-bold text-lg md:text-2xl">
              Request <span className="text-primary font-normal">Meet</span>
            </h1>
          </div>
          {/* Embarking */}
          <div className="text-center space-y-4">
            <h1 className="font-bold text-xl">
              Embarking on a Journey Request for Mentorship Meeting
            </h1>
            <p className="text-base">
              A meeting request offers students tailored mentorship, guidance,
              and support, fostering an environment for accessing valuable
              insights and resources to enhance personal development.
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-y-5 w-full max-w-lg mx-auto">
              <div className="grid grid-cols-2 gap-5">
                {/* Date Select */}
                <FormField
                  control={form.control}
                  name="date_of_meeting"
                  render={({ field }) => (
                    <FormItem className="flex flex-col w-full">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}>
                              {field.value ? (
                                format(field.value, "dd-MM-yyyy")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => {
                              const currentDate = new Date();
                              const endDate = new Date();
                              endDate.setDate(currentDate.getDate() + 7); // Set end date to 7 days from today
                              return date < currentDate || date > endDate;
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Time Select */}
                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Time</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="9:00 AM">9:00 AM</SelectItem>
                          <SelectItem value="9:30 AM">9:30 AM</SelectItem>
                          <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                          <SelectItem value="10:30 AM">10:30 AM</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="meeting_agenda"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Type your doubt here..."
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="text-center">
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="h-[74dvh] flex flex-col border rounded-xl overflow-hidden bg-[url('/assets/images/girl_celebration.png'),_url('/assets/images/work_discussion.png')] bg-[position:top_left_-20px,_bottom_right] bg-[length:140px,_170px] md:bg-[length:200px,_200px] bg-no-repeat">
          <div className="h-full flex flex-col gap-y-7 items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 text-white bg-primary rounded-full flex items-center justify-center shadow-[0_0_32px_0_#9654f4]">
              <Check className="w-8 h-8 md:w-12 md:h-12" />
            </div>
            <h1 className="text-primary text-4xl font-bold">
              Sent Successfully
            </h1>
            <div className="text-center">
              <h3 className="text-3xl font-semibold mt-6">Thank You!</h3>
              <p className="font-medium text-xl m-1">
                Your Request has been sent
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestMeetingComponent;
