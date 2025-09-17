import ProductList from "@/components/products/ProductList";
import { get_products } from "@/lib/api";

export default async function ProductsPage() {
  const products = await get_products();

  return (
    <>
      <ProductList products={products.results} />
    </>
  );
}
