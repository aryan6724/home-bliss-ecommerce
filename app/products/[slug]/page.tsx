"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";
import type { PublicProduct } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default function ProductDetailsPage({ params }: ProductPageProps) {
  const { slug } = use(params);

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const [product, setProduct] = useState<PublicProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cartMessage, setCartMessage] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/slug/${slug}`);
        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(data.message || "Product not found");
        }

        setProduct(data.product);
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong while loading product."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-6 text-black">
        <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
          <h1 className="text-4xl font-semibold">Loading product...</h1>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-6 text-black">
        <div className="max-w-3xl rounded-[3rem] bg-white p-16 text-center shadow-sm">
          <h1 className="text-5xl font-semibold">Product not found.</h1>

          <p className="mt-4 text-neutral-500">
            This product may be unavailable or removed.
          </p>

          <Link
            href="/shop"
            className="mt-8 inline-block rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Back to Shop
          </Link>
        </div>
      </main>
    );
  }

  const wished = isInWishlist(product._id);

  const handleAddToCart = () => {
  addToCart(
    {
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    },
    quantity
  );

  setCartMessage(`${quantity} item(s) added to cart successfully.`);

  setTimeout(() => {
    setCartMessage("");
  }, 2000);
};

  const handleWishlist = () => {
    if (wished) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        slug: product.slug,
        category: product.category,
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-wrap gap-3">
          <Link
            href="/shop"
            className="rounded-full border border-black px-6 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
          >
            ← Back to Shop
          </Link>

          <Link
            href="/cart"
            className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Go to Cart
          </Link>
        </div>

        <div className="grid gap-10 rounded-[3rem] bg-white p-8 shadow-sm lg:grid-cols-[1fr_1fr]">
          <div className="overflow-hidden rounded-[2.5rem] bg-[#f5f5f7]">
            <img
              src={product.image}
              alt={product.name}
              className="h-[560px] w-full object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              {product.category}
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              {product.name}
            </h1>

            <p className="mt-6 text-lg leading-8 text-neutral-600">
              {product.description}
            </p>

            <p className="mt-8 text-4xl font-semibold">
              ₹{product.price.toLocaleString()}
            </p>

            <div className="mt-8 grid gap-4 rounded-[2rem] bg-[#f5f5f7] p-6 text-sm text-neutral-600">
              <p>
                <span className="font-semibold text-black">Material:</span>{" "}
                {product.material}
              </p>

              <p>
                <span className="font-semibold text-black">Delivery:</span>{" "}
                {product.delivery}
              </p>

              <p>
             <span className="font-semibold text-black">Availability:</span>{" "}
             Available on order
              </p>

              <p>
                <span className="font-semibold text-black">Badge:</span>{" "}
                {product.badge}
              </p>
            </div>

            {cartMessage && (
              <p className="mt-6 rounded-2xl bg-green-100 px-5 py-4 text-sm font-semibold text-green-700">
                {cartMessage}
              </p>
            )}


            <div className="mt-8 flex w-fit items-center gap-4 rounded-full bg-[#f5f5f7] p-2">
  <button
    type="button"
    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-semibold transition hover:bg-black hover:text-white"
  >
    -
  </button>

  <span className="min-w-10 text-center text-lg font-semibold">
    {quantity}
  </span>

  <button
    type="button"
    onClick={() => setQuantity((prev) => Math.min(20, prev + 1))}
    className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl font-semibold transition hover:bg-black hover:text-white"
  >
    +
  </button>
</div>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
            onClick={handleAddToCart}
             className="rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
             >
             Add to Cart
            </button>

              <button
                onClick={handleWishlist}
                className="rounded-full border border-black px-8 py-4 text-sm font-semibold transition hover:bg-black hover:text-white"
              >
                {wished ? "Remove Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}