"use client";

type ProductFiltersProps = {
  search: string;
  category: string;
  sort: string;
  categories: string[];
  totalProducts: number;
  filteredCount: number;
  title: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onReset: () => void;
};

export default function ProductFilters({
  search,
  category,
  sort,
  categories,
  totalProducts,
  filteredCount,
  title,
  onSearchChange,
  onCategoryChange,
  onSortChange,
  onReset,
}: ProductFiltersProps) {
  const hasActiveFilters = search || category !== "All" || sort !== "default";

  return (
    <div className="mb-10 rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>

          <p className="mt-1 text-sm text-neutral-500">
            Showing{" "}
            <span className="font-semibold text-black">{filteredCount}</span>{" "}
            of <span className="font-semibold text-black">{totalProducts}</span>{" "}
            products
          </p>
        </div>

        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="w-fit rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-semibold text-black transition hover:border-black hover:bg-black hover:text-white"
          >
            Clear filters
          </button>
        )}
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Search
          </label>

          <input
            type="text"
            placeholder="Search sofas, beds, tables..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 text-sm outline-none transition focus:border-black focus:bg-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Category
          </label>

          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 text-sm outline-none transition focus:border-black focus:bg-white"
          >
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Sort
          </label>

          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
            className="h-12 w-full rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 text-sm outline-none transition focus:border-black focus:bg-white"
          >
            <option value="default">Default</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="name-a-z">Name: A to Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}