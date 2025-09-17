import { signout, updateAccessToken } from "@/store/authSlice";
import { store } from "@/store/store";

function getTokens() {
  if (typeof window !== "undefined") {
    return {
      access: localStorage.getItem("access"),
      refresh: localStorage.getItem("refresh"),
    };
  }
  return { access: null, refresh: null };
}

export function setupInterceptors(api, store) {
  async function refreshToken() {
    try {
      const { refresh } = getTokens();
      if (!refresh) return null;

      const res = await axios.post(
        "http://127.0.0.1:8000/api/users/token/refresh",
        {
          refresh,
        }
      );

      const newAccessToken = res.data.access;

      if (newAccessToken) {
        store.dispatch(updateAccessToken(newAccessToken));
        return newAccessToken;
      }
    } catch {
      store.dispatch(signout());
      return null;
    }
  }

  api.interceptors.request.use((config) => {
    const { access } = getTokens();

    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        const originalRequest = error.config;
        const newToken = await refreshToken();

        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      }
      return Promise.reject(error);
    }
  );
}
