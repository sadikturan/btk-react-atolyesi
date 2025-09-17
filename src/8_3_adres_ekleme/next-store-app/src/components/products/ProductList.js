import AddToCartButton from "./AddToCartButton";
import NoProducts from "./NoProducts";
import ProductsItem from "./ProductItem";

export default function ProductList({ products }) {
  if (products.length == 0) return <NoProducts />;
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 md:mb-8">
          {products.map((productItem) => (
            <ProductsItem product={productItem} key={productItem.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
