"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useAppSelector } from "@/redux/hooks";

import Link from "next/link";

const ProfileBox = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex flex-col justify-center xl:justify-start xl:gap-4 border rounded-xl bg-gradient-to-b from-white/15 to-primary/15 px-5 py-3">
      <div className="flex items-center flex-col xl:flex-row gap-3 xl:gap-6">
        <Avatar className="w-16 h-16 md:hidden xl:block">
          <AvatarImage
            src={user?.avatar?.url}
            alt={`${user?.firstname}'s profile`}
          />
          <AvatarFallback className="text-2xl font-semibold capitalize">
            {user?.firstname[0]}
            <span className="capitalize">
              {user?.lastname ? user.lastname[0] : ""}
            </span>
          </AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col justify-start gap-1 xl:gap-2 truncate">
          <h2 className="text-xl xl:text-base font-semibold text-black whitespace-nowrap capitalize text-center xl:text-left">
            <span className="text-primary">Hello,</span> {user?.firstname}{" "}
            {user?.lastname}
          </h2>

          <div className="hidden xl:block w-full">
            <Link href={"/manage-account"}>
              <Button
                variant={"outline"}
                className="text-primary hover:text-primary/80 h-7">
                Manage Account
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="text-base xl:text-sm text-black font-normal space-y-2">
        <p className="text-center xl:text-left">
          Embrace the course as a catalyst for personal growth and empowerment,
          propelling you towards success with unwavering determination.
        </p>

        <div className="w-full flex items-center justify-center xl:hidden">
          <Link href={"/manage-account"}>
            <Button
              variant={"outline"}
              className="text-primary hover:text-primary/80">
              Manage Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfileBox;
