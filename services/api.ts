import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;
const TOKEN_KEY = "token";

export type ApiErrorResponse = {
  status?: number;
  error?: string;
  message?: string;
};

export const tokenStorage = {
  get(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(TOKEN_KEY);
  },

  set(token: string): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(TOKEN_KEY, token);
  },

  remove(): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(TOKEN_KEY);
  },
};

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenStorage.get();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiErrorResponse>) => {
    const status = error.response?.status;

    if (typeof window !== "undefined" && status === 401) {
      tokenStorage.remove();

      const isLoginPage = window.location.pathname === "/login";
      if (!isLoginPage) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(handleApiError(error));
  }
);

export function unwrap<T>(response: AxiosResponse<T>): T {
  return response.data;
}

export function handleApiError(error: unknown): Error {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    const apiMessage = error.response?.data?.message;
    const fallbackMessage = error.message || "Erro na requisição.";

    return new Error(apiMessage || fallbackMessage);
  }

  if (error instanceof Error) {
    return error;
  }

  return new Error("Erro inesperado.");
}