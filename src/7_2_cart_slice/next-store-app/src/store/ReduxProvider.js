"use client";

import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { loadUserFromStorage } from "./authSlice";
import { loadCartFromStorage } from "./cartSlice";

function InitAuth() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadCartFromStorage());
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return null;
}

export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      <InitAuth />
      {children}
    </Provider>
  );
}
