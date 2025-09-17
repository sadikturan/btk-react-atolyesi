"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function AdminGuard({ children }) {
  const user = useSelector((state) => state.auth.user);
  const [authorized, setAuthorized] = useState(null);

  useEffect(() => {
    setAuthorized(user?.role === "admin");
  }, [user]);

  if (authorized === null) {
    return <p className="text-center py-10">Kontrol ediliyor...</p>;
  }

  if (!authorized) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Bu sayfa yetki gerektiriyor.
        </h1>
        <p className="text-gray-600">
          Bu içeriği görüntülemek için admin yetkisine sahip olmalısınız.
        </p>
        <Link
          href="/"
          className="mt-5 text-center rounded-lg bg-indigo-600 px-5 py-3 text-white font-medium hover:bg-indigo-700 transition"
        >
          Anasayfa
        </Link>
      </div>
    );
  }

  return children;
}
