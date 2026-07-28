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
  const date = new Date(article.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg">
      <div className="flex flex-col md:flex-row">
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
          <div className="flex h-48 w-full shrink-0 items-center justify-center bg-gradient-to-br from-[#4F8CFF]/5 to-[#A855F7]/5 md:h-auto md:w-72">
            <span className="text-5xl font-bold text-gray-100">
              {article.title.charAt(0)}
            </span>
          </div>
        )}

        {/* Content */}
        <div className="flex flex-1 flex-col p-6">
          {/* Category tag */}
          {categoryName && (
            <div className="mb-3">
              <span className="inline-block rounded-full bg-[#7DAAFF]/10 px-3 py-1 text-xs font-medium text-[#7DAAFF]">
                {categoryName}
              </span>
            </div>
          )}

          <h2 className="line-clamp-2 text-xl font-bold leading-tight group-hover:text-[#4F8CFF] transition-colors">
            {article.title}
          </h2>

          <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {article.summary}
          </p>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
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
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#4F8CFF] transition-colors hover:gap-2.5"
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
