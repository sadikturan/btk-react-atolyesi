"use client";

import { get_orders } from "@/lib/api";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await get_orders();
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
      <p className="text-center py-10 text-gray-600">Henüz siparişiniz yok.</p>
    );
  }

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-3 mt-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Siparişlerim</h1>
      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-lg p-4 shadow-sm hover:shadow-md transition flex justify-between items-center"
          >
            <div>
              <p className="text-sm text-gray-500">Sipariş #{order.id}</p>
              <p className="font-medium text-gray-800">
                {new Date(order.created).toLocaleDateString("tr-TR")}
              </p>
              <p className="text-sm text-gray-600">
                <span
                  className={`font-semibold ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm"
                      : "bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-sm"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-lg font-bold text-indigo-600 text-right">
                {formatPrice(order.total_price)}
              </p>
              <Link
                href={`/orders/${order.id}`}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 focus:outline-none"
              >
                Sipariş Detay
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
