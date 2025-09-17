"use client";

import CategoryForm from "@/components/admin/CategoryForm";
import { useParams } from "next/navigation";

export default function EditCategory() {
  const { id } = useParams();
  return <CategoryForm categoryId={id} />;
}
