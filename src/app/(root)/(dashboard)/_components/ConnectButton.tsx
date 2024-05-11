"use client";

import React from "react";

const ConnectButton = ({
  title,
  icon: Icon,
}: {
  title: string;
  icon: React.ReactNode;
}) => {
  return (
    <button className="flex items-center justify-center md:justify-start gap-1 md:gap-6 text-base font-semibold border w-full p-1 md:py-2 md:px-3 rounded-md">
      {Icon && Icon}
      <span className="text-[9px] md:text-base">{title}</span>
    </button>
  );
};

export default ConnectButton;
