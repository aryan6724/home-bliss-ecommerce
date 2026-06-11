"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";

type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
};

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();

  const [customer, setCustomer] = useState<Customer | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    pincode: "",
    paymentMethod: "Cash on Delivery",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [customerLoading, setCustomerLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const response = await fetch("/api/auth/me", {
          cache: "no-store",
        });

        const data = await response.json();

        if (data.success && data.user) {
          setCustomer(data.user);

          setForm((prev) => ({
            ...prev,
            name: data.user.name || "",
            email: data.user.email || "",
            phone: data.user.phone || "",
          }));
        }
      } catch {
        setCustomer(null);
      } finally {
        setCustomerLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add products before checkout.");
      return;
    }

    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.city.trim() ||
      !form.address.trim() ||
      !form.pincode.trim() ||
      !form.paymentMethod.trim()
    ) {
      setError("Please fill all delivery details.");
      return;
    }

    setLoading(true);
    setError("");

    const orderData = {
      customer: {
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        pincode: form.pincode.trim(),
        paymentMethod: form.paymentMethod,
      },
      items: cartItems,
      total: cartTotal,
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to place order");
      }

      setOrderId(data.order.orderId);
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while placing order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-6 text-black">
        <div className="max-w-4xl rounded-[3rem] bg-white p-12 text-center shadow-2xl">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.5em] text-green-600">
            Order Confirmed
          </p>

          <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Thank you for your order.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            Your furniture order request has been received and saved
            successfully.
          </p>

          <div className="mx-auto mt-8 w-fit rounded-2xl bg-[#f5f5f7] px-6 py-4">
            <p className="text-sm text-neutral-500">Order ID</p>
            <p className="mt-1 text-2xl font-semibold">{orderId}</p>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {customer ? (
              <Link
                href="/account/orders"
                className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                View My Orders
              </Link>
            ) : (
              <Link
                href="/orders"
                className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                View My Orders
              </Link>
            )}

            <Link
              href="/track-order"
              className="rounded-full border border-black px-8 py-4 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Track Order
            </Link>

            <Link
              href="/"
              className="rounded-full bg-neutral-200 px-8 py-4 text-sm font-semibold text-black transition hover:bg-neutral-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Secure Checkout
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Checkout
            </h1>

            {customerLoading ? (
              <p className="mt-4 text-neutral-500">
                Checking customer account...
              </p>
            ) : customer ? (
              <p className="mt-4 text-neutral-500">
                Signed in as{" "}
                <span className="font-semibold text-black">
                  {customer.name}
                </span>
                . Your name, email and phone are auto-filled.
              </p>
            ) : (
              <p className="mt-4 text-neutral-500">
                Have an account?{" "}
                <Link href="/sign-in" className="font-semibold text-black">
                  Sign in
                </Link>{" "}
                for faster checkout.
              </p>
            )}
          </div>

          <Link
            href="/cart"
            className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ← Back to Cart
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[3rem] bg-white p-8 shadow-sm md:p-10"
          >
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-3xl font-semibold">Delivery Details</h2>

                <p className="mt-2 text-neutral-500">
                  Please confirm your delivery information before placing the
                  order.
                </p>
              </div>

              {customer && (
                <span className="w-fit rounded-full bg-green-100 px-5 py-3 text-sm font-semibold text-green-700">
                  Account Connected
                </span>
              )}
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-neutral-600">
                  Full Name
                </label>

                <input
                  required
                  name="name"
                  type="text"
                  value={form.name}
                  onChange={(event) =>
                    handleChange("name", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                  placeholder="Enter your name"
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
                  value={form.email}
                  onChange={(event) =>
                    handleChange("email", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-600">
                  Phone Number
                </label>

                <input
                  required
                  name="phone"
                  type="tel"
                  maxLength={10}
                  value={form.phone}
                  onChange={(event) =>
                    handleChange("phone", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-600">
                  City
                </label>

                <input
                  required
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={(event) =>
                    handleChange("city", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                  placeholder="Enter your city"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-600">
                  Pincode
                </label>

                <input
                  required
                  name="pincode"
                  type="text"
                  maxLength={6}
                  value={form.pincode}
                  onChange={(event) =>
                    handleChange("pincode", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                  placeholder="Enter pincode"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-neutral-600">
                  Payment Method
                </label>

                <select
                  required
                  name="paymentMethod"
                  value={form.paymentMethod}
                  onChange={(event) =>
                    handleChange("paymentMethod", event.target.value)
                  }
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="UPI on Delivery">UPI on Delivery</option>
                  <option value="Card on Delivery">Card on Delivery</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-sm font-medium text-neutral-600">
                  Full Address
                </label>

                <textarea
                  required
                  name="address"
                  rows={5}
                  value={form.address}
                  onChange={(event) =>
                    handleChange("address", event.target.value)
                  }
                  className="mt-2 w-full resize-none rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black"
                  placeholder="Enter your full delivery address"
                />
              </div>
            </div>

            {error && (
              <p className="mt-6 rounded-2xl bg-red-50 px-5 py-4 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || customerLoading}
              className="mt-8 w-full rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:scale-[1.02] hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </form>

          <aside className="h-fit rounded-[3rem] bg-black p-8 text-white shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
              Order Summary
            </p>

            <h2 className="mt-5 text-4xl font-semibold">Your Items</h2>

            {cartItems.length === 0 ? (
              <p className="mt-8 text-white/50">Your cart is empty.</p>
            ) : (
              <div className="mt-8 space-y-5">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border-b border-white/10 pb-5"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-2xl object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>

                      <p className="mt-1 text-sm text-white/50">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}

                <div className="flex justify-between pt-3 text-2xl font-semibold">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}