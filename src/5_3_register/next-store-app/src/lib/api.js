import api from "./axios";

export const get_categories = async () => {
  const res = await api.get("categories");
  return res.data;
};

export const get_product_by_id = async (id) => {
  const res = await api.get(`products/${id}`);
  return res.data;
};

export const get_product_by_slug = async (slug) => {
  const res = await api.get(`products/${slug}`);
  return res.data;
};

export const get_products = async ({ isHome, page, category }) => {
  const params = {};

  if (typeof isHome !== "undefined") {
    params.isHome = isHome;
  }

  if (typeof page !== "undefined") {
    params.page = page;
  }

  if (typeof category !== "undefined") {
    params.category = category;
  }

  const res = await api.get("products", { params });
  return res.data;
};

export const login = async (email, password) => {
  try {
    const res = await api.post("users/login", { email, password });

    localStorage.setItem("access", res.data.token.access);
    localStorage.setItem("refresh", res.data.token.refresh);

    return res.data;
  } catch (error) {
    if (error.response?.data) {
      throw new Error(error.response.data.message || "Giriş başarısız.");
    }
    throw new Error("Hata oluştu.");
  }
};

export const register = async (formData) => {
  try {
    const res = await api.post("users/signup", formData);
    return res.data;
  } catch (error) {
    if (error.response?.data) {
      const data = error.response.data.detail;
      throw new Error(data);
    }
    throw new Error("Hata oluştu.");
  }
};
