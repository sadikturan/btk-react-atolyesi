import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

function getTokens() {
  if (typeof window !== "undefined") {
    return {
      access: localStorage.getItem("access"),
      refresh: localStorage.getItem("refresh"),
    };
  }
  return { access: null, refresh: null };
}

api.interceptors.request.use((config) => {
  const { access } = getTokens();

  if (access) {
    config.headers.Authorization = `Bearer ${access}`;
  }
  return config;
});

// api.interceptors.response.use()

export default api;
