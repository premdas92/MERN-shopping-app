import axios from "./axiosInstance";

export const fetchProducts = async (category = "", page = 1, limit = 10) => {
  const response = await axios.get(
    `/products/category/${category}?page=${page}&limit=${limit}`
  );
  return response?.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`/products/${id}`);
  return response?.data;
};
