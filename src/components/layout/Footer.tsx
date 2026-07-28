import Link from "next/link";
import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="mt-24 border-t bg-gradient-to-b from-white via-gray-50/50 to-white">
      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-[#4F8CFF] to-[#A855F7] bg-clip-text text-transparent">
                AI Digest
              </span>
            </h2>
            <p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">
              Your source for artificial intelligence news, research, startups,
              and tools.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold">Explore</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link className="transition hover:text-foreground" href="/">
                Home
              </Link>
              <Link
                className="transition hover:text-foreground"
                href="/articles"
              >
                Articles
              </Link>
              <Link
                className="transition hover:text-foreground"
                href="/about"
              >
                About
              </Link>
              <Link
                className="transition hover:text-foreground"
                href="/pricing"
              >
                Pricing
              </Link>
            </div>
          </div>

          {/* Topics */}
          <div>
            <h3 className="text-sm font-semibold">Topics</h3>
            <div className="mt-4 flex flex-col gap-3 text-sm text-muted-foreground">
              <Link
                href="/articles?category=ai-startups"
                className="transition hover:text-foreground"
              >
                AI Startups
              </Link>
              <Link
                href="/articles?category=ai-tools"
                className="transition hover:text-foreground"
              >
                AI Tools
              </Link>
              <Link
                href="/articles?category=research-papers"
                className="transition hover:text-foreground"
              >
                Research
              </Link>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold">Follow AI Digest</h3>
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <FaGithub className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <FaXTwitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>&copy; {new Date().getFullYear()} AI Digest. All rights reserved.</p>
          <p>Built for the future of AI.</p>
        </div>
      </div>
    </footer>
  );
}
