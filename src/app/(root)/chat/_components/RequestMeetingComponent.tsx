"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";

import { CalendarIcon, Check, Loader2 } from "lucide-react";

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
import { useRouter } from "next/navigation";
import { RequestMeetingFormSchema } from "@/schemas/requestMeetingFormSchema";
import { requestMeeting } from "@/actions/meeting_actions";

const RequestMeetingComponent = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [time, setTime] = useState<string>("05:00");

  const form = useForm<z.infer<typeof RequestMeetingFormSchema>>({
    resolver: zodResolver(RequestMeetingFormSchema),
  });
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (
        window.innerWidth > 1024 &&
        window.location.search === "?tab=requestMeeting"
      ) {
        router.push("/chat?tab=meetings");
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const onSubmit = async (data: z.infer<typeof RequestMeetingFormSchema>) => {
    setIsSubmitting(true);

    try {
      const res = await requestMeeting({
        date: data.date_of_meeting,
        time: data.time,
        message: data.meeting_agenda,
      });

      console.log(res);

      if (res.success === false) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      setSubmitted(true);
      form.reset();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (hour: number, minute: number) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${minute.toString().padStart(2, "0")} ${period}`;
  };

  const intervalCount = (22 - 9) * 4 + 1;

  return (
    <div className="lg:hidden">
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
              className="flex flex-col gap-y-5 w-full max-w-lg mx-auto"
            >
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
                              )}
                            >
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
                              currentDate.setHours(0, 0, 0, 0);                           
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-72">
                          {Array.from({ length: intervalCount }).map((_, i) => {
                            const hour = Math.floor(i / 4) + 9;
                            const minute = (i % 4) * 15;
                            const timeSlot = formatTime(hour, minute);
                            return (
                              <SelectItem key={i} value={timeSlot}>
                                {timeSlot}
                              </SelectItem>
                            );
                          })}
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
                <Button type="submit" className="w-32">
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="relative h-[74dvh] flex flex-col border rounded-xl overflow-hidden bg-[url('/assets/images/girl_celebration.png'),_url('/assets/images/work_discussion.png')] bg-[position:top_left_-20px,_bottom_right] bg-[length:140px,_170px] md:bg-[length:200px,_200px] bg-no-repeat">
          <div className="absolute top-2 right-2">
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => setSubmitted(false)}
              className="border-primary text-primary hover:text-primary hover:bg-primary/10"
            >
              Back
            </Button>
          </div>
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
