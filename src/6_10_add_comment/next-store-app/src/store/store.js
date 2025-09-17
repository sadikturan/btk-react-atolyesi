"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { setupInterceptors } from "@/lib/setupInterceptors";
import api from "@/lib/axios";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

setupInterceptors(api, store);
