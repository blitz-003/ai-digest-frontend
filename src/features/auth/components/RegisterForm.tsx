"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from "lucide-react";

import {
  registerSchema,
  type RegisterSchema,
} from "../validation/register.schema";

import { useRegister } from "../hooks/useRegister";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const mutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = (values: RegisterSchema) => {
    mutation.mutate(values);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-16">
      <div className="w-full max-w-md">
        <div className="mb-10 text-center">
          <p className="label-uppercase text-primary">Join the community</p>
          <h1 className="mt-3 display-md text-ink">
            Create your account
          </h1>
        </div>

        <div className="rounded-xl border border-hairline bg-surface-card p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-body" />
                <Input
                  id="username"
                  placeholder="Choose a username"
                  className="h-12 border-hairline-strong bg-surface-card pl-11 text-base focus-visible:border-primary focus-visible:ring-primary/20"
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-sm text-destructive">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="full_name">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-body" />
                <Input
                  id="full_name"
                  placeholder="Enter your full name"
                  className="h-12 border-hairline-strong bg-surface-card pl-11 text-base focus-visible:border-primary focus-visible:ring-primary/20"
                  {...register("full_name")}
                />
              </div>
              {errors.full_name && (
                <p className="text-sm text-destructive">
                  {errors.full_name.message}
                </p>
              )}
            </div>

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
                  placeholder="Create a password"
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

            <div className="space-y-2">
              <Label htmlFor="confirm_password">Confirm password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-body" />
                <Input
                  id="confirm_password"
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm your password"
                  className="h-12 border-hairline-strong bg-surface-card pl-11 pr-11 text-base focus-visible:border-primary focus-visible:ring-primary/20"
                  {...register("confirm_password")}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-body transition-colors hover:text-ink"
                >
                  {showConfirm ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirm_password && (
                <p className="text-sm text-destructive">
                  {errors.confirm_password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="group h-12 w-full text-base"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                "Creating account..."
              ) : (
                <span className="flex items-center gap-2">
                  Register
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-base text-body">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-ink underline-offset-4 hover:underline"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
