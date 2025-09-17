import api from "./axios";

export const get_categories = async () => {
  const res = await api.get("categories");
  return res.data;
};

// /products?isHome=true&category=telefon&page=1
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
