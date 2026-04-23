"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";

type AdminLayoutProps = {
  children: ReactNode;
};

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    const token = authService.getToken();

    if (!token) {
      router.replace("/login");
    }
  }, [router]);

  return <>{children}</>;
}