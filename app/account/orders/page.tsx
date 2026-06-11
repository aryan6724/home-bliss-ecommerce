"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type OrderItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

type CustomerOrder = {
  orderId: string;
  date: string;
  total: number;
  status: string;
  items: OrderItem[];
};

const statusStyles: Record<string, string> = {
  "Pending Confirmation": "bg-yellow-100 text-yellow-800",
  Confirmed: "bg-blue-100 text-blue-800",
  Processing: "bg-purple-100 text-purple-800",
  "Out for Delivery": "bg-orange-100 text-orange-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function AccountOrdersPage() {
  const router = useRouter();

  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/account/orders");
        const data = await response.json();

        if (response.status === 401) {
          router.push("/sign-in");
          return;
        }

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch orders");
        }

        setOrders(data.orders || []);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading orders."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[3.5rem] bg-black p-8 text-white shadow-sm md:p-12 lg:p-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-white/40">
                My Orders
              </p>

              <h1 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                Your order history
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                View your recent orders, current status and purchased furniture
                items from your Home Bliss account.
              </p>
            </div>

            <Link
              href="/account"
              className="inline-flex w-fit items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              ← Back to Account
            </Link>
          </div>
        </section>

        <section className="mt-10">
          {loading ? (
            <div className="rounded-[3rem] bg-white p-10 shadow-sm">
              <p className="text-lg font-semibold">Loading your orders...</p>
            </div>
          ) : error ? (
            <div className="rounded-[3rem] bg-red-100 p-10 text-red-700">
              <p className="font-semibold">{error}</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="overflow-hidden rounded-[3.5rem] bg-white shadow-sm">
              <div className="grid gap-8 p-8 md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-neutral-400">
                    No Purchases
                  </p>

                  <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
                    No orders yet
                  </h2>

                  <p className="mt-5 max-w-xl text-lg leading-8 text-neutral-500">
                    You have not placed any orders from this account yet. Start
                    exploring our premium furniture collection and your orders
                    will appear here.
                  </p>

                  <div className="mt-8 flex flex-wrap gap-4">
                    <Link
                      href="/shop"
                      className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Start Shopping
                    </Link>

                    <Link
                      href="/wishlist"
                      className="rounded-full border border-neutral-300 px-8 py-4 text-sm font-semibold text-black transition hover:border-black"
                    >
                      View Wishlist
                    </Link>
                  </div>
                </div>

                <div className="rounded-[3rem] bg-[#f5f5f7] p-8">
                  <div className="rounded-[2.5rem] bg-black p-8 text-white">
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/40">
                      What you can do
                    </p>

                    <div className="mt-8 space-y-4">
                      {[
                        "Explore premium furniture collections",
                        "Add products to your cart",
                        "Place an order using your account email",
                        "Track all future orders from this page",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-2xl bg-white/10 p-4"
                        >
                          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-semibold text-black">
                            ✓
                          </span>

                          <p className="text-sm font-semibold">{item}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="overflow-hidden rounded-[3rem] bg-white shadow-sm"
                >
                  <div className="flex flex-col gap-5 border-b border-neutral-100 p-8 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-neutral-400">
                        Order ID
                      </p>

                      <h2 className="mt-2 text-3xl font-semibold">
                        {order.orderId}
                      </h2>

                      <p className="mt-2 text-neutral-500">
                        Placed on {order.date}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className={`rounded-full px-5 py-3 text-sm font-semibold ${
                          statusStyles[order.status] ||
                          "bg-neutral-100 text-neutral-700"
                        }`}
                      >
                        {order.status}
                      </span>

                      <span className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white">
                        ₹{order.total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 p-8">
                    {order.items.map((item) => (
                      <div
                        key={`${order.orderId}-${item.id}`}
                        className="flex flex-col gap-4 rounded-[2rem] bg-[#f5f5f7] p-5 sm:flex-row sm:items-center"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-24 w-24 rounded-2xl object-cover"
                        />

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">
                            {item.name}
                          </h3>

                          <p className="mt-2 text-sm text-neutral-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>

                        <p className="text-lg font-semibold">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col gap-4 bg-black p-8 text-white md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-white/40">
                        Current Status
                      </p>

                      <p className="mt-2 text-2xl font-semibold">
                        {order.status}
                      </p>
                    </div>

                    <Link
                      href={`/track-order?orderId=${order.orderId}`}
                      className="w-fit rounded-full bg-white px-7 py-4 text-sm font-semibold text-black transition hover:bg-neutral-200"
                    >
                      Track Order
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}