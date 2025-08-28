import axios, { type AxiosError } from "axios";
import { CONFIG } from "@/lib/config";
import { supabase } from "@/lib/supabase";

export const API_URL =
  CONFIG.nodeEnv === "production"
    ? "https://dropfeedback-prod.up.railway.app"
    : "https://dropfeedback-prod.up.railway.app"; // http://localhost:8080

export type ApiError = AxiosError<{
  error: string;
  message: string;
  statusCode: number;
}>;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// auth header for axios
axiosInstance.interceptors.request.use(
  async (config) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    const { data } = await supabase.auth.getSession();
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const accessToken = data.session?.access_token;

    if (accessToken && config.headers) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error: ApiError) {
    const response = error?.response;
    if (!response) {
      return Promise.reject(error);
    }

    const status = response?.status;
    const message = response?.data?.message;

    if (typeof window !== "undefined") {
      if (status === 401 && message === "Invalid refresh token") {
        if (window.location.pathname !== "/login") {
          window.location.replace("/login");
        }
        return Promise.reject(error);
      }

      if (status === 403 && message === "Email is not verified") {
        if (window.location.pathname !== "/email-verification") {
          window.location.replace("/email-verification");
        }
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
