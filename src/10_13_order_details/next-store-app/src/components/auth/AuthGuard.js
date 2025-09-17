"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AuthGuard({ children }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/account/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p className="text-center py-10">Yönlendiriliyorsunuz...</p>;
  }

  return children;
}
