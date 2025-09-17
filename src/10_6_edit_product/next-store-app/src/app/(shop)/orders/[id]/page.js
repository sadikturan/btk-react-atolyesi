"use client";

import { get_order_detail } from "@/lib/api";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await get_order_detail(id);
        setOrder(res.data);
      } catch (err) {
        console.log("Sipariş detayı alınamadı: ", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetail();
  }, [id]);

  if (loading) {
    return <p className="text-center py-10">Sipariş yükleniyor...</p>;
  }

  if (!order) {
    return (
      <p className="text-center py-10 text-gray-600">Siparişiniz bulunamadı.</p>
    );
  }

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-3 mt-4">
      <Link
        href="/orders"
        className="text-sm text-indigo-600 hover:underline inline-block mb-4"
      >
        ← Siparişlerime dön
      </Link>
      <h1 className="text-2xl font-bold text-gray-800 mb-2">
        Sipariş #${order.id}
      </h1>
      <p className="text-gray-600 mb-6">
        {new Date(order.created).toLocaleDateString("tr-TR")}
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <div className="flex aligt-items-center justify-between">
            <h2 className="text-lg font-semibold mb-3">Sipariş Bilgileri</h2>
            <p>
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
          <p>Toplam: {formatPrice(order.total_price)}</p>
        </div>
        <div className="border rounded-lg p-4 bg-white shadow-sm">
          <h2 className="text-lg font-semibold mb-3">Adresler</h2>
          <div>
            <strong>Teslimat Adresi:</strong>
            <div>
              <p className="text-sm text-gray-700">
                {order.addresses?.delivery_address?.address_line}
              </p>
              <p className="text-sm text-gray-700">
                {order.addresses?.delivery_address?.full_name}
              </p>
              <p className="text-sm text-gray-700">
                {order.addresses?.delivery_address?.city},{" "}
                {order.addresses?.delivery_address?.district}
              </p>
            </div>
          </div>
          <div className="mt-3">
            <strong>Fatura Adresi:</strong>
            <div>
              <p className="text-sm text-gray-700">
                {order.addresses?.billing_address?.address_line}
              </p>
              <p className="text-sm text-gray-700">
                {order.addresses?.billing_address?.full_name}
              </p>
              <p className="text-sm text-gray-700">
                {order.addresses?.billing_address?.city},{" "}
                {order.addresses?.billing_address?.district}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="border rounded-lg p-4 bg-white shadow-sm">
        <h2 className="text-lg font-semibold mb-3">Ürünler</h2>
        <div>
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 text-sm"
            >
              <span>
                {item.product?.name} x {item.quantity}
              </span>
              <span className="ms-3">{formatPrice(item.price)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
