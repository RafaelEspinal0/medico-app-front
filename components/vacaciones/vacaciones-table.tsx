"use client";

import { CalendarRange, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Vacacion } from "@/types/vacacion";
import { cn } from "@/lib/utils";
import { getTipoVacacionLabel } from "@/types/enums/tipo-vacacion.enum";

function getTipoClasses(value: number | string | null | undefined) {
  const tipo = Number(value);

  switch (tipo) {
    case 1:
      return "bg-blue-50 text-blue-700 border-blue-200";
    case 2:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    default:
      return "bg-muted text-foreground border-border";
  }
}

function formatDate(value?: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("es-DO", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

interface VacacionesTableProps {
  vacaciones: Vacacion[];
  onView?: (vacacion: Vacacion) => void;
  onEdit?: (vacacion: Vacacion) => void;
}

export function VacacionesTable({
  vacaciones,
  onView,
  onEdit,
}: VacacionesTableProps) {
  return (
    <>
      <div className="mt-6 hidden overflow-hidden rounded-3xl border lg:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr className="border-b">
                <th className="px-5 py-4 font-semibold">Empleado</th>
                <th className="px-5 py-4 font-semibold">Tipo</th>
                <th className="px-5 py-4 font-semibold">Fecha inicio</th>
                <th className="px-5 py-4 font-semibold">Fecha fin</th>
                <th className="px-5 py-4 font-semibold">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {vacaciones.map((vacacion) => (
                <tr
                  key={vacacion.id}
                  className="border-b last:border-b-0 transition hover:bg-muted/20"
                >
                  <td className="px-5 py-4 align-top">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                        <CalendarRange className="h-5 w-5 text-primary" />
                      </div>

                      <div className="space-y-1">
                        <p className="font-semibold leading-none">
                          {vacacion.nombreEmpleado || "-"}
                        </p>
                        <p className="text-muted-foreground">
                          ID empleado: {vacacion.empleadoId || "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 align-top">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                        getTipoClasses(vacacion.tipoVacacion)
                      )}
                    >
                      {getTipoVacacionLabel(vacacion.tipoVacacion)}
                    </span>
                  </td>

                  <td className="px-5 py-4 align-top text-muted-foreground">
                    {formatDate(vacacion.fechaInicio)}
                  </td>

                  <td className="px-5 py-4 align-top text-muted-foreground">
                    {formatDate(vacacion.fechaFin)}
                  </td>

                  <td className="px-5 py-4 align-top">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={() => onView?.(vacacion)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={() => onEdit?.(vacacion)}
                      >
                        Editar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {vacaciones.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-5 py-14 text-center">
                    <div className="mx-auto max-w-sm space-y-2">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                        <Search className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="font-medium">No se encontraron vacaciones</p>
                      <p className="text-sm text-muted-foreground">
                        Intenta cambiar los filtros o el término de búsqueda.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:hidden">
        {vacaciones.map((vacacion) => (
          <div
            key={vacacion.id}
            className="rounded-3xl border bg-background p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <CalendarRange className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-semibold">
                    {vacacion.nombreEmpleado || "-"}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium",
                      getTipoClasses(vacacion.tipoVacacion)
                    )}
                  >
                    {getTipoVacacionLabel(vacacion.tipoVacacion)}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  Inicio: {formatDate(vacacion.fechaInicio)}
                </p>
                <p className="text-xs text-muted-foreground">
                  Fin: {formatDate(vacacion.fechaFin)}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => onView?.(vacacion)}
              >
                Ver
              </Button>

              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => onEdit?.(vacacion)}
              >
                Editar
              </Button>
            </div>
          </div>
        ))}

        {vacaciones.length === 0 && (
          <div className="rounded-3xl border bg-background px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="mt-4 font-medium">No se encontraron vacaciones</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Intenta cambiar los filtros o el término de búsqueda.
            </p>
          </div>
        )}
      </div>
    </>
  );
}