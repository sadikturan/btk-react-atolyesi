"use client";

import { formatPrice } from "@/utils/format";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function OrderSummary() {
  const items = useSelector((state) => state.cart.items);
  const subTotal = items.reduce(
    (toplam, item) => toplam + item.price * item.quantity,
    0
  );
  const kargo = subTotal > 10000 ? 0 : 100;
  const total = subTotal + kargo;

  return (
    <>
      <h1 className="text-lg font-semibold text-gray-800">Sipariş Özeti</h1>
      <div className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Ara Toplam</span>
          <span>{formatPrice(subTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Kargo</span>
          <span>{kargo === 0 ? "Ücretsiz" : formatPrice(kargo)}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Ürün Adeti</span>
          <span>{items.reduce((adet, item) => adet + item.quantity, 0)}</span>
        </div>
        <div className="flex justify-between border-t pt-3 text-base">
          <span className="font-semibold">Toplam</span>
          <span className="font-bold text-indigo-600">
            {formatPrice(total)}
          </span>
        </div>
      </div>
      <Link
        href="/orders/create"
        className="mt-5 block text-center w-full rounded-lg bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 transition"
      >
        Siparişi Tamamla
      </Link>
    </>
  );
}
