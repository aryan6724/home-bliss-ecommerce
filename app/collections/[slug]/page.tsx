"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import ProductGrid from "@/components/products/ProductGrid";
import type { PublicProduct } from "@/types/product";

type CollectionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getCollectionTitle(slug: string) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const collectionKeywordMap: Record<string, string[]> = {
  sofas: ["sofa"],
  sofa: ["sofa"],

  bedroom: ["bed", "bedroom", "wardrobe"],
  bedrooms: ["bed", "bedroom", "wardrobe"],

  "dining-sets": ["dining"],
  dining: ["dining"],

  "living-room": [
    "sofa",
    "coffee table",
    "table",
    "bookshelf",
    "tv unit",
    "armchair",
    "living room",
  ],

  workspace: ["study", "study table", "office", "workspace"],

  storage: ["wardrobe", "bookshelf", "storage"],

  wardrobe: ["wardrobe"],
  wardrobes: ["wardrobe"],

  bookshelf: ["bookshelf"],
  bookshelves: ["bookshelf"],

  table: ["table", "coffee table", "study table"],
  tables: ["table", "coffee table", "study table"],
};

export default function CollectionDetailPage({ params }: CollectionPageProps) {
  const { slug } = use(params);

  const [products, setProducts] = useState<PublicProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const collectionTitle = getCollectionTitle(slug);

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
            : "Something went wrong while loading collection products."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const currentSlug = createSlug(slug);
    const keywords = collectionKeywordMap[currentSlug];

    if (!keywords) {
      return products.filter(
        (product) => createSlug(product.category) === currentSlug
      );
    }

    return products.filter((product) => {
      const searchableText = `
        ${product.name}
        ${product.slug}
        ${product.category}
        ${product.description}
      `.toLowerCase();

      return keywords.some((keyword) =>
        searchableText.includes(keyword.toLowerCase())
      );
    });
  }, [products, slug]);

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Collection
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              {collectionTitle}
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-500">
              Explore furniture selected for this collection. Every product is
              available on order and crafted for modern homes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="w-fit rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              ← Back to Home
            </Link>

            <Link
              href="/shop"
              className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              View All Products
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">Loading collection...</h2>
          </div>
        ) : error ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold text-red-600">
              Failed to load collection.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
            <h2 className="text-4xl font-semibold">
              No products found in this collection.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-neutral-500">
              Add products from admin panel and set category/name according to
              this collection.
            </p>

            <Link
              href="/admin/products"
              className="mt-8 inline-block rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              Manage Products
            </Link>
          </div>
        ) : (
          <ProductGrid
            productsList={filteredProducts}
            filterTitle={`${collectionTitle} Products`}
          />
        )}
      </div>
    </main>
  );
}