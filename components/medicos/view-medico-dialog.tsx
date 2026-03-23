"use client";

import {
  BadgeCheck,
  CreditCard,
  FileText,
  MapPin,
  Phone,
  Shield,
  Stethoscope,
  Users,
  XCircle,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Medico } from "@/types/medico";
import { getTipoMedicoLabel } from "@/types/enums/tipo-medito.enum";

interface ViewMedicoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medico: Medico | null;
}

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

export function ViewMedicoDialog({
  open,
  onOpenChange,
  medico,
}: ViewMedicoDialogProps) {
  if (!medico) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-4xl">
        <DialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            <Stethoscope className="h-3.5 w-3.5 text-primary" />
            Detalle del médico
          </div>

          <DialogTitle className="text-2xl">
            {medico.nombre || "Médico"}
          </DialogTitle>

          <DialogDescription>
            Información general, documentación y estado actual del médico seleccionado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <section className="overflow-hidden rounded-[2rem] border bg-background shadow-sm">
            <div className="relative p-6">
              <div className="absolute inset-0 " />

              <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary/10">
                    <Stethoscope className="h-7 w-7 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {medico.nombre || "-"}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                          getTipoClasses(medico.tipoMedico)
                        )}
                      >
                        {getTipoMedicoLabel(medico.tipoMedico)}
                      </span>

                      <span
                        className={cn(
                          "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                          getEstadoClasses(!!medico.isActive)
                        )}
                      >
                        {medico.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Núm. colegiado: {medico.numColegiado || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border bg-background/90 px-4 py-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Pacientes asignados
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {medico.totalPacientes ?? 0}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-background/90 px-4 py-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Estado actual
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {medico.isActive ? "Activo" : "Inactivo"}
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
                icon={Phone}
                label="Teléfono"
                value={medico.telefono}
              />
              <Item
                icon={MapPin}
                label="Provincia"
                value={medico.provincia}
              />
              <Item
                icon={MapPin}
                label="Población"
                value={medico.poblacion}
              />
              <Item
                icon={MapPin}
                label="Dirección"
                value={medico.direccion}
              />
              <Item
                icon={FileText}
                label="Código postal"
                value={medico.codigoPostal}
              />
              <Item
                icon={Users}
                label="Pacientes"
                value={medico.totalPacientes ?? 0}
              />
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Documentación y registro</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Item
                icon={CreditCard}
                label="NIF"
                value={medico.nif}
              />
              <Item
                icon={Shield}
                label="Seguridad social"
                value={medico.numSeguridadSocial}
              />
              <Item
                icon={BadgeCheck}
                label="Número de colegiado"
                value={medico.numColegiado}
              />
            </div>
          </section>

          {!medico.isActive && (
            <section className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100">
                  <XCircle className="h-4 w-4 text-rose-700" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-rose-800">
                    Médico inactivo
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-rose-700">
                    Este médico aparece actualmente como inactivo dentro del sistema.
                  </p>
                </div>
              </div>
            </section>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}