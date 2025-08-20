"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppSelector } from "@/redux/hooks";
import React from "react";

const AccountUserProfile = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6">
      <Avatar className="w-20 h-20 lg:w-32 lg:h-32">
        <AvatarImage src={user?.avatar?.url} />
        <AvatarFallback className="text-3xl font-semibold capitalize">
          {user?.firstname[0]}
          <span className="capitalize">
            {user?.lastname ? user.lastname[0] : ""}
          </span>
        </AvatarFallback>
      </Avatar>

      <div className="space-y-3 lg:space-y-5">
        <h2 className="capitalize text-2xl lg:text-3xl font-bold">
          <span className="text-primary">hello,</span> {user?.firstname}{" "}
          {user?.lastname}
        </h2>

        <p className="text-base lg:text-xl max-w-lg">
          Embrace the course as a catalyst for personal growth and empowerment,
          propelling.
        </p>
      </div>
    </div>
  );
};

export default AccountUserProfile;
