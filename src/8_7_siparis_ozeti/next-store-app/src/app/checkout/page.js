import AddressList from "@/components/addresses/AddressList";
import OrderSummary from "@/components/orders/OrderSummary";

export default function CheckoutPage() {
  return (
    <div className="max-w-screen-xl px-4 mx-auto py-3 mt-4">
      <h1 className="text-3xl font-bold text-gray-800">Checkout</h1>
      <p className="text-gray-600 mt-1">
        Siparişi tamamlamadan önce ürünlerinizi kontrol ediniz.
      </p>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-4">
          <AddressList />
        </div>
        <div className="lg:col-span-4">
          <div className="sticky top-6 rounded-xl border bg-white p-6 shadow-sm">
            <OrderSummary />
          </div>
        </div>
      </div>
    </div>
  );
}
