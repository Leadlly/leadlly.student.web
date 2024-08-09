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
  return <section className="h-main-height">{children}</section>;
}
