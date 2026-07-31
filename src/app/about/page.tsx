"use client";

import { motion } from "framer-motion";
import {
  Target,
  Brain,
  Users,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const values = [
  {
    title: "Curated Quality",
    description:
      "Every piece is hand-picked and reviewed before it ships. We'd rather publish one sharp brief than ten forgettable ones.",
    icon: Target,
  },
  {
    title: "Research First",
    description:
      "We go straight to papers, benchmarks, and data so you don't have to. Complex ideas, made simple.",
    icon: Brain,
  },
  {
    title: "Community Driven",
    description:
      "Built by people who ship. Our coverage follows what the AI community actually needs, not what's loudest.",
    icon: Users,
  },
  {
    title: "Always Fresh",
    description:
      "The field moves fast, so we move fast too — daily updates on the developments that matter most.",
    icon: Rocket,
  },
];

const stats = [
  { label: "Articles published", value: "500+" },
  { label: "Global readers", value: "10K+" },
  { label: "AI tools reviewed", value: "100+" },
  { label: "Research briefs", value: "50+" },
];

const milestones = [
  {
    year: "2024",
    title: "Founded",
    description:
      "AI Digest started as a weekly newsletter for a small group of AI enthusiasts.",
  },
  {
    year: "2025",
    title: "Platform launch",
    description:
      "We shipped the full reading platform — articles, tools, research, and categories.",
  },
  {
    year: "2026",
    title: "Growing community",
    description:
      "Crossed 10,000 readers and 500 curated articles, with a daily cadence.",
  },
];

export default function AboutPage() {
  return (
    <main className="overflow-x-clip">
      {/* HERO */}
      <section className="border-b border-hairline bg-canvas">
        <div className="container mx-auto px-4 py-24 text-center md:py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="mx-auto mb-8 inline-flex items-center rounded-full border border-hairline bg-surface-card px-4 py-1.5 label-uppercase text-primary"
            >
              Our story
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="display-mega text-ink"
            >
              About AI Digest
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-body"
            >
              We believe AI knowledge should be accessible, curated, and
              actionable. AI Digest helps developers, researchers, and founders
              navigate a field that changes every single day.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* MISSION */}
      <section className="bg-canvas-soft py-20">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="label-uppercase text-primary">Our mission</p>
              <h2 className="mt-4 display-lg text-ink">
                Finding signal in the noise
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-body">
                The AI landscape is overwhelming. Papers drop daily, tools
                launch every week, and breakthroughs happen monthly. The real
                challenge isn&apos;t finding information — it&apos;s finding the
                information that matters.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-body">
                AI Digest exists to solve that problem. We read, analyze, and
                summarize the most important AI developments so you can stay
                informed without drowning in feeds.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="grid grid-cols-2 gap-5"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="rounded-xl border border-hairline bg-surface-card p-7"
                >
                  <p className="font-code text-3xl tracking-tight text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-sm text-body">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="bg-canvas py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <motion.p variants={fadeUp} className="label-uppercase text-primary">
              What we believe
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 display-lg text-ink"
            >
              Principles behind the work
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-6 md:grid-cols-2"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeUp}
                  className="rounded-xl border border-hairline bg-surface-card p-8 transition-colors hover:border-hairline-strong"
                >
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-surface-strong">
                    <Icon className="h-5 w-5 text-ink" />
                  </div>
                  <h3 className="text-lg font-semibold text-ink">
                    {value.title}
                  </h3>
                  <p className="mt-3 leading-relaxed text-body">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="border-t border-hairline bg-canvas-soft py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center"
          >
            <motion.p variants={fadeUp} className="label-uppercase text-primary">
              Timeline
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 display-lg text-ink"
            >
              Our journey
            </motion.h2>
          </motion.div>

          <div className="relative mx-auto mt-16 max-w-2xl">
            <div className="absolute left-6 top-0 h-full w-px bg-hairline" />
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-4 top-1.5 h-5 w-5 rounded-full border-2 border-ink bg-surface-card" />
                  <p className="font-code text-sm text-muted">
                    {milestone.year}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-ink">
                    {milestone.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-body">
                    {milestone.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
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
            <h2 className="display-lg text-ink">Join the community</h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-body">
              Be part of a growing group of readers who stay ahead in AI. Start
              reading today.
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
