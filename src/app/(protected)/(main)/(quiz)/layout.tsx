import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Leadlly | Weekly Quiz",
};

export default function WeeklyQuizLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="custom__scrollbar h-main-height overflow-y-auto overflow-x-hidden">
      {children}
    </section>
  );
}
