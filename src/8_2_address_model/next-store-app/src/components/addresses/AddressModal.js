import { useState } from "react";

export default function AddressModal({ onClose, isOpen }) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [addressLine, setAddressLine] = useState("");
  const [district, setDistrict] = useState("");
  const [cityId, setcityId] = useState("");
  const [street, setStreet] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressType, setAddressType] = useState("home");
  const [isDefault, setIsDefault] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cities, setCities] = useState([]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          X
        </button>
        <h2 className="text-lg font-semibold mb-4">Adres Ekle</h2>
        <form className="space-y-2">
          <input
            type="text"
            placeholder="Ad Soyad"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Telefon"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Adres"
            value={addressLine}
            onChange={(e) => setAddressLine(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Ilçe"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Sokak"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Posta Kodu"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <select
            value={addressType}
            onChange={(e) => setAddressType(e.target.value)}
            className="w-full border p-2 rounded"
            required
          >
            <option value="">Adres türü seçiniz</option>
            <option value="home">Home</option>
            <option value="work">Work</option>
            <option value="billing">Billing</option>
            <option value="shipping">Shipping</option>
          </select>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={isDefault}
              onChange={(e) => setIsDefault(e.target.checked)}
            />
            <span>Varsayılan adres olarak kaydet</span>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indig0-700"
          >
            {loading ? "Kaydediliyor..." : "Kaydet"}
          </button>
        </form>
      </div>
    </div>
  );
}
