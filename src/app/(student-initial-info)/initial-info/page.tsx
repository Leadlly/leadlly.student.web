"use client";

import { studentPersonalInfo } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const InitialInfoSchema = z.object({
  class: z.string({ required_error: "Please select your class!" }),
  gender: z.string({ required_error: "Please select your gender!" }),
  competitiveExam: z.enum(["NEET", "JEE", "Board", "Other"], {
    message: "Please select your type of exam!",
  }),
  studentSchedule: z.string({ required_error: "Please select your schedule!" }),
  coachingType: z.enum(["online", "offline"], {
    message: "Please select your coaching type!",
  }),
});

const StudentInitialInfoForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const form = useForm<z.infer<typeof InitialInfoSchema>>({
    resolver: zodResolver(InitialInfoSchema),
  });

  const onFormSubmit = async (data: z.infer<typeof InitialInfoSchema>) => {
    setIsSubmitting(true);

    const formattedData = { class: Number(data.class) };
    try {
      const res = await studentPersonalInfo({ ...data, ...formattedData });
      dispatch(userData(res.user));

      toast.success(res.message);

      router.replace("/trial-subscription");
    } catch (error: any) {
      toast.error(error?.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="flex flex-col gap-y-5 items-center justify-center h-full w-full px-3">
      <div className="max-w-lg w-full">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly Logo"
          width={130}
          height={60}
        />
      </div>
      <div className="max-w-lg w-full rounded-xl shadow-2xl py-10 px-5 space-y-4">
        <h3 className="text-xl md:text-3xl font-semibold text-center capitalize">
          Let us know about you
        </h3>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onFormSubmit)}
            className="space-y-2">
            <FormField
              control={form.control}
              name="class"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base lg:text-lg font-medium">
                    Class:
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "text-base lg:text-lg font-medium",
                          !field.value && "text-muted-foreground"
                        )}>
                        <SelectValue placeholder="Select your class" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="9">9th</SelectItem>
                      <SelectItem value="10">10th</SelectItem>
                      <SelectItem value="11">11th</SelectItem>
                      <SelectItem value="12">12th</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base lg:text-lg font-medium">
                    Gender:
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "capitalize text-base lg:text-lg font-medium",
                          !field.value && "text-muted-foreground"
                        )}>
                        <SelectValue placeholder="Select your gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="competitiveExam"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base lg:text-lg font-medium">
                    Competitive Exam:
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-x-5">
                      <FormItem className="space-y-0 mt-1 flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="NEET"
                            className="lg:w-5 lg:h-5"
                            circleClassName="lg:w-3 lg:h-3"
                          />
                        </FormControl>
                        <FormLabel className="text-base lg:text-lg font-medium">
                          NEET
                        </FormLabel>
                      </FormItem>
                      <FormItem className="space-y-0 mt-1 flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="JEE"
                            className="lg:w-5 lg:h-5"
                            circleClassName="lg:w-3 lg:h-3"
                          />
                        </FormControl>
                        <FormLabel className="text-base lg:text-lg font-medium">
                          JEE
                        </FormLabel>
                      </FormItem>
                      <FormItem className="space-y-0 mt-1 flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Board"
                            className="lg:w-5 lg:h-5"
                            circleClassName="lg:w-3 lg:h-3"
                          />
                        </FormControl>
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Board
                        </FormLabel>
                      </FormItem>
                      <FormItem className="space-y-0 mt-1 flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="Other"
                            className="lg:w-5 lg:h-5"
                            circleClassName="lg:w-3 lg:h-3"
                          />
                        </FormControl>
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Other
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="studentSchedule"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base lg:text-lg font-medium">
                    Your Schedule:
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger
                        className={cn(
                          "text-base lg:text-lg font-medium",
                          !field.value && "text-muted-foreground"
                        )}>
                        <SelectValue placeholder="Ex: Coaching + College + Self Study" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="coaching+college+self-study">
                        Coaching + College + Self Study
                      </SelectItem>
                      <SelectItem value="coaching+college">
                        Coaching + College
                      </SelectItem>
                      <SelectItem value="college+self-study">
                        College + Self Study
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="coachingType"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-base lg:text-lg font-medium">
                    Coaching:
                  </FormLabel>

                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex items-center gap-x-5">
                      <FormItem className="space-y-0 mt-1 flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="online"
                            className="lg:w-5 lg:h-5"
                            circleClassName="lg:w-3 lg:h-3"
                          />
                        </FormControl>
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Online
                        </FormLabel>
                      </FormItem>
                      <FormItem className="space-y-0 mt-1 flex items-center gap-2">
                        <FormControl>
                          <RadioGroupItem
                            value="offline"
                            className="lg:w-5 lg:h-5"
                            circleClassName="lg:w-3 lg:h-3"
                          />
                        </FormControl>
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Offline
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-center w-full">
              <Button
                type="submit"
                className="w-full text-base md:text-lg"
                disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                    Submitting
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default StudentInitialInfoForm;
