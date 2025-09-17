"use client";

import { get_admin_categories, get_admin_products } from "@/lib/api";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const data = await get_admin_categories();
        setCategories(data);
      } catch (err) {
        console.log("Kategoriler alınamadı", err);
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const data = await get_admin_products(
          selectedCategory ? { category: selectedCategory } : {}
        );
        setProducts(data);
      } catch (err) {
        setError("Ürünler alınırken hata oluştu");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selectedCategory]);

  if (loading) return <p>Yükleniyor</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <div className="flex justify-between align-items-center mb-4">
        <h1 className="text-2xl font-bold">Admin Ürün Listesi</h1>
        <Link
          href="/admin/products/create"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Create Product
        </Link>
      </div>
      <div className="mb-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-300 p-2 rounded"
        >
          <option value="">Tüm Kategoriler</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {products.length === 0 ? (
        <p className="text-red-600">Ürün bulunamadı.</p>
      ) : (
        <table className="min-w-full border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2">Id</th>
              <th className="p-2">Ürün Adı</th>
              <th className="p-2">Fiyat</th>
              <th className="p-2">Stok</th>
              <th className="p-2">Kategori</th>
              <th className="p-2"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 border-b border-b-gray-100"
              >
                <td className="p-2">{product.id}</td>
                <td className="p-2">{product.name}</td>
                <td className="p-2">{formatPrice(product.price)}</td>
                <td className="p-2">{product.stock}</td>
                <td className="p-2">{product.category?.name}</td>
                <td className="p-2">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="bg-indigo-500 text-sm text-white px-2 py-1 rounded-sm hover:bg-indigo-700"
                  >
                    Detay
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
