"use client";

import SidebarDesktop from "./SidebarDesktop";
import { userSidebarLinks } from "@/helpers/constants";

const Sidebar = ({ meetingsLength }: { meetingsLength: number }) => {
  return (
    <SidebarDesktop
      sidebar={userSidebarLinks}
      meetingsLength={meetingsLength}
    />
  );
};

export default Sidebar;
