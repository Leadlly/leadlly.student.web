"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";

import { GoogleLogin } from "@react-oauth/google";
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

const Login = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onFormSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsLoggingIn(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STUDENT_API_BASE_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
          credentials: "include",
          cache: "no-store",
        }
      );

      const responseData = await response.json();

      toast({
        title: "Login success",
        description: responseData.message,
      });

      router.replace("/");
    } catch (error) {
      toast({
        title: "Error logging in!",
        variant: "destructive",
      });
    } finally {
      setIsLoggingIn(false);
    }
  };

  useEffect(() => {
    form.setFocus("email");
  }, [form.setFocus]);

  return (
    <div className="h-main-height relative">
      <div className="mx-20">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly_Logo"
          width={150}
          height={50}
        />
      </div>

      <div className="h-[calc(100%-40px)] flex items-center mx-20">
        <div className="flex items-center justify-between gap-6 w-full">
          <div className="rounded-3xl px-12 py-14 shadow-xl max-w-[530px] w-full flex flex-col justify-start gap-10">
            <div className="text-center">
              <h3 className="text-[52px] font-bold leading-none">Welcome</h3>
              <p className="text-lg">We are glad to see you with us</p>
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
                  className="w-full text-xl h-12"
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

                <div className="w-full">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse, "Current user");
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                    useOneTap
                    auto_select
                  />
                </div>
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
          <div>
            <Image
              src="/assets/icons/Loginpic.png"
              alt="Login_page_photo"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <span className="absolute right-0 top-0 bottom-0 -z-10 w-80 rounded-tl-[40px] rounded-bl-[40px] bg-[#FCF3FF]"></span>
    </div>
  );
};

export default Login;
