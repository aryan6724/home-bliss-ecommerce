"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "@/components/products/ProductCard";
import type { PublicProduct } from "@/types/product";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Failed to fetch products");
        }

        const featuredProducts = data.products
          .filter((product: PublicProduct) => product.showOnHome)
          .slice(0, 6);

        setProducts(featuredProducts);
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

    fetchFeaturedProducts();
  }, []);

  return (
    <section className="bg-[#f5f5f7] px-6 py-28 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.45em] text-neutral-500">
              Featured Collection
            </p>

            <h2 className="text-5xl font-semibold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl">
              Curated for Modern Homes
            </h2>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-500">
              Explore our handpicked furniture pieces designed to bring comfort,
              warmth and timeless style into your space.
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex w-fit shrink-0 items-center justify-center rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            View All Products
          </Link>
        </div>

        {loading ? (
          <div className="rounded-[3rem] bg-white p-14 text-center shadow-sm">
            <h3 className="text-3xl font-semibold">
              Loading featured products...
            </h3>
          </div>
        ) : error ? (
          <div className="rounded-[3rem] bg-white p-14 text-center shadow-sm">
            <h3 className="text-3xl font-semibold text-red-600">
              Failed to load products.
            </h3>

            <p className="mt-4 text-neutral-500">{error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="rounded-[3rem] bg-white p-14 text-center shadow-sm">
            <h3 className="text-3xl font-semibold">
              No featured products selected.
            </h3>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">
              Go to admin products and enable “Show on Home” for products you
              want to display here.
            </p>

            <Link
              href="/admin/products"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Manage Products
            </Link>
          </div>
        ) : (
          <div
            className={`grid gap-8 ${
              products.length === 1
                ? "max-w-[430px]"
                : "md:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}