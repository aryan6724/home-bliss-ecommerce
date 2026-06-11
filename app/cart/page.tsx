"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cartItems,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    cartTotal,
  } = useCart();

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Shopping Cart
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Your Cart
            </h1>
          </div>

          <Link
            href="/"
            className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ← Continue Shopping
          </Link>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">Your cart is empty.</h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">
              Looks like you have not added anything yet. Explore our premium
              furniture collection and add your favorite products.
            </p>

            <Link
              href="/"
              className="mt-8 inline-block rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
            <div className="space-y-5">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid gap-6 rounded-[2rem] bg-white p-5 shadow-sm md:grid-cols-[180px_1fr]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-[180px] w-full rounded-[1.5rem] object-cover"
                  />

                  <div className="flex flex-col justify-between gap-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h2 className="text-2xl font-semibold">
                          {item.name}
                        </h2>

                        <p className="mt-2 text-neutral-500">
                          ₹{item.price.toLocaleString()}
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-fit rounded-full border border-red-200 px-5 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full bg-[#f5f5f7] p-2">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="h-9 w-9 rounded-full bg-white text-lg font-semibold shadow-sm"
                        >
                          -
                        </button>

                        <span className="min-w-8 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="h-9 w-9 rounded-full bg-white text-lg font-semibold shadow-sm"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-xl font-semibold">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <aside className="h-fit rounded-[3rem] bg-black p-8 text-white shadow-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
                Order Summary
              </p>

              <h2 className="mt-5 text-4xl font-semibold">
                Checkout
              </h2>

              <div className="mt-8 space-y-5">
                <div className="flex justify-between border-b border-white/10 pb-5">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-semibold">
                    ₹{cartTotal.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between border-b border-white/10 pb-5">
                  <span className="text-white/60">Delivery</span>
                  <span className="font-semibold">Free</span>
                </div>

                <div className="flex justify-between text-2xl font-semibold">
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="mt-8 block w-full rounded-full bg-white px-8 py-4 text-center text-sm font-semibold text-black transition hover:scale-105 hover:bg-neutral-200"
            >
             Proceed to Checkout
            </Link>

              <p className="mt-5 text-center text-sm text-white/45">
                Payment integration will be added later.
              </p>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}