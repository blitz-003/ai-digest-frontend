"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Sparkles, ArrowRight } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for exploring the AI landscape at your own pace.",
    features: [
      "Read all AI articles",
      "Basic search and filtering",
      "Bookmark up to 20 articles",
      "Weekly newsletter digest",
      "Access to AI categories",
    ],
    cta: "Start Free",
    popular: false,
    glow: "",
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For AI enthusiasts who want the full power of deep insights.",
    features: [
      "Everything in Free",
      "Premium long-form articles",
      "Advanced search with filters",
      "Unlimited bookmarks",
      "Early access to research summaries",
      "Ad-free reading experience",
      "Priority email support",
    ],
    cta: "Go Pro",
    popular: true,
    glow: "shadow-[0_0_50px_rgba(168,85,247,0.15)]",
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For teams that need shared AI intelligence at scale.",
    features: [
      "Everything in Pro",
      "Team seats and management",
      "Custom AI topic feeds",
      "Analytics dashboard",
      "API access for integrations",
      "Dedicated account manager",
      "Custom branding options",
      "SLA and priority support",
    ],
    cta: "Contact Sales",
    popular: false,
    glow: "",
  },
];

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes! Every new user gets a 14-day free trial of Pro with full access to all premium features.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, debit cards, and PayPal. Enterprise plans can also pay via invoice.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Absolutely. Cancel anytime from your dashboard. You'll keep access until the end of your current billing period.",
  },
];

export default function PricingPage() {
  return (
    <main className="overflow-hidden">
      {/* Hero */}
      <section className="relative py-28 bg-white">
        <div className="pointer-events-none absolute left-[-10%] top-[-20%] h-[500px] w-[500px] rounded-full bg-[#A855F7]/15 blur-[120px]" />
        <div className="pointer-events-none absolute right-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-[#4F8CFF]/15 blur-[120px]" />

        <div className="relative container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#A855F7]/20 bg-[#A855F7]/5 px-4 py-2 text-sm font-medium text-[#A855F7]"
          >
            <Sparkles className="h-4 w-4" />
            Simple, Transparent Pricing
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl font-bold tracking-tight md:text-7xl"
          >
            Invest in Your{" "}
            <span className="text-[#C084FC]">
              AI Knowledge
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
          >
            The best investment you can make is in staying informed. Choose the
            plan that matches your ambition.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-28 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`relative rounded-2xl border p-8 transition-all hover:-translate-y-1 ${
                  plan.popular
                    ? "border-[#A855F7]/30 bg-gradient-to-br from-[#A855F7]/5 via-white to-[#4F8CFF]/5 shadow-lg"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-md"
                } ${plan.glow}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#A855F7] to-[#4F8CFF] px-4 py-1 text-xs font-semibold text-white shadow-lg">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold">{plan.name}</h3>

                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  {plan.period && (
                    <span className="text-muted-foreground">
                      {plan.period}
                    </span>
                  )}
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {plan.description}
                </p>

                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#34D399]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/register"
                  className={`mt-8 flex h-9 w-full items-center justify-center gap-2 rounded-md px-4 text-sm font-medium transition ${
                    plan.popular
                      ? "bg-gradient-to-r from-[#A855F7] to-[#4F8CFF] text-white shadow-[0_0_20px_rgba(168,85,247,0.2)] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)]"
                      : "border border-border bg-background shadow-xs hover:bg-muted"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-28 bg-gradient-to-b from-gray-50/50 to-white">
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
              Frequently Asked{" "}
              <span className="text-[#6EE7B7]">
                Questions
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto mt-14 max-w-2xl space-y-6"
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.q}
                variants={fadeUp}
                className="rounded-2xl border border-gray-100 bg-white/70 p-6 backdrop-blur-sm"
              >
                <h3 className="font-bold">{faq.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </motion.div>
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
                Ready to Level Up?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-white/80">
                Start with our free plan and upgrade when you&apos;re ready. No
                credit card required.
              </p>
              <Link
                href="/register"
                className="mt-8 inline-flex h-10 items-center gap-2 rounded-md bg-white px-6 text-sm font-medium text-gray-900 shadow-lg transition hover:bg-white/90"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
