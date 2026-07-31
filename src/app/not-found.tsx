import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-canvas px-4">
      <div className="text-center">
        <h1 className="display-mega text-ink">
          404<span className="text-primary">.</span>
        </h1>
        <h2 className="mt-6 text-2xl font-normal tracking-tight text-ink">
          Page not found
        </h2>
        <p className="mx-auto mt-3 max-w-md text-lg text-body">
          The page you&apos;re looking for doesn&apos;t exist or has been
          moved.
        </p>
        <div className="mt-9 flex items-center justify-center gap-4">
          <Button className="h-11 px-6">
            <Link href="/" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Go home
            </Link>
          </Button>
          <Button
            variant="secondary"
            className="h-11 border border-hairline-strong bg-surface-card px-6 text-ink hover:bg-canvas-soft"
          >
            <Link href="/articles" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Browse articles
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
