"use client";

import { BadgeCheck, ShieldPlus, Stethoscope, Users } from "lucide-react";
import { Medico } from "@/types/medico";

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

interface MedicosStatsProps {
  medicos: Medico[];
}

export function MedicosStats({ medicos }: MedicosStatsProps) {
  const total = medicos.length;
  const activos = medicos.filter((medico) => medico.isActive).length;
  const titulares = medicos.filter((medico) => {
    const value = Number(medico.tipoMedico);
    return value === 1;
  }).length;
  const totalPacientes = medicos.reduce(
    (acc, medico) => acc + (medico.totalPacientes ?? 0),
    0
  );

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Total de médicos"
        value={total}
        hint="Cantidad registrada en el sistema"
        icon={Users}
      />
      <StatCard
        title="Médicos activos"
        value={activos}
        hint="Disponibles actualmente"
        icon={BadgeCheck}
      />
      <StatCard
        title="Médicos titulares"
        value={titulares}
        hint="Personal fijo asignado"
        icon={ShieldPlus}
      />
      <StatCard
        title="Pacientes asignados"
        value={totalPacientes}
        hint="Carga total aproximada"
        icon={Stethoscope}
      />
    </section>
  );
}