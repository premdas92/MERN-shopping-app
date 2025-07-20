import axios from "./axiosInstance";

export const placeOrderApi = async ({ cartItems, shippingDetails }) => {
  const response = await axios.post(
    `user/orders/place`,
    {
      cartItems,
      shippingDetails,
    },
    { withCredentials: true }
  );
  return response.data;
};
