import AuthGuard from "@/components/auth/AuthGuard";

export default function OrderLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
