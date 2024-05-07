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
          <Container className="lg:hidden fixed z-50 bg-white shadow">
            <MobileMenu />
          </Container>
          <Container className="py-3 flex items-start gap-3">
            <div className="hidden lg:block">
              <Sidebar />
            </div>
            <main className="flex-1 h-main-height px-4 lg:px-3">
              {children}
            </main>
          </Container>
        </StoreProvider>
      </body>
    </html>
  );
}
