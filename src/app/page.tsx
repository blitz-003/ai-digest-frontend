"use client";

import Link from "next/link";

import {
  Sparkles,
  Brain,
  Newspaper,
  Rocket,
  Users,
  CheckCircle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const features = [
  {
    title: "AI News",
    description:
      "Stay updated with important AI announcements, releases, and industry movements.",
    icon: Newspaper,
  },
  {
    title: "Research Explained",
    description:
      "Complex AI papers simplified for developers and technology enthusiasts.",
    icon: Brain,
  },
  {
    title: "AI Tools",
    description:
      "Discover useful AI tools that improve productivity and workflows.",
    icon: Sparkles,
  },
];

const categories = [
  "Artificial Intelligence",
  "Machine Learning",
  "Large Language Models",
  "AI Startups",
  "Robotics",
  "AI Tools",
];

const stats = [
  {
    value: "10K+",
    label: "Readers",
  },
  {
    value: "500+",
    label: "Articles",
  },
  {
    value: "100+",
    label: "AI Tools",
  },
  {
    value: "50+",
    label: "Research Summaries",
  },
];

const audiences = ["Developers", "Researchers", "Startup Founders"];

const testimonials = [
  {
    quote:
      "AI Digest saves me hours every week by summarizing the most important AI developments.",
    role: "Software Engineer",
  },
  {
    quote:
      "A great place to understand where artificial intelligence is heading.",
    role: "Startup Founder",
  },
];

export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section
        className="
        relative
        min-h-[calc(100vh-4rem)]
        overflow-hidden
        bg-white
        flex
        items-center
        "
      >
        {/* AI SaaS background glow */}

        <div
          className="
          pointer-events-none
          absolute
          left-[-10%]
          top-[-20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-200/30
          blur-3xl
          "
        />

        <div
          className="
          pointer-events-none
          absolute
          right-[-15%]
          top-[20%]
          h-[450px]
          w-[450px]
          rounded-full
          bg-cyan-200/20
          blur-3xl
          "
        />

        <div
          className="
          pointer-events-none
          absolute
          bottom-[-20%]
          left-[35%]
          h-[350px]
          w-[350px]
          rounded-full
          bg-purple-200/20
          blur-3xl
          "
        />

        {/* grid */}

        <div
          className="
          absolute
          inset-0
          bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)]
          bg-[size:48px_48px]
          "
        />

        <div
          className="
          relative
          container
          mx-auto
          px-4
          py-32
          text-center
          "
        >
          <div
            className="
            mx-auto
            max-w-4xl
            "
          >
            <h1
              className="
              text-5xl
              font-bold
              tracking-tight
              md:text-7xl
              "
            >
              Understand AI.
              <br />
              Stay Ahead of Innovation.
            </h1>

            <p
              className="
              mx-auto
              mt-6
              max-w-2xl
              text-lg
              text-muted-foreground
              "
            >
              AI Digest brings you curated AI news, research explanations, and
              practical AI tools in one modern knowledge platform.
            </p>

            <div
              className="
              mt-8
              flex
              justify-center
              gap-4
              "
            >
              <Button size="lg">
                <Link href="/register">Start Reading</Link>
              </Button>

              <Button size="lg" variant="outline">
                <Link href="/articles">Explore Articles</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section className="container mx-auto px-4 py-24">
        <h2 className="text-center text-4xl font-bold">
          Everything AI In One Place
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="transition hover:-translate-y-1"
              >
                <CardHeader>
                  <Icon
                    className="
                    h-8
                    w-8
                    text-blue-600
                    "
                  />

                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>

                <CardContent>{feature.description}</CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CATEGORIES */}

      <section className="border-y bg-slate-50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">Explore AI Categories</h2>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map((category) => (
              <div
                key={category}
                className="
                rounded-full
                border
                bg-white
                px-5
                py-2
                text-sm
                shadow-sm
                "
              >
                {category}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATISTICS */}

      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-6 md:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label}>
              <CardContent className="pt-8 text-center">
                <h3 className="text-4xl font-bold">{stat.value}</h3>

                <p className="mt-2 text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SERVICES */}

      <section className="bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold">
            Built For Everyone Exploring AI
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {audiences.map((item) => (
              <Card key={item}>
                <CardContent className="pt-8">
                  <Users
                    className="
                    mb-4
                    h-8
                    w-8
                    text-blue-600
                    "
                  />

                  <h3 className="font-bold">{item}</h3>

                  <p className="mt-2 text-sm text-muted-foreground">
                    Access AI knowledge designed for your workflow.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* WHY AI DIGEST */}

      <section className="container mx-auto px-4 py-24">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-4xl font-bold">Why AI Digest?</h2>

            <p className="mt-5 text-muted-foreground">
              We combine AI news, research, and practical tools into one clean
              knowledge platform.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Curated AI information",
              "Developer focused content",
              "Startup and tool discovery",
              "Research summaries",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle
                  className="
                  h-5
                  w-5
                  text-blue-600
                  "
                />

                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}

      <section className="border-y bg-slate-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold">What Readers Say</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {testimonials.map((item) => (
              <Card key={item.role}>
                <CardContent className="pt-8">
                  <p>{item.quote}</p>

                  <p className="mt-5 font-semibold">{item.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="container mx-auto px-4 py-24">
        <div
          className="
          rounded-3xl
          border
          bg-black
          p-10
          text-center
          text-white
          "
        >
          <Rocket
            className="
            mx-auto
            h-10
            w-10
            "
          />

          <h2 className="mt-5 text-4xl font-bold">Start Your AI Journey</h2>

          <p className="mt-4 text-white/70">
            Join AI Digest and stay ahead of the AI revolution.
          </p>

          <Button
            className="
            mt-8
            bg-white
            text-black
            hover:bg-white/90
            "
          >
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
