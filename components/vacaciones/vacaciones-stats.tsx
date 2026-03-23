"use client";

import { CalendarDays, CheckCircle2, PlaneTakeoff, Users } from "lucide-react";
import { Vacacion } from "@/types/vacacion";

function StatCard({
  title,
  value,
  hint,
  icon: Icon,
}: {
  title: string;
  value: string | number;
  hint: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-3xl border bg-background p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight">{value}</h3>
          <p className="mt-2 text-xs text-muted-foreground">{hint}</p>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

interface VacacionesStatsProps {
  vacaciones: Vacacion[];
}

export function VacacionesStats({ vacaciones }: VacacionesStatsProps) {
  const total = vacaciones.length;

  const planificadas = vacaciones.filter(
    (item) => Number(item.tipoVacacion) === 1
  ).length;

  const disfrutadas = vacaciones.filter(
    (item) => Number(item.tipoVacacion) === 2
  ).length;

  const empleadosUnicos = new Set(
    vacaciones.map((item) => item.empleadoId).filter(Boolean)
  ).size;

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total de vacaciones"
        value={total}
        hint="Registros totales en el sistema"
        icon={CalendarDays}
      />
      <StatCard
        title="Planificadas"
        value={planificadas}
        hint="Períodos programados"
        icon={PlaneTakeoff}
      />
      <StatCard
        title="Disfrutadas"
        value={disfrutadas}
        hint="Períodos ya tomados"
        icon={CheckCircle2}
      />
      <StatCard
        title="Empleados vinculados"
        value={empleadosUnicos}
        hint="Personal con vacaciones registradas"
        icon={Users}
      />
    </section>
  );
}