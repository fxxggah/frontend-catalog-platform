"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/authService";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";

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

  return (
    <SidebarProvider>
      <AdminSidebar />

      <SidebarInset>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}