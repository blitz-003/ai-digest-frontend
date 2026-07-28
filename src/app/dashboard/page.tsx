"use client";

import Link from "next/link";
import {
  FileText,
  Eye,
  Clock,
  ArrowRight,
  BookOpen,
  PenLine,
  LayoutDashboard,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { useDashboardArticles } from "@/features/dashboard/hooks/useDashboardArticles";

const statIcons = [FileText, Eye, Clock];
const statColors = ["text-[#4F8CFF]", "text-[#34D399]", "text-[#A855F7]"];
const statBorders = ["border-[#4F8CFF]/20", "border-[#34D399]/20", "border-[#A855F7]/20"];

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: articles, isLoading: articlesLoading } = useDashboardArticles();

  const initials = user?.email?.charAt(0).toUpperCase() ?? "U";

  const statCards = stats
    ? [
        { title: "Total Articles", value: stats.total_articles },
        { title: "Published", value: stats.published_articles },
        { title: "Drafts", value: stats.draft_articles },
      ]
    : [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50/50 to-white p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Profile */}
        <Card className="border-gray-100 bg-white/80 backdrop-blur-sm">
          <CardContent className="flex items-center gap-6 pt-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold">
                {user?.full_name || user?.username || "User"}
              </h1>
              <p className="text-muted-foreground">{user?.email}</p>
              <div className="mt-3 flex gap-2">
                <Badge className="bg-[#4F8CFF] capitalize">{user?.role}</Badge>
                {user?.is_premium && (
                  <Badge variant="secondary">Premium</Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3">
          {statsLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="border-gray-100 bg-white/80">
                  <CardHeader>
                    <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-10 w-16 animate-pulse rounded bg-gray-200" />
                  </CardContent>
                </Card>
              ))
            : statCards.map((stat, i) => {
                const Icon = statIcons[i];
                return (
                  <Card
                    key={stat.title}
                    className={`border-gray-100 bg-white/80 backdrop-blur-sm ${statBorders[i]}`}
                  >
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-sm text-muted-foreground">
                        {stat.title}
                      </CardTitle>
                      <Icon className={`h-5 w-5 ${statColors[i]}`} />
                    </CardHeader>
                    <CardContent>
                      <p className={`text-4xl font-bold ${statColors[i]}`}>
                        {stat.value}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
        </div>

        {/* My Articles */}
        <Card className="border-gray-100 bg-white/80 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-[#4F8CFF]" />
              <CardTitle>My Articles</CardTitle>
            </div>
            <Link
              href="/write"
              className="flex items-center gap-1 text-sm font-medium text-[#4F8CFF] hover:underline"
            >
              <PenLine className="h-4 w-4" />
              Write New
            </Link>
          </CardHeader>
          <CardContent>
            {articlesLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="h-16 animate-pulse rounded-lg bg-gray-100" />
                ))}
              </div>
            ) : articles && articles.length > 0 ? (
              <div className="space-y-3">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="flex items-center justify-between rounded-lg border border-gray-100 p-4 transition hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <BookOpen className="h-5 w-5 shrink-0 text-muted-foreground" />
                      <div>
                        <h3 className="font-medium">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {new Date(article.created_at).toLocaleDateString()} ·{" "}
                          {article.reading_time} min read
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          article.status === "published" ? "default" : "secondary"
                        }
                        className={
                          article.status === "published"
                            ? "bg-[#34D399] text-white"
                            : ""
                        }
                      >
                        {article.status}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-muted-foreground">
                <FileText className="mx-auto mb-3 h-10 w-10 opacity-30" />
                <p>No articles yet.</p>
                <Link
                  href="/write"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-[#4F8CFF] hover:underline"
                >
                  Write your first article
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
