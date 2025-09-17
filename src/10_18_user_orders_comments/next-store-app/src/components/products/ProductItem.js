import Link from "next/link";
import { formatPrice } from "@/utils/format";
import AddToCartButton from "./AddToCartButton";

export default function ProductsItem({ product }) {
  return (
    <div className="product border border-gray-200 rounded-lg bg-white p-6 shadow-sm">
      <div className="h-56 w-full">
        <a href="#">
          <img
            className="mx-auto h-full"
            src={product.images?.[0]?.image || "img/no-image.jpg"}
            alt=""
          />
        </a>
      </div>
      <div className="pt-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <span className="me-2 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
            35% off
          </span>
          <div>
            <button
              data-tooltip-target="tooltip-add-to-favorites1"
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#666666"
              >
                <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
              </svg>
            </button>

            <div
              id="tooltip-add-to-favorites1"
              className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300"
            >
              Add to favorites
              <div className="tooltip-arrow" data-popper-arrow></div>
            </div>
          </div>
        </div>

        <Link
          href={`/products/${product.slug}`}
          className="text-lg font-semibold leading-tight text-gray-900 hover:underline overflow-hidden"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            minHeight: "3rem",
          }}
        >
          {product.name}
        </Link>

        <div className="mt-4 flex items-center justify-between gap-4">
          <p className="text-base font-bold leading-tight text-gray-900">
            {formatPrice(product.price)}
          </p>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
