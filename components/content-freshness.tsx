"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

// Refresh ordinary visits, restored tabs, and open pages without a hard reload.
export function ContentFreshness() {
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === "visible") router.refresh();
    };
    refresh();
    const interval = window.setInterval(refresh, 20_000);
    document.addEventListener("visibilitychange", refresh);
    window.addEventListener("pageshow", refresh);
    return () => {
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refresh);
      window.removeEventListener("pageshow", refresh);
    };
  }, [pathname, router]);
  return null;
}
