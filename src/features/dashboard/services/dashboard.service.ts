import api from "@/lib/axios";
import { API } from "@/constants/api";
import { User } from "@/features/auth/types/auth";
import { Article } from "@/features/articles/types";

export interface DashboardStats {
  total_articles: number;
  published_articles: number;
  draft_articles: number;
}

export async function getDashboardProfile() {
  const response = await api.get<User>(API.DASHBOARD.PROFILE);
  return response.data;
}

export async function getDashboardStats() {
  const response = await api.get<DashboardStats>(API.DASHBOARD.STATS);
  return response.data;
}

export async function getDashboardArticles() {
  const response = await api.get<Article[]>(API.DASHBOARD.ARTICLES);
  return response.data;
}
