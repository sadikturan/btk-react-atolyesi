import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-6 py-10 rounded-xl bg-white/70 shadow-sm">
        <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center text-3xl text-indigo-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#1f1f1f"
          >
            <path d="M280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM246-720l96 200h280l110-200H246Zm-38-80h590q23 0 35 20.5t1 41.5L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68-39.5t-2-78.5l54-98-144-304H40v-80h130l38 80Zm134 280h280-280Z" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-gray-800">Sepetiniz boş</h2>
        <p className="mt-2 text-gray-600">
          Alışverişe başlamak için bir ürün sayfasına gidebilirsiniz.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 text-white px-5 py-2 hover:bg-indigo-700 transition"
        >
          Alışverişe Dön
        </Link>
      </div>
    </div>
  );
}
