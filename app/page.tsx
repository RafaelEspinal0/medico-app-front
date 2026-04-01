"use client";

import { Users, Stethoscope, Heart, CalendarSync } from "lucide-react";
import { useMedicos, useMedicosSustitutosActivos } from "@/hooks/use-medicos";
import { usePacientes } from "@/hooks/use-pacientes";
import { usePersonal } from "@/hooks/use-personal";

function StatCard({
  icon: Icon,
  label,
  value,
  isLoading = false,
  isError = false,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
  isLoading?: boolean;
  isError?: boolean;
}) {
  return (
    <div className="rounded-3xl border bg-background p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          {isLoading ? (
            <p className="mt-2 text-2xl font-bold text-muted-foreground">-</p>
          ) : isError ? (
            <p className="mt-2 text-2xl font-bold text-destructive">Error</p>
          ) : (
            <h3 className="mt-2 text-3xl font-bold">{value}</h3>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const { data: medicoData, isLoading: medicoLoading, isError: medicoError } =
    useMedicos();
  const {
    data: pacienteData,
    isLoading: pacienteLoading,
    isError: pacienteError,
  } = usePacientes();
  const {
    data: personalData,
    isLoading: personalLoading,
    isError: personalError,
  } = usePersonal();

  const {
    data: sustitucionesData,
    isLoading: sustitucionLoading,
    isError: sustitucionError,
  } = useMedicosSustitutosActivos();

  const totalMedicos = medicoData?.data?.length ?? 0;
  const totalPacientes = pacienteData?.data?.length ?? 0;
  const totalEmpleados = personalData?.data?.length ?? 0;
  const totalSustitucionesActivas = sustitucionesData?.data?.length ?? 0;

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-sm text-muted-foreground">
          Bienvenido al sistema de gestión del centro de salud.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          icon={Stethoscope}
          label="Médicos"
          value={totalMedicos}
          isLoading={medicoLoading}
          isError={medicoError}
        />

        <StatCard
          icon={Users}
          label="Empleados"
          value={totalEmpleados}
          isLoading={personalLoading}
          isError={personalError}
        />

        <StatCard
          icon={Heart}
          label="Pacientes"
          value={totalPacientes}
          isLoading={pacienteLoading}
          isError={pacienteError}
        />

        <StatCard
          icon={CalendarSync}
          label="Sustituciones activas"
          value={totalSustitucionesActivas}
          isLoading={sustitucionLoading}
          isError={sustitucionError}
        />
      </div>

      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <h3 className="text-lg font-semibold">Resumen general</h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Gestiona todo desde una sola aplicación personalizada para tu clínica u
          hospital. Administración médico-paciente y gestión administrativa
          integradas.
        </p>
      </div>
    </div>
  );
}
