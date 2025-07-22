import axios from "./axiosInstance";

export const searchProducts = async(query) => {
  const response = await axios.get(`/products/search?q=${encodeURIComponent(query)}`);
  return response?.data;
}