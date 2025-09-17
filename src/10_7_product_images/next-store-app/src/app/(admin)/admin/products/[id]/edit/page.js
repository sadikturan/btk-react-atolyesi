"use client";

import ProductForm from "@/components/admin/ProductForm";
import { get_product_images } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditProduct() {
  const { id } = useParams();
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const res = await get_product_images(id);
        setImages(res);
      } catch (err) {
        console.log("Görseller alınamadı:", err);
      }
    }
    fetchImages();
  }, [id]);

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 bg-whitep-4 rounded shadow p-3">
        <ProductForm productId={id} />
      </div>
      <div className="col-span-4 bg-whitep-4 rounded shadow p-3">
        <h2 className="text-lg  font-bold mb-4">Ürün Görselleri</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="border border-gray-200 rounded overflow-hidden flex justify-center m-2"
            >
              <img
                src={img.image}
                alt={img.alt_text}
                className="w-fulll h-32 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
