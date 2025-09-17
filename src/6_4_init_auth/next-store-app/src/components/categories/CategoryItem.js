import Link from "next/link";

export default function CategoryItem({ category }) {
  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="flex
             flex-col justify-center items-center gap-3 bg-white p-5 rounded-lg cursor-pointer border border-gray-200 hover:shadow hover:bg-gray-100"
    >
      <div
        className="h-16"
        dangerouslySetInnerHTML={{ __html: category.icon }}
      ></div>
      <span className="text-base lg:text-lg font-semibold">
        {category.name}
      </span>
    </Link>
  );
}
