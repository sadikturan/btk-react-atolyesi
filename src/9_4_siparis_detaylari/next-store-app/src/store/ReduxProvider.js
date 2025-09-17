"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { store } from "./store";
import { useEffect } from "react";
import { loadUserFromStorage } from "./authSlice";
import { fecthCart, loadCartFromStorage } from "./cartSlice";

function InitAuth() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadUserFromStorage());

    if (isAuthenticated) {
      dispatch(fecthCart());
    } else {
      dispatch(loadCartFromStorage());
    }
  }, [dispatch, isAuthenticated]);

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
