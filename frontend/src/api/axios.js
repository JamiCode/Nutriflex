import axios from "axios";
require("dotenv").config();

const API_KEY = "https://nutriflex-ai.up.railway.app";

const axios_ = axios.create({
  baseURL: API_KEY,
});

// Add a request interceptor
axios_.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
axios_.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // and response.data.detail is "bad_token", refresh the token
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      (error.response.data.detail === "invalid_access_token" ||
        error.response.data.code === "token_not_valid")
    ) {
      console.log(error.response.data);
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        const response = await axios_.post("/api/users/token/refresh", {
          refresh: refreshToken,
        });
        const { access, refresh } = response.data;

        sessionStorage.setItem("accessToken", access);
        sessionStorage.setItem("refreshToken", refresh);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return axios_(originalRequest);
      } catch (error) {
        // Handle refresh token error or redirect to login
        console.log(error);
      }
    }

    return Promise.reject(error);
  }
);

export default axios_;
