import { useRouter } from "next/navigation";

export default function OrderSuccess({ orderId }) {
  const router = useRouter();
  function handleClose() {
    router.push("/");
  }
  return (
    <div className="fixed inset-0 bg-gray-100 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <h2 className="text-2xl font-bold mb-4 text-green-600">
          Sipariş Başarılı!
        </h2>
        <p className="mb-4">
          Sipariş no: <span className="font-semibold">{orderId}</span>
        </p>
        <button
          onClick={handleClose}
          className="mt-5 block text-center w-full rounded-lg bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 transition"
        >
          Anasayfaya Dön
        </button>
      </div>
    </div>
  );
}
