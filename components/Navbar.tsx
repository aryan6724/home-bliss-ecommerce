"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import CustomerAuthButton from "@/components/CustomerAuthButton";

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-black/35 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-xl font-semibold tracking-[0.45em] text-white"
        >
          HOME BLISS
        </Link>

        <div className="hidden items-center gap-10 text-sm font-medium text-white/75 lg:flex">
          <Link href="/" className="transition hover:text-white">
            Home
          </Link>

          <Link href="/shop" className="transition hover:text-white">
            Shop
          </Link>

          <Link href="/#collection" className="transition hover:text-white">
            Collection
          </Link>

          <Link href="/#custom" className="transition hover:text-white">
            Custom
          </Link>

          <Link href="/#about" className="transition hover:text-white">
            About
          </Link>

          <Link href="/contact" className="transition hover:text-white">
            Contact
          </Link>

        </div>

        <div className="flex items-center gap-3">
          <div className="hidden items-center lg:flex">
            <CustomerAuthButton />
          </div>

          <Link
            href="/wishlist"
            onClick={closeMenu}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:scale-105 hover:bg-white hover:text-black"
            aria-label="Wishlist"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733C11.285 4.876 9.623 3.75 7.688 3.75 5.099 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>

            {wishlistCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href="/cart"
            onClick={closeMenu}
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:scale-105 hover:bg-white hover:text-black"
            aria-label="Cart"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-2 9m12-9 2 9M9 22a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              />
            </svg>

            {cartCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-black">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition hover:bg-white hover:text-black lg:hidden"
            aria-label="Menu"
          >
            {menuOpen ? (
              <span className="text-2xl leading-none">×</span>
            ) : (
              <span className="text-2xl leading-none">☰</span>
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-white/10 bg-black/90 px-6 py-6 backdrop-blur-2xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-5 text-base font-medium text-white/80">
            <Link href="/" onClick={closeMenu} className="hover:text-white">
              Home
            </Link>

            <Link href="/shop" onClick={closeMenu} className="hover:text-white">
              Shop
            </Link>

            <Link
              href="/#collection"
              onClick={closeMenu}
              className="hover:text-white"
            >
              Collection
            </Link>

            <Link
              href="/#custom"
              onClick={closeMenu}
              className="hover:text-white"
            >
              Custom
            </Link>

            <Link
              href="/#about"
              onClick={closeMenu}
              className="hover:text-white"
            >
              About
            </Link>

            <Link
              href="/contact"
              onClick={closeMenu}
              className="hover:text-white"
            >
              Contact
            </Link>

            <div className="pt-2">
              <CustomerAuthButton onClick={closeMenu} />
            </div>

            <Link
              href="/admin-login"
              onClick={closeMenu}
              className="text-sm text-white/45 transition hover:text-white"
            >
              Admin Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}