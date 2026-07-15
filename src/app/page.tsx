import TestAuth from "@/components/layout/TestAuth";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">AI Digest</h1>
      <TestAuth></TestAuth>
    </main>
  );
}