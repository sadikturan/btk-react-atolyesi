import api from "./axios";

export const get_categories = async () => {
  const res = await api.get("categories");
  return res.data;
};

export const get_products = async (isHome) => {
  const params = {};

  if (typeof isHome !== "undefined") {
    params.isHome = isHome;
  }

  const res = await api.get("products", { params });
  return res.data;
};
