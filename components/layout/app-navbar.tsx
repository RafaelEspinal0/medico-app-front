"use client";

import { Button } from "@/components/ui/button";
import { HeartPulse, Menu } from "lucide-react";

interface AppNavbarProps {
  onToggleSidebar: () => void;
}

export function AppNavbar({ onToggleSidebar }: AppNavbarProps) {
  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-background/95 px-4 backdrop-blur supports-backdrop-filter:bg-background/80 md:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl"
          onClick={onToggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 shadow-sm">
            <HeartPulse className="h-5 w-5 text-primary" />
          </div>

          <div className="leading-tight">
            <h1 className="text-sm font-semibold md:text-base">MedicoApp</h1>
            <p className="text-xs text-muted-foreground">
              Sistema médico administrativo
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}