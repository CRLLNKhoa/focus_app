import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import LeftSidebarTop from "@/components/layout/left-sidebar-top";
import RightSidebarTop from "@/components/layout/right-sidebar-top";
import LeftMenuApp from "@/components/layout/left-menu-app";
import Calendar from "@/components/layout/calendar";
import { Toaster } from "react-hot-toast";
import Soundboard from "@/components/layout/soundboard";
import { ClerkProvider } from "@clerk/nextjs";
import { Suspense } from "react";
import Spaces from "@/components/layout/spaces";
import Youtube from "@/components/youtube";
import Tasks from "@/components/tasks";
import FlashCard from "@/components/layout/flash-card";
import LearnCard from "@/components/flash-card/learn-card";
import DailyEnglish from "@/components/daily-english/dailyEnglish";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="vi">
      <head />
      <ClerkProvider>
        <body
          className={clsx(
            "min-h-screen bg-background font-sans antialiased overflow-hidden",
            fontSans.variable
          )}
        >
          <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
            <>
              <div className="relative w-full h-screen overflow-hidden">
                {children}
              </div>

              <Suspense>
                <LeftSidebarTop />
              </Suspense>
              <LeftMenuApp />
              <Suspense>
                <RightSidebarTop />
              </Suspense>

              <Calendar />
              <Soundboard />
              <Spaces />

              <div className="absolute top-16 left-[98px] right-2 bottom-2 bg-transparent">
                <Youtube />
                <Tasks />
                <FlashCard />
                <LearnCard />
                <DailyEnglish />
              </div>

              <Toaster />
            </>
          </Providers>
        </body>
      </ClerkProvider>
    </html>
  );
}
