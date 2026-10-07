import { getUser } from "@/actions/user_actions";
import { redirect } from "next/navigation";
import React from "react";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let user = null;
  try {
    const data = await getUser();
    user = data?.user ?? null;
  } catch (error) {
    console.error("Failed to load user in main layout:", error);
  }

  if (user && user.onboard !== true) {
    return redirect("/initial-info");
  }

  return <>{children}</>;
}
