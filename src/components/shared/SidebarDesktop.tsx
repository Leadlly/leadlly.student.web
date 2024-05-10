"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import clsx from "clsx";

import { Logo } from "@/components";
import { TSidebarLink } from "../../helpers/types";
import React from "react";

const SidebarDesktop = ({
  sidebar,
  setOpen,
}: {
  sidebar: TSidebarLink[];
  setOpen?: (sheetOpen: boolean) => void;
}) => {
  const pathname = usePathname();
  return (
    <aside className="bg-sidebar-background w-full h-full md:w-20 xl:w-sidebar md:h-main-height lg:rounded-xl overflow-y-hidden shadow-xl">
      <div className="w-full px-[25px] py-4">
        <Link href={"/"}>
          <Logo
            fullLogoWidth={150}
            fullLogoHeight={50}
            fullLogoClassName="block md:hidden xl:block"
            smallLogoWidth={90}
            smallLogoHeight={90}
            smallLogoClassName="hidden md:block xl:hidden"
          />
        </Link>
      </div>
      <ul className="flex flex-col justify-start items-start md:items-center xl:items-start gap-2 h-full lg:h-[calc(100dvh-97px)] overflow-x-hidden overflow-y-auto custom__scrollbar px-[25px] md:px-3 xl:px-[25px] py-3">
        {sidebar.map((item) => {
          return (
            <Link
              href={item.href}
              key={item.href}
              onClick={() => {
                if (setOpen) {
                  setOpen(false);
                }
              }}
              className={clsx(
                pathname === item.href ? "bg-primary" : "",
                "px-4 py-3 rounded-xl md:rounded-full xl:rounded-xl w-full flex items-center justify-start md:justify-center xl:justify-start"
              )}>
              <li className="flex items-center gap-3 capitalize text-base md:text-[20px]">
                <item.icon
                  stroke={pathname === item.href ? "white" : "#5A10D9"}
                />
                <div
                  className={clsx(
                    "md:hidden xl:block",
                    pathname === item.href ? "text-white" : "text-primary"
                  )}>
                  {item.label}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default SidebarDesktop;
