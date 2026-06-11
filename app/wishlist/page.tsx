"use client";

import Link from "next/link";
import { useState } from "react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [cartMessage, setCartMessage] = useState("");

  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
    image: string;
  }) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });

    setCartMessage(`${item.name} added to cart.`);

    setTimeout(() => {
      setCartMessage("");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Saved Products
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Wishlist
            </h1>
          </div>

          <Link
            href="/shop"
            className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ← Back to Shop
          </Link>
        </div>

        {cartMessage && (
          <p className="mb-8 rounded-2xl bg-green-100 px-5 py-4 text-sm font-semibold text-green-700">
            {cartMessage}
          </p>
        )}

        {wishlistItems.length === 0 ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">Your wishlist is empty.</h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">
              Save your favourite furniture items here and add them to cart
              whenever you are ready.
            </p>

            <Link
              href="/shop"
              className="mt-8 inline-block rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="overflow-hidden rounded-[3rem] bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="h-[330px] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-7">
                  <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
                    {item.category}
                  </p>

                  <h2 className="mt-3 text-3xl font-semibold">{item.name}</h2>

                  <p className="mt-4 text-2xl font-semibold">
                    ₹{item.price.toLocaleString()}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <Link
                      href={`/products/${item.slug}`}
                      className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="rounded-full border border-black px-5 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="rounded-full border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Remove
                    </button>
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