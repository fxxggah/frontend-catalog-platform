"use client";

import type { ReactNode } from "react";
import { useParams, usePathname } from "next/navigation";
import { BackButton } from "@/components/admin/BackButton";

export default function AdminStoreLayout({
  children,
}: {
  children: ReactNode;
}) {
  const params = useParams();
  const pathname = usePathname();

  const storeSlug = params.storeSlug as string;

  const isDashboardPage = pathname === `/admin/${storeSlug}`;

  const backHref = isDashboardPage
    ? "/admin/stores"
    : `/admin/${storeSlug}`;

  return (
    <div className="mx-auto w-full max-w-7xl space-y-6 px-4 py-6 md:px-6">
      <BackButton href={backHref} />

      {children}
    </div>
  );
}