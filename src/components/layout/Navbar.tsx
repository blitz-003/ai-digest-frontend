"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

import { useAuth } from "@/features/auth/context/AuthContext";
import { useLogout } from "@/features/auth/hooks/useLogout";

import { Button, buttonVariants } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/lib/utils";

const publicLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Articles",
    href: "/articles",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Pricing",
    href: "/pricing",
  },
];

const privateLinks = [
  {
    name: "Write",
    href: "/write",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, isAuthenticated, isLoading } = useAuth();

  const logoutMutation = useLogout();

  const initials =
    user?.email?.charAt(0).toUpperCase() ?? "";

  const navLinks = isAuthenticated
    ? [...publicLinks, ...privateLinks]
    : publicLinks;


  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">

      <div className="container mx-auto flex h-16 items-center justify-between px-4">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-bold tracking-tight"
        >
          AI Digest
        </Link>


        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">

          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition hover:text-primary"
            >
              {link.name}
            </Link>
          ))}

        </nav>


        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">

          {isLoading ? (

            <>
              <Skeleton className="h-9 w-20" />
              <Skeleton className="h-9 w-24" />
            </>

          ) : isAuthenticated ? (

            <div className="flex items-center gap-4">

              <Avatar>
                <AvatarFallback>
                  {initials}
                </AvatarFallback>
              </Avatar>


              <Button
                variant="destructive"
                size="sm"
                onClick={() =>
                  logoutMutation.mutate()
                }
              >
                Logout
              </Button>

            </div>

          ) : (

            <>
              <Link
                href="/login"
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                  })
                )}
              >
                Login
              </Link>


              <Link
                href="/register"
                className={cn(
                  buttonVariants()
                )}
              >
                Register
              </Link>
            </>

          )}

        </div>


        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() =>
            setMobileOpen(!mobileOpen)
          }
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>


      </div>



      {/* Mobile Menu */}
      {mobileOpen && (

        <div className="border-t md:hidden">

          <div className="container mx-auto flex flex-col gap-6 px-4 py-6">


            <nav className="flex flex-col gap-4">

              {navLinks.map((link) => (

                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="text-base font-medium"
                >
                  {link.name}
                </Link>

              ))}

            </nav>



            <div className="border-t pt-5">


              {isLoading ? (

                <Skeleton className="h-10 w-full" />

              ) : isAuthenticated ? (

                <div className="flex flex-col gap-4">


                  <div className="flex items-center gap-3">

                    <Avatar>
                      <AvatarFallback>
                        {initials}
                      </AvatarFallback>
                    </Avatar>


                    <span className="text-sm text-muted-foreground">
                      {user?.email}
                    </span>

                  </div>



                  <Button
                    variant="destructive"
                    onClick={() =>
                      logoutMutation.mutate()
                    }
                  >
                    Logout
                  </Button>


                </div>


              ) : (

                <div className="flex flex-col gap-3">


                  <Link
                    href="/login"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className={cn(
                      buttonVariants({
                        variant: "outline",
                      }),
                      "w-full"
                    )}
                  >
                    Login
                  </Link>



                  <Link
                    href="/register"
                    onClick={() =>
                      setMobileOpen(false)
                    }
                    className={cn(
                      buttonVariants(),
                      "w-full"
                    )}
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