"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";

import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { cn } from "@/lib/utils";

const publicLinks = [
  { name: "Home", href: "/" },
  { name: "Articles", href: "/articles" },
  { name: "About", href: "/about" },
  { name: "Pricing", href: "/pricing" },
];

const privateLinks = [
  { name: "Write", href: "/write" },
  { name: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const logoutMutation = useLogout();
  const initials = user?.email?.charAt(0).toUpperCase() ?? "";

  const navLinks = isAuthenticated
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-canvas/85 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-medium tracking-tight text-primary"
        >
          AI Digest
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-body transition hover:text-ink"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <Button
                variant="outline"
                size="sm"
                onClick={() => logoutMutation.mutate()}
              >
                Logout
              </Button>
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: "ghost" }),
                  "text-body hover:text-ink",
                )}
              >
                Login
              </Link>
              <Link href="/register" className={cn(buttonVariants())}>
                Register
              </Link>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t border-hairline md:hidden">
          <div className="container mx-auto flex flex-col gap-6 px-4 py-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-base font-medium text-ink"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            <div className="border-t border-hairline pt-5">
              {isAuthenticated ? (
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{initials}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => logoutMutation.mutate()}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "w-full",
                    )}
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileOpen(false)}
                    className={cn(buttonVariants(), "w-full")}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
