"use client";

import { get_admin_user_detail, update_admin_user } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    role: "user",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      await update_admin_user(id, form);
      setMessage("Kullanıcı güncelledi.");
    } catch (err) {
      console.log("Kullanıcı güncelleme hatası:", err);
      setMessage("Bir hata oluştu");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    async function fecthData() {
      try {
        const userData = await get_admin_user_detail(id);
        setUser(userData);

        setForm({
          first_name: userData.first_name || "",
          last_name: userData.last_name || "",
          email: userData.email || "",
          phone: userData.phone || "",
          role: userData.role || "",
        });
      } catch (err) {
        console.log("Kullanıcı bilgisi alınamadı:", err);
      } finally {
        setLoading(false);
      }
    }

    fecthData();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Veriler yükleniyor...</p>;
  }

  if (!user) {
    return (
      <p className="text-center py-10 text-gray-600">Kullanıcı bulunamadı.</p>
    );
  }

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">
        Kullanıcı Detayı: {user.first_name} {user.last_name}
      </h1>

      {message && <p className="text-red-600">{message}</p>}

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium">Ad</label>
          <input
            type="text"
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="Ad"
            required
            className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Soyad</label>
          <input
            type="text"
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Soyad"
            required
            className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
            className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Rol</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:border-gray-500 focus:outline-none p-2 rounded"
          >
            <option value="user">Kullanıcı</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {saving ? "Kayıt ediliyor..." : "Kaydet"}
        </button>
      </form>
    </>
  );
}
