import CategoryList from "@/components/categories/CategoryList";
import Header from "@/components/common/Header";
import FeaturedProductList from "@/components/products/FeaturedProductList";

export default function Home() {
  return (
    <>
      <Header />
      <CategoryList />
      <FeaturedProductList />
    </>
  );
}
