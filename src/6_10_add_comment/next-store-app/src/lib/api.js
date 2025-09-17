import api from "./axios";

export const get_categories = async () => {
  const res = await api.get("categories");
  return res.data;
};

export const get_admin_categories = async () => {
  const res = await api.get("categories/admin/");
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
  const res = await api.post("users/login", { email, password });
  return res.data; // {user, token}
};

export const register = async (formData) => {
  const res = await api.post("users/signup", formData);
  return res.data;
};

export const post_comment = async (formData) => {
  const res = await api.post(
    `comments/${formData.product_id}/create`,
    formData
  );
  return res.data;
};
