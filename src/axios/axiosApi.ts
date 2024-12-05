import axios from "axios";

// Create an Axios instance
const axiosClient = axios.create({
  baseURL: "http://localhost:8000", // Replace with your API base URL
  timeout: 10000, // Optional timeout
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    // Set your custom header
    config.headers["authToken"] = token;
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

export default axiosClient;
