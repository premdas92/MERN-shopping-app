import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true, // to send cookies
});

// Interceptor to refresh token if 401
// axiosInstance.interceptors.response.use(
//   res => res,
//   async (err) => {
//     const originalRequest = err.config;

//     if (err.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const { data } = await axiosInstance.get("/refresh-token");
//         // Optional: update Redux store here if needed
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh failed", refreshError);
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(err);
//   }
// );

export default axiosInstance;
