"use client";
import { get_admin_users } from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function UserListPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await get_admin_users();
        setUsers(res);
      } catch (err) {
        console.log("Kullacılar alınamadı", err);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Kullanıcılar yükleniyor...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Kullanıcı Listesi</h1>

      <table className="min-w-full border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Id</th>
            <th className="p-2">Ad</th>
            <th className="p-2">Email</th>
            <th className="p-2">Telefon</th>
            <th className="p-2">Rol</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-50 border-b border-gray-100"
            >
              <td className="p-2">{user.id}</td>
              <td className="p-2">
                {user.first_name} {user.last_name}
              </td>
              <td className="p-2">{user.email}</td>
              <td className="p-2">{user.phone}</td>
              <td className="p-2">{user.role == "admin" ? "Admin" : "User"}</td>
              <td className="p-2">
                <Link
                  href={`/admin/users/${user.id}`}
                  className="bg-indigo-500 text-sm text-white px-2 py-1 rounded-sm hover:bg-indigo-700"
                >
                  Detay
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
