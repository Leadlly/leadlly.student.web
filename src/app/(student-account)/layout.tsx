import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import "../globals.css";
import StoreProvider from "@/app/StoreProvider";
import { cn } from "@/lib/utils";
import { Container } from "@/components";

export const metadata: Metadata = {
  title: "Leadlly | Manage Account",
  description:
    "Say goodbye to one-size-fits-all! We tailor study plans and resources to your individual learning style and goals.",
};

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased custom__scrollbar",
          fontSans.variable
        )}>
        <StoreProvider>
          <Container className="py-3">
            <main className="h-main-height">{children}</main>
          </Container>
        </StoreProvider>
      </body>
    </html>
  );
}
