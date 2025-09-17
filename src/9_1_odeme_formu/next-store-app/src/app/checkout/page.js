"use client";

import AddressList from "@/components/addresses/AddressList";
import PaymentForm from "@/components/checkout/PaymentForm";
import OrderSummary from "@/components/orders/OrderSummary";
import { useState } from "react";

export default function CheckoutPage() {
  const [paymentData, setPaymentData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  function handleCompleteOrder() {
    console.log(selectedAddress);
    console.log(paymentData);
  }

  return (
    <div className="max-w-screen-xl px-4 mx-auto py-3 mt-4">
      <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      <p className="text-gray-600 mt-1">
        Siparişi tamamlamadan önce ürünlerinizi kontrol ediniz.
      </p>
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
    </div>
  );
}
