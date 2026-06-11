import Link from "next/link";

const warrantyPoints = [
  {
    title: "Manufacturing Defects",
    text: "Warranty covers manufacturing defects related to product structure, frame quality, basic fittings and material issues found under normal usage.",
  },
  {
    title: "Furniture Frame Support",
    text: "Wooden frames, engineered wood structures and fixed furniture parts may be covered if damage is caused due to production fault.",
  },
  {
    title: "What is Not Covered",
    text: "Warranty does not cover physical damage, water damage, stains, burns, scratches, misuse, accidental breakage or normal wear and tear.",
  },
  {
    title: "Claim Process",
    text: "Customers can contact support with order ID, product photos and issue details. Our support team will review the request and guide the next steps.",
  },
];

export default function WarrantyPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Product Assurance
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Warranty
            </h1>
          </div>

          <Link
            href="/"
            className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            ← Back to Home
          </Link>
        </div>

        <section className="grid gap-8 lg:grid-cols-[1fr_420px]">
          <div className="rounded-[3rem] bg-white p-8 shadow-sm md:p-12">
            <h2 className="text-4xl font-semibold tracking-tight">
              Home Bliss Warranty Policy
            </h2>

            <p className="mt-6 max-w-4xl text-lg leading-8 text-neutral-600">
              Home Bliss furniture products are designed for premium interiors,
              comfort and durability. This warranty page explains the basic
              coverage rules for the demo ecommerce store.
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              {warrantyPoints.map((point) => (
                <div
                  key={point.title}
                  className="rounded-[2rem] bg-[#f5f5f7] p-6"
                >
                  <h3 className="text-2xl font-semibold">{point.title}</h3>

                  <p className="mt-4 leading-7 text-neutral-600">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <aside className="h-fit rounded-[3rem] bg-black p-8 text-white shadow-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
              Support
            </p>

            <h2 className="mt-5 text-4xl font-semibold">Need Help?</h2>

            <p className="mt-5 leading-7 text-white/60">
              If you have a warranty-related issue, contact our support team
              with your order ID and product photos.
            </p>

            <div className="mt-8 space-y-4">
              <div className="rounded-[2rem] border border-white/10 p-5">
                <p className="text-sm text-white/50">Required Details</p>
                <p className="mt-2 font-semibold">
                  Order ID, phone number, product photos and issue description.
                </p>
              </div>

              <div className="rounded-[2rem] border border-white/10 p-5">
                <p className="text-sm text-white/50">Response Time</p>
                <p className="mt-2 font-semibold">24-48 business hours</p>
              </div>
            </div>

            <Link
              href="/contact"
              className="mt-8 inline-block w-full rounded-full bg-white px-8 py-4 text-center text-sm font-semibold text-black transition hover:scale-105 hover:bg-neutral-200"
            >
              Contact Support
            </Link>
          </aside>
        </section>

        <section className="mt-10 rounded-[3rem] bg-white p-8 shadow-sm md:p-12">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
            Important Note
          </p>

          <p className="mt-5 text-lg leading-8 text-neutral-600">
            This is a demo warranty page for your ecommerce project. In a real
            production website, warranty duration, return rules, service
            policies and legal terms should be clearly defined by the actual
            business.
          </p>
        </section>
      </div>
    </main>
  );
}