"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { TSidebarLink } from "../../helpers/types";
import clsx from "clsx";

const Sidebar = ({ sidebar }: { sidebar: TSidebarLink[] }) => {
  const pathname = usePathname();
  return (
    <aside className="bg-sidebar-background  hidden lg:block lg:w-20 xl:w-sidebar h-main-height rounded-xl overflow-y-hidden">
      <div className="w-full px-[25px] py-4">
        <Link href={"/"}>
          <Image
            src="/assets/images/leadlly_logo.svg"
            alt="Leadlly Logo"
            width={150}
            height={50}
            className="block lg:hidden xl:block"
          />

          <Image
            src="/assets/images/leadlly_logo_small.svg"
            alt="Leadlly Logo"
            width={90}
            height={90}
            className="hidden lg:block xl:hidden"
          />
        </Link>
      </div>
      <ul className="flex flex-col justify-start items-start lg:items-center xl:items-start gap-2 h-[calc(100dvh-97px)] overflow-x-hidden overflow-y-auto custom__scrollbar px-[25px] lg:px-3 xl:px-[25px] py-3">
        {sidebar.map((item) => {
          return (
            <Link
              href={item.href}
              key={item.href}
              className={clsx(
                pathname === item.href ? "bg-primary" : "",
                "px-4 py-3 rounded-[11px] w-full flex items-center justify-start lg:justify-center xl:justify-start"
              )}>
              <li className="flex items-center gap-3 capitalize text-[20px]">
                <div>
                  <item.icon
                    stroke={pathname === item.href ? "white" : "#5A10D9"}
                  />
                </div>
                <div
                  className={clsx(
                    "lg:hidden xl:block",
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

export default Sidebar;
