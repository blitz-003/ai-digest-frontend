import api from "@/lib/axios";

import { API } from "@/constants/api";

import { CreateArticleSchema } from "../validation/createArticle.schema";

export const createArticle = async (
  data: CreateArticleSchema
) => {
  const response = await api.post(
    API.ARTICLES.CREATE,
    data
  );

  return response.data;
};