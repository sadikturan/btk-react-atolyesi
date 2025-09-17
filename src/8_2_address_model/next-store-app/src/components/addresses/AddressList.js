"use client";

import { get_addresses } from "@/lib/api";
import { useEffect, useState } from "react";
import AddressModal from "./AddressModal";

export default function AddressList() {
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchAddressList = async () => {
    setLoading(true);
    try {
      const res = await get_addresses();
      setAddressList(res.data);
    } catch (error) {
      console.log("Adresler alınamadı:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => setIsModalOpen(true);

  useEffect(() => {
    fetchAddressList();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Adresler yükleniyor...</p>;
  }

  return (
    <div>
      <div>
        <div>
          {addressList.length === 0 && (
            <p className="text-gray-500">Henüz adres eklemediniz.</p>
          )}
        </div>
        <div>
          <button
            onClick={handleAddClick}
            className="mt-4 text-red-500 hover:underline cursor-pointer"
          >
            Yeni Adres
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {addressList.map((address) => (
            <div
              key={address.id}
              className={`relative cursor-pointer rounded-lg border p-4 shadow-sm transition hover:shadow-md ${
                selected === address.id
                  ? "border-indigo-600 ring-2 ring-indigo-500"
                  : "border-gray-200"
              }`}
            >
              <div
                onClick={() => {
                  setSelected(address.id);
                }}
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold text-gray-800">
                    {address.full_name}
                  </h3>
                  {address.is_default && (
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                      Varsayılan
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mt-1">
                  {address.district}, {address.city}
                </p>
                <p className="text-gray-600 text-sm mt-1">
                  Adres Tipi: {address.address_type}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
