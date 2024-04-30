import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import Cookies from "js-cookie";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  //   timeout: 1000,
});

async function refreshToken() {
  try {
    const response = await axiosInstance.post(
      "auth/token/refresh/",
      {
        refresh: Cookies.get("refreshToken"),
      },
      {
        noAuth: true,
      }
    );
    const { access } = response.data;
    Cookies.set("token", access, { expires: 1 });
    return access;
  } catch (error) {
    console.error("Unable to refresh token", error);
    return null;
  }
}

axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  if (config.noAuth) {
    delete config.headers.Authorization;
  }
  return config;
});

// Adding response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config;
    console.log(error.response, "error.response");
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newToken = await refreshToken();
      console.log(newToken, "newTokennewTokennewToken");

      if (newToken) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
