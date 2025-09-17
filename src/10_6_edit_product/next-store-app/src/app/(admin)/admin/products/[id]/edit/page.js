"use client";

import ProductForm from "@/components/admin/ProductForm";
import { useParams } from "next/navigation";

export default function EditProduct() {
  const params = useParams();
  const { id } = params;
  return <ProductForm productId={id} />;
}
