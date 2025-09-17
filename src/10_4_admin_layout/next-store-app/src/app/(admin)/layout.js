import AdminGuard from "@/components/auth/AdminGuard";

export default function AdminLayout({ children }) {
  return <AdminGuard>{children}</AdminGuard>;
}
