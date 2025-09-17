import { get_product_by_slug } from "@/lib/api";

export default async function ProductDetails({ params }) {
  const product = await get_product_by_slug(params.slug);

  return <h1>{product.name}</h1>;
}
