"use client";

import { useAuth } from "@/features/auth/context/AuthContext";

export default function TestAuth() {
  const { user, isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div>Loading user...</div>;
  }

  return (
    <div>
      <h1>Auth Test</h1>

      <p>
        Logged in:
        {isAuthenticated ? "YES" : "NO"}
      </p>

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
