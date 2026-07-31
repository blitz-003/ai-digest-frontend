import { useQuery } from "@tanstack/react-query";

import {
  getArticles,
  type ArticleQueryParams,
} from "../api/article.api";

export function useArticles(params?: ArticleQueryParams) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => getArticles(params),
    staleTime: 0,
    refetchOnMount: true,
  });
}
