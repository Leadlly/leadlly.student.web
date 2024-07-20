"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Loader2 } from "lucide-react";
import ResendOtpButton from "./ResendOtpButton";
import Image from "next/image";
import {
  getMonthlyReport,
  getOverallReport,
  getWeeklyReport,
} from "@/actions/student_report_actions";
import { weeklyData } from "@/redux/slices/weeklyReportSlice";
import { userData } from "@/redux/slices/userSlice";
import { monthlyData } from "@/redux/slices/monthlyReportSlice";
import { overallData } from "@/redux/slices/overallReportSlice";
import { useAppDispatch } from "@/redux/hooks";

const OTPFormSchema = z.object({
  otp: z
    .string({ required_error: "OTP is required!" })
    .min(6, { message: "Your OTP must be 6 characters" }),
});

const Verify = () => {
  const [isVerifying, setIsVerifying] = useState(false);

  const router = useRouter();

  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof OTPFormSchema>>({
    resolver: zodResolver(OTPFormSchema),
  });

  const onOTPSubmit = async (data: z.infer<typeof OTPFormSchema>) => {
    setIsVerifying(true);

    const email = localStorage.getItem("email");
    try {
      const response = await fetch("/api/auth/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          otp: data.otp,
          email,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();

        const weeklyReportInfo = getWeeklyReport();
        const monthlyReportInfo = getMonthlyReport();
        const overallReportInfo = getOverallReport();

        const [weeklyReport, monthlyReport, overallReport] = await Promise.all([
          weeklyReportInfo,
          monthlyReportInfo,
          overallReportInfo,
        ]);

        dispatch(userData(responseData.user));
        dispatch(weeklyData(weeklyReport.weeklyReport));
        dispatch(monthlyData(monthlyReport.monthlyReport));
        dispatch(overallData(overallReport.overallReport));

        toast.success("Account verified successfully", {
          description: responseData.message,
        });

        localStorage.removeItem("email");
        router.replace("/initial-info");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error: any) {
      toast.error("Account verification failed!", {
        description: error.response.data.message,
      });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <section className="w-full h-full px-3 space-y-4">
      <div className="w-full">
        <Image
          src={"/assets/images/leadlly_logo.svg"}
          alt="Leadlly"
          width={130}
          height={60}
        />
      </div>
      <div className="w-full h-[calc(100dvh-65px)] flex items-center justify-center">
        <div className="max-w-lg w-full p-10 rounded-xl shadow-2xl flex flex-col items-center justify-center border">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onOTPSubmit)}
              className="w-full flex flex-col justify-center items-center space-y-6"
            >
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem className="text-center">
                    <FormLabel className="text-base lg:text-lg font-medium">
                      One-Time Password
                    </FormLabel>
                    <FormControl>
                      <InputOTP
                        maxLength={6}
                        {...field}
                        containerClassName="justify-center"
                      >
                        <InputOTPGroup>
                          <InputOTPSlot index={0} className="text-base" />
                          <InputOTPSlot index={1} className="text-base" />
                          <InputOTPSlot index={2} className="text-base" />
                          <InputOTPSlot index={3} className="text-base" />
                          <InputOTPSlot index={4} className="text-base" />
                          <InputOTPSlot index={5} className="text-base" />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormDescription>
                      Please enter the one-time password sent to your email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={isVerifying}
                size={"lg"}
                className="text-sm lg:text-base font-medium"
              >
                {isVerifying ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" /> Verifying
                  </span>
                ) : (
                  "Submit"
                )}
              </Button>
            </form>
          </Form>
          <ResendOtpButton />
        </div>
      </div>
    </section>
  );
};

export default Verify;
