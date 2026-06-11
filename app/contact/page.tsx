"use client";

import Link from "next/link";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const form = e.currentTarget;

  setLoading(true);
  setError("");
  setSubmitted(false);

  const formData = new FormData(form);

  const messageData = {
    name: String(formData.get("name")),
    email: String(formData.get("email")),
    phone: String(formData.get("phone")),
    message: String(formData.get("message")),
    website: String(formData.get("website")),
  };

  try {
    const response = await fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messageData),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || "Failed to submit message");
    }

    form.reset();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Something went wrong while submitting message."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Customer Support
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Contact Us
            </h1>
          </div>

          <Link
            href="/"
            className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <form
  onSubmit={handleSubmit}
  className="rounded-[3rem] bg-white p-8 shadow-sm md:p-10"
>
  <input
    type="text"
    name="website"
    tabIndex={-1}
    autoComplete="off"
    className="hidden"
  />

  <h2 className="text-3xl font-semibold">Send us a message</h2>
            <p className="mt-3 max-w-2xl text-neutral-500">
              Have a question about furniture, delivery, customization or your
              order? Fill the form and our team will contact you soon.
            </p>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-neutral-600">
                  Full Name
                </label>

                <input
                  required
                  name="name"
                  type="text"
                  placeholder="Enter your name"
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-600">
                  Email
                </label>

                <input
                  required
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-neutral-600">
                  Phone Number
                </label>

                <input
                  required
                  name="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-neutral-600">
                  Message
                </label>

                <textarea
                  required
                  name="message"
                  rows={6}
                  placeholder="Write your message..."
                  className="mt-2 w-full resize-none rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                />
              </div>
            </div>

            {error && (
              <p className="mt-5 rounded-2xl bg-red-100 px-5 py-4 text-sm font-semibold text-red-700">
                {error}
              </p>
            )}

            {submitted && (
              <p className="mt-5 rounded-2xl bg-green-100 px-5 py-4 text-sm font-semibold text-green-700">
                Your message has been submitted successfully.
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 w-full rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Submit Message"}
            </button>
          </form>

          <aside className="h-fit rounded-[3rem] bg-black p-8 text-white shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
              Home Bliss
            </p>

            <h2 className="mt-5 text-4xl font-semibold">Support Details</h2>

            <div className="mt-8 space-y-6">
              <div className="rounded-[2rem] border border-white/10 p-5">
                <p className="text-sm text-white/50">Email</p>
                <p className="mt-2 font-semibold">support@homebliss.com</p>
              </div>

              <div className="rounded-[2rem] border border-white/10 p-5">
                <p className="text-sm text-white/50">Phone</p>
                <p className="mt-2 font-semibold">+91 98765 43210</p>
              </div>

              <div className="rounded-[2rem] border border-white/10 p-5">
                <p className="text-sm text-white/50">Business Hours</p>
                <p className="mt-2 font-semibold">
                  Monday - Saturday, 10 AM - 7 PM
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 p-5">
                <p className="text-sm text-white/50">Address</p>
                <p className="mt-2 font-semibold leading-6">
                  Home Bliss Furniture Studio, New Delhi, India
                </p>
              </div>
            </div>

            <p className="mt-8 text-sm leading-6 text-white/45">
              Messages are now saved in MongoDB and can be managed from the
              admin support panel.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}