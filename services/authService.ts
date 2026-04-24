import { api, tokenStorage, unwrap } from "./api";
import type { AuthResponse, GoogleLoginRequest } from "@/types";

export const authService = {
  async loginWithGoogle(payload: GoogleLoginRequest): Promise<AuthResponse> {
    const data = unwrap(
      await api.post<AuthResponse>("/auth/google", payload)
    );

    tokenStorage.set(data.token);
    return data;
  },

  logout(): void {
  tokenStorage.remove();

  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
  },

  getToken(): string | null {
    return tokenStorage.get();
  },

  isAuthenticated(): boolean {
    return !!tokenStorage.get();
  },
};