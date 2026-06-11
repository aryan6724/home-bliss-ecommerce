"use client";

import { useMemo, useState } from "react";
import type { PublicProduct } from "@/types/product";
import ProductCard from "./ProductCard";
import ProductFilters from "./ProductFilters";

type ProductGridProps = {
  productsList: PublicProduct[];
  filterTitle: string;
};

export default function ProductGrid({
  productsList,
  filterTitle,
}: ProductGridProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("default");

  const categories = useMemo(() => {
    return ["All", ...new Set(productsList.map((item) => item.category))];
  }, [productsList]);

  const filteredProducts = useMemo(() => {
    const searchedProducts = productsList.filter((product) => {
      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText) ||
        product.description.toLowerCase().includes(searchText);

      const matchesCategory =
        category === "All" || product.category === category;

      return matchesSearch && matchesCategory;
    });

    if (sort === "price-low-high") {
      return [...searchedProducts].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high-low") {
      return [...searchedProducts].sort((a, b) => b.price - a.price);
    }

    if (sort === "name-a-z") {
      return [...searchedProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }

    return searchedProducts;
  }, [productsList, search, category, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("All");
    setSort("default");
  };

  return (
    <>
      <ProductFilters
        search={search}
        category={category}
        sort={sort}
        categories={categories}
        totalProducts={productsList.length}
        filteredCount={filteredProducts.length}
        title={filterTitle}
        onSearchChange={setSearch}
        onCategoryChange={setCategory}
        onSortChange={setSort}
        onReset={resetFilters}
      />

      {filteredProducts.length === 0 ? (
        <div className="rounded-[3rem] bg-white p-16 text-center shadow-sm">
          <h2 className="text-4xl font-semibold">No products found.</h2>

          <p className="mx-auto mt-4 max-w-xl text-neutral-500">
            Try changing your search, category or sorting option.
          </p>

          <button
            onClick={resetFilters}
            className="mt-8 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </>
  );
}