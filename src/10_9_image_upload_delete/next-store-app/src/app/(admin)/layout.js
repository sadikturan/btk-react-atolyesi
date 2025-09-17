import Navbar from "@/components/admin/Navbar";
import AdminGuard from "@/components/auth/AdminGuard";

export default function AdminLayout({ children }) {
  return (
    <AdminGuard>
      <Navbar />
      <div className="max-w-screen-xl px-4 mx-auto py-3 mt-4">{children}</div>
    </AdminGuard>
  );
}
