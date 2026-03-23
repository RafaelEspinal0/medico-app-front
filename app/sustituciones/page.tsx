"use client";

import { useMedicos } from "@/hooks/use-medicos";
import { SustitucionesView } from "@/components/sustituciones/sustituciones-view";

export default function SustitucionesPage() {
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

  return <SustitucionesView medicos={data?.data ?? []} />;
}