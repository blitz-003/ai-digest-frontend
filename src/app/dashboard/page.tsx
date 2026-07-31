"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  FileText,
  ArrowRight,
  BookOpen,
  PenLine,
  LayoutDashboard,
} from "lucide-react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/context/AuthContext";
import { useDashboardStats } from "@/features/dashboard/hooks/useDashboardStats";
import { useDashboardArticles } from "@/features/dashboard/hooks/useDashboardArticles";
import { useCategories } from "@/features/categories/hooks/useCategories";

const PIE_COLORS = ["#26251e", "#807d72"];
const BAR_COLOR = "#f54e00";

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: articles, isLoading: articlesLoading } = useDashboardArticles();
  const { data: categories } = useCategories();

  const initials = user?.email?.charAt(0).toUpperCase() ?? "U";

  const statCards = stats
    ? [
        { title: "Total Articles", value: stats.total_articles },
        { title: "Published", value: stats.published_articles },
        { title: "Drafts", value: stats.draft_articles },
      ]
    : [];

  const statusData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: "Published", value: stats.published_articles },
      { name: "Drafts", value: stats.draft_articles },
    ].filter((d) => d.value > 0);
  }, [stats]);

  const categoryData = useMemo(() => {
    if (!articles || !categories) return [];
    const counts: Record<string, number> = {};
    articles.forEach((a) => {
      counts[a.category_id] = (counts[a.category_id] || 0) + 1;
    });
    return Object.entries(counts)
      .map(([id, count]) => {
        const cat = categories.find((c) => c.id === id);
        return { name: cat?.name ?? "Unknown", count };
      })
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);
  }, [articles, categories]);

  return (
    <main className="min-h-screen bg-canvas p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Profile */}
        <Card className="border-hairline bg-surface-card">
          <CardContent className="flex items-center gap-6 pt-6">
            <Avatar className="h-20 w-20">
              <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-normal tracking-tight text-ink">
                {user?.full_name || user?.username || "User"}
              </h1>
              <p className="text-body">{user?.email}</p>
              <div className="mt-3 flex gap-2">
                <Badge className="bg-ink capitalize text-canvas">
                  {user?.role}
                </Badge>
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
                <Card key={i} className="border-hairline bg-surface-card">
                  <CardHeader>
                    <div className="h-4 w-24 animate-pulse rounded bg-surface-strong" />
                  </CardHeader>
                  <CardContent>
                    <div className="h-10 w-16 animate-pulse rounded bg-surface-strong" />
                  </CardContent>
                </Card>
              ))
            : statCards.map((stat) => {
                return (
                  <Card key={stat.title} className="border-hairline bg-surface-card">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-sm font-medium text-body">
                        {stat.title}
                      </CardTitle>
                      <FileText className="h-5 w-5 text-body" />
                    </CardHeader>
                    <CardContent>
                      <p className="font-code text-4xl tracking-tight text-ink">
                        {stat.value}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
        </div>

        {/* Charts */}
        {(statusData.length > 0 || categoryData.length > 0) && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pie Chart — Status Breakdown */}
            {statusData.length > 0 && (
              <Card className="border-hairline bg-surface-card">
                <CardHeader>
                  <CardTitle className="text-base">Article status</CardTitle>
                </CardHeader>
                <CardContent className="flex h-[280px] items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        innerRadius={55}
                        paddingAngle={4}
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {statusData.map((_, index) => (
                          <Cell
                            key={index}
                            fill={PIE_COLORS[index % PIE_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}

            {/* Bar Chart — Articles by Category */}
            {categoryData.length > 0 && (
              <Card className="border-hairline bg-surface-card">
                <CardHeader>
                  <CardTitle className="text-base">
                    Articles by category
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e6e5e0" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        stroke="#807d72"
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                        stroke="#807d72"
                      />
                      <Tooltip />
                      <Bar dataKey="count" fill={BAR_COLOR} radius={[6, 6, 0, 0]}>
                        {categoryData.map((_, index) => (
                          <Cell key={index} fill={BAR_COLOR} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* My Articles */}
        <Card className="border-hairline bg-surface-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-2">
              <LayoutDashboard className="h-5 w-5 text-body" />
              <CardTitle>My articles</CardTitle>
            </div>
            <Link
              href="/write"
              className="flex items-center gap-1 text-sm font-medium text-ink underline-offset-4 transition-colors hover:text-primary hover:underline"
            >
              <PenLine className="h-4 w-4" />
              Write new
            </Link>
          </CardHeader>
          <CardContent>
            {articlesLoading ? (
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-16 animate-pulse rounded-lg bg-surface-strong"
                  />
                ))}
              </div>
            ) : articles && articles.length > 0 ? (
              <div className="space-y-3">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/articles/${article.id}`}
                    className="flex items-center justify-between rounded-lg border border-hairline p-4 transition hover:bg-canvas-soft"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <BookOpen className="h-5 w-5 shrink-0 text-body" />
                      <div className="min-w-0">
                        <h3 className="truncate font-medium text-ink">
                          {article.title}
                        </h3>
                        <p className="text-sm text-primary">
                          {new Date(article.created_at).toLocaleDateString("en-US")} ·{" "}
                          {article.reading_time} min read
                        </p>
                      </div>
                    </div>
                    <div className="flex shrink-0 items-center gap-3">
                      <Badge
                        variant={
                          article.status === "published"
                            ? "default"
                            : "secondary"
                        }
                        className={
                          article.status === "published"
                            ? "bg-semantic-success text-white"
                            : ""
                        }
                      >
                        {article.status}
                      </Badge>
                      <ArrowRight className="h-4 w-4 text-body" />
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="py-12 text-center text-body">
                <FileText className="mx-auto mb-3 h-10 w-10 opacity-30" />
                <p>No articles yet.</p>
                <Link
                  href="/write"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-ink underline-offset-4 transition-colors hover:text-primary hover:underline"
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
