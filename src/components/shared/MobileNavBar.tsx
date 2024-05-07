"use client";

import Image from "next/image";
import Link from "next/link";

import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { SidebarDesktop, Logo, NotificationIcon } from "@/components";

import { userSidebarLinks } from "@/helpers/constants";

import { Menu } from "lucide-react";
import React, { useState } from "react";

const MobileNavBar = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <nav className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
          <SheetTrigger asChild className="cursor-pointer">
            <Menu />
          </SheetTrigger>
          <SheetContent side={"left"} className="p-0">
            <SidebarDesktop sidebar={userSidebarLinks} setOpen={setSheetOpen} />
          </SheetContent>
        </Sheet>

        <Link href={"/"}>
          <Logo
            fullLogoWidth={110}
            fullLogoHeight={40}
            fullLogoClassName="hidden sm:block"
            smallLogoWidth={25}
            smallLogoHeight={25}
            smallLogoClassName="sm:hidden"
          />
        </Link>
      </div>

      <div className="md:hidden capitalize text-lg font-medium text-black">
        <p>
          <span className="text-primary">hello,</span> john musk
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="md:border md:border-black md:w-8 md:h-8 md:rounded-full flex items-center justify-center">
          <NotificationIcon stroke="black" width="12" height="18" />
        </div>

        <div className="flex flex-col items-center justify-center mt-1">
          <Image
            src={"/assets/images/student_image.png"}
            alt="student_image"
            width={25}
            height={25}
          />
          <span className="hidden sm:inline-block capitalize text-[10px] font-semibold text-black">
            john musk
          </span>
        </div>
      </div>
    </nav>
  );
};

export default MobileNavBar;
