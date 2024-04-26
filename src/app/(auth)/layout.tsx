import { Metadata } from "next";
import React from "react";
import { Mada as FontSans } from "next/font/google";
import { Container } from "@/components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "../globals.css";
import { cn } from "@/lib/utils";

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
    <html lang="en">
      <body className={cn("font-sans antialiased", fontSans.variable)}>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <Container className="min-h-screen py-3">{children}</Container>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
