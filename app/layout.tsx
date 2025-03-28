"use client";

import "./css/style.css";
import { Inter } from "next/font/google";
import "aos/dist/aos.css";
import LayoutContent from "@/components/layout-content";
import { homeMetadata } from "./home-meta";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <title>{homeMetadata.title}</title>
        <meta name="description" content={homeMetadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Add preload for critical fonts */}
        <link
          rel="preload"
          href="/fonts/inter-var-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        
        {/* Add preconnect for critical domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} bg-gray-50 font-inter tracking-tight text-gray-900 antialiased`}
        suppressHydrationWarning
      >
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  );
}
