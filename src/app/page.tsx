"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  Sparkles,
  Brain,
  Newspaper,
  Rocket,
  CheckCircle,
  ArrowRight,
  Zap,
  Globe,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function AnimatedSection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ParallaxSection({
  children,
  className = "",
  speed = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60 * speed * -1, 60 * speed]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

const features = [
  {
    title: "AI News",
    description:
      "Stay updated with important AI announcements, releases, and industry movements delivered in real-time.",
    icon: Newspaper,
    color: "from-[#4F8CFF] to-[#6BA3FF]",
    glow: "shadow-[0_0_40px_rgba(79,140,255,0.25)]",
  },
  {
    title: "Research Explained",
    description:
      "Complex AI papers simplified into actionable insights for developers and technology enthusiasts.",
    icon: Brain,
    color: "from-[#34D399] to-[#6EE7B7]",
    glow: "shadow-[0_0_40px_rgba(52,211,153,0.25)]",
  },
  {
    title: "AI Tools",
    description:
      "Discover useful AI tools and platforms that improve productivity and supercharge your workflows.",
    icon: Sparkles,
    color: "from-[#A855F7] to-[#C084FC]",
    glow: "shadow-[0_0_40px_rgba(168,85,247,0.25)]",
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
  { value: "50+", label: "Research Summaries" },
];

const audiences = [
  {
    title: "Developers",
    description: "Access AI knowledge designed for your engineering workflow.",
    icon: Zap,
    color: "text-[#4F8CFF]",
  },
  {
    title: "Researchers",
    description: "Stay current with the latest AI papers and breakthroughs.",
    icon: Globe,
    color: "text-[#34D399]",
  },
  {
    title: "Startup Founders",
    description: "Discover AI tools and trends to scale your business.",
    icon: Shield,
    color: "text-[#A855F7]",
  },
];

const testimonials = [
  {
    quote:
      "AI Digest saves me hours every week by summarizing the most important AI developments.",
    role: "Software Engineer",
    company: "TechCorp",
  },
  {
    quote:
      "A great place to understand where artificial intelligence is heading. Essential reading.",
    role: "Startup Founder",
    company: "AI Labs",
  },
  {
    quote:
      "The research summaries are incredible. Finally, papers I can actually use.",
    role: "ML Engineer",
    company: "DeepMind",
  },
];

export default function HomePage() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="overflow-hidden">
      {/* HERO */}
      <section
        ref={heroRef}
        className="relative min-h-[calc(100vh-4rem)] overflow-hidden bg-white flex items-center"
      >
        {/* Glowing orbs — brighter primary colors */}
        <motion.div
          style={{ y: heroY }}
          className="pointer-events-none absolute left-[-10%] top-[-20%] h-[600px] w-[600px] rounded-full bg-[#4F8CFF]/25 blur-[120px]"
        />
        <motion.div
          style={{ y: heroY }}
          className="pointer-events-none absolute right-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-[#34D399]/20 blur-[120px]"
        />
        <motion.div
          style={{ y: heroY }}
          className="pointer-events-none absolute bottom-[-10%] left-[30%] h-[450px] w-[450px] rounded-full bg-[#A855F7]/20 blur-[120px]"
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000004_1px,transparent_1px),linear-gradient(to_bottom,#00000004_1px,transparent_1px)] bg-[size:60px_60px]" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative container mx-auto px-4 py-32 text-center"
        >
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#4F8CFF]/20 bg-[#4F8CFF]/5 px-4 py-2 text-sm font-medium text-[#4F8CFF]"
            >
              <Sparkles className="h-4 w-4" />
              Your AI Knowledge Hub
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl"
            >
              Understand AI.
              <br />
              <span className="bg-gradient-to-r from-[#4F8CFF] via-[#34D399] to-[#A855F7] bg-clip-text text-transparent">
                Stay Ahead.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
            >
              AI Digest brings you curated AI news, research explanations, and
              practical AI tools in one modern knowledge platform.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
              <Button
                size="lg"
                className="group bg-gradient-to-r from-[#4F8CFF] to-[#6BA3FF] text-white shadow-[0_0_30px_rgba(79,140,255,0.3)] hover:shadow-[0_0_50px_rgba(79,140,255,0.5)] transition-shadow"
              >
                <Link href="/register" className="flex items-center gap-2">
                  Start Reading
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-border/50">
                <Link href="/articles">Explore Articles</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* FEATURES — Glass cards with glow */}
      <section className="relative py-28 bg-gradient-to-b from-white to-gray-50/50">
        <div className="pointer-events-none absolute right-[-5%] top-[20%] h-[300px] w-[300px] rounded-full bg-[#34D399]/15 blur-[100px]" />

        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center">
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold md:text-5xl"
            >
              Everything AI In{" "}
              <span className="bg-gradient-to-r from-[#4F8CFF] to-[#A855F7] bg-clip-text text-transparent">
                One Place
              </span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-4 max-w-xl text-muted-foreground"
            >
              From breaking news to deep research, we curate the AI landscape so
              you can focus on building.
            </motion.p>
          </AnimatedSection>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeUp}
                  className={`group relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 p-8 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-2 ${feature.glow}`}
                >
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg`}
                  >
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="mt-3 text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CATEGORIES — Marquee-style pill row */}
      <section className="py-20 border-y bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center">
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-bold md:text-4xl"
            >
              Explore AI Categories
            </motion.h2>
          </AnimatedSection>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-10 flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <motion.div
                key={category}
                variants={fadeUp}
                className="rounded-full border border-gray-200 bg-white px-6 py-2.5 text-sm font-medium shadow-sm transition-all hover:border-[#4F8CFF]/30 hover:bg-[#4F8CFF]/5 hover:shadow-[0_0_20px_rgba(79,140,255,0.1)]"
              >
                {category}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* STATISTICS — Parallax left-still / right-scroll effect */}
      <section className="py-28 bg-gradient-to-b from-gray-50/50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ParallaxSection speed={0.1} className="order-2 lg:order-1">
              <h2 className="text-4xl font-bold md:text-5xl">
                Trusted by{" "}
                <span className="bg-gradient-to-r from-[#34D399] to-[#4F8CFF] bg-clip-text text-transparent">
                  Thousands
                </span>
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Join a growing community of developers, researchers, and AI
                enthusiasts who rely on AI Digest daily.
              </p>
            </ParallaxSection>

            <div className="order-1 grid grid-cols-2 gap-5 lg:order-2">
              {stats.map((stat, i) => {
                const colors = [
                  "border-[#4F8CFF]/20 hover:shadow-[0_0_30px_rgba(79,140,255,0.15)]",
                  "border-[#34D399]/20 hover:shadow-[0_0_30px_rgba(52,211,153,0.15)]",
                  "border-[#A855F7]/20 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
                  "border-[#4F8CFF]/20 hover:shadow-[0_0_30px_rgba(79,140,255,0.15)]",
                ];
                const textColors = [
                  "text-[#4F8CFF]",
                  "text-[#34D399]",
                  "text-[#A855F7]",
                  "text-[#4F8CFF]",
                ];
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`rounded-2xl border bg-white/80 p-8 text-center backdrop-blur-sm transition-shadow ${colors[i]}`}
                  >
                    <h3
                      className={`text-4xl font-bold ${textColors[i]}`}
                    >
                      {stat.value}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES — Left still / right scroll parallax */}
      <section className="py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <ParallaxSection speed={0.12}>
              <div className="sticky top-32">
                <h2 className="text-4xl font-bold md:text-5xl">
                  Built For Everyone{" "}
                  <span className="bg-gradient-to-r from-[#A855F7] to-[#4F8CFF] bg-clip-text text-transparent">
                    Exploring AI
                  </span>
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Whether you write code, run research, or build companies — AI
                  Digest fits your workflow.
                </p>
              </div>
            </ParallaxSection>

            <div className="space-y-6">
              {audiences.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.15 }}
                    className="group rounded-2xl border border-gray-100 bg-white/70 p-8 backdrop-blur-sm transition-all hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg"
                  >
                    <Icon className={`mb-4 h-8 w-8 ${item.color}`} />
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-muted-foreground">
                      {item.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* WHY AI DIGEST — Split layout */}
      <section className="py-28 bg-gradient-to-b from-white to-gray-50/50">
        <div className="container mx-auto px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <ParallaxSection speed={0.1}>
              <div>
                <h2 className="text-4xl font-bold md:text-5xl">
                  Why{" "}
                  <span className="bg-gradient-to-r from-[#4F8CFF] to-[#34D399] bg-clip-text text-transparent">
                    AI Digest
                  </span>
                  ?
                </h2>
                <p className="mt-5 text-lg text-muted-foreground">
                  We combine AI news, research, and practical tools into one
                  clean knowledge platform — designed for people who build the
                  future.
                </p>
              </div>
            </ParallaxSection>

            <div className="space-y-5">
              {[
                "Curated AI information from trusted sources",
                "Developer-focused content that matters",
                "Startup and tool discovery for builders",
                "Research summaries you can actually use",
                "Clean, distraction-free reading experience",
              ].map((item, i) => {
                const colors = [
                  "text-[#4F8CFF]",
                  "text-[#34D399]",
                  "text-[#A855F7]",
                  "text-[#4F8CFF]",
                  "text-[#34D399]",
                ];
                return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle className={`h-5 w-5 shrink-0 ${colors[i]}`} />
                    <span className="text-muted-foreground">{item}</span>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28 border-y bg-white">
        <div className="container mx-auto px-4">
          <AnimatedSection className="text-center">
            <motion.h2
              variants={fadeUp}
              className="text-4xl font-bold md:text-5xl"
            >
              What Readers Say
            </motion.h2>
          </AnimatedSection>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {testimonials.map((item, i) => {
              const borderColors = [
                "hover:border-[#4F8CFF]/30 hover:shadow-[0_0_30px_rgba(79,140,255,0.1)]",
                "hover:border-[#34D399]/30 hover:shadow-[0_0_30px_rgba(52,211,153,0.1)]",
                "hover:border-[#A855F7]/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.1)]",
              ];
              return (
                <motion.div
                  key={item.role}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.15 }}
                  className={`rounded-2xl border bg-white/70 p-8 backdrop-blur-sm transition-all ${borderColors[i]}`}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <div className="mt-6">
                    <p className="font-semibold">{item.role}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.company}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
            {/* Background glow orbs */}
            <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[300px] w-[300px] rounded-full bg-white/10 blur-[80px]" />
            <div className="pointer-events-none absolute right-[-10%] bottom-[-20%] h-[300px] w-[300px] rounded-full bg-white/10 blur-[80px]" />

            <div className="relative">
              <Rocket className="mx-auto h-12 w-12" />
              <h2 className="mt-6 text-4xl font-bold md:text-5xl">
                Start Your AI Journey
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-white/80">
                Join thousands of developers, researchers, and founders who stay
                ahead with AI Digest.
              </p>
              <Button
                size="lg"
                className="mt-8 bg-white text-gray-900 shadow-lg hover:bg-white/90"
              >
                <Link href="/register" className="flex items-center gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
