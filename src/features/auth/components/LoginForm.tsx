"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";

import { loginSchema, type LoginSchema } from "../validation/login.schema";
import { useLogin } from "../hooks/useLogin";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const mutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginSchema) => {
    try {
      await mutation.mutateAsync(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="label-uppercase text-primary">Welcome back</p>
          <h1 className="mt-3 display-md text-ink">
            Sign in to AI Digest
          </h1>
        </div>

        <div className="rounded-xl border border-hairline bg-surface-card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-body" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-12 border-hairline-strong bg-surface-card pl-11 text-base focus-visible:border-primary focus-visible:ring-primary/20"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-body" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="h-12 border-hairline-strong bg-surface-card pl-11 pr-11 text-base focus-visible:border-primary focus-visible:ring-primary/20"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-body transition-colors hover:text-ink"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="group h-12 w-full text-base"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                "Signing in..."
              ) : (
                <span className="flex items-center gap-2">
                  Login
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-base text-body">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-ink underline-offset-4 hover:underline"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
