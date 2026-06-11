"use client";

import Link from "next/link";
import { useState } from "react";
import type { PublicOrder } from "@/types/order";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import OrderItemsList from "@/components/orders/OrderItemsList";
import OrderSummaryCard from "@/components/orders/OrderSummaryCard";

export default function OrdersPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [orders, setOrders] = useState<PublicOrder[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSearched(false);
    setOrders([]);

    try {
      const response = await fetch(
        `/api/orders/track?orderId=${encodeURIComponent(
          orderId
        )}&phone=${encodeURIComponent(phone)}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders);
      setSearched(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching orders."
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
              Order History
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              My Orders
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-500">
              Enter your order ID and registered phone number to view your order
              details.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/track-order"
              className="w-fit rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Track Order
            </Link>

            <Link
              href="/"
              className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSearch}
          className="mb-10 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <div className="grid gap-4 md:grid-cols-[1fr_1fr_180px]">
            <input
              required
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID"
              className="h-12 rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 text-sm outline-none transition focus:border-black focus:bg-white"
            />

            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter Phone Number"
              className="h-12 rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 text-sm outline-none transition focus:border-black focus:bg-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="h-12 rounded-2xl bg-black px-6 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Searching..." : "Find"}
            </button>
          </div>
        </form>

        {error ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold text-red-600">
              Failed to load orders.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">{error}</p>
          </div>
        ) : !searched ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">Search your orders.</h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">
              Your order history will appear here after verification.
            </p>
          </div>
        ) : orders.length === 0 ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">No orders found.</h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">
              Please check your order ID and phone number, then try again.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order.orderId}
                className="overflow-hidden rounded-[3rem] bg-white shadow-sm"
              >
                <div className="border-b border-neutral-200 p-8">
                  <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="text-sm text-neutral-500">Order ID</p>

                      <h2 className="mt-1 text-3xl font-semibold">
                        {order.orderId}
                      </h2>

                      <p className="mt-2 text-neutral-500">
                        Date: {order.date}
                      </p>
                    </div>

                    <OrderStatusBadge status={order.status} />
                  </div>
                </div>

                <div className="grid gap-8 p-8 lg:grid-cols-[1fr_360px]">
                  <OrderItemsList orderId={order.orderId} items={order.items} />

                  <div>
                    <OrderSummaryCard order={order} showDate={false} />

                    <Link
                      href="/track-order"
                      className="mt-5 block rounded-full bg-black px-8 py-4 text-center text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Track This Order
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}