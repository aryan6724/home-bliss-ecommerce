"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductGrid from "@/components/products/ProductGrid";
import type { PublicProduct } from "@/types/product";

export default function ShopPage() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch products");
        }

        setProducts(data.products);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Premium Collection
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Shop Furniture
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-500">
              Explore premium furniture designed for modern homes, comfort and
              everyday luxury.
            </p>
          </div>

          <Link
            href="/"
            className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ← Back to Home
          </Link>
        </div>

        {loading ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">Loading products...</h2>
          </div>
        ) : error ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold text-red-600">
              Failed to load products.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">{error}</p>
          </div>
        ) : (
          <ProductGrid productsList={products} filterTitle="Find your furniture" />
        )}
      </div>
    </main>
  );
}