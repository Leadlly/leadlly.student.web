"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";
import { toast } from "sonner";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import GoogleLoginButton from "@/app/(auth)/_components/GoogleLoginButton";

import { useAppDispatch } from "@/redux/hooks";
import { userData } from "@/redux/slices/userSlice";
import {
  getMonthlyReport,
  getOverallReport,
  getWeeklyReport,
} from "@/actions/student_report_actions";
import { weeklyData } from "@/redux/slices/weeklyReportSlice";
import { monthlyData } from "@/redux/slices/monthlyReportSlice";
import { overallData } from "@/redux/slices/overallReportSlice";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoggingIn(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
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
        toast.success(responseData.message);

        router.replace("/");
      } else {
        const errorData = await response.json();
        toast.error("Login Failed", {
          description: errorData.message,
        });
      }
    } catch (error: any) {
      console.log(error);

      toast.error("Login Failed", {
        description: error.response
          ? error.response?.data.message
          : error.message,
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <div className="h-main-height relative">
        <div className="flex items-center px-5 py-2 lg:mx-24">
          <Image
            src="/assets/images/leadlly_logo.svg"
            alt="Leadlly_Logo"
            width={150}
            height={50}
          />
        </div>

        <div className="h-[calc(100%-56px)] flex items-center px-4 lg:mx-20">
          <div className="flex flex-col xl:flex-row items-center justify-between lg:gap-6 w-full">
            <div className="rounded-3xl px-5 sm:px-8 lg:px-12 py-10 lg:py-14 shadow-xl max-w-[530px] w-full flex flex-col justify-start space-y-4">
              <div className="text-center space-y-2">
                <h3 className="text-2xl lg:text-[52px] font-bold leading-none">
                  Welcome
                </h3>
                <p className="text-base lg:text-lg">
                  We are glad to see you with us
                </p>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onFormSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Email"
                            icon1={<User className="w-5 h-5 opacity-70" />}
                            className="focus-visible:ring-0 text-lg focus:ring-offset-0"
                            inputWrapperClassName="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            type={togglePassword ? "text" : "password"}
                            placeholder="Create password"
                            icon1={<Lock className="w-5 h-5 opacity-70" />}
                            icon2={
                              <div
                                className="cursor-pointer"
                                onClick={() =>
                                  setTogglePassword(!togglePassword)
                                }
                              >
                                {togglePassword ? (
                                  <EyeOff className="w-5 h-5 opacity-70" />
                                ) : (
                                  <Eye className="w-5 h-5 opacity-70" />
                                )}
                              </div>
                            }
                            className="focus-visible:ring-0 text-lg focus:ring-offset-0"
                            inputWrapperClassName="h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Checkbox id="remember-password" />
                      <label htmlFor="remember-password" className="mt-1">
                        Remember Password
                      </label>
                    </div>

                    <div>
                      <Link href={"/forgot-password"} className="text-primary">
                        Forgot Password?
                      </Link>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-lg md:text-xl h-12"
                    disabled={isLoggingIn}
                  >
                    {isLoggingIn ? (
                      <span className="flex items-center">
                        <Loader2 className="w-6 h-6 animate-spin mr-2" />{" "}
                        Signing in
                      </span>
                    ) : (
                      "Login"
                    )}
                  </Button>
                </form>
              </Form>

              <GoogleLoginButton />

              <div className="w-full text-center">
                <p>
                  No account yet?{" "}
                  <Link href={"/signup"} className="text-primary">
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
            <div className="relative hidden xl:block w-56 h-56 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px]">
              <Image
                src="/assets/icons/Loginpic.png"
                alt="Login_page_photo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <span className="absolute hidden xl:block bottom-0 xl:right-0 -z-20 w-full xl:w-80 h-32 sm:h-64 xl:h-full rounded-tl-[40px] rounded-tr-[40px] xl:rounded-tr-none xl:rounded-bl-[40px] bg-[#FCF3FF]"></span>
      </div>
    </>
  );
};

export default Login;
