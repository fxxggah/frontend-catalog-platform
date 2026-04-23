"use client";

import { useMemo, useState } from "react";
import { authService } from "@/services/authService";
import type { AuthResponse, GoogleLoginRequest } from "@/types";

type UseAuthReturn = {
  isAuthenticated: boolean;
  isLoading: boolean;
  loginWithGoogle: (payload: GoogleLoginRequest) => Promise<AuthResponse>;
  logout: () => void;
  token: string | null;
};

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);

  const token = useMemo(() => authService.getToken(), []);
  const isAuthenticated = !!token;

  async function loginWithGoogle(
    payload: GoogleLoginRequest
  ): Promise<AuthResponse> {
    try {
      setIsLoading(true);
      return await authService.loginWithGoogle(payload);
    } finally {
      setIsLoading(false);
    }
  }

  function logout(): void {
    authService.logout();
  }

  return {
    isAuthenticated,
    isLoading,
    loginWithGoogle,
    logout,
    token,
  };
}