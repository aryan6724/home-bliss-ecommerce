"use client";

import { useState } from "react";

export default function QuoteGenerator() {
  const [type, setType] = useState("Sofa");
  const [material, setMaterial] = useState("MDF");
  const [size, setSize] = useState("Small");
  const [price, setPrice] = useState<number | null>(null);

  const generateQuote = () => {
    let basePrice = 0;

    if (type === "Sofa") basePrice = 12000;
    if (type === "Dining Table") basePrice = 18000;
    if (type === "Bed") basePrice = 22000;

    if (material === "MDF") basePrice += 2000;
    if (material === "Oak Wood") basePrice += 5000;
    if (material === "Teak Wood") basePrice += 8000;

    if (size === "Medium") basePrice += 3000;
    if (size === "Large") basePrice += 6000;

    setPrice(basePrice);
  };

  return (
    <section id="custom" className="bg-[#f5f5f7] px-6 py-32">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] bg-black text-white shadow-2xl">
        <div className="grid md:grid-cols-2">
          <div className="p-10 md:p-16">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.6em] text-white/50">
              Custom Studio
            </p>

            <h2 className="text-5xl font-semibold tracking-tight md:text-6xl">
              Build your own furniture.
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-white/60">
              Select furniture type, material and size to get an instant
              estimated quote for your custom furniture.
            </p>

            <div className="mt-10 grid gap-5">
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none"
              >
                <option className="text-black">Sofa</option>
                <option className="text-black">Dining Table</option>
                <option className="text-black">Bed</option>
              </select>

              <select
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none"
              >
                <option className="text-black">MDF</option>
                <option className="text-black">Oak Wood</option>
                <option className="text-black">Teak Wood</option>
              </select>

              <select
                value={size}
                onChange={(e) => setSize(e.target.value)}
                className="rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white outline-none"
              >
                <option className="text-black">Small</option>
                <option className="text-black">Medium</option>
                <option className="text-black">Large</option>
              </select>
            </div>

            <button
              onClick={generateQuote}
              className="mt-8 rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition hover:scale-105 hover:bg-neutral-200"
            >
              Generate Quote
            </button>
          </div>

          <div className="flex items-center justify-center bg-white p-10 text-black md:p-16">
            <div className="w-full rounded-[2rem] bg-[#f5f5f7] p-10 text-center">
              <p className="text-sm font-medium uppercase tracking-[0.4em] text-neutral-500">
                Estimated Price
              </p>

              <h3 className="mt-6 text-6xl font-semibold tracking-tight">
                {price ? `₹${price.toLocaleString()}` : "₹--"}
              </h3>

              <p className="mx-auto mt-6 max-w-sm text-neutral-500">
                This is an estimated price. Final cost may vary based on exact
                dimensions, polish, fabric and finishing.
              </p>

              <button className="mt-8 rounded-full bg-black px-7 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800">
                Request Detailed Quote
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}