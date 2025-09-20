import {
  addToCart,
  decreaseQuantity,
  deleteCartItemDb,
  removeFromCart,
  updateCartItemDb,
} from "@/store/cartSlice";
import { formatPrice } from "@/utils/format";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/link";

export default function CartItem({ item }) {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleIncrease = () => {
    if (isAuthenticated) {
      dispatch(updateCartItemDb({ id: item.id, quantity: item.quantity + 1 }));
    } else {
      dispatch(addToCart(item));
    }
  };

  const handleDecrease = () => {
    if (isAuthenticated) {
      dispatch(updateCartItemDb({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(decreaseQuantity(item.id));
    }
  };

  const handleRemove = () => {
    if (isAuthenticated) {
      dispatch(deleteCartItemDb(item.id));
    } else {
      dispatch(removeFromCart(item.id));
    }
  };

  return (
    <div
      key={item.id}
      className="flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm hover:shadow-md"
    >
      <div className="w-16 h-16 flex-shrink-0">
        <Image
          src={item.image || "placeholder.jpg"}
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
              onClick={handleDecrease}
              className="px-3 py-2 hover:bg-gray-100 rounded-l-lg"
            >
              -
            </button>
            <span className="px-4 py-2 text-sm font-medium">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
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
              onClick={handleRemove}
              className="text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg text-sm font-medium transion"
            >
              Kaldır
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
