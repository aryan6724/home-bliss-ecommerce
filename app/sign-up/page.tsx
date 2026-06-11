"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
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
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to create account");
      }

      setMessage("Account created successfully.");

      setTimeout(() => {
        router.push("/account");
      }, 800);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while creating account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="rounded-[3.5rem] bg-black p-8 text-white md:p-12">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
            Customer Account
          </p>

          <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            Create your Home Bliss account.
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
            Sign up to manage your profile, track your orders and get a smoother
            furniture shopping experience.
          </p>

          <div className="mt-10 space-y-4">
            {["Track your orders", "Save your details", "Faster checkout"].map(
              (item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                    ✓
                  </span>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              )
            )}
          </div>
        </section>

        <section className="rounded-[3.5rem] bg-white p-8 shadow-sm md:p-12">
          <div className="mb-8">
            <h2 className="text-4xl font-semibold tracking-tight">
              Sign Up
            </h2>

            <p className="mt-3 text-neutral-500">
              Already have an account?{" "}
              <Link href="/sign-in" className="font-semibold text-black">
                Sign in
              </Link>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Full Name
              </label>
              <input
                value={form.name}
                onChange={(event) => handleChange("name", event.target.value)}
                placeholder="Enter your full name"
                className="w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

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
                Phone Number
              </label>
              <input
                value={form.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                placeholder="10 digit phone number"
                maxLength={10}
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
                placeholder="Minimum 6 characters"
                className="w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold">
                Confirm Password
              </label>
              <input
                type="password"
                value={form.confirmPassword}
                onChange={(event) =>
                  handleChange("confirmPassword", event.target.value)
                }
                placeholder="Confirm your password"
                className="w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none transition focus:border-black"
              />
            </div>

            {message && (
              <p className="rounded-2xl bg-green-100 px-5 py-4 text-sm font-semibold text-green-700">
                {message}
              </p>
            )}

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
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}