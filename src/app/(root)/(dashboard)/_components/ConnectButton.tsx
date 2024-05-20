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
    <button className="flex items-center justify-start gap-2 md:gap-6 text-base font-semibold border w-full py-3 px-2 md:py-2 md:px-3 rounded-md">
      {Icon && Icon}
      <span className="text-sm md:text-base">{title}</span>
    </button>
  );
};

export default ConnectButton;
