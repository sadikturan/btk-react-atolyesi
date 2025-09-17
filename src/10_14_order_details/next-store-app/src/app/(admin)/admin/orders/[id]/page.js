"use client";

import { get_admin_order_detail } from "@/lib/api";
import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const res = await get_admin_order_detail(id);
        setOrder(res.data);
      } catch (err) {
        console.log("Sipariş alınamadı", err);
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
      <p className="text-center py-10 text-gray-600">Sipariş bulunamadı.</p>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Sipariş Detayı: (#{order.id})</h1>

      <div className="border p-4 rounded mb-6 bg-gray-50">
        <p>
          <strong>Müşteri: </strong>
          {order.user}
        </p>
        <p className="mt-2">
          <strong>Toplam:</strong> {formatPrice(order.total_price)}
        </p>
        <p>
          <strong>Oluşturulma Tarihi:</strong>
          {new Date(order.created).toLocaleDateString("tr-TR")}
        </p>
        <p>
          <strong>Güncelleme Tarihi:</strong>
          {new Date(order.updated).toLocaleDateString("tr-TR")}
        </p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Ürünler</h2>
      <table className="min-w-full border border-gray-200  mb-2">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Ürün</th>
            <th className="p-2">Adet</th>
            <th className="p-2">Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <Link
                  href={`/products/${item.product.slug}`}
                  className="text-indigo-600 hover:underline"
                >
                  {item.product.name}
                </Link>
              </td>
              <td>{item.quantity}</td>
              <td>{formatPrice(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">Adresler</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Teslimat Adresi</h3>
          {order.addresses?.delivery_address ? (
            <ul className="text-sm space-y-1">
              <li>
                <strong>Ad Soyad:</strong>{" "}
                {order.addresses.delivery_address.full_name}
              </li>
              <li>
                <strong>Telefon:</strong>{" "}
                {order.addresses.delivery_address.phone}
              </li>
              <li>
                <strong>Adres:</strong>{" "}
                {order.addresses.delivery_address.address_line}
              </li>

              <li>
                <strong>Mahalle:</strong>{" "}
                {order.addresses.delivery_address.district}
              </li>
              <li>
                <strong>Sokak:</strong>{" "}
                {order.addresses.delivery_address.street}
              </li>
              <li>
                <strong>Şehir:</strong> {order.addresses.delivery_address.city}
              </li>
              <li>
                <strong>Posta Kodu:</strong>{" "}
                {order.addresses.delivery_address.postal_code}
              </li>
              <li>
                <strong>Adres Tipi:</strong>{" "}
                {order.addresses.delivery_address.address_type}
              </li>
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">Adres bilgisi yok.</p>
          )}
        </div>
        <div className="border p-4 rounded">
          <h3 className="font-semibold mb-2">Fatura Adresi</h3>
          {order.addresses?.billing_address ? (
            <ul className="text-sm space-y-1">
              <li>
                <strong>Ad Soyad:</strong>{" "}
                {order.addresses.billing_address.full_name}
              </li>
              <li>
                <strong>Telefon:</strong>{" "}
                {order.addresses.billing_address.phone}
              </li>
              <li>
                <strong>Adres:</strong>{" "}
                {order.addresses.billing_address.address_line}
              </li>

              <li>
                <strong>Mahalle:</strong>{" "}
                {order.addresses.billing_address.district}
              </li>
              <li>
                <strong>Sokak:</strong> {order.addresses.billing_address.street}
              </li>
              <li>
                <strong>Şehir:</strong> {order.addresses.billing_address.city}
              </li>
              <li>
                <strong>Posta Kodu:</strong>{" "}
                {order.addresses.billing_address.postal_code}
              </li>
              <li>
                <strong>Adres Tipi:</strong>{" "}
                {order.addresses.billing_address.address_type}
              </li>
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">Adres bilgisi yok.</p>
          )}
        </div>
      </div>
    </div>
  );
}
