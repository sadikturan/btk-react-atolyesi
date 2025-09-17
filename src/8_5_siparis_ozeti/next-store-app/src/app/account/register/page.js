"use client";

import { useEffect, useState } from "react";
import { register } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/store/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
    phone: "",
  });

  const [localError, setLocalError] = useState("");

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLocalError("");

    if (form.password !== form.password2) {
      setLocalError("şifreler uyuşmuyor.");
      return;
    }

    dispatch(registerUser(form));
  };

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-5">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Kayıt Ol
        </h2>

        {localError && (
          <p className="text-red-500 mb-4 list-disc text-sm">{localError}</p>
        )}

        {error && (
          <ul className="text-red-500 mb-4 list-disc text-sm">
            {error.split("|").map((msg, i) => (
              <li key={i}>{msg.trim()}</li>
            ))}
          </ul>
        )}

        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Ad
            </label>
            <input
              type="text"
              name="first_name"
              placeholder="Adınız"
              required
              value={form.first_name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Soyad
            </label>
            <input
              type="text"
              name="last_name"
              placeholder="Soyadınız"
              required
              value={form.last_name}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Telefon"
              required
              value={form.phone}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              E-posta
            </label>
            <input
              type="email"
              name="email"
              placeholder="ornek@email.com"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              value={form.password}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Şifre Tekrar
            </label>
            <input
              type="password"
              name="password2"
              placeholder="••••••••"
              required
              value={form.password2}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-green-500 px-4 py-2 text-white font-medium hover:bg-green-600 transition disabled:opacity-50"
          >
            Kayıt Ol
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-6">
          Zaten hesabın var mı?
          <Link
            href="/account/login"
            className="text-green-600 font-medium hover:underline"
          >
            Giriş Yap
          </Link>
        </p>
      </div>
    </div>
  );
}
