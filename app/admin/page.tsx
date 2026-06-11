"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AdminOrder } from "@/types/adminOrder";
import AdminStats from "@/components/admin/AdminStats";
import AdminOrderCard from "@/components/admin/AdminOrderCard";

export default function AdminPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingOrderId, setUpdatingOrderId] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders");
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch orders");
      }

      setOrders(data.orders);
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

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      setUpdatingOrderId(orderId);

      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to update order status");
      }

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating status."
      );
    } finally {
      setUpdatingOrderId("");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    window.location.href = "/admin-login";
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Admin Panel
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Dashboard
            </h1>
          </div>

          <div className="flex flex-wrap gap-3">

             <Link
              href="/admin/products"
           className="w-fit rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
           Manage Products
          </Link>

            <Link
              href="/admin-messages"
              className="w-fit rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Customer Messages
            </Link>

            <button
              onClick={handleLogout}
              className="w-fit rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Logout
            </button>

            <Link
              href="/"
              className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              ← Back to Store
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">Loading dashboard...</h2>
          </div>
        ) : error ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold text-red-600">
              Failed to load dashboard.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">{error}</p>
          </div>
        ) : (
          <>
            <AdminStats orders={orders} />

            <div className="mt-12 rounded-[3rem] bg-white p-8 shadow-sm">
              <h2 className="text-3xl font-semibold">Recent Orders</h2>

              {orders.length === 0 ? (
                <div className="mt-8 rounded-[2rem] bg-[#f5f5f7] p-10 text-center">
                  <h3 className="text-2xl font-semibold">No orders found.</h3>

                  <p className="mt-3 text-neutral-500">
                    Orders will appear here after customers place them.
                  </p>
                </div>
              ) : (
                <div className="mt-8 space-y-5">
                  {orders.map((order) => (
                    <AdminOrderCard
                      key={order.orderId}
                      order={order}
                      updatingOrderId={updatingOrderId}
                      onStatusChange={updateOrderStatus}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}