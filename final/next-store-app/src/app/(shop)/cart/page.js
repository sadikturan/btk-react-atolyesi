"use client";

import CartItem from "@/components/carts/CartItem";
import EmptyCart from "@/components/carts/EmpytCart";
import { clearCart, clearCartDb, removeFromCart } from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const isAuthenticated = auth?.isAuthenticated || false;

  const handleClearCart = () => {
    if (isAuthenticated) {
      dispatch(clearCartDb());
    } else {
      dispatch(clearCart());
    }
  };

  const subTotal = items.reduce(
    (toplam, item) => toplam + item.price * item.quantity,
    0
  );
  const kargo = subTotal > 10000 ? 0 : 100;
  const total = subTotal + kargo;

  if (items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-3 mt-4">
      <h1 className="text-3xl font-bold text-gray-800">Sepetim</h1>
      <p className="text-gray-600 mt-1">
        Siparişi tamamlamadan önce ürünlerinizi kontrol ediniz.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="lg:col-span-4">
          <div className="sticky top-6 rounded-xl border bg-white p-6 shadow-sm">
            <h1 className="text-lg font-semibold text-gray-800">Sepet Özeti</h1>
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
                <span>
                  {items.reduce((adet, item) => adet + item.quantity, 0)}
                </span>
              </div>
              <div className="flex justify-between border-t pt-3 text-base">
                <span className="font-semibold">Toplam</span>
                <span className="font-bold text-indigo-600">
                  {formatPrice(total)}
                </span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-5 block text-center w-full rounded-lg bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 transition"
            >
              Ödeme Adımına Geç
            </Link>
            <button
              onClick={handleClearCart}
              className="mt-3 w-full rounded-lg border px-5 py-3 font-medium hover:bg-gray-50 text-gray-700"
            >
              Sepeti Boşalt
            </button>
            <p className="mt-3 text-xs text-gray-500 text-center">
              1000₺ üzeri siparişlerde kargo ücretsiz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
