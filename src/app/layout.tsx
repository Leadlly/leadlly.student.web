import type { Metadata } from "next";
import { Mada as FontSans } from "next/font/google";
import "./globals.css";
import StoreProvider from "@/app/StoreProvider";
import { Container } from "@/components";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getUser } from "@/actions/user_actions";
import { getCookie } from "@/actions/cookie_actions";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { UserProps } from "@/helpers/types";

const fontSans = FontSans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Leadlly",
  description:
    "Say goodbye to one-size-fits-all! We tailor study plans and resources to your individual learning style and goals.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // let userData: UserProps = { user: null };
  // const token = await getCookie("token");

  // const headersList = headers();
  // const pathname = headersList.get("x-pathname");

  // const isPublicPath =
  //   pathname?.startsWith("/login") ||
  //   pathname?.startsWith("/signup") ||
  //   pathname?.startsWith("/verify") ||
  //   pathname?.startsWith("/resetpassword") ||
  //   pathname?.startsWith("/forgot-password");

  // if (!token && !isPublicPath) {
  //   redirect("/login");
  // }

  // if (token && isPublicPath) {
  //   redirect("/");
  // }

  // if (token) {
  //   userData = await getUser();
  // }

  const userData = await getUser();

  return (
    <html lang="en">
      <body
        className={cn(
          "font-sans antialiased custom__scrollbar",
          fontSans.variable
        )}
      >
        <StoreProvider user={userData?.user}>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <Container className="py-3">
              <main className="h-main-height">{children}</main>
            </Container>
            <Toaster richColors position="top-center" />
          </GoogleOAuthProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
