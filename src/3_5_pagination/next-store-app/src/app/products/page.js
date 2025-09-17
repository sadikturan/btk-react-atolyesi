import Pagination from "@/components/products/Pagination";
import ProductList from "@/components/products/ProductList";
import { get_products } from "@/lib/api";

export default async function ProductsPage(props) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams?.page) || 1;

  const data = await get_products({ page });
  const products = data.results || [];

  const PAGE_SIZE = 8;

  const totalPages = Math.ceil(data.count / PAGE_SIZE);

  return (
    <>
      <ProductList products={products} />
      <Pagination
        page={page}
        totalPages={totalPages}
        previous={data.previous}
        next={data.next}
      />
    </>
  );
}
