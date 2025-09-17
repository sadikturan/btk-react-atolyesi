"use client";

import { get_admin_categories } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await get_admin_categories();
        setCategories(data);
      } catch (err) {
        setError("Kategoriler alınırken hata oluştu");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) return <p>Yükleniyor</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between align-items-center mb-4">
        <h1 className="text-2xl font-bold">Kategori Listesi</h1>
        <Link
          href="/admin/categories/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create Category
        </Link>
      </div>
      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Id</th>
            <th className="p-2">Icon</th>
            <th className="p-2">Kategori Adı</th>
            <th className="p-2">Slug</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr
              key={category.id}
              className="hover:bg-gray-50 border-b border-b-gray-100"
            >
              <td className="p-2">{category.id}</td>
              <td className="p-2">
                <div dangerouslySetInnerHTML={{ __html: category.icon }}></div>
              </td>
              <td className="p-2">{category.name}</td>
              <td className="p-2">
                <Link
                  className="text-indigo-600 hover:underline"
                  href={`/products?category=${category.slug}`}
                  target="_blank"
                >
                  {category.slug}
                </Link>
              </td>
              <td className="p-2 text-right">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="bg-indigo-500 text-sm text-white px-2 py-1 rounded-sm hover:bg-indigo-700"
                >
                  Detay
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
