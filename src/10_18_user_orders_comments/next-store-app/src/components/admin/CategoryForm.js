"use client";
import {
  create_admin_category,
  get_admin_category,
  update_admin_category,
} from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CategoryForm({ categoryId = null }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    icon: "",
    slug: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!categoryId) return;

    async function fetchCategory() {
      try {
        const res = await get_admin_category(categoryId);
        setForm({
          name: res.name,
          icon: res.icon,
          description: res.description,
          slug: res.slug,
        });
      } catch (err) {
        console.log("kategori alınamadı", err);
      }
    }

    fetchCategory();
  }, [categoryId]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (categoryId) {
        await update_admin_category(categoryId, { ...form });
      } else {
        await create_admin_category({ ...form });
      }
      router.replace("/admin/categories");
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        {categoryId ? "Kategori Güncelle" : "Yeni Kategori Ekle"}
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Ürün Adı"
          required
          className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
        />

        <input
          type="text"
          name="slug"
          value={form.slug}
          onChange={handleChange}
          placeholder="Slug"
          required
          className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
        />

        <input
          type="text"
          name="icon"
          value={form.icon}
          onChange={handleChange}
          placeholder="icon"
          required
          className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="description"
          required
          className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
        />

        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {loading ? "Kayıt ediliyor..." : "Kaydet"}
        </button>
      </form>
    </>
  );
}
