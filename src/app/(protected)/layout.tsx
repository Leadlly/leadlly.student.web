import React from "react";
import Provider from "../provider";
import QueryProvider from "../QueryProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import FreeTrialLockGate from "@/components/shared/FreeTrialLockGate";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  return (
    <Provider>
      <QueryProvider>
        <FreeTrialLockGate />
        {children}
      </QueryProvider>
    </Provider>
  );
}
