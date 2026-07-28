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
    ? new Date(article.created_at).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  if (isLoading) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-12">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="h-6 w-32 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-3/4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-48 animate-pulse rounded bg-gray-200" />
            <div className="h-80 animate-pulse rounded-2xl bg-gray-100" />
          </div>
        </div>
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold">Article not found</h1>
          <Link
            href="/articles"
            className="mt-4 inline-flex items-center gap-2 text-[#4F8CFF] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to articles
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Cover image */}
      {article.cover_image && (
        <div className="relative h-72 w-full overflow-hidden md:h-96">
          <Image
            src={article.cover_image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      )}

      <div className="container mx-auto px-4 py-10">
        <article className="mx-auto max-w-3xl">
          {/* Back link */}
          <Link
            href="/articles"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All articles
          </Link>

          {/* Category */}
          {categoryName && (
            <div className="mt-6 mb-4">
              <span className="inline-block rounded-full bg-[#7DAAFF]/10 px-3 py-1 text-xs font-medium text-[#7DAAFF]">
                {categoryName}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
            {article.title}
          </h1>

          {/* Summary */}
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {article.summary}
          </p>

          {/* Meta bar */}
          <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-gray-100 pb-6 text-sm text-muted-foreground">
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
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-50">
                <Bookmark className="h-4 w-4" />
              </button>
              <button className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 transition hover:bg-gray-50">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-lg prose-headings:font-bold prose-headings:tracking-tight prose-a:text-[#4F8CFF] prose-img:rounded-2xl max-w-none py-8"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Bottom nav */}
          <div className="border-t border-gray-100 pt-8">
            <Link
              href="/articles"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#4F8CFF] transition-colors hover:gap-3"
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
