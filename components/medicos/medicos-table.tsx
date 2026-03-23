"use client";

import {
  CalendarClock,
  Eye,
  Phone,
  Search,
  Stethoscope,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Medico } from "@/types/medico";
import { getTipoMedicoLabel } from "@/types/enums/tipo-medito.enum";

function getTipoClasses(value: number | string | null | undefined) {
  const tipo = Number(value);

  switch (tipo) {
    case 1:
      return "bg-blue-50 text-blue-700 border-blue-200";
    case 2:
      return "bg-violet-50 text-violet-700 border-violet-200";
    case 3:
      return "bg-amber-50 text-amber-700 border-amber-200";
    default:
      return "bg-muted text-foreground border-border";
  }
}

function getEstadoClasses(isActive: boolean) {
  return isActive
    ? "bg-emerald-50 text-emerald-700 border-emerald-200"
    : "bg-rose-50 text-rose-700 border-rose-200";
}

interface MedicosTableProps {
  medicos: Medico[];
  onView?: (medico: Medico) => void;
  onEdit?: (medico: Medico) => void;
  onDelete?: (medico: Medico) => void;
  onHorarios?: (medico: Medico) => void;
}

export function MedicosTable({
  medicos,
  onView,
  onEdit,
  onDelete,
  onHorarios,
}: MedicosTableProps) {
  return (
    <>
      <div className="mt-6 hidden overflow-hidden rounded-3xl border lg:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr className="border-b">
                <th className="px-5 py-4 font-semibold">Médico</th>
                <th className="px-5 py-4 font-semibold">Tipo</th>
                <th className="px-5 py-4 font-semibold">Teléfono</th>
                <th className="px-5 py-4 font-semibold">Provincia</th>
                <th className="px-5 py-4 font-semibold">NIF</th>
                <th className="px-5 py-4 font-semibold">Colegiado</th>
                <th className="px-5 py-4 font-semibold">Pacientes</th>
                <th className="px-5 py-4 font-semibold">Estado</th>
                <th className="px-5 py-4 font-semibold">Acciones</th>
              </tr>
            </thead>

            <tbody>
              {medicos.map((medico) => (
                <tr
                  key={medico.id}
                  className="border-b last:border-b-0 transition hover:bg-muted/20"
                >
                  <td className="px-5 py-4 align-top">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10">
                        <Stethoscope className="h-5 w-5 text-primary" />
                      </div>

                      <div className="space-y-1">
                        <p className="font-semibold leading-none">
                          {medico.nombre || "-"}
                        </p>
                        <p className="text-muted-foreground">
                          {medico.poblacion || "-"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 align-top">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                        getTipoClasses(medico.tipoMedico)
                      )}
                    >
                      {getTipoMedicoLabel(medico.tipoMedico)}
                    </span>
                  </td>

                  <td className="px-5 py-4 align-top">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{medico.telefono || "-"}</span>
                    </div>
                  </td>

                  <td className="px-5 py-4 align-top text-muted-foreground">
                    {medico.provincia || "-"}
                  </td>

                  <td className="px-5 py-4 align-top text-muted-foreground">
                    {medico.nif || "-"}
                  </td>

                  <td className="px-5 py-4 align-top text-muted-foreground">
                    {medico.numColegiado || "-"}
                  </td>

                  <td className="px-5 py-4 align-top">
                    <span className="font-semibold">
                      {medico.totalPacientes ?? 0}
                    </span>
                  </td>

                  <td className="px-5 py-4 align-top">
                    <span
                      className={cn(
                        "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                        getEstadoClasses(!!medico.isActive)
                      )}
                    >
                      {medico.isActive ? "Activo" : "Inactivo"}
                    </span>
                  </td>

                  <td className="px-5 py-4 align-top">
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={() => onView?.(medico)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Ver
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={() => onHorarios?.(medico)}
                      >
                        <CalendarClock className="mr-2 h-4 w-4" />
                        Horarios
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl"
                        onClick={() => onEdit?.(medico)}
                      >
                        Editar
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-xl text-destructive hover:text-destructive"
                        onClick={() => onDelete?.(medico)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Eliminar
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}

              {medicos.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-5 py-14 text-center">
                    <div className="mx-auto max-w-sm space-y-2">
                      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
                        <Search className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <p className="font-medium">No se encontraron médicos</p>
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
        {medicos.map((medico) => (
          <div
            key={medico.id}
            className="rounded-3xl border bg-background p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                <Stethoscope className="h-5 w-5 text-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="truncate font-semibold">
                    {medico.nombre || "-"}
                  </h3>
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium",
                      getEstadoClasses(!!medico.isActive)
                    )}
                  >
                    {medico.isActive ? "Activo" : "Inactivo"}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {medico.provincia || "-"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {medico.numColegiado || "-"}
                </p>
              </div>
            </div>

            <div className="mt-4 grid gap-3 rounded-2xl bg-muted/30 p-4 text-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Tipo</span>
                <span
                  className={cn(
                    "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium",
                    getTipoClasses(medico.tipoMedico)
                  )}
                >
                  {getTipoMedicoLabel(medico.tipoMedico)}
                </span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Población</span>
                <span className="font-medium">{medico.poblacion || "-"}</span>
              </div>

              <div className="flex items-center justify-between gap-3">
                <span className="text-muted-foreground">Pacientes</span>
                <span className="font-medium">{medico.totalPacientes ?? 0}</span>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground">Teléfono</span>
                <p className="font-medium">{medico.telefono || "-"}</p>
              </div>

              <div className="space-y-1">
                <span className="text-muted-foreground">NIF</span>
                <p className="font-medium">{medico.nif || "-"}</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => onView?.(medico)}
              >
                Ver
              </Button>

              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => onHorarios?.(medico)}
              >
                Horarios
              </Button>

              <Button
                variant="outline"
                className="rounded-2xl"
                onClick={() => onEdit?.(medico)}
              >
                Editar
              </Button>

              <Button
                variant="outline"
                className="rounded-2xl text-destructive hover:text-destructive"
                onClick={() => onDelete?.(medico)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </Button>
            </div>
          </div>
        ))}

        {medicos.length === 0 && (
          <div className="rounded-3xl border bg-background px-6 py-12 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <Search className="h-5 w-5 text-muted-foreground" />
            </div>
            <p className="mt-4 font-medium">No se encontraron médicos</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Intenta cambiar los filtros o el término de búsqueda.
            </p>
          </div>
        )}
      </div>
    </>
  );
}