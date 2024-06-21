"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";

import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { Eye, EyeOff, Loader2, Lock, User } from "lucide-react";

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
import { useToast } from "@/components/ui/use-toast";
import { access } from "fs";
import { headers } from "next/headers";
import apiClient from "@/apiClient/apiClient";

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onFormSubmit = async (data: z.infer<typeof signInSchema>) => {
    console.log(data)
    setIsLoggingIn(true);

    try {
      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/auth/login`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(data),
      //     credentials: "include",
      //     cache: "no-store",
      //   }
      // );

      const response = await apiClient.post('/api/auth/login', JSON.stringify(data))


      toast({
        title: "Login success",
        description: response.data.message,
      });

      router.replace("/");
    } catch (error: any) {
      console.log(error, "hello")
      toast({
        title: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      try {
        // const res = await axios.post(
        //   `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/api/google/auth`,
        //   { access_token: credentialResponse.access_token },
        //   {
        //     headers: {
        //       "Content-Type": "application/json",
        //     },
        //     withCredentials: true,
        //   }
        // );

        const res = await apiClient.post('/api/google/auth', { access_token: credentialResponse.access_token })
  
        toast({
          title: "Login success",
          description: res.data.message,
        });
  
        router.replace("/");
      } catch (error: any) {
        console.error("Axios error:", error);
        toast({
          title: "Google login failed!",
          description: error.response?.data?.message || error.message,
          variant: "destructive",
        });
      }
    },
    onError: (error: any) => {
      console.error("Google login error:", error);
      toast({
        title: "Google login failed!",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  return (
    <div className="h-main-height relative">
      <div className="flex items-center justify-center xl:justify-normal py-2 lg:mx-20">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly_Logo"
          width={150}
          height={50}
        />
      </div>

      <div className="h-[calc(100%-56px)] flex items-center px-4 lg:mx-20">
        <div className="flex flex-col xl:flex-row items-center justify-between lg:gap-6 w-full">
          <div className="rounded-3xl px-5 sm:px-8 lg:px-12 py-10 lg:py-14 shadow-xl max-w-[530px] w-full flex flex-col justify-start gap-10">
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
                className="space-y-4">
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
                              }>
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
                  disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <span className="flex items-center">
                      <Loader2 className="w-6 h-6 animate-spin mr-2" />{" "}
                      LoggingIn
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>

                <Button
                  type="button"
                  variant={"outline"}
                  onClick={() => login()}
                  className="w-full text-lg lg:text-xl h-12 gap-2">
                  <Image
                    src="/assets/icons/google-icon.svg"
                    alt="Sign in with Google"
                    width={17}
                    height={17}
                  />
                  Sign in with Google
                </Button>

                <div className="w-full text-center">
                  <p>
                    No account yet?{" "}
                    <Link href={"/signup"} className="text-primary">
                      Sign Up
                    </Link>
                  </p>
                </div>
              </form>
            </Form>
          </div>
          <div className="relative w-56 h-56 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px]">
            <Image
              src="/assets/icons/Loginpic.png"
              alt="Login_page_photo"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <span className="absolute bottom-0 xl:right-0 -z-20 w-full xl:w-80 h-32 sm:h-64 xl:h-full rounded-tl-[40px] rounded-tr-[40px] xl:rounded-tr-none xl:rounded-bl-[40px] bg-[#FCF3FF]"></span>
    </div>
  );
};

export default Login;
