import axios, { AxiosRequestConfig } from "axios";
import { environment } from "../config";

const api = axios.create({
  baseURL: environment.BASE_URL_DEV,
  withCredentials: true,
});

let hasRun = false;

async function requestRefreshToken() {
  return await api.post(`/token`);
}

let originalRequestConfig: AxiosRequestConfig<any> | null = null;

// Request interceptor to store original request details
api.interceptors.request.use(
  (config) => {
    // Should only run when the request is false
    if (!hasRun) {
      originalRequestConfig = config; // Store the original request configuration
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response && error.response.status === 401) {
      try {
        // As long as it is false it will not change the request
        hasRun = true;
        console.log("Requesting refresh token");
        await requestRefreshToken();

        if (originalRequestConfig) {
          console.log("Making new request!", originalRequestConfig);
          const retryResponse = await api(originalRequestConfig);
          console.log("Retry response:", retryResponse.data);
          return retryResponse;
        }
      } catch (refreshError) {
        console.error("Refresh token failed or counter reached 0:", refreshError
        );

        console.log("User logged out due to token refresh failure");

        try {
          localStorage.setItem("user", "null");
          const logoutResponse = await api.post(`/auth/logout`);
          console.log("Logout response:", logoutResponse);
        } catch (logoutError: any) {
          console.log("Error signing user out:", logoutError);
          throw logoutError;
        }

        return Promise.reject(refreshError);
      }
    }

    // For other errors, return the error response as-is
    return Promise.reject(error);
  }
);

export default api;
