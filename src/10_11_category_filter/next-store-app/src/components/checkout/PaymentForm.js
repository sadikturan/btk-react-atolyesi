"use client";

import { useEffect, useState } from "react";

export default function PaymentForm({ onChange }) {
  const [cardName, setCartName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  useEffect(() => {
    if (onChange) {
      onChange({
        cardName,
        cardNumber,
        expiry,
        cvc,
      });
    }
  }, [cardName, cardNumber, expiry, cvc, onChange]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h2 className="text-lg font-semibold mb-4">Kredi Kartı ile Ödeme</h2>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="Kart üzerindeki isim"
          value={cardName}
          onChange={(e) => setCartName(e.target.value)}
          className="w-full border border-gray-200 p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Kart numarası"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border border-gray-200 p-2 rounded"
          required
        />
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="AA/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
            className="w-full border border-gray-200 p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="CVV"
            value={cvc}
            onChange={(e) => setCvc(e.target.value)}
            className="w-full border border-gray-200 p-2 rounded"
            required
          />
        </div>
      </div>
    </div>
  );
}
