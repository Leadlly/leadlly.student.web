import { getUser } from "@/actions/user_actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await getUser();

  if (user && user.onboard !== true) {
    return redirect("/initial-info");
  }

  return <>{children}</>;
}
