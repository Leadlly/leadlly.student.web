"use client";

import apiClient from "@/apiClient/apiClient";
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
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
  CalendarDaysIcon,
  CheckCircle2,
  Edit3,
  Globe,
  MailOpen,
  Phone,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

type UserProps = {
  user: {
    firstName: string;
    lastName: string;
    class: string;
    phone: string;
    email: string;
    gender: string;
    dateOfBirth: string;
    isPhoneVerified: boolean;
    isEmailVerified: boolean;
  };
};

const AccountPersonalInfoSchema = z.object({
  firstName: z
    .string({ required_error: "Please enter your first name!" })
    .min(4),
  lastName: z.string({ required_error: "Please enter your first name!" }),
  class: z.string({ required_error: "Please select your class" }),
  phone: z.string({ required_error: "Please enter your phone number" }).max(10),
  email: z
    .string({ required_error: "Please enter your email" })
    .email({ message: "Invalid email address" }),
  gender: z.string({ required_error: "Please select your gender" }),
  dateOfBirth: z.date({ required_error: "Please enter your date of birth" }),
  parentName: z.string().optional(),
  parentsPhone: z.number().max(10).optional(),
  country: z.string().optional(),
  address: z.string().optional(),
  pinCode: z.number().optional(),
  competitiveExam: z.enum(["NEET", "JEE", "Board", "Other"]).optional(),
  studentSchedule: z.string().optional(),
  messageAboutCompetitiveExam: z.string().optional(),
  messageAboutStudentSchedule: z.string().optional(),
  schoolOrCollegeName: z.string().optional(),
  schoolOrCollegeAddress: z.string().optional(),
  coachingType: z.enum(["online", "offline"]).optional(),
  coachingName: z.string().optional(),
  coachingAddress: z.string().optional(),
});

const AccountPersonalInfo = ({ user }: UserProps) => {
  const form = useForm<z.infer<typeof AccountPersonalInfoSchema>>({
    resolver: zodResolver(AccountPersonalInfoSchema),
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      class: user.class,
      phone: user.phone,
      email: user.email,
      gender: user.gender,
      dateOfBirth: new Date(user.dateOfBirth),
    },
  });

  const onSubmit = async (data: z.infer<typeof AccountPersonalInfoSchema>) => {
      console.log("Submitting data:", data);
  
      try {
        const response = await apiClient.post(
          "/api/user/studentPersonalInfo",
          data
        );
  
        console.log("Response:", response.data);
        toast.success(response.data.message);
      } catch (error: any) {
        console.error("Error:", error);
        toast.error("Save failed", {
          description: error.message || "Unknown error occurred",
        });
      }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col gap-6">
          <div className="flex-1 overflow-y-auto custom__scrollbar space-y-7 px-3">
            <div className="space-y-3">
              <h4 className="text-lg lg:text-[22px] font-medium text-primary">
                Basic Information
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base lg:text-lg font-medium">
                          First Name:
                        </FormLabel>
                        <Button
                          variant={"ghost"}
                          className="flex items-center gap-1 px-2 text-sm lg:text-base text-[#656565] h-0 hover:bg-transparent">
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          icon2={<User className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Last Name:
                        </FormLabel>
                        <Button
                          variant={"ghost"}
                          className="flex items-center gap-1 px-2 text-sm lg:text-base text-[#656565] h-0 hover:bg-transparent">
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </Button>
                      </div>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
                          icon2={<User className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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
                          <SelectTrigger>
                            <SelectValue placeholder="Select your class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="9th">9th</SelectItem>
                          <SelectItem value="10th">10th</SelectItem>
                          <SelectItem value="11th">11th</SelectItem>
                          <SelectItem value="12th">12th</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Phone No.:
                        </FormLabel>
                        {user.isPhoneVerified ? (
                          <p className="text-[#61D705] text-[10px] flex items-center gap-1 px-2">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </p>
                        ) : (
                          <Button
                            variant={"ghost"}
                            className="text-xs lg:text-sm underline px-2 text-[#656565] h-0 hover:bg-transparent">
                            Get OTP
                          </Button>
                        )}
                      </div>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter your phone no."
                          icon2={<Phone className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          countryCodeClassName="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base lg:text-lg font-medium">
                          Email:
                        </FormLabel>
                        {user.isEmailVerified ? (
                          <p className="text-[#61D705] text-[10px] flex items-center gap-1 px-2">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </p>
                        ) : (
                          <Button
                            variant={"ghost"}
                            className="text-xs lg:text-sm underline px-2 text-[#656565] h-0 hover:bg-transparent">
                            Get OTP
                          </Button>
                        )}
                      </div>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          icon2={<MailOpen className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
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
                          <SelectTrigger>
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
                  name="dateOfBirth"
                  render={({ field }) => (
                    <FormItem className="space-y-1 flex flex-col">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Date of Birth:
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left text-base lg:text-lg font-medium",
                                !field.value && "text-muted-foreground"
                              )}>
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarDaysIcon className="ml-auto h-5 w-5 opacity-80" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) =>
                              date > new Date() || date < new Date("1900-01-01")
                            }
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg lg:text-[22px] font-medium text-primary">
                Other Information
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="parentName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Parent Name (or Guardian):
                      </FormLabel>

                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          icon2={<User className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="parentsPhone"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Parent&apos;s Phone No.:
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Enter Phone Number"
                          icon2={<Phone className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          countryCodeClassName="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Country:
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your country name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
                          <SelectItem value="USA">USA</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="South-Africa">
                            South Africa
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Address:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your address"
                          icon2={<Globe className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="pinCode"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        PIN Code:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter PIN Code"
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg lg:text-[22px] font-medium text-primary">
                Academic Information
              </h4>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-5">
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
                          <SelectTrigger>
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
                            college + Self Study
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="messageAboutCompetitiveExam"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Other:
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Message about Competitive Exam"
                          className="resize-none text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="messageAboutStudentSchedule"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Other:
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Message about your Schedule"
                          className="resize-none text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schoolOrCollegeName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        School/College Name:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter School/College Name"
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="schoolOrCollegeAddress"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        School/College Address:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter School/College Address"
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
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

                <FormField
                  control={form.control}
                  name="coachingName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Coaching Name:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Coaching Name"
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="coachingAddress"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormLabel className="text-base lg:text-lg font-medium">
                        Coaching Address:
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Coaching Address"
                          className="text-base lg:text-lg font-medium"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          <div className="w-full grid place-items-center">
            <Button
              type="submit"
              className="text-base lg:text-lg font-semibold">
              Save Changes
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AccountPersonalInfo;
