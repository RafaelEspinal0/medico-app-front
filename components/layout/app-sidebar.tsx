"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarRange,
  LayoutDashboard,
  Stethoscope,
  UserRound,
  Users,
  RefreshCcw,
  PlaneTakeoff,
  HeartPulse,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Médicos",
    href: "/medicos",
    icon: Stethoscope,
  },
  {
    title: "Empleados",
    href: "/empleados",
    icon: UserRound,
  },
  {
    title: "Pacientes",
    href: "/pacientes",
    icon: Users,
  },
  {
    title: "Horarios",
    href: "/horarios",
    icon: CalendarRange,
  },
  {
    title: "Sustituciones",
    href: "/sustituciones",
    icon: RefreshCcw,
  },
  {
    title: "Vacaciones",
    href: "/vacaciones",
    icon: PlaneTakeoff,
  },
];

interface AppSidebarProps {
  collapsed?: boolean;
  mobile?: boolean;
  onNavigate?: () => void;
}

export function AppSidebar({
  collapsed = false,
  mobile = false,
  onNavigate,
}: AppSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "h-screen border-r bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/80",
        "transition-all duration-300 ease-in-out",
        mobile ? "w-full" : collapsed ? "w-22" : "w-67.5"
      )}
    >
      <div className="flex h-full flex-col">
        <div
          className={cn(
            "flex h-16 items-center border-b",
            collapsed && !mobile ? "justify-center px-2" : "px-4"
          )}
        >
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 shadow-sm">
              <HeartPulse className="h-5 w-5 text-primary" />
            </div>

            {(!collapsed || mobile) && (
              <div className="leading-tight">
                <h2 className="text-sm font-semibold">MedicoApp</h2>
                <p className="text-xs text-muted-foreground">
                  Gestión clínica
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-all",
                    "hover:bg-muted hover:text-foreground",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground",
                    collapsed && !mobile && "justify-center px-2"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />

                  {(!collapsed || mobile) && (
                    <span className="truncate">{item.title}</span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="border-t p-3">
          <div
            className={cn(
              "rounded-2xl bg-muted/60",
              collapsed && !mobile ? "p-2" : "p-4"
            )}
          >
            {collapsed && !mobile ? (
              <div className="flex justify-center">
                <HeartPulse className="h-5 w-5 text-muted-foreground" />
              </div>
            ) : (
              <>
                <p className="text-sm font-semibold">Centro de salud</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Ofrecemos el mejor servicio para ti y tu salud.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}