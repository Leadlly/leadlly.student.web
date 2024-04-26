"use client";

import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Key, Mail, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const SignUp = () => {
  const [togglePassword, setTogglePassword] = useState(false);

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

            <form className="flex flex-col justify-start gap-3">
              <div className="flex items-center justify-start gap-4 border border-[#D9D8D8] text-[#7F7F7F] h-12 px-4 rounded-lg">
                <User />
                <input
                  className="focus:outline-none h-full w-full"
                  type="text"
                  placeholder="Enter full name"
                  required></input>
              </div>

              <div className="flex items-center justify-start gap-4 border border-[#D9D8D8] text-[#7F7F7F] h-12 px-4 rounded-lg">
                <Mail />
                <input
                  className="focus:outline-none h-full w-full"
                  type="email"
                  placeholder="Enter your Email"
                  required></input>
              </div>

              <div className="flex items-center justify-start gap-4 border border-[#D9D8D8] text-[#7F7F7F] h-12 px-4 rounded-lg">
                <Key />
                <input
                  className="focus:outline-none h-full w-full"
                  type={togglePassword ? "text" : "password"}
                  placeholder="Create password"
                  required></input>
                <div
                  className="cursor-pointer"
                  onClick={() => setTogglePassword(!togglePassword)}>
                  {togglePassword ? <EyeOff /> : <Eye />}
                </div>
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
