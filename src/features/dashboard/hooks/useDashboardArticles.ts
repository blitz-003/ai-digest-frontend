"use client";
import { useQuery } from "@tanstack/react-query";
import { getDashboardArticles } from "../services/dashboard.service";

export function useDashboardArticles() {
  return useQuery({
    queryKey: ["dashboard-articles"],
    queryFn: getDashboardArticles,
  });
}
