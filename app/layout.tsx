"use client";

import "./css/style.css";
import { Inter } from "next/font/google";
import "aos/dist/aos.css";
import AosProvider from "@/components/aos-provider";
import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

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
  const pathname = usePathname();
  const isDashboardPage = pathname?.includes('dashboard');
  const isAuthPage = pathname?.includes('signin') || pathname?.includes('signup');
  const isPlatformPage = pathname?.startsWith('/operations-dashboard') || pathname?.startsWith('/alerts-dashboard');
  
  // Add client-side only state to handle hydration
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
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
        <AosProvider>
          <div className="flex min-h-screen flex-col overflow-hidden supports-[overflow:clip]:overflow-clip">
            {!isPlatformPage && <Header />}
            <main className="grow">
              {children}
            </main>
            {!isDashboardPage && !isAuthPage && <Footer />}
          </div>
        </AosProvider>
      </body>
    </html>
  );
}
