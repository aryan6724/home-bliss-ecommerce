import Link from "next/link";

const categories = [
  {
    title: "Luxury Sofas",
    description: "Comfort crafted for modern living.",
    image: "/sofa.png",
    href: "/collections/sofas",
  },
  {
    title: "Dining Sets",
    description: "Elegant spaces for everyday moments.",
    image: "/dining.png",
    href: "/collections/dining-sets",
  },
  {
    title: "Bedroom",
    description: "Designed for calm, comfort and luxury.",
    image: "/bedroom.png",
    href: "/collections/bedroom",
  },
];

export default function Categories() {
  return (
    <section id="collection" className="bg-[#f5f5f7] px-6 py-32 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
            Collections
          </p>

          <h2 className="text-5xl font-semibold tracking-tight md:text-7xl">
            Curated for every space.
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="overflow-hidden rounded-[3rem] bg-white shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="text-4xl font-semibold">{category.title}</h3>

                  <p className="mt-3 text-white/80">{category.description}</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-8">
                <p className="text-neutral-500">Premium Collection</p>

                <Link
                  href={category.href}
                  className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:scale-105 hover:bg-neutral-800"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}