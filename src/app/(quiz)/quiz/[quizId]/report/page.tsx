// pages/report.tsx
import { FC } from "react";
import Defaultview from "./components/Defaultview";
import DesktopView from "./components/Defaultview";

const Report: FC = () => {
  return (
    <div>
      <div className="hidden xl:block h-full">
        <DesktopView />
      </div>

      <div className="h-full block xl:hidden md:pb-4">
        <Defaultview />
      </div>
    </div>
  );
};

export default Report;
