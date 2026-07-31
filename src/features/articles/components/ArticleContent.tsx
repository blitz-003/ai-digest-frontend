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
    <main className="min-h-screen bg-canvas">
      {/* Header */}
      <div className="border-b border-hairline bg-canvas">
        <div className="container mx-auto px-4 py-16">
          <p className="label-uppercase text-primary">The feed</p>
          <div className="mt-3 flex items-center gap-3">
            <h1 className="display-lg text-ink">Latest from AI Digest</h1>
          </div>
          <p className="mt-4 text-lg text-body">
            Explore the latest AI news, research, and insights.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Filters */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1 md:max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
            <input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search articles..."
              className="h-11 w-full rounded-lg border border-hairline-strong bg-surface-card pl-10 pr-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="relative">
            <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-body" />
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setPage(1);
              }}
              className="h-11 appearance-none rounded-lg border border-hairline-strong bg-surface-card pl-10 pr-10 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
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
              <div
                key={i}
                className="h-48 animate-pulse rounded-xl bg-surface-strong"
              />
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
          <div className="rounded-xl border border-hairline bg-surface-card py-20 text-center">
            <Newspaper className="mx-auto mb-3 h-12 w-12 text-body" />
            <p className="text-lg font-medium text-ink">No articles found</p>
            <p className="mt-1 text-sm text-body">
              Try adjusting your search or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        {articles && articles.length > 0 && (
          <div className="mt-12 flex items-center justify-center gap-4">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="h-10 rounded-lg border border-hairline-strong bg-surface-card px-5 text-sm font-medium transition hover:bg-canvas-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm text-body">Page {page}</span>
            <button
              disabled={!articles || articles.length < 10}
              onClick={() => setPage(page + 1)}
              className="h-10 rounded-lg border border-hairline-strong bg-surface-card px-5 text-sm font-medium transition hover:bg-canvas-soft disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
