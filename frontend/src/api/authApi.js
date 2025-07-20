import axios from "./axiosInstance";

export const signup = async ({ name, email, password }) => {
  const res = await axios.post("/auth/signup", { name, email, password });
  return res?.data;
};

export const login = async ({ email, password }) => {
  const res = await axios.post("/auth/login", { email, password });
  return res.data;
};

export const logout = async () => {
  const res = await axios.post("/auth/logout", {}, { withCredentials: true });
  return res.data;
};

export const fetchUser = async () => {
  const res = await axios.get("/user/current");
  return res.data?.data;
};
