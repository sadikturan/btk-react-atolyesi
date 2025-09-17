"use client";
import { configureStore, createReducer } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import cartReducer from "./cartSlice";
import { setupInterceptors } from "@/lib/setupInterceptors";
import api from "@/lib/axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
  },
});

setupInterceptors(api, store);
