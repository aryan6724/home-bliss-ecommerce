"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);

    const loginData = {
      username: String(formData.get("username")),
      password: String(formData.get("password")),
    };

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Login failed");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while logging in."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-6 text-black">
      <div className="w-full max-w-xl rounded-[3rem] bg-white p-8 shadow-sm md:p-10">
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
          Admin Access
        </p>

        <h1 className="text-5xl font-semibold tracking-tight">
          Login
        </h1>

        <p className="mt-4 text-neutral-500">
          Enter admin credentials to manage orders, messages and dashboard data.
        </p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          <div>
            <label className="text-sm font-medium text-neutral-600">
              Username
            </label>

            <input
              required
              name="username"
              type="text"
              placeholder="Enter username"
              className="mt-2 h-12 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 outline-none transition focus:border-black focus:bg-white"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-neutral-600">
              Password
            </label>

            <input
              required
              name="password"
              type="password"
              placeholder="Enter password"
              className="mt-2 h-12 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 outline-none transition focus:border-black focus:bg-white"
            />
          </div>

          {error && (
            <p className="rounded-2xl bg-red-100 px-5 py-4 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>

        <Link
          href="/"
          className="mt-6 block text-center text-sm font-semibold text-neutral-500 transition hover:text-black"
        >
          ← Back to Store
        </Link>
      </div>
    </main>
  );
}