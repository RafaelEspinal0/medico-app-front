"use client";

import { BadgeCheck, Link2, UserRound, Users } from "lucide-react";
import { Paciente } from "@/types/paciente";

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

interface PacientesStatsProps {
  pacientes: Paciente[];
}

export function PacientesStats({ pacientes }: PacientesStatsProps) {
  const total = pacientes.length;
  const activos = pacientes.filter((paciente) => paciente.isActive).length;
  const conMedico = pacientes.filter((paciente) => !!paciente.medicoId).length;
  const sinMedico = pacientes.filter((paciente) => !paciente.medicoId).length;

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total de pacientes"
        value={total}
        hint="Cantidad registrada en el sistema"
        icon={Users}
      />
      <StatCard
        title="Pacientes activos"
        value={activos}
        hint="Disponibles actualmente"
        icon={BadgeCheck}
      />
      <StatCard
        title="Con médico asignado"
        value={conMedico}
        hint="Pacientes vinculados a un médico"
        icon={Link2}
      />
      <StatCard
        title="Sin médico asignado"
        value={sinMedico}
        hint="Pendientes de asignación"
        icon={UserRound}
      />
    </section>
  );
}