"use client";

import Link from "next/link";
import { useState } from "react";
import type { PublicOrder } from "@/types/order";
import OrderStatusBadge from "@/components/orders/OrderStatusBadge";
import OrderItemsList from "@/components/orders/OrderItemsList";
import OrderSummaryCard from "@/components/orders/OrderSummaryCard";

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [foundOrders, setFoundOrders] = useState<PublicOrder[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSearched(false);
    setFoundOrders([]);

    try {
      const response = await fetch(
        `/api/orders/track?orderId=${encodeURIComponent(
          orderId
        )}&phone=${encodeURIComponent(phone)}`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to track order");
      }

      setFoundOrders(data.orders);
      setSearched(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while tracking order."
      );
    } finally {
      setLoading(false);
    }
  };

  const getStatusIndex = (status: string) => {
    const statuses = [
      "Pending Confirmation",
      "Confirmed",
      "Out for Delivery",
      "Delivered",
    ];

    return statuses.indexOf(status);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Order Tracking
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Track Your Order
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-500">
              Use your order ID and registered phone number to check current
              delivery status.
            </p>
          </div>

          <Link
            href="/"
            className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ← Back to Home
          </Link>
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
              {loading ? "Tracking..." : "Track"}
            </button>
          </div>
        </form>

        {error ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold text-red-600">
              Failed to track order.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">{error}</p>
          </div>
        ) : !searched ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">
              Enter your order details.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">
              Your delivery progress will appear here after verification.
            </p>
          </div>
        ) : foundOrders.length === 0 ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">No order found.</h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">
              Please check your order ID and phone number, then try again.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {foundOrders.map((order) => {
              const currentIndex = getStatusIndex(order.status);

              return (
                <div
                  key={order.orderId}
                  className="overflow-hidden rounded-[3rem] bg-white shadow-sm"
                >
                  <div className="border-b border-neutral-200 p-8">
                    <p className="text-sm text-neutral-500">Order ID</p>

                    <div className="mt-2 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <h2 className="text-3xl font-semibold">
                        {order.orderId}
                      </h2>

                      <OrderStatusBadge status={order.status} />
                    </div>
                  </div>

                  <div className="grid gap-8 p-8 lg:grid-cols-[1fr_380px]">
                    <div>
                      <h3 className="text-2xl font-semibold">
                        Delivery Progress
                      </h3>

                      {order.status === "Cancelled" ? (
                        <div className="mt-6 rounded-[2rem] bg-red-50 p-6 text-red-700">
                          This order has been cancelled.
                        </div>
                      ) : (
                        <div className="mt-8 space-y-6">
                          {[
                            "Pending Confirmation",
                            "Confirmed",
                            "Out for Delivery",
                            "Delivered",
                          ].map((status, index) => (
                            <div
                              key={status}
                              className="flex items-center gap-4"
                            >
                              <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
                                  index <= currentIndex
                                    ? "bg-black text-white"
                                    : "bg-neutral-200 text-neutral-500"
                                }`}
                              >
                                {index + 1}
                              </div>

                              <p
                                className={`font-semibold ${
                                  index <= currentIndex
                                    ? "text-black"
                                    : "text-neutral-400"
                                }`}
                              >
                                {status}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="mt-10">
                        <OrderItemsList
                          orderId={order.orderId}
                          items={order.items}
                          compact
                        />
                      </div>
                    </div>

                    <OrderSummaryCard order={order} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}