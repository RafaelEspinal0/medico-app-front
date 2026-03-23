"use client";

import { MedicosView } from "@/components/medicos/medicos-view";
import { useMedicos } from "@/hooks/use-medicos";

export default function MedicosPage() {
  const { data, isLoading, isError } = useMedicos();

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Cargando médicos...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-destructive">
          Ocurrió un error cargando los médicos.
        </p>
      </div>
    );
  }

  return <MedicosView medicos={data?.data ?? []} />;
}