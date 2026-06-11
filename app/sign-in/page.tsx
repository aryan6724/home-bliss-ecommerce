"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignInPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to login");
      }

      router.push("/account");
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
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <section className="overflow-hidden rounded-[3.5rem] bg-black p-8 text-white shadow-sm md:p-12 lg:p-14">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-white/40">
            Welcome Back
          </p>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Sign in to your Home Bliss account.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
            Access your profile, track your orders and continue your premium
            furniture shopping experience.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {["Order tracking", "Saved profile", "Faster checkout"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-[2rem] bg-white/10 p-5"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                    ✓
                  </div>

                  <p className="text-sm font-semibold">{item}</p>
                </div>
              )
            )}
          </div>
        </section>

        <section className="rounded-[3.5rem] bg-white p-8 shadow-sm md:p-12">
          <div className="mb-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">
              Customer Login
            </p>

            <h2 className="text-4xl font-semibold tracking-tight">
              Sign In
            </h2>

            <p className="mt-3 text-neutral-500">
              New to Home Bliss?{" "}
              <Link href="/sign-up" className="font-semibold text-black">
                Create an account
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email Address
              </label>

              <input
                type="email"
                value={form.email}
                onChange={(event) => handleChange("email", event.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Password
              </label>

              <input
                type="password"
                value={form.password}
                onChange={(event) =>
                  handleChange("password", event.target.value)
                }
                placeholder="Enter your password"
                className="w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none transition focus:border-black"
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
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 rounded-[2rem] bg-[#f5f5f7] p-5">
            <p className="text-sm leading-7 text-neutral-500">
              Use the same email and password that you used while creating your
              customer account.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}