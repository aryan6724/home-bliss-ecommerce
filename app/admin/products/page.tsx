"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { AdminProduct } from "@/types/product";

const initialForm = {
  name: "",
  slug: "",
  category: "",
  price: "",
  image: "",
  badge: "New",
  description: "",
  material: "",
  delivery: "",
  showOnHome: false,
  isActive: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editingProductId, setEditingProductId] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/products?admin=true");
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch products");
      }

      setProducts(data.products);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while fetching products."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateForm = (
    field: keyof typeof initialForm,
    value: string | boolean
  ) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setForm(initialForm);
    setEditingProductId("");
    setError("");
  };

  const handleEdit = (product: AdminProduct) => {
    setEditingProductId(product._id);

    setForm({
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: String(product.price),
      image: product.image,
      badge: product.badge,
      description: product.description,
      material: product.material,
      delivery: product.delivery,
      showOnHome: product.showOnHome,
      isActive: product.isActive,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSaving(true);
    setError("");

    const payload = {
      name: form.name,
      slug: form.slug,
      category: form.category,
      price: Number(form.price),
      image: form.image,
      badge: form.badge,
      description: form.description,
      material: form.material,
      delivery: form.delivery,
      showOnHome: form.showOnHome,
      isActive: form.isActive,
    };

    try {
      const url = editingProductId
        ? `/api/products/${editingProductId}`
        : "/api/products";

      const method = editingProductId ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to save product");
      }

      resetForm();
      await fetchProducts();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong while saving product."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (productId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Failed to delete product");
      }

      setProducts((prev) =>
        prev.filter((product) => product._id !== productId)
      );
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting product."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#f5f5f7] px-6 py-24 text-black">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.5em] text-neutral-500">
              Admin Products
            </p>

            <h1 className="text-5xl font-semibold tracking-tight md:text-7xl">
              Manage Products
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-500">
              Add, edit, activate or remove products from the Home Bliss
              catalogue.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin"
              className="w-fit rounded-full border border-black px-6 py-3 text-sm font-semibold text-black transition hover:bg-black hover:text-white"
            >
              Dashboard
            </Link>

            <Link
              href="/shop"
              className="w-fit rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
            >
              View Shop
            </Link>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-12 rounded-[3rem] bg-white p-8 shadow-sm"
        >
          <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold">
                {editingProductId ? "Edit Product" : "Add New Product"}
              </h2>

              <p className="mt-2 text-neutral-500">
                Use image path like /sofa.png if the image is inside public
                folder.
              </p>
            </div>

            {editingProductId && (
              <button
                type="button"
                onClick={resetForm}
                className="w-fit rounded-full border border-black px-6 py-3 text-sm font-semibold transition hover:bg-black hover:text-white"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <input
              required
              type="text"
              placeholder="Product Name"
              value={form.name}
              onChange={(e) => updateForm("name", e.target.value)}
              className="h-12 rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 outline-none focus:border-black focus:bg-white"
            />

            <input
              type="text"
              placeholder="Slug (optional, auto from name)"
              value={form.slug}
              onChange={(e) => updateForm("slug", e.target.value)}
              className="h-12 rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 outline-none focus:border-black focus:bg-white"
            />

            <input
              required
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => updateForm("category", e.target.value)}
              className="h-12 rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 outline-none focus:border-black focus:bg-white"
            />

            <input
              required
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => updateForm("price", e.target.value)}
              className="h-12 rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 outline-none focus:border-black focus:bg-white"
            />

            <input
              required
              type="text"
              placeholder="Image Path / URL e.g. /sofa.png"
              value={form.image}
              onChange={(e) => updateForm("image", e.target.value)}
              className="h-12 rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 outline-none focus:border-black focus:bg-white"
            />

            <input
              type="text"
              placeholder="Badge e.g. New Arrival"
              value={form.badge}
              onChange={(e) => updateForm("badge", e.target.value)}
              className="h-12 rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 outline-none focus:border-black focus:bg-white"
            />

            <input
              required
              type="text"
              placeholder="Material"
              value={form.material}
              onChange={(e) => updateForm("material", e.target.value)}
              className="h-12 rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 outline-none focus:border-black focus:bg-white"
            />

            <input
              required
              type="text"
              placeholder="Delivery Time e.g. 7-10 days"
              value={form.delivery}
              onChange={(e) => updateForm("delivery", e.target.value)}
              className="h-12 rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 outline-none focus:border-black focus:bg-white"
            />

            <div className="flex items-center gap-6 rounded-2xl bg-[#f5f5f7] px-5 py-4">
              <label className="flex items-center gap-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={form.showOnHome}
                  onChange={(e) => updateForm("showOnHome", e.target.checked)}
                />
                Show on Home
              </label>

              <label className="flex items-center gap-3 text-sm font-semibold">
                <input
                  type="checkbox"
                  checked={form.isActive}
                  onChange={(e) => updateForm("isActive", e.target.checked)}
                />
                Active
              </label>
            </div>

            <textarea
              required
              rows={5}
              placeholder="Product Description"
              value={form.description}
              onChange={(e) => updateForm("description", e.target.value)}
              className="rounded-2xl border border-neutral-200 bg-[#f5f5f7] px-5 py-4 outline-none focus:border-black focus:bg-white md:col-span-2"
            />
          </div>

          {error && (
            <p className="mt-6 rounded-2xl bg-red-100 px-5 py-4 text-sm font-semibold text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="mt-8 rounded-full bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving
              ? "Saving..."
              : editingProductId
              ? "Update Product"
              : "Add Product"}
          </button>
        </form>

        <section className="rounded-[3rem] bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-semibold">Products</h2>

          {loading ? (
            <p className="mt-8 text-neutral-500">Loading products...</p>
          ) : products.length === 0 ? (
            <div className="mt-8 rounded-[2rem] bg-[#f5f5f7] p-10 text-center">
              <h3 className="text-2xl font-semibold">No products found.</h3>

              <p className="mt-3 text-neutral-500">
                Add your first product using the form above.
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-5">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="grid gap-5 rounded-[2rem] border border-neutral-200 p-5 md:grid-cols-[160px_1fr_220px]"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-40 w-full rounded-[1.5rem] object-cover"
                  />

                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-2xl font-semibold">
                        {product.name}
                      </h3>

                      <span
                        className={`rounded-full px-4 py-2 text-xs font-semibold ${
                          product.isActive
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {product.isActive ? "Active" : "Inactive"}
                      </span>

                      {product.showOnHome && (
                        <span className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white">
                          Home
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-sm text-neutral-500">
                      {product.category} • {product.badge}
                    </p>

                    <p className="mt-3 line-clamp-2 text-neutral-600">
                      {product.description}
                    </p>

                    <p className="mt-3 font-semibold">
                      ₹{product.price.toLocaleString()} • Available on order
                    </p>

                    <p className="mt-2 text-sm text-neutral-500">
                      Material: {product.material}
                    </p>

                    <p className="mt-2 text-sm text-neutral-500">
                      Delivery: {product.delivery}
                    </p>

                    <p className="mt-2 text-sm text-neutral-500">
                      Slug: {product.slug}
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => handleEdit(product)}
                      className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(product._id)}
                      className="rounded-full border border-red-500 px-6 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                    >
                      Delete
                    </button>

                    <Link
                      href={`/products/${product.slug}`}
                      className="rounded-full border border-black px-6 py-3 text-center text-sm font-semibold transition hover:bg-black hover:text-white"
                    >
                      View Product
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}