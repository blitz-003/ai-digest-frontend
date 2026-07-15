import type { Metadata } from "next";
import "./globals.css";

import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Footer from "@/components/layout/Footer";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "AI Digest",
  description: "AI News Platform",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body>

        <Providers>

          <Navbar />

          <main>

            {children}

          </main>
          <Footer/>
        </Providers>

      </body>
    </html>
  );
}