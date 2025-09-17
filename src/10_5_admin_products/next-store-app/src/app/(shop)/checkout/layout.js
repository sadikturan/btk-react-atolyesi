import AuthGuard from "@/components/auth/AuthGuard";

export default function CheckoutLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
