"use client";

import Link from "next/link";
import { useState } from "react";
import type { PublicProduct } from "@/types/product";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

type ProductCardProps = {
  product: PublicProduct;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);

  const wished = isInWishlist(product._id);

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

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
    });

    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  return (
    <div className="group overflow-hidden rounded-[3rem] bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl">
      <div className="relative h-[360px] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />

        <span className="absolute left-5 top-5 rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
          {product.badge}
        </span>

        <button
          onClick={handleWishlist}
          className={`absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full text-xl font-semibold shadow-lg transition hover:scale-110 ${
            wished ? "bg-black text-white" : "bg-white text-black"
          }`}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          {wished ? "♥" : "♡"}
        </button>
      </div>

      <div className="p-7">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
          {product.category}
        </p>

        <h2 className="mt-3 text-3xl font-semibold">{product.name}</h2>

        <p className="mt-3 line-clamp-3 text-neutral-500">
          {product.description}
        </p>

        <p className="mt-6 text-2xl font-semibold">
          ₹{product.price.toLocaleString()}
        </p>

        {added && (
          <p className="mt-4 rounded-2xl bg-green-100 px-4 py-3 text-sm font-semibold text-green-700">
            Added to cart.
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/products/${product.slug}`}
            className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-neutral-800"
          >
            View Product
          </Link>

          <button
            onClick={handleAddToCart}
            className="rounded-full border border-black px-5 py-3 text-sm font-semibold text-black transition hover:scale-105 hover:bg-black hover:text-white"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}