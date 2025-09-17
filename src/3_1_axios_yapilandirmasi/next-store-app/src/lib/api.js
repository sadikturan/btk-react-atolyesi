import api from "./axios";

export const get_categories = async () => {
  const res = await api.get("categories/");
  return res.data;
};

export const get_products = async () => {
  const res = await api.get("products");
  return res.data;
};
