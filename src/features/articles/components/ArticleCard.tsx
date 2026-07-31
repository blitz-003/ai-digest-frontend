"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, Clock, CalendarDays, ArrowRight } from "lucide-react";
import { Article } from "../types";

interface Props {
  article: Article;
  categoryName?: string;
}

export default function ArticleCard({ article, categoryName }: Props) {
  const date = new Date(article.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-xl border border-hairline bg-surface-card transition-colors hover:border-hairline-strong">
      <div className="flex min-w-0 flex-col md:flex-row">
        {/* Cover image */}
        {article.cover_image ? (
          <div className="relative h-56 w-full shrink-0 overflow-hidden md:h-auto md:w-72">
            <Image
              src={article.cover_image}
              alt={article.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="h-48 w-full shrink-0 bg-linear-to-br from-primary to-canvas md:h-auto md:w-72" />
        )}

        {/* Content */}
        <div className="flex min-w-0 flex-1 flex-col p-6">
          {/* Category tag */}
          {categoryName && (
            <div className="mb-3">
              <span className="inline-block rounded-full bg-surface-strong px-3 py-1 label-uppercase text-primary">
                {categoryName}
              </span>
            </div>
          )}

          <h2 className="line-clamp-2 text-xl font-semibold leading-tight tracking-tight text-ink">
            {article.title}
          </h2>

          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-body">
            {article.summary}
          </p>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-primary">
            <span className="flex items-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              {article.view_count} views
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {article.reading_time} min read
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="h-3.5 w-3.5" />
              {date}
            </span>
          </div>

          {/* Read more */}
          <div className="mt-4">
            <Link
              href={`/articles/${article.id}`}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors group-hover:text-primary"
            >
              Read article
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
