import api from "@/lib/axios";

import { Article, CreateArticlePayload, UpdateArticlePayload } from "../types";

export async function getArticles(params?: any) {
  const response = await api.get<Article[]>("/articles", { params });

  return response.data;
}

export async function getArticle(id: string) {
  const response = await api.get<Article>(`/articles/${id}`);

  return response.data;
}

export async function createArticle(data: CreateArticlePayload) {
  const response = await api.post<Article>("/articles", data);

  return response.data;
}

export async function updateArticle(id: string, data: UpdateArticlePayload) {
  const response = await api.patch<Article>(`/articles/${id}`, data);

  return response.data;
}

export async function deleteArticle(id: string) {
  await api.delete(`/articles/${id}`);
}
