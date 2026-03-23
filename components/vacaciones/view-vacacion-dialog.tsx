"use client";

import {
  CalendarClock,
  CalendarRange,
  CheckCircle2,
  UserRound,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { getTipoVacacionLabel } from "@/types/enums/tipo-vacacion.enum";
import { Vacacion } from "@/types/vacacion";

interface ViewVacacionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacacion: Vacacion | null;
}

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
    month: "long",
    year: "numeric",
  }).format(date);
}

function Item({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="rounded-2xl border bg-background p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10">
          <Icon className="h-4 w-4 text-primary" />
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
          <p className="mt-1 wrap-break-words text-sm font-medium text-foreground">
            {value || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ViewVacacionDialog({
  open,
  onOpenChange,
  vacacion,
}: ViewVacacionDialogProps) {
  if (!vacacion) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-4xl">
        <DialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            <CalendarDaysIcon />
            Detalle de vacación
          </div>

          <DialogTitle className="text-2xl">
            {vacacion.nombreEmpleado || "Vacación"}
          </DialogTitle>

          <DialogDescription>
            Información del período de vacaciones y del empleado asociado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <section className="overflow-hidden rounded-[2rem] border bg-background shadow-sm">
            <div className="relative p-6">
              <div className="absolute inset-0" />

              <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary/10">
                    <CalendarRange className="h-7 w-7 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {vacacion.nombreEmpleado || "-"}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                          getTipoClasses(vacacion.tipoVacacion)
                        )}
                      >
                        {getTipoVacacionLabel(vacacion.tipoVacacion)}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      ID empleado: {vacacion.empleadoId || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border bg-background/90 px-4 py-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Fecha inicio
                    </p>
                    <p className="mt-1 text-lg font-bold">
                      {formatDate(vacacion.fechaInicio)}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-background/90 px-4 py-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Fecha fin
                    </p>
                    <p className="mt-1 text-lg font-bold">
                      {formatDate(vacacion.fechaFin)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Información principal</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Item
                icon={UserRound}
                label="Empleado"
                value={vacacion.nombreEmpleado}
              />
              <Item
                icon={CalendarClock}
                label="Tipo de vacación"
                value={getTipoVacacionLabel(vacacion.tipoVacacion)}
              />
              <Item
                icon={CheckCircle2}
                label="Fecha inicio"
                value={formatDate(vacacion.fechaInicio)}
              />
              <Item
                icon={CheckCircle2}
                label="Fecha fin"
                value={formatDate(vacacion.fechaFin)}
              />
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CalendarDaysIcon() {
  return <CalendarRange className="h-3.5 w-3.5 text-primary" />;
}