"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Newspaper,
  Sparkles,
  Users,
  Target,
  Heart,
  Globe,
  Rocket,
  CheckCircle,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

const values = [
  {
    title: "Curated Quality",
    description:
      "Every article is hand-picked and reviewed to ensure you only read what matters. No noise, no fluff.",
    icon: Target,
    color: "text-[#4F8CFF]",
    bg: "bg-[#4F8CFF]/10",
  },
  {
    title: "Research First",
    description:
      "We dig into papers, benchmarks, and data so you don't have to. Complex ideas made simple.",
    icon: Brain,
    color: "text-[#34D399]",
    bg: "bg-[#34D399]/10",
  },
  {
    title: "Community Driven",
    description:
      "Built by developers, for developers. Our content reflects what the AI community actually needs.",
    icon: Users,
    color: "text-[#A855F7]",
    bg: "bg-[#A855F7]/10",
  },
  {
    title: "Always Fresh",
    description:
      "The AI world moves fast. We move faster — delivering daily updates on the most important developments.",
    icon: Rocket,
    color: "text-[#4F8CFF]",
    bg: "bg-[#4F8CFF]/10",
  },
];

const milestones = [
  {
    year: "2024",
    title: "Founded",
    description: "AI Digest started as a weekly newsletter for AI enthusiasts.",
  },
  {
    year: "2025",
    title: "Platform Launch",
    description: "Launched the full reading platform with articles, tools, and research.",
  },
  {
    year: "2026",
    title: "Growing Community",
    description: "Reached 10,000+ readers and 500+ curated articles.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-28 bg-white">
        <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#4F8CFF]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] top-[20%] h-[400px] w-[400px] rounded-full bg-[#A855F7]/15 blur-[120px]" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#34D399]/20 bg-[#34D399]/5 px-4 py-2 text-sm font-medium text-[#34D399]"
          >
            <Heart className="h-4 w-4" />
            Our Story
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight md:text-7xl"
          >
            About{" "}
            <span className="bg-gradient-to-r from-[#4F8CFF] via-[#34D399] to-[#A855F7] bg-clip-text text-transparent">
              AI Digest
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            We believe AI knowledge should be accessible, curated, and
            actionable. AI Digest was built to help developers, researchers, and
            founders navigate the rapidly evolving AI landscape.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-28 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-bold md:text-5xl">
                Our{" "}
                <span className="bg-gradient-to-r from-[#4F8CFF] to-[#34D399] bg-clip-text text-transparent">
                  Mission
                </span>
              </h2>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
                The AI landscape is overwhelming. New papers drop daily, tools
                launch every week, and breakthroughs happen monthly. Finding
                signal in the noise is the real challenge.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                AI Digest exists to solve that problem. We read, analyze, and
                summarize the most important AI developments so you can stay
                informed without drowning in information.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 gap-5"
            >
              {[
                { icon: Newspaper, label: "Articles Published", value: "500+", color: "text-[#4F8CFF]" },
                { icon: Globe, label: "Global Readers", value: "10K+", color: "text-[#34D399]" },
                { icon: Sparkles, label: "AI Tools Reviewed", value: "100+", color: "text-[#A855F7]" },
                { icon: Brain, label: "Research Summaries", value: "50+", color: "text-[#4F8CFF]" },
              ].map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-gray-100 bg-white/70 p-6 backdrop-blur-sm"
                  >
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                    <p className={`mt-3 text-3xl font-bold ${stat.color}`}>
                      {stat.value}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold md:text-5xl"
            >
              What We{" "}
              <span className="bg-gradient-to-r from-[#A855F7] to-[#4F8CFF] bg-clip-text text-transparent">
                Believe
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-muted-foreground"
            >
              The principles that guide everything we build and write.
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-16 grid gap-8 md:grid-cols-2"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  className="group rounded-2xl border border-gray-100 bg-white/70 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg"
                >
                  <div
                    className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${value.bg}`}
                  >
                    <Icon className={`h-6 w-6 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold md:text-5xl"
            >
              Our{" "}
              <span className="bg-gradient-to-r from-[#34D399] to-[#A855F7] bg-clip-text text-transparent">
                Journey
              </span>
            </motion.h2>
          </motion.div>

          <div className="relative mt-16 mx-auto max-w-2xl">
            <div className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-[#4F8CFF] via-[#34D399] to-[#A855F7]" />

            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-4 top-1 h-5 w-5 rounded-full border-2 border-[#4F8CFF] bg-white shadow-[0_0_12px_rgba(79,140,255,0.3)]" />
                  <p className="text-sm font-semibold text-[#4F8CFF]">
                    {milestone.year}
                  </p>
                  <h3 className="mt-1 text-xl font-bold">{milestone.title}</h3>
                  <p className="mt-2 text-muted-foreground">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-28">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4F8CFF] via-[#34D399] to-[#A855F7] p-12 text-center text-white shadow-[0_0_60px_rgba(79,140,255,0.2)]"
          >
            <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[300px] w-[300px] rounded-full bg-white/10 blur-[80px]" />
            <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[300px] w-[300px] rounded-full bg-white/10 blur-[80px]" />

            <div className="relative">
              <h2 className="text-4xl font-bold md:text-5xl">
                Join the Community
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-white/80">
                Be part of a growing community that stays ahead in AI. Start
                reading today.
              </p>
              <a
                href="/register"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-3 font-semibold text-gray-900 shadow-lg transition hover:bg-white/90"
              >
                Get Started Free
                <CheckCircle className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
