import CategoryItem from "./CategoryItem";

export default function CategoryList({ categories }) {
  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <div className="max-w-screen-xl px-4 mx-auto">
        <div className="mb-4 flex items-center justify-end md:mb-8">
          <a
            href="#"
            className="flex items-center font-medium text-blue-700 hover:underline"
          >
            See more categories
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
