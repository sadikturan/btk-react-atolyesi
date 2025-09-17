"use client";
import { get_admin_orders } from "@/lib/api";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await get_admin_orders();
        setOrders(res.data);
      } catch (err) {
        console.log("Siparişler alınamadı:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Siparişler yükleniyor...</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-center py-10 text-gray-600">
        Henüz sipariş gelmedi...
      </p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sipariş Listesi</h1>

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Id</th>
            <th className="p-2">Müşteri</th>
            <th className="p-2">Toplam Tutar</th>
            <th className="p-2">Durum</th>
            <th className="p-2">Tarih</th>
            <th className="p-2">Güncelleme</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="hover:bg-gray-50 border-b border-gray-100"
            >
              <td className="p-2">{order.id}</td>
              <td className="p-2">{order.user}</td>
              <td className="p-2">{formatPrice(order.total_price)}</td>
              <td className="p-2">{order.status}</td>
              <td className="p-2">
                {new Date(order.created).toLocaleDateString("tr-TR")}
              </td>
              <td className="p-2">
                {new Date(order.updated).toLocaleDateString("tr-TR")}
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
    </div>
  );
}
