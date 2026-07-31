"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
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

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "For exploring the AI landscape at your own pace.",
    features: [
      "Read all AI articles",
      "Basic search and filtering",
      "Bookmark up to 20 articles",
      "Weekly newsletter digest",
      "Access to all categories",
    ],
    cta: "Start free",
    featured: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "/month",
    description: "For readers who want the full depth of every brief.",
    features: [
      "Everything in Free",
      "Premium long-form articles",
      "Advanced search with filters",
      "Unlimited bookmarks",
      "Early access to research briefs",
      "Ad-free reading experience",
      "Priority email support",
    ],
    cta: "Go Pro",
    featured: true,
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
    ],
    cta: "Contact sales",
    featured: false,
  },
];

const faqs = [
  {
    q: "Can I switch plans anytime?",
    a: "Yes. You can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.",
  },
  {
    q: "Is there a free trial for Pro?",
    a: "Yes — every new user gets a 14-day Pro trial with full access to all premium features.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, debit cards, and PayPal. Enterprise plans can also pay by invoice.",
  },
  {
    q: "Can I cancel my subscription?",
    a: "Absolutely. Cancel anytime from your dashboard and keep access until the end of your current billing period.",
  },
];

export default function PricingPage() {
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
              Simple, transparent pricing
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="display-mega text-ink"
            >
              Invest in your AI knowledge
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-body"
            >
              Staying informed is the best investment you can make. Choose the
              plan that matches your ambition.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* PLANS */}
      <section className="bg-canvas-soft py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid items-stretch gap-6 lg:grid-cols-3"
          >
            {plans.map((plan) => (
              <motion.div
                key={plan.name}
                variants={fadeUp}
                className={`flex flex-col rounded-xl border p-8 ${
                  plan.featured
                    ? "border-ink bg-ink text-canvas"
                    : "border-hairline bg-surface-card"
                }`}
              >
                {plan.featured && (
                  <span className="mb-5 inline-flex w-fit items-center rounded-full bg-canvas px-3 py-1 label-uppercase text-ink">
                    Most popular
                  </span>
                )}

                <h3
                  className={`text-lg font-semibold ${
                    plan.featured ? "text-canvas" : "text-ink"
                  }`}
                >
                  {plan.name}
                </h3>

                <div className="mt-4 flex items-baseline gap-1.5">
                  <span
                    className={`text-4xl font-normal tracking-tight ${
                      plan.featured ? "text-canvas" : "text-ink"
                    }`}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span
                      className={
                        plan.featured ? "text-canvas/60" : "text-muted"
                      }
                    >
                      {plan.period}
                    </span>
                  )}
                </div>

                <p
                  className={`mt-3 text-sm ${
                    plan.featured ? "text-canvas/70" : "text-muted"
                  }`}
                >
                  {plan.description}
                </p>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm"
                    >
                      <Check
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          plan.featured
                            ? "text-canvas"
                            : "text-semantic-success"
                        }`}
                      />
                      <span
                        className={
                          plan.featured ? "text-canvas/85" : "text-body"
                        }
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {plan.featured ? (
                  <Button size="lg" className="mt-8 h-11 w-full">
                    <Link href="/register" className="flex items-center gap-2">
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    variant="secondary"
                    className="mt-8 h-11 w-full border border-hairline-strong bg-surface-card text-ink hover:bg-canvas-soft"
                  >
                    <Link href="/register" className="flex items-center gap-2">
                      {plan.cta}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-hairline bg-canvas py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <motion.p variants={fadeUp} className="label-uppercase text-primary">
              FAQ
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 display-lg text-ink"
            >
              Frequently asked questions
            </motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mx-auto max-w-2xl space-y-5"
          >
            {faqs.map((faq) => (
              <motion.div
                key={faq.q}
                variants={fadeUp}
                className="rounded-xl border border-hairline bg-surface-card p-7"
              >
                <h3 className="font-semibold text-ink">{faq.q}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-hairline bg-canvas-soft py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="display-lg text-ink">Ready to level up?</h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-body">
              Start with our free plan and upgrade when you&apos;re ready. No
              credit card required.
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
