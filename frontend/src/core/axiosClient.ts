import axios, {
  AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";
import { BASE_URL } from "./constants";

const axiosClient = axios.create({
  baseURL: BASE_URL,
});

type TokenAccessor = {
  getAccessToken: () => string | null;
  getRefreshToken: () => string | null;
  setAccessToken: (token: string) => void;
  clearTokens: () => void;
};

let tokenAccessor: TokenAccessor = {
  getAccessToken: () => null,
  getRefreshToken: () => null,
  setAccessToken: () => {},
  clearTokens: () => {},
};

export function registerTokenAccessor(accessor: TokenAccessor) {
  tokenAccessor = accessor;
}

function getAccessToken(): string | null {
  return tokenAccessor.getAccessToken();
}

function getRefreshToken(): string | null {
  return tokenAccessor.getRefreshToken();
}

function setAccessToken(token: string): void {
  tokenAccessor.setAccessToken(token);
}

function clearTokens(): void {
  tokenAccessor.clearTokens();
}

axiosClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Refresh handling
let isRefreshing = false;
let pendingQueue: {
  resolve: (token: string) => void;
  reject: (err: unknown) => void;
}[] = [];

function processQueue(error: unknown, token: string | null = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else if (token) {
      resolve(token);
    }
  });
  pendingQueue = [];
}

// Refresh token on 401
axiosClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // Queue this request until the in-flight refresh finishes
      return new Promise((resolve, reject) => {
        pendingQueue.push({
          resolve: (token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosClient(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) throw new Error("No refresh token available");

      const { data } = await axios.post("/api/auth/refresh", {
        refreshToken,
      });

      const newAccessToken = data.accessToken;
      setAccessToken(newAccessToken);

      processQueue(null, newAccessToken);

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return axiosClient(originalRequest);
    } catch (refreshError) {
      processQueue(refreshError, null);
      clearTokens();
      // Redirect to login, or let calling code handle it
      window.location.href = "/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosClient;