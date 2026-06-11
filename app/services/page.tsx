
import Link from "next/link";

const services = [
  {
    number: "01",
    title: "Home Furniture Installation",
    description:
      "Our team provides doorstep furniture installation for beds, wardrobes, sofas, dining tables, TV units and other furniture items with proper fitting and finishing.",
    points: ["Doorstep setup", "Safe handling", "Clean installation"],
  },
  {
    number: "02",
    title: "Furniture Repair Service",
    description:
      "We help repair damaged, loose or poorly fitted furniture with careful inspection, practical solutions and proper finishing support.",
    points: ["Damage inspection", "Repair support", "Finishing care"],
  },
  {
    number: "03",
    title: "Custom Furniture Setup",
    description:
      "Get assistance in setting up custom furniture according to your room size, layout, design preference and everyday comfort needs.",
    points: ["Room-based setup", "Custom placement", "Premium look"],
  },
  {
    number: "04",
    title: "Support & Maintenance",
    description:
      "We provide support and maintenance guidance to keep your furniture strong, stable, clean and long-lasting after installation.",
    points: ["After-service help", "Care guidance", "Long-term support"],
  },
];

const processSteps = [
  "Share your service requirement",
  "Our team reviews the details",
  "Schedule home visit or support",
  "Installation or repair completed",
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <section className="overflow-hidden rounded-[3.5rem] bg-black p-8 text-white shadow-sm md:p-12 lg:p-16">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-white/50">
                Our Services
              </p>

              <h1 className="max-w-4xl text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
                Furniture care, delivered at your home.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/60">
                From doorstep furniture installation to repair, custom setup and
                maintenance support, Home Bliss helps you keep your furniture
                beautiful, stable and ready to use.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-neutral-200"
                >
                  Book a Service
                </Link>

                <Link
                  href="/"
                  className="rounded-full border border-white/30 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-black"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>

            <div className="rounded-[3rem] bg-white/10 p-6 backdrop-blur">
              <div className="rounded-[2.5rem] bg-white p-8 text-black">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-neutral-400">
                  Service Promise
                </p>

                <h2 className="mt-4 text-4xl font-semibold">
                  Reliable help after purchase.
                </h2>

                <div className="mt-8 space-y-4">
                  {[
                    "Doorstep installation support",
                    "Repair service for damaged furniture",
                    "Custom setup for modern homes",
                    "Maintenance and support guidance",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-2xl bg-[#f5f5f7] p-4"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                        ✓
                      </span>

                      <p className="text-sm font-semibold">{item}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
                What We Provide
              </p>

              <h2 className="text-4xl font-semibold tracking-tight md:text-6xl">
                Complete home furniture services
              </h2>
            </div>

            <p className="max-w-xl text-lg leading-8 text-neutral-500">
              Our services are designed for customers who want a smooth,
              reliable and professional furniture experience even after
              purchase.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.title}
                className="group rounded-[3rem] bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="flex items-start justify-between gap-6">
                  <span className="rounded-full bg-black px-5 py-3 text-sm font-semibold text-white">
                    {service.number}
                  </span>

                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f7] text-xl font-semibold transition group-hover:bg-black group-hover:text-white">
                    ✓
                  </div>
                </div>

                <h3 className="mt-8 text-3xl font-semibold">
                  {service.title}
                </h3>

                <p className="mt-5 text-base leading-8 text-neutral-500">
                  {service.description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {service.points.map((point) => (
                    <span
                      key={point}
                      className="rounded-full bg-[#f5f5f7] px-4 py-2 text-xs font-semibold text-neutral-600"
                    >
                      {point}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-8 rounded-[3.5rem] bg-white p-8 shadow-sm md:p-10 lg:grid-cols-[0.8fr_1.2fr] lg:p-12">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Simple Process
            </p>

            <h2 className="text-4xl font-semibold tracking-tight">
              How our service works
            </h2>

            <p className="mt-5 text-lg leading-8 text-neutral-500">
              We keep the service process simple so customers can request help
              without confusion.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {processSteps.map((step, index) => (
              <div
                key={step}
                className="rounded-[2rem] bg-[#f5f5f7] p-6"
              >
                <p className="text-sm font-semibold text-neutral-400">
                  Step {index + 1}
                </p>

                <h3 className="mt-3 text-xl font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 overflow-hidden rounded-[3.5rem] bg-black p-8 text-white md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-white/40">
                Need Help?
              </p>

              <h2 className="text-4xl font-semibold md:text-5xl">
                Need furniture service at home?
              </h2>

              <p className="mt-5 max-w-2xl text-white/60">
                Contact us for furniture installation, repair or custom setup
                support. Our team will guide you with the right solution.
              </p>
            </div>

            <Link
              href="/contact"
              className="w-fit rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:bg-neutral-200"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}