import AddToCartButton from "@/components/products/AddToCartButton";
import AddToFavouriteButton from "@/components/products/AddToFavouriteButton";
import ProductImageSlider from "@/components/products/ProductImageSlider";
import StarRating from "@/components/comments/StarRating";
import { get_product_by_slug } from "@/lib/api";
import { formatPrice } from "@/utils/format";
import Comments from "@/components/comments/Comments";

export default async function ProductDetails({ params }) {
  const { slug } = await params;
  const product = await get_product_by_slug(slug);

  const avgRating =
    product.comments.length > 0
      ? product.comments.reduce((acc, c) => acc + c.rating, 0) /
        product.comments.length
      : 0;

  return (
    <section className="py-8 bg-white md:py-16">
      <div className="max-w-screen-xl px-4 mx-auto">
        <div className="lg:grid lg:grid-cols-3 lg:gap-4 xl:gap-8">
          <div className="lg:col-span-1 mx-auto">
            <ProductImageSlider images={product.images || []} />
          </div>
          <div className="lg:col-span-2 mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {product.name}
            </h1>
            <div className="mt-4 sm:flex sm:items-center sm:gap-4">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {formatPrice(product.price)}
              </p>

              <StarRating rating={avgRating} readOnly />
              <a
                href="#"
                className="text-sm font-medium text-gray-900 underline hover:no-underline"
              >
                {product.comments.length} Değerlendirme
              </a>
            </div>

            <div className="mt-6 sm:flex sm:items-center sm:gap-4 sm:mt-8 space-y-2 sm:space-y-0">
              <AddToFavouriteButton />
              <AddToCartButton product={product} />
            </div>

            <hr className="my-6 md:my-8 border-gray-200" />

            <p
              className="mb-6 text-gray-500"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></p>
          </div>
        </div>
        <Comments comments={product.comments} product_id={product.id} />
      </div>
    </section>
  );
}
