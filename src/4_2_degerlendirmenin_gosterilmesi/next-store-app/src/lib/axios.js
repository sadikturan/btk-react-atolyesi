import axios from "axios";

const api = axios.create({
  baseURL: process.env.PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// api.interceptors.request.use()
// api.interceptors.response.use()

export default api;
