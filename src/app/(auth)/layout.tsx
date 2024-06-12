import { Metadata } from "next";
import React from "react";
import { Mada as FontSans } from "next/font/google";
import { Container } from "@/components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../globals.css";
import { cn } from "@/lib/utils";
import StoreProvider from "@/app/StoreProvider";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Leadlly | Auth",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
      <section className="h-main-height">{children}</section>
    </GoogleOAuthProvider>
  );
}
