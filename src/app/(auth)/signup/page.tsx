"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key, Loader2, Mail, User } from "lucide-react";
import { signUpSchema } from "@/schemas/signUpSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import GoogleLoginButton from "../_components/GoogleLoginButton";
import { signUpUser } from "@/actions/user_actions";

const SignUp = () => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onFormSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);

    try {
      const responseData = await signUpUser(data);

      if (responseData.success) {
        toast.success(responseData.message);
        localStorage.setItem("email", data.email);
        router.replace("/verify");
      } else {
        toast.error(responseData.message);
      }
    } catch (error: any) {
      toast.error("Error registering user.", {
        description: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-main-height ">
      <div className="flex items-center justify-center xl:justify-normal py-2 lg:mx-20 mb-5 sm:mb-0">
        <Image
          src="/assets/images/leadlly_logo.svg"
          alt="Leadlly_Logo"
          width={150}
          height={50}
        />
      </div>

      <div className="h-[calc(100%-56px)] flex items-center px-4 lg:mx-20">
        <div className="flex flex-col-reverse xl:flex-row items-center justify-between lg:gap-6 w-full">
          <div className="relative w-56 h-56 sm:w-96 sm:h-96 md:w-[500px] md:h-[500px]">
            <Image
              src="/assets/icons/signuppic.png"
              alt="Login_page_photo"
              fill
              className="object-contain"
            />
          </div>
          <div className="rounded-3xl px-8 lg:px-12 py-10 lg:py-14 shadow-xl max-w-[530px] w-full flex flex-col justify-start space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-2xl lg:text-4xl font-bold leading-none">
                Create an account
              </h3>
              <p className="text-base lg:text-lg">
                Unlock your potential with expert guidance sign up for
                mentorship today!
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onFormSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter full name"
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
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          icon1={<Mail className="w-5 h-5 opacity-70" />}
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
                          icon1={<Key className="w-5 h-5 opacity-70" />}
                          icon2={
                            <div
                              className="cursor-pointer"
                              onClick={() => setTogglePassword(!togglePassword)}
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

                <Button
                  type="submit"
                  className="w-full text-xl h-12 rounded-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <Loader2 className="mr-2 w-5 h-5 animate-spin" /> Signing
                      Up
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </form>
            </Form>

            <GoogleLoginButton />

            <p className="w-full text-center text-base md:text-lg">
              Already have an account?{" "}
              <Link href={"/login"} className="text-primary">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
