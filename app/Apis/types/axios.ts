import axios from "axios";
import Cookies from "js-cookie"; // Use js-cookie for client-side cookies

const baseURL = "https://mbnakomapis-production.up.railway.app/api";
//const baseURL = "http://localhost:5209/api";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("MbnakomAPISToken"); // Get the token from client-side cookies
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token in the Authorization header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Reject the promise on error
  }
);

export default axiosInstance;
