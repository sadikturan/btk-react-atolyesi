import Link from "next/link";

export default function Pagination({ page, totalPages, previous, next }) {
  if (totalPages <= 1) return null;

  return (
    <div class="flex justify-center mt-8">
      <nav class="inline-flex space-x-1">
        {previous && (
          <Link
            class="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
            href={`/products?page=${page - 1}`}
          >
            Önceki
          </Link>
        )}

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <Link
            key={num}
            href={`/products?page=${num}`}
            className={`px-3 py-1 rounded-md border
                    ${
                      num == page
                        ? "bg-indigo-500 text-white border-indigo-500"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
                    }`}
          >
            {num}
          </Link>
        ))}

        {next && (
          <Link
            class="px-3 py-1 rounded-md border border-gray-300 bg-white hover:bg-gray-100"
            href={`/products?page=${page + 1}`}
          >
            Sonraki
          </Link>
        )}
      </nav>
    </div>
  );
}
