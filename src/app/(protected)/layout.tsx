import React from "react";
import Provider from "../provider";
import QueryProvider from "../QueryProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;

  if (!token) {
    return redirect("/login");
  }

  return (
    <Provider>
      <QueryProvider>{children}</QueryProvider>
    </Provider>
  );
}
