import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-xl font-medium tracking-tight text-primary">
              AI Digest
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-body">
              Your source for artificial intelligence news, research, startups,
              and tools.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="label-uppercase text-body">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-body">
              <Link className="transition hover:text-ink" href="/">
                Home
              </Link>
              <Link
                className="transition hover:text-ink"
                href="/articles"
              >
                Articles
              </Link>
              <Link className="transition hover:text-ink" href="/about">
                About
              </Link>
              <Link
                className="transition hover:text-ink"
                href="/pricing"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="label-uppercase text-body">Topics</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-body">
              <Link
                href="/articles?category=ai-startups"
                className="transition hover:text-ink"
              >
                AI Startups
              </Link>
              <Link
                href="/articles?category=ai-tools"
                className="transition hover:text-ink"
              >
                AI Tools
              </Link>
              <Link
                href="/articles?category=research-papers"
                className="transition hover:text-ink"
              >
                Research
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="label-uppercase text-body">Follow AI Digest</h3>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface-card text-body transition hover:border-hairline-strong hover:text-ink"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface-card text-body transition hover:border-hairline-strong hover:text-ink"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-surface-card text-body transition hover:border-hairline-strong hover:text-ink"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-hairline pt-6 text-sm text-body md:flex-row">
          <p>
            &copy; {new Date().getFullYear()} AI Digest. All rights reserved.
          </p>
          <p>Built for the future of AI.</p>
        </div>
      </div>
    </footer>
  );
}
