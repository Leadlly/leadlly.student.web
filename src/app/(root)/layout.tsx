import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import "../globals.css";
import StoreProvider from "@/app/StoreProvider";
import { Container, Sidebar, MobileMenu } from "@/components";
import { cn } from "@/lib/utils";

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
          <Container className="md:hidden fixed z-50 bg-white shadow">
            <MobileMenu />
          </Container>
          <Container className="relative py-3">
            <div className="hidden md:block md:fixed top-2 bottom-2">
              <Sidebar />
            </div>
            <main className="md:ml-20 xl:ml-[261px] h-main-height pl-4 pr-4 md:pr-2">
              {children}
            </main>
          </Container>
        </StoreProvider>
      </body>
    </html>
  );
}
