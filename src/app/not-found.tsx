"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-white px-4">
      {/* Background glows */}
      <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[400px] w-[400px] rounded-full bg-[#4F8CFF]/15 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-10%] bottom-[-10%] h-[350px] w-[350px] rounded-full bg-[#A855F7]/15 blur-[120px]" />

      <div className="relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-8xl font-bold md:text-9xl">
            <span className="bg-gradient-to-r from-[#4F8CFF] via-[#34D399] to-[#A855F7] bg-clip-text text-transparent">
              404
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="mt-6 text-2xl font-bold md:text-3xl">
            Page Not Found
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 flex items-center justify-center gap-4"
        >
          <Link
            href="/"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/80"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/articles"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-background px-4 text-sm font-medium shadow-xs transition hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            Browse Articles
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
