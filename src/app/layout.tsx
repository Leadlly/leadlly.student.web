import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import { Container } from "@/components";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import { GoogleOAuthProvider } from "@react-oauth/google";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Leadlly",
  description:
    "Say goodbye to one-size-fits-all! We tailor study plans and resources to your individual learning style and goals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased custom__scrollbar",
          fontSans.variable
        )}>
        <StoreProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <Container className="py-3">
              <main className="h-main-height">{children}</main>
            </Container>
            <Toaster />
          </GoogleOAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
