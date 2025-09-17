"use client";

import { addToCart, decreaseQuantity, removeFromCart } from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md px-6 py-10 rounded-xl bg-white/70 shadow-sm">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-3xl text-indigo-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#1f1f1f"
            >
              <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-800">Sepetiniz boş</h2>
          <p className="mt-2 text-gray-600">
            Alışverişe başlamak için bir ürün sayfasına gidebilirsiniz.
          </p>
          <a
            href="/"
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-5 py-2 hover:bg-indigo-700 transition"
          >
            Alışverişe Dön
          </a>
        </div>
      </div>
    );
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
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm hover:shadow-md"
            >
              <div className="w-16 h-16 flex-shrink-0">
                <img
                  src={item.images[0].image || "placeholder.jpg"}
                  alt={item.name}
                  className="h-full w-hull object-cover object-center"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 truncate max-w-[200px] lg:max-w-lg">
                      {item.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-gray-500">
                      Stokta Hızlı Teslimat
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-indigo-600">
                      {formatPrice(item.price)}
                    </p>
                    <p className="text-xs text-gray-500">Birim fiyat</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <div className="inline-flex items-center rounded-lg border bg-gray-50">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item.id))}
                      className="px-3 py-2 hover:bg-gray-100 rounded-l-lg"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="px-3 py-2 hover:bg-gray-100 rounded-r-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="font-semibold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <button
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-sm font-medium transion"
                    >
                      Kaldır
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4"></div>
      </div>
    </div>
  );
}
