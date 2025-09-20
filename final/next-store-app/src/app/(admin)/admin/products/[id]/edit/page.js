"use client";

import ProductForm from "@/components/admin/ProductForm";
import {
  delete_admin_product_image,
  get_product_images,
  upload_product_image,
} from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

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

  async function handleDelete(imageId) {
    try {
      await delete_admin_product_image(imageId);
      setImages((prev) => prev.filter((img) => img.id !== imageId));
    } catch (err) {
      console.log("Resim silinemedi: ", err);
    }
  }

  async function handleUpload(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", file);

    try {
      await upload_product_image(id, formData);
      setFile(null);

      const res = await get_product_images(id);
      setImages(res);
    } catch (err) {
      console.log("Yükleme hatası", err);
    }
  }

  return (
    <div className="grid grid-cols-12 gap-6">
      <div className="col-span-8 bg-white p-4 rounded shadow">
        <ProductForm productId={id} />
      </div>
      <div className="col-span-4 bg-white p-4 rounded shadow">
        <h2 className="text-lg  font-bold mb-4">Ürün Görselleri</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="border border-gray-200 rounded overflow-hidden flex flex-col items-ceter m-2"
            >
              <Image
                src={img.image}
                alt={img.alt_text}
                className="w-full h-32 object-cover"
              />
              <button
                onClick={() => handleDelete(img.id)}
                className="mt-2 bg-red-600 text-white px-3 py-1  text-sm rounded hover:bg-red-700"
              >
                Sil
              </button>
            </div>
          ))}
        </div>
        <form className="space-y-3" onSubmit={handleUpload}>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-700
             file:py-2 file:px-4
             file:bg-gray-600 file:text-white
             file:font-semibold file:rounded-sm
             hover:file:bg-gray-700
             focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            Yükle
          </button>
        </form>
      </div>
    </div>
  );
}
