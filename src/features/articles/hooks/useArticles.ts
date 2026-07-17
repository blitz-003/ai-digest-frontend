import { useQuery } from "@tanstack/react-query";

import { getArticles } from "../api/article.api";

export function useArticles(params?: any) {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: async () => {
      console.log("FETCHING ARTICLES");
      return getArticles(params);
    },
  });
}
