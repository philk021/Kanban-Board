import axios, {
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

export default axiosClient;