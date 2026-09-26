"use client";

import { useAppSelector } from "@/redux/hooks";
import { getCurrentHour } from "@/helpers/constants";

const DashboardGreeting = () => {
  const user = useAppSelector((state) => state.user.user);

  return (
    <div>
      <h1 className="text-2xl font-semibold leading-tight text-dark-primary sm:text-3xl">
        {getCurrentHour()},
      </h1>
      <p className="text-2xl font-semibold leading-tight text-primary sm:text-3xl">
        {user?.firstname}
      </p>
      <p className="mt-1 text-sm font-medium text-dark-primary-active sm:text-base">
        Ready for today&apos;s topics :)
      </p>
    </div>
  );
};

export default DashboardGreeting;
