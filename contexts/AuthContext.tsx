"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { authService } from "@/services/authService";
import type { AuthResponse, GoogleLoginRequest, UserResponse } from "@/types";

type AuthContextValue = {
  user: UserResponse | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: (payload: GoogleLoginRequest) => Promise<AuthResponse>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

const USER_STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const storedToken = authService.getToken();
    const storedUser =
      typeof window !== "undefined"
        ? localStorage.getItem(USER_STORAGE_KEY)
        : null;

    setToken(storedToken);

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as UserResponse);
      } catch {
        setUser(null);
      }
    }
  }, []);

  async function loginWithGoogle(
    payload: GoogleLoginRequest
  ): Promise<AuthResponse> {
    try {
      setIsLoading(true);

      const data = await authService.loginWithGoogle(payload);

      setToken(data.token);
      setUser(data.user);

      if (typeof window !== "undefined") {
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(data.user));
      }

      return data;
    } finally {
      setIsLoading(false);
    }
  }

  function logout(): void {
    authService.logout();
    setToken(null);
    setUser(null);

    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      isLoading,
      loginWithGoogle,
      logout,
    }),
    [user, token, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext deve ser usado dentro de AuthProvider");
  }

  return context;
}