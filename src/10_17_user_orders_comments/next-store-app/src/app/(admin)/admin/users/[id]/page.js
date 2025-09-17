"use client";

import {
  get_admin_comments,
  get_admin_orders,
  get_admin_user_detail,
  update_admin_user,
} from "@/lib/api";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserDetail() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [comments, setComments] = useState([]);
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

        const userOrders = await get_admin_orders({ userId: id });
        setOrders(userOrders);

        const userComments = await get_admin_comments({ userId: id });
        setComments(userComments.results);

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
      <h1 className="text-2xl font-bold mb-4">Kullanıcı Bilgileri</h1>

      {message && <p className="text-red-600">{message}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="bg-white p-4 rounded shadow">
          <h1 className="text-xl font-bold mb-4">Bilgileri Güncelle</h1>
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
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h1 className="text-xl font-bold mb-4">Sipariş Listesi</h1>
          {orders.length > 0 ? (
            <table className="min-w-full border border-gray-200">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-2">Toplam Tutar</th>
                  <th className="p-2">Durum</th>
                  <th className="p-2">Tarih</th>
                  <th className="p-2"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-gray-50 border-b border-gray-100"
                  >
                    <td className="p-2">{formatPrice(order.total_price)}</td>
                    <td className="p-2">{order.status}</td>
                    <td className="p-2">
                      {new Date(order.created).toLocaleDateString("tr-TR")}
                    </td>
                    <td>
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="bg-indigo-500 text-sm text-white px-2 py-1 rounded-sm hover:bg-indigo-700"
                      >
                        Detay
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-red-600">Sipariş yok.</p>
          )}
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h1 className="text-xl font-bold mb-4">Yorum Listesi</h1>
          {comments.length > 0 ? (
            <ul>
              {comments.map((comment) => (
                <li
                  key={comment.id}
                  className="p-3 mb-3 border border-gray-100 rounded"
                >
                  <p>
                    <Link
                      href={`/products/${comment.product.slug}`}
                      className="font-medium text-indigo-600 hover:underline"
                    >
                      {comment.product.name}
                    </Link>
                  </p>
                  <p className="text-sm text-gray-600">
                    {comment.description} / {comment.rating}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(comment.created).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-red-600">Yorum yok.</p>
          )}
        </div>
      </div>
    </>
  );
}
