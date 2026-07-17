import ArticleContent from "@/features/articles/components/ArticleContent";
import { Suspense } from "react";

export default function ArticlesPage() {
  return (
    <Suspense fallback={<div>Loading articles...</div>}>
      <ArticleContent />
    </Suspense>
  );
}
