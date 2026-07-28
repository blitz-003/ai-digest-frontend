"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Tag, Newspaper } from "lucide-react";
import { useArticles } from "@/features/articles/hooks/useArticles";
import { useCategories } from "@/features/categories/hooks/useCategories";
import ArticleCard from "@/features/articles/components/ArticleCard";

function useDebounce(value: string, delay = 500) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function ArticleContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initialSearch = searchParams.get("search") ?? "";
  const initialCategory = searchParams.get("category_id") ?? "";
  const initialPage = Number(searchParams.get("page") ?? 1);

  const [search, setSearch] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(initialPage);

  const debouncedSearch = useDebounce(search);
  const { data: categories } = useCategories();

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (category) params.set("category_id", category);
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    router.replace(query ? `/articles?${query}` : "/articles");
  }, [debouncedSearch, category, page, router]);

  const { data: articles, isLoading } = useArticles({
    page,
    limit: 10,
    search: debouncedSearch || undefined,
    category_id: category || undefined,
  });

  const getCategoryName = (categoryId: string) =>
    categories?.find((c) => c.id === categoryId)?.name ?? "";

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-2">
            <Newspaper className="h-6 w-6 text-[#4F8CFF]" />
            <h1 className="text-4xl font-bold tracking-tight">News Feed</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Explore the latest AI news, research, and insights.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#4F8CFF] focus:ring-2 focus:ring-[#4F8CFF]/20"
            />
          </div>

          <div className="relative">
            <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="h-11 appearance-none rounded-xl border border-gray-200 bg-white pl-10 pr-10 text-sm outline-none transition focus:border-[#4F8CFF] focus:ring-2 focus:ring-[#4F8CFF]/20"
            >
              <option value="">All Categories</option>
              {categories?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-48 animate-pulse rounded-2xl bg-gray-100" />
            ))}
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="space-y-6">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                categoryName={getCategoryName(article.category_id)}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-100 bg-white py-20 text-center">
            <Newspaper className="mx-auto mb-3 h-12 w-12 opacity-20" />
            <p className="text-lg font-medium">No articles found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        {articles && articles.length > 0 && (
          <div className="mt-10 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="h-10 rounded-xl border border-gray-200 bg-white px-5 text-sm font-medium transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-muted-foreground">
              Page {page}
            </span>
            <button
              disabled={!articles || articles.length < 10}
              onClick={() => setPage(page + 1)}
              className="h-10 rounded-xl border border-gray-200 bg-white px-5 text-sm font-medium transition hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
