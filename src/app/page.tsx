"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Newspaper,
  Brain,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const features = [
  {
    title: "AI News",
    description:
      "Timely, sourced coverage of releases, funding rounds, and policy — filed without hype or filler.",
    icon: Newspaper,
  },
  {
    title: "Research Explained",
    description:
      "We read the papers and benchmarks so you don't have to. Complex ideas, written plainly.",
    icon: Brain,
  },
  {
    title: "AI Tools",
    description:
      "Hands-on reviews of the tools shaping how builders work, from coding agents to observability.",
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
  "Computer Vision",
  "NLP",
];

const stats = [
  { value: "10K+", label: "Readers" },
  { value: "500+", label: "Articles" },
  { value: "100+", label: "AI Tools" },
  { value: "50+", label: "Research briefs" },
];

const briefLines = [
  "Qwen-3.5 ships a 9B model that beats 70B-class latency",
  "Sparse attention cuts long-context inference cost by 40%",
  "Tool of the week: agent-native observability",
  "Startup watch: synthetic-data vendor closes Series B",
];

const testimonials = [
  {
    quote:
      "AI Digest saves me hours every week. It reads the papers so I don't have to.",
    role: "Software Engineer",
    company: "TechCorp",
  },
  {
    quote:
      "The single best place to understand where artificial intelligence is actually heading.",
    role: "Startup Founder",
    company: "AI Labs",
  },
  {
    quote:
      "Finally, research summaries I can actually use. The signal-to-noise ratio is unreal.",
    role: "ML Engineer",
    company: "DeepMind",
  },
];

export default function HomePage() {
  return (
    <main className="overflow-x-clip">
      {/* HERO */}
      <section className="relative border-b border-hairline bg-canvas">
        <div className="container mx-auto px-4 pb-20 pt-24 text-center md:pt-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto max-w-4xl"
          >
            <motion.p
              variants={fadeUp}
              className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-hairline bg-surface-card px-4 py-1.5 label-uppercase text-primary"
            >
              The daily intelligence briefing
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="display-mega text-ink"
            >
              Understand AI.
              <br />
              Stay ahead.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-body"
            >
              AI Digest distills the day&apos;s most important AI developments
              into one clean brief — research explained, tools reviewed, and
              trends you can actually use.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button size="lg" className="h-11 px-6">
                <Link href="/register" className="flex items-center gap-2">
                  Start reading
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="h-11 border border-hairline-strong bg-surface-card px-6 text-ink hover:bg-canvas-soft"
              >
                <Link href="/articles">Browse the archive</Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Editorial mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mx-auto mt-20 max-w-2xl overflow-hidden rounded-xl border border-hairline bg-surface-card text-left"
          >
            <div className="flex items-center gap-1.5 border-b border-hairline px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-hairline-strong" />
              <span className="ml-3 font-code text-xs text-muted-soft">
                digest — daily brief
              </span>
            </div>
            <div className="space-y-3 p-6 font-code text-[13px] leading-relaxed text-body">
              {briefLines.map((line, i) => (
                <div key={line} className="flex gap-4">
                  <span className="shrink-0 text-muted-soft">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{line}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="bg-canvas-soft py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <motion.p variants={fadeUp} className="label-uppercase text-primary">
              What you get
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 display-lg text-ink"
            >
              Everything AI, in one place
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 text-lg text-body">
              From breaking news to deep research, we curate the AI landscape
              so you can focus on building.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className="rounded-xl border border-hairline bg-surface-card p-8 transition-colors hover:border-hairline-strong"
                >
                  <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-md bg-surface-strong">
                    <Icon className="h-5 w-5 text-ink" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink">
                    {feature.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-body">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="border-y border-hairline bg-canvas py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.p variants={fadeUp} className="label-uppercase text-primary">
              Browse by topic
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 display-md text-ink"
            >
              Explore the categories
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <motion.span
                key={category}
                variants={fadeUp}
                className="rounded-full border border-hairline bg-surface-card px-4 py-1.5 label-uppercase text-primary transition-colors hover:border-hairline-strong hover:text-ink"
              >
                {category}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-canvas-soft py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="label-uppercase text-primary"
              >
                Trusted by thousands
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 display-lg text-ink"
              >
                A growing community of people who read AI closely
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 text-lg leading-relaxed text-body"
              >
                Developers, researchers, and founders rely on AI Digest daily to
                stay current — without drowning in feeds and papers.
              </motion.p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-xl border border-hairline bg-surface-card p-8"
                >
                  <p className="font-code text-3xl tracking-tight text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-body">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="border-y border-hairline bg-canvas py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="label-uppercase text-primary"
              >
                Why AI Digest
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-4 display-lg text-ink"
              >
                Signal, not noise
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-5 text-lg leading-relaxed text-body"
              >
                We combine AI news, research, and practical tools into one
                clean knowledge platform — designed for people who build the
                future.
              </motion.p>
            </div>

            <div className="space-y-5">
              {[
                "Curated from primary sources — papers, releases, and developer threads",
                "Written for people who ship — no padding, no SEO fluff",
                "Daily cadence and a weekly digest, with zero noise",
                "Research summaries you can actually apply",
                "A clean, distraction-free reading experience",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-semantic-success/10">
                    <Check className="h-3.5 w-3.5 text-semantic-success" />
                  </span>
                  <span className="leading-relaxed text-body">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="bg-canvas-soft py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <motion.p variants={fadeUp} className="label-uppercase text-primary">
              What readers say
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 display-lg text-ink"
            >
              From the reading room
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-3"
          >
            {testimonials.map((item) => (
              <motion.blockquote
                key={item.role}
                variants={fadeUp}
                className="rounded-xl border border-hairline bg-surface-card p-8"
              >
                <p className="leading-relaxed text-body">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="mt-6">
                  <p className="font-semibold text-ink">{item.role}</p>
                  <p className="text-sm text-muted">{item.company}</p>
                </footer>
              </motion.blockquote>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-hairline bg-canvas py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="display-lg text-ink">Stay ahead of the curve</h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-body">
              Join thousands of developers, researchers, and founders who read
              AI Digest to stay informed.
            </p>
            <Button size="lg" className="mt-9 h-11 px-7">
              <Link href="/register" className="flex items-center gap-2">
                Get started free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
