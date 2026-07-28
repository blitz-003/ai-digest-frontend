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

const statIcons = [FileText, FileText, FileText];
const statColors = ["text-[#4F8CFF]", "text-[#34D399]", "text-[#A855F7]"];
const statBorders = [
  "border-[#4F8CFF]/20",
  "border-[#34D399]/20",
  "border-[#A855F7]/20",
];

const PIE_COLORS = ["#34D399", "#C084FC"];
const BAR_COLORS = ["#4F8CFF", "#34D399", "#A855F7", "#7DAAFF", "#6EE7B7", "#C084FC"];

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

        {/* Charts */}
        {(statusData.length > 0 || categoryData.length > 0) && (
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Pie Chart — Status Breakdown */}
            {statusData.length > 0 && (
              <Card className="border-gray-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base">Article Status</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-[280px]">
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
              <Card className="border-gray-100 bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-base">Articles by Category</CardTitle>
                </CardHeader>
                <CardContent className="h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <YAxis
                        allowDecimals={false}
                        tick={{ fontSize: 12 }}
                        tickLine={false}
                      />
                      <Tooltip />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                        {categoryData.map((_, index) => (
                          <Cell
                            key={index}
                            fill={BAR_COLORS[index % BAR_COLORS.length]}
                          />
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
