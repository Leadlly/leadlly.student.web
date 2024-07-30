"use client";

import { studentPersonalInfo } from "@/actions/user_actions";
import { Button } from "@/components/ui/button";
import { CalendarDatePicker } from "@/components/ui/calendar_date_picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

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
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import { AccountPersonalInfoSchema } from "@/schemas/accountPersonalInfoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit3, Globe, Loader2, MailOpen, Phone, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const AccountPersonalInfo = () => {
  const [isSaving, setIsSaving] = useState(false);

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.user);

  const form = useForm<z.infer<typeof AccountPersonalInfoSchema>>({
    resolver: zodResolver(AccountPersonalInfoSchema),
    defaultValues: {
      firstName: user?.firstname ? user.firstname : "",
      lastName: user?.lastname ? user.lastname : "",
      phone: user?.phone?.personal ? String(user.phone.personal) : "",
      email: user?.email ? user.email : "",
      parentName: user?.parent.name ? user.parent.name : "",
      parentsPhone: user?.parent.phone ? String(user.parent.phone) : "",
      address: user?.address.addressLine ? user.address.addressLine : "",
      pinCode: user?.address.pincode ? String(user.address.pincode) : "",
      schoolOrCollegeName: user?.academic.schoolOrCollegeName
        ? user.academic.schoolOrCollegeName
        : "",
      schoolOrCollegeAddress: user?.academic.schoolOrCollegeAddress
        ? user.academic.schoolOrCollegeAddress
        : "",
      coachingName: user?.academic.coachingName
        ? user.academic.coachingName
        : "",
      coachingAddress: user?.academic.coachingAddress
        ? user.academic.coachingAddress
        : "",
      gender: user?.about.gender ? user?.about.gender : "",
      class: user?.academic.standard ? String(user?.academic.standard) : "",
      studentSchedule: user?.academic.schedule ? user.academic.schedule : "",
      country: user?.address.country ? user.address.country : "",
    },
  });

  const onSubmit = async (data: z.infer<typeof AccountPersonalInfoSchema>) => {
    const formattedPersonalData = {
      class: Number(data.class),
      dateOfBirth: data.dateOfBirth
        ? new Date(data.dateOfBirth.from).toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
            year: "numeric",
            month: "short",
            day: "2-digit",
          })
        : "",
      phone: Number(data.phone),
      parentsPhone: Number(data.parentsPhone),
      pinCode: Number(data.pinCode),
    };

    setIsSaving(true);

    try {
      const res = await studentPersonalInfo({
        ...data,
        ...formattedPersonalData,
      });

      dispatch(userData(res.user));

      toast.success(res.message);
    } catch (error: any) {
      toast.error("Your info submission failed!", {
        description: error.message,
      });
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col gap-6"
        >
          <div className="flex-1 overflow-y-auto custom__scrollbar space-y-7 px-3">
            <div className="space-y-3">
              <h4 className="text-lg lg:text-[22px] font-medium text-primary">
                Basic Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div className="flex items-center justify-between">
                        <FormLabel className="text-base lg:text-lg font-medium">
                          First Name:
                        </FormLabel>
                        {/* <Button
                          variant={"ghost"}
                          className="flex items-center gap-1 px-2 text-sm lg:text-base text-[#656565] h-0 hover:bg-transparent"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </Button> */}
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
                        {/* <Button
                          variant={"ghost"}
                          className="flex items-center gap-1 px-2 text-sm lg:text-base text-[#656565] h-0 hover:bg-transparent"
                        >
                          <Edit3 className="w-4 h-4" />
                          Edit
                        </Button> */}
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "text-base lg:text-lg font-medium",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <SelectValue placeholder="Select your class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="11">11th</SelectItem>
                          <SelectItem value="12">12th</SelectItem>
                          <SelectItem value="13">Dropper</SelectItem>
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
                        {/* {user.isPhoneVerified ? (
                          <p className="text-[#61D705] text-[10px] flex items-center gap-1 px-2">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </p>
                        ) : ( */}
                        {/* <Button
                          variant={"ghost"}
                          className="text-xs lg:text-sm underline px-2 text-[#656565] h-0 hover:bg-transparent"
                        >
                          Get OTP
                        </Button> */}
                        {/* )} */}
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
                        {/* {user.isEmailVerified ? (
                          <p className="text-[#61D705] text-[10px] flex items-center gap-1 px-2">
                            <CheckCircle2 className="w-3 h-3" />
                            Verified
                          </p>
                        ) : ( */}
                        {/* <Button
                          variant={"ghost"}
                          className="text-xs lg:text-sm underline px-2 text-[#656565] h-0 hover:bg-transparent"
                          
                        >
                          Get OTP
                        </Button> */}
                        {/* )} */}
                      </div>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          icon2={<MailOpen className="w-5 h-5" />}
                          className="text-base lg:text-lg font-medium"
                          disabled={true}
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "capitalize text-base lg:text-lg font-medium",
                              !field.value && "text-muted-foreground"
                            )}
                          >
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
                      <FormControl>
                        <CalendarDatePicker
                          date={
                            user?.about.dateOfBirth
                              ? { from: new Date(user.about.dateOfBirth) }
                              : field.value
                          }
                          onDateSelect={({ from, to }) => {
                            form.setValue("dateOfBirth", { from, to });
                          }}
                          variant="outline"
                          numberOfMonths={1}
                          className="text-base lg:text-lg font-medium"
                          placeholder="Pick your D.O.B"
                          yearsRange={35}
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
                Other Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "text-base lg:text-lg font-medium",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <SelectValue placeholder="Select your country name" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="India">India</SelectItem>
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
                          defaultValue={
                            user?.academic.competitiveExam
                              ? user.academic.competitiveExam
                              : field.value
                          }
                          className="flex items-center gap-x-5"
                        >
                          <FormItem className="space-y-0 mt-1 flex items-center gap-2">
                            <FormControl>
                              <RadioGroupItem
                                value={user?.academic.competitiveExam!}
                                className="lg:w-5 lg:h-5"
                                circleClassName="lg:w-3 lg:h-3"
                              />
                            </FormControl>
                            <FormLabel className="text-base lg:text-lg font-medium">
                              {user?.academic.competitiveExam?.toUpperCase()}
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
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              "text-base lg:text-lg font-medium",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <SelectValue placeholder="Ex: Coaching + College + Self Study" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="school+coaching+self-study">
                            School + coaching + self-study
                          </SelectItem>
                          <SelectItem value="school+self-study">
                            School + self study
                          </SelectItem>
                          <SelectItem value="coaching+self-study">
                            Coaching + self-study
                          </SelectItem>
                          <SelectItem value="only self-study">
                            Only self-study
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
                          defaultValue={
                            user?.academic.coachingMode
                              ? user.academic.coachingMode
                              : field.value
                          }
                          className="flex items-center gap-x-5"
                        >
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
              className="text-base lg:text-lg font-semibold"
              disabled={isSaving}
            >
              {isSaving ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Saving
                </span>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AccountPersonalInfo;
