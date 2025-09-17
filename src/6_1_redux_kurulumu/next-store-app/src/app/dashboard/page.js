"use client";
import { loginSuccess, logout } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Dashboard() {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      loginSuccess({
        user: { email: "info@sadikturan.com" },
        access: "12345",
        refresh: "12345",
      })
    );
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <h1>Hoş geldiniz. {user?.email}</h1>
          <button onClick={() => dispatch(logout())}>Çıkış Yap</button>
        </>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
}
