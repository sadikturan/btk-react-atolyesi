"use client";
import {
  create_admin_product,
  get_admin_categories,
  get_admin_product,
  update_admin_product,
} from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import JoditEditor from "jodit-react";

export default function ProductForm({ productId = null }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    slug: "",
    category: "",
  });

  useEffect(() => {
    if (!productId) return;

    async function fetchProduct() {
      try {
        const res = await get_admin_product(productId);
        setForm({
          name: res.name,
          description: res.description,
          price: res.price,
          stock: res.stock,
          slug: res.slug,
          category: res.category.id,
        });
      } catch (err) {
        console.log("ürün alınamadı", err);
      }
    }

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    async function fecthCategories() {
      try {
        const res = await get_admin_categories();
        setCategories(res);
      } catch (err) {
        console.log("Kategori alınamadı:", err);
      }
    }
    fecthCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      if (productId) {
        await update_admin_product(productId, {
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock),
          category: parseInt(form.category),
        });
      } else {
        await create_admin_product({
          ...form,
          price: parseFloat(form.price),
          stock: parseInt(form.stock),
          category: parseInt(form.category),
        });
      }

      setForm({
        name: "",
        description: "",
        price: "",
        stock: "",
        slug: "",
        category: "",
      });
      router.replace("/admin/products");
    } catch (err) {
      console.log(err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        {productId ? "Ürün Güncelle" : "Yeni Ürün Ekle"}
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
        <JoditEditor
          value={form.description}
          onChange={(newContent) =>
            setForm((prev) => ({ ...prev, description: newContent }))
          }
        />
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Fiyat"
          required
          className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stok"
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
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
        >
          <option value="">Kategori Seç</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
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
