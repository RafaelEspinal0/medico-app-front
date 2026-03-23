"use client";

import { usePersonal } from "@/hooks/use-personal";
import { PersonalView } from "@/components/personal/personal-view";

export default function EmpleadosPage() {
  const { data, isLoading, isError } = usePersonal();

  if (isLoading) {
    return (
      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">Cargando empleados...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-destructive">
          Ocurrió un error cargando los empleados.
        </p>
      </div>
    );
  }

  return <PersonalView personal={data?.data ?? []} />;
}