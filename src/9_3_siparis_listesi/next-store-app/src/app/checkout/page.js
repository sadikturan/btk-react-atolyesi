"use client";

import AddressList from "@/components/addresses/AddressList";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderSuccess from "@/components/orders/OrderSuccess";
import OrderSummary from "@/components/orders/OrderSummary";
import { create_order } from "@/lib/api";
import { clearCart } from "@/store/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function CheckoutPage() {
  const [paymentData, setPaymentData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  async function handleCompleteOrder() {
    if (!selectedAddress || !paymentData) return;

    try {
      const res = await create_order({
        delivery_address_id: selectedAddress.id,
        billing_address_id: selectedAddress.id,
        card_data: {
          card_name: paymentData.cardName,
          card_number: paymentData.cardNumber,
          expiry_month: parseInt(paymentData.expiry.split("/")[0], 10),
          expiry_year: parseInt("20" + paymentData.expiry.split("/")[1], 10),
          cvc: paymentData.cvc,
        },
      });
      setOrderSuccess(res.data.order_id);
      dispatch(clearCart());
      console.log(res);
    } catch (err) {
      console.log("Sipariş hatası:", err);
      if (err.response.data?.error) {
        setError(err.response.data.error);
      }
    }
  }

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-3 mt-4">
      <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      <p className="text-gray-600 mt-1">
        Siparişi tamamlamadan önce ürünlerinizi kontrol ediniz.
      </p>
      {error && (
        <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50">
          {error}
        </div>
      )}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-4">
          <AddressList onSelect={setSelectedAddress} />
          <PaymentForm onChange={setPaymentData} />
        </div>
        <div className="lg:col-span-4">
          <div className="sticky top-6 rounded-xl border bg-white p-6 shadow-sm">
            <OrderSummary />
            <button
              className="mt-5 block text-center w-full rounded-lg bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 transition"
              onClick={handleCompleteOrder}
            >
              Siparişi Tamamla
            </button>
          </div>
        </div>
      </div>
      {orderSuccess && <OrderSuccess orderId={orderSuccess} />}
    </div>
  );
}
