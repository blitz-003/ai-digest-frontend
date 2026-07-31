"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Eye,
  Clock,
  CalendarDays,
  Bookmark,
  Share2,
} from "lucide-react";
import { useArticle } from "@/features/articles/hooks/useArticle";
import { useCategories } from "@/features/categories/hooks/useCategories";

export default function ArticlePage() {
  const params = useParams();
  const id = params.articleId as string;
  const { data: article, isLoading } = useArticle(id);
  const { data: categories } = useCategories();

  const categoryName = categories?.find(
    (c) => c.id === article?.category_id,
  )?.name;

  const date = article
    ? new Date(article.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  if (isLoading) {
    return (
      <main className="min-h-screen bg-canvas">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="h-6 w-32 animate-pulse rounded bg-surface-strong" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-surface-strong" />
            <div className="h-4 w-48 animate-pulse rounded bg-surface-strong" />
            <div className="h-80 animate-pulse rounded-xl bg-surface-strong" />
          </div>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-canvas">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-normal tracking-tight text-ink">
            Article not found
          </h1>
          <Link
            href="/articles"
            className="mt-4 inline-flex items-center gap-2 text-ink underline-offset-4 transition-colors hover:text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to articles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-canvas">
      <div className="container mx-auto min-w-0 px-4 py-10">
        <article className="mx-auto min-w-0 max-w-3xl">
          {/* Cover image */}
          {article.cover_image ? (
            <div className="relative mb-10 h-72 w-full overflow-hidden rounded-xl md:h-96">
              <Image
                src={article.cover_image}
                alt={article.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          ) : (
            <div className="mb-10 h-72 w-full rounded-xl bg-linear-to-br from-primary to-canvas md:h-96" />
          )}

          {/* Back link */}
          <Link
            href="/articles"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          {/* Category */}
          {categoryName && (
            <div className="mb-4 mt-6">
              <span className="inline-block rounded-full bg-surface-strong px-3 py-1 label-uppercase text-primary">
                {categoryName}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-4xl font-normal leading-tight tracking-tight text-ink md:text-5xl">
            {article.title}
          </h1>

          {/* Summary */}
          <p className="mt-5 text-lg leading-relaxed text-body">
            {article.summary}
          </p>

          {/* Meta bar */}
          <div className="mt-8 flex flex-wrap items-center gap-5 border-b border-hairline pb-6 text-sm text-primary">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              {article.reading_time} min read
            </span>
            <span className="flex items-center gap-1.5">
              <Eye className="h-4 w-4" />
              {article.view_count} views
            </span>
            <div className="ml-auto flex items-center gap-3">
              <button
                aria-label="Bookmark"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline transition hover:bg-canvas-soft"
              >
                <Bookmark className="h-4 w-4" />
              </button>
              <button
                aria-label="Share"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-hairline transition hover:bg-canvas-soft"
              >
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose max-w-none overflow-x-hidden py-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Bottom nav */}
          <div className="border-t border-hairline pt-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:gap-3 hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
