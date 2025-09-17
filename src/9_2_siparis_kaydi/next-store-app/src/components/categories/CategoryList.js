import CategoryItem from "./CategoryItem";

export default function CategoryList({ categories }) {
  return (
    <section className="bg-gray-50 py-8 md:py-16">
      <div className="max-w-screen-xl px-4 mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <CategoryItem category={category} key={category.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
