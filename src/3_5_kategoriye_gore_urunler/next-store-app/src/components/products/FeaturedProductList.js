import AddToCartButton from "./AddToCartButton";
import ProductsItem from "./ProductItem";

export default function FeaturedProductList({ products }) {
  return (
    <section className="bg-white py-8 md:py-12">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="mb-4 flex items-center justify-between md:mb-8">
          <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
            Featured Products
          </h1>
          <a
            href="#"
            className="flex items-center font-medium text-blue-700 hover:underline"
          >
            See more products
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="currentColor"
            >
              <path d="m560-240-56-58 142-142H160v-80h486L504-662l56-58 240 240-240 240Z" />
            </svg>
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 md:mb-8">
          {products.map((productItem) => (
            <ProductsItem product={productItem} key={productItem.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
