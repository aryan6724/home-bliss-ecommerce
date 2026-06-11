import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <Image
        src="/hero-furniture.png"
        alt="Luxury living room furniture"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/90" />

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-6 text-xs font-medium uppercase tracking-[0.7em] text-white/70">
          Premium Furniture
        </p>

        <h2 className="max-w-5xl text-6xl font-semibold leading-none tracking-tight text-white md:text-8xl">
          Crafting Timeless Spaces
        </h2>

        <p className="mt-8 max-w-2xl text-lg leading-8 text-white/75 md:text-xl">
          Discover luxury sofas, dining sets, beds and custom-made furniture
          designed for modern homes with premium materials and elegant detail.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/#collection"
            className="min-w-[190px] rounded-full border border-white/25 bg-white/10 px-8 py-4 text-center text-sm font-semibold text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white hover:text-black"
          >
            Explore Collection
          </Link>

          <Link
            href="/#custom"
            className="min-w-[190px] rounded-full border border-white/25 bg-white/10 px-8 py-4 text-center text-sm font-semibold text-white backdrop-blur-xl transition hover:scale-105 hover:bg-white hover:text-black"
          >
            Custom Furniture
          </Link>

          <Link
            href="/shop"
            className="min-w-[190px] rounded-full bg-white px-8 py-4 text-center text-sm font-semibold text-black shadow-2xl shadow-white/10 transition hover:scale-105 hover:bg-neutral-200"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}