import axios from "./axiosInstance";

export const getCart = async () => {
  const res = await axios.get("user/cart", { withCredentials: true });
  return res.data.cart;
};

export const addToCart = async ({ productId, quantity }) => {
  const res = await axios.post(
    "user/cart",
    { productId, quantity },
    { withCredentials: true }
  );
  return res.data;
};

export const updateCartItem = async ({ productId, quantity }) => {
  const res = await axios.put(
    `user/cart/${productId}`,
    { quantity },
    { withCredentials: true }
  );
  return res.data;
};

export const removeCartItem = async (productId) => {
  const res = await axios.delete(`user/cart/${productId.productId}`, {
    withCredentials: true,
  });
  return res.data;
};