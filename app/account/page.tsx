"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export default function AccountPage() {
  const router = useRouter();

  const [user, setUser] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [logoutLoading, setLogoutLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/auth/me");
        const data = await response.json();

        if (!data.success || !data.user) {
          router.push("/sign-in");
          return;
        }

        setUser(data.user);
      } catch {
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    setLogoutLoading(true);

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/sign-in");
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[3rem] bg-white p-10 shadow-sm">
            <p className="text-lg font-semibold">Loading your account...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const firstLetter = user.name.charAt(0).toUpperCase();

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[3.5rem] bg-black p-8 text-white shadow-sm md:p-12 lg:p-14">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-white/40">
                My Account
              </p>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                Welcome, {user.name}
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                Manage your profile, track your orders and continue shopping
                with Home Bliss.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/account/orders"
                  className="rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-neutral-200"
                >
                  View My Orders
                </Link>

                <Link
                  href="/shop"
                  className="rounded-full border border-white/25 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>

            <div className="rounded-[3rem] bg-white/10 p-5 backdrop-blur">
              <div className="rounded-[2.5rem] bg-white p-6 text-black">
                <div className="flex items-center gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black text-3xl font-semibold text-white">
                    {firstLetter}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-neutral-400">
                      Signed in as
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold">
                      {user.name}
                    </h2>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  disabled={logoutLoading}
                  className="mt-6 w-full rounded-full bg-black px-6 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {logoutLoading ? "Logging out..." : "Logout"}
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[3rem] bg-white p-8 shadow-sm md:p-10">
            <div className="flex items-center justify-between gap-5">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.4em] text-neutral-400">
                  Profile
                </p>

                <h2 className="text-4xl font-semibold tracking-tight">
                  Profile Details
                </h2>
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f7] text-xl font-semibold">
                {firstLetter}
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <div className="rounded-[2rem] bg-[#f5f5f7] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  Name
                </p>
                <p className="mt-3 text-lg font-semibold">{user.name}</p>
              </div>

              <div className="rounded-[2rem] bg-[#f5f5f7] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  Email
                </p>
                <p className="mt-3 break-words text-lg font-semibold">
                  {user.email}
                </p>
              </div>

              <div className="rounded-[2rem] bg-[#f5f5f7] p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
                  Phone
                </p>
                <p className="mt-3 text-lg font-semibold">{user.phone}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Link
              href="/account/orders"
              className="group rounded-[3rem] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg shadow-black/10 transition group-hover:-translate-y-1 group-hover:scale-105">
               <span className="text-2xl text-white">Order</span>
              </div>

              <h2 className="mt-8 text-3xl font-semibold">My Orders</h2>

              <p className="mt-4 leading-7 text-neutral-500">
                View and track all orders placed from your customer account.
              </p>

              <p className="mt-8 text-sm font-semibold">
                Track Orders →
              </p>
            </Link>

            <Link
              href="/shop"
              className="group rounded-[3rem] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg shadow-black/10 transition group-hover:-translate-y-1 group-hover:scale-105">
               <span className="text-2xl text-white">Shop</span>

              </div>

              <h2 className="mt-8 text-3xl font-semibold">
                Continue Shopping
              </h2>

              <p className="mt-4 leading-7 text-neutral-500">
                Explore premium furniture collections for your home.
              </p>

              <p className="mt-8 text-sm font-semibold">
                Go to Shop →
              </p>
            </Link>

            <Link
              href="/wishlist"
              className="group rounded-[3rem] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl md:col-span-2"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-black shadow-lg shadow-black/10 transition group-hover:-translate-y-1 group-hover:scale-105">
  <span className="text-2xl text-white">Wishlist</span>
</div>

                  <h2 className="mt-8 text-3xl font-semibold">
                    Your Wishlist
                  </h2>

                  <p className="mt-4 max-w-xl leading-7 text-neutral-500">
                    Check your saved furniture items and add them to cart when
                    you are ready.
                  </p>
                </div>

                <span className="w-fit rounded-full bg-[#f5f5f7] px-6 py-3 text-sm font-semibold">
                  Open Wishlist →
                </span>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}