"use client";
import { useQuery } from "@tanstack/react-query";
import { getDashboardProfile } from "../services/dashboard.service";

export function useDashboardProfile() {
  return useQuery({
    queryKey: ["dashboard-profile"],
    queryFn: getDashboardProfile,
  });
}
