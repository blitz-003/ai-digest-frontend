"use client";

import Link from "next/link";
import { Eye, Clock3, CalendarDays, Star, ArrowRight } from "lucide-react";

import { Article } from "../types";

export default function ArticleCard({ article }: { article: Article }) {
  const date = new Date(article.created_at).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article
      className="
        flex
        h-full
        flex-col
        rounded-2xl
        border
        bg-white
        p-6
        shadow-sm
        transition-all
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      {article.is_featured && (
        <div className="mb-4 flex">
          <span
            className="
              inline-flex
              items-center
              gap-1
              rounded-full
              bg-yellow-100
              px-3
              py-1
              text-xs
              font-medium
              text-yellow-700
            "
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            Featured
          </span>
        </div>
      )}

      <h2
        className="
          line-clamp-2
          break-words
          text-2xl
          font-bold
          leading-tight
        "
      >
        {article.title}
      </h2>

      <p
        className="
          mt-4
          line-clamp-3
          flex-1
          break-words
          text-sm
          text-muted-foreground
        "
      >
        {article.summary}
      </p>

      <div
        className="
    mt-6
    flex
    flex-wrap
    gap-3
    text-xs
    font-medium
  "
      >
        <div
          className="
      flex
      items-center
      gap-2
      rounded-full
      border
      border-blue-200/30
      bg-blue-200/20
      px-3
      py-2
      text-blue-700
    "
        >
          <Eye className="h-4 w-4" />
          <span>{article.view_count} views</span>
        </div>

        <div
          className="
      flex
      items-center
      gap-2
      rounded-full
      border
      border-cyan-200/30
      bg-cyan-200/20
      px-3
      py-2
      text-cyan-700
    "
        >
          <Clock3 className="h-4 w-4" />
          <span>{article.reading_time} min read</span>
        </div>

        <div
          className="
      flex
      items-center
      gap-2
      rounded-full
      border
      border-purple-200/30
      bg-purple-200/20
      px-3
      py-2
      text-purple-700
    "
        >
          <CalendarDays className="h-4 w-4" />
          <span>{date}</span>
        </div>
      </div>

      <Link
        href={`/articles/${article.id}`}
        className="
          mt-6
          inline-flex
          items-center
          gap-2
          font-medium
          text-primary
          transition-colors
          hover:gap-3
        "
      >
        Read More
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
