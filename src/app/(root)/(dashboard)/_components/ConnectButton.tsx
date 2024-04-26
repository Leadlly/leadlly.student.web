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
    <button className="flex items-center gap-6 text-base font-semibold border w-full py-2 px-3 rounded-md">
      {Icon && Icon}
      <span>{title}</span>
    </button>
  );
};

export default ConnectButton;
