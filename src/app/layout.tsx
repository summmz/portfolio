import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { MotionProvider } from "@/components/motion-provider";
import { GyroProvider } from "@/components/gyro-provider";
import { Background } from "@/components/background";
import { ScrollProgress } from "@/components/scroll-progress";
import { Preloader } from "@/components/preloader";
import { SectionRail } from "@/components/section-rail";
import { CommandPalette } from "@/components/command-palette";
import { EasterEggs } from "@/components/easter-eggs";
import { CopyToast } from "@/components/copy-toast";
import { Nav } from "@/components/nav";
import { CustomCursor } from "@/components/cursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://yourdomain.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sumit — Full-Stack Developer & Web Builder",
    template: "%s · Sumit",
  },
  description:
    "Portfolio of Sumit — a full-stack developer building real-world web apps with React, Node.js, MongoDB and clean backends.",
  keywords: [
    "full-stack developer",
    "web developer",
    "react",
    "node.js",
    "typescript",
    "portfolio",
    "summit",
  ],
  authors: [{ name: "Sumit" }],
  creator: "Sumit",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Sumit",
    title: "Sumit — Full-Stack Developer & Web Builder",
    description:
      "A full-stack developer building real-world web apps with React, Node.js and clean backends.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#06070f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-cyan focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-background"
        >
          Skip to content
        </a>
        <MotionProvider>
          <GyroProvider>
            <Preloader />
            <Background />
            <ScrollProgress />
            <CustomCursor />
            <SectionRail />
            <Nav />
            {children}
            <CommandPalette />
            <EasterEggs />
            <CopyToast />
          </GyroProvider>
        </MotionProvider>
      </body>
    </html>
  );
}