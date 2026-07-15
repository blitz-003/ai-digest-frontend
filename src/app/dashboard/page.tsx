"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const articleData = [
  {
    month: "Jan",
    articles: 5,
  },

  {
    month: "Feb",
    articles: 8,
  },

  {
    month: "Mar",
    articles: 12,
  },

  {
    month: "Apr",
    articles: 18,
  },

  {
    month: "May",
    articles: 25,
  },
];

const categoryData = [
  {
    name: "AI",
    value: 40,
  },

  {
    name: "ML",
    value: 30,
  },

  {
    name: "LLM",
    value: 20,
  },

  {
    name: "Robotics",
    value: 10,
  },
];

const stats = [
  {
    title: "Articles",
    value: "24",
  },

  {
    title: "Views",
    value: "12.5K",
  },

  {
    title: "Likes",
    value: "1.2K",
  },

  {
    title: "Followers",
    value: "540",
  },
];

export default function DashboardPage() {
  return (
    <main
      className="
min-h-screen
bg-slate-50
p-6
"
    >
      <div
        className="
mx-auto
max-w-7xl
space-y-8
"
      >
        {/* PROFILE */}

        <Card
          className="
bg-white
"
        >
          <CardContent
            className="
flex
items-center
gap-6
pt-6
"
          >
            <Avatar
              className="
h-20
w-20
"
            >
              <AvatarFallback
                className="
text-2xl
"
              >
                AI
              </AvatarFallback>
            </Avatar>

            <div>
              <h1
                className="
text-3xl
font-bold
"
              >
                John Doe
              </h1>

              <p
                className="
text-muted-foreground
"
              >
                john@example.com
              </p>

              <div
                className="
mt-3
flex
gap-2
"
              >
                <Badge>Author</Badge>

                <Badge variant="secondary">Premium</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* STATS */}

        <div
          className="
grid
gap-6
md:grid-cols-4
"
        >
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader>
                <CardTitle
                  className="
text-sm
text-muted-foreground
"
                >
                  {stat.title}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <p
                  className="
text-4xl
font-bold
"
                >
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CHARTS */}

        <div
          className="
grid
gap-6
lg:grid-cols-2
"
        >
          <Card>
            <CardHeader>
              <CardTitle>Articles Published</CardTitle>
            </CardHeader>

            <CardContent
              className="
h-[350px]
"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={articleData}>
                  <CartesianGrid strokeDasharray="3 3" />

                  <XAxis dataKey="month" />

                  <YAxis />

                  <Tooltip />

                  <Bar dataKey="articles" fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Article Categories</CardTitle>
            </CardHeader>

            <CardContent
              className="
h-[350px]
"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={120}
                    label
                  >
                    {categoryData.map((item, index) => (
                      <Cell key={index} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
