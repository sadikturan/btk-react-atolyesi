import { normalizeCart } from "@/utils/normalizeCart";
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

export const get_cart = async () => {
  const res = await api.get("carts");
  return normalizeCart(res.data);
};

export const add_to_cart = async (productId, quantity = 1) => {
  const res = await api.post("carts/add", { product_id: productId, quantity });
  return normalizeCart(res.data);
};

export const sync_cart = async (items) => {
  for (const item of items) {
    await add_to_cart(item.id, item.quantity);
  }
};

export const update_cart_item = async (id, quantity) => {
  const res = await api.put(`carts/update/${id}`, {
    quantity,
  });
  return normalizeCart(res.data);
};

export const delete_cart_item = async (id) => {
  const res = await api.delete(`carts/delete/${id}`);
  return normalizeCart(res.data);
};

export const clear_cart = async () => {
  const res = await api.delete("carts/clear");
  return normalizeCart(res.data);
};

export const get_addresses = async () => {
  return await api.get("addresses");
};

export const get_cities = async () => {
  return await api.get("addresses/cities");
};

export const create_address = async (data) => {
  const res = await api.post("addresses/", {
    full_name: data.full_name,
    phone: data.phone,
    address_line: data.address_line,
    district: data.district,
    city_id: data.city_id,
    street: data.street,
    postal_code: data.postal_code,
    address_type: data.address_type || "home",
    is_default: data.is_default || false,
  });
  return res;
};

export const create_order = async ({
  delivery_address_id,
  billing_address_id,
  card_data,
  coupon_code,
}) => {
  const res = await api.post("/orders/create", {
    delivery_address_id,
    billing_address_id,
    card_data,
    coupon_code,
  });
  return res;
};

export const get_orders = async () => {
  return await api.get("/orders");
};

export const get_order_detail = async (id) => {
  return await api.get(`/orders/${id}`);
};

export const get_admin_products = async () => {
  const res = await api.get("/products/admin/");
  return res.data;
};

export const create_admin_product = async (productData) => {
  const res = await api.post("/products/admin/create/", productData);
  return res.data;
};

export const update_admin_product = async (id, data) => {
  const res = await api.put(`/products/admin/${id}/edit/`, data);
  return res.data;
};

export const get_admin_product = async (id) => {
  const res = await api.get(`/products/admin/${id}`);
  return res.data;
};
