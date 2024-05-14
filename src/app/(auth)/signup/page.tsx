"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key, Mail, User } from "lucide-react";
import { signUpSchema } from "@/schemas/signUpSchema";

import { cn } from "@/lib/utils";

const SignUp = () => {
  const [togglePassword, setTogglePassword] = useState(false);

  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onFormSubmit = (data: z.infer<typeof signUpSchema>) => {
    console.log(data);
  };

  useEffect(() => {
    setFocus("fullName");
  }, [setFocus]);

  return (
    <div className="h-main-height">
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
          <div>
            <Image
              src="/assets/icons/signuppic.png"
              alt="Login_page_photo"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
          <div className="rounded-3xl px-12 py-14 shadow-xl max-w-[530px] w-full flex flex-col justify-start gap-10">
            <div className="text-center">
              <h3 className="text-4xl font-bold leading-none">
                Create an account
              </h3>
              <p className="text-lg">
                Unlock your potential with expert guidance sign up for
                mentorship today!
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onFormSubmit)}
              className="flex flex-col justify-start gap-3">
              <div>
                <div
                  className={cn(
                    "flex items-center justify-start gap-4 border text-[#7F7F7F] h-12 px-4 rounded-lg",
                    errors.fullName
                      ? "border-red-500 bg-red-50/40"
                      : "border-[#D9D8D8]"
                  )}>
                  <User />
                  <input
                    className="focus:outline-none h-full w-full bg-transparent"
                    type="text"
                    placeholder="Enter full name"
                    {...register("fullName", { required: true })}
                  />
                </div>
                {errors.fullName && (
                  <small className="text-xs text-red-500">
                    {errors.fullName.message}
                  </small>
                )}
              </div>

              <div>
                <div
                  className={cn(
                    "flex items-center justify-start gap-4 border text-[#7F7F7F] h-12 px-4 rounded-lg",
                    errors.email
                      ? "border-red-500 bg-red-50/40"
                      : "border-[#D9D8D8]"
                  )}>
                  <Mail />
                  <input
                    className="focus:outline-none h-full w-full"
                    type="email"
                    placeholder="Enter your Email"
                    {...register("email", { required: true })}
                  />
                </div>
                {errors.email && (
                  <small className="text-xs text-red-500">
                    {errors.email.message}
                  </small>
                )}
              </div>

              <div>
                <div
                  className={cn(
                    "flex items-center justify-start gap-4 border text-[#7F7F7F] h-12 px-4 rounded-lg",
                    errors.password
                      ? "border-red-500 bg-red-50/40"
                      : "border-[#D9D8D8]"
                  )}>
                  <Key />
                  <input
                    className="focus:outline-none h-full w-full"
                    type={togglePassword ? "text" : "password"}
                    placeholder="Create password"
                    {...register("password", { required: true })}
                  />
                  <div
                    className="cursor-pointer"
                    onClick={() => setTogglePassword(!togglePassword)}>
                    {togglePassword ? <EyeOff /> : <Eye />}
                  </div>
                </div>
                {errors.password && (
                  <small className="text-xs text-red-500">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <Button className="w-full text-xl h-12 rounded-lg">
                Sign Up
              </Button>

              <div className="w-full text-center">
                <p>
                  Already have an account?{" "}
                  <Link href={"/login"} className="text-primary">
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
