"use client";

import { ReactNode, useEffect, useState } from "react";
import { AppNavbar } from "./app-navbar";
import { AppSidebar } from "./app-sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");

    const handleChange = (event: MediaQueryList | MediaQueryListEvent) => {
      const mobile = event.matches;
      setIsMobile(mobile);

      if (mobile) {
        setCollapsed(false);
      } else {
        setMobileOpen(false);
      }
    };

    handleChange(mediaQuery);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const handleToggleSidebar = () => {
    if (isMobile) {
      setMobileOpen(true);
      return;
    }

    setCollapsed((prev) => !prev);
  };

  const desktopSidebarWidth = collapsed ? "md:ml-[88px]" : "md:ml-[270px]";

  return (
    <div className="min-h-screen bg-muted/30">
      {!isMobile && (
        <div
          className={cn(
            "fixed left-0 top-0 z-30 h-screen",
            collapsed ? "w-22" : "w-67.5"
          )}
        >
          <AppSidebar collapsed={collapsed} />
        </div>
      )}

      <div className={cn("min-h-screen", !isMobile && desktopSidebarWidth)}>
        <div className="flex min-h-screen flex-col">
          <AppNavbar onToggleSidebar={handleToggleSidebar} />

          <main className="flex-1 overflow-x-hidden p-4 md:p-6">
            <div className="mx-auto w-full max-w-7xl">{children}</div>
          </main>
        </div>
      </div>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72.5 p-0">
          <AppSidebar mobile onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}