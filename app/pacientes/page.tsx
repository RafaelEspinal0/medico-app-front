"use client";

import { usePacientes } from "@/hooks/use-pacientes";
import { PacientesView } from "@/components/pacientes/pacientes-view";

export default function PacientesPage() {
  const { data, isLoading, isError } = usePacientes();

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Cargando pacientes...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-destructive">
          Ocurrió un error cargando los pacientes.
        </p>
      </div>
    );
  }

  return <PacientesView pacientes={data?.data ?? []} />;
}