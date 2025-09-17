import CategoryList from "@/components/categories/CategoryList";
import Header from "@/components/common/Header";
import FeaturedProductList from "@/components/products/FeaturedProductList";
import { get_categories, get_products } from "@/lib/api";

export default async function Home() {
  const categories = await get_categories();
  const products = await get_products({ isHome: true });

  console.log(products);

  return (
    <>
      <Header />
      <CategoryList categories={categories} />
      <FeaturedProductList products={products.results} />
    </>
  );
}
