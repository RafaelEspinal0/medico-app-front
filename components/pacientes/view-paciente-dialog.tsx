"use client";

import {
  BadgeCheck,
  CreditCard,
  FileText,
  MapPin,
  Phone,
  Shield,
  UserRound,
  UserSquare2,
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
import { Paciente } from "@/types/paciente";

interface ViewPacienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente: Paciente | null;
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

export function ViewPacienteDialog({
  open,
  onOpenChange,
  paciente,
}: ViewPacienteDialogProps) {
  if (!paciente) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-4xl">
        <DialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            <UserRound className="h-3.5 w-3.5 text-primary" />
            Detalle del paciente
          </div>

          <DialogTitle className="text-2xl">
            {paciente.nombre || "Paciente"}
          </DialogTitle>

          <DialogDescription>
            Información general, documentación y médico asignado del paciente.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <section className="overflow-hidden rounded-[2rem] border bg-background shadow-sm">
            <div className="relative p-6">
              <div className="absolute inset-0 " />

              <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary/10">
                    <UserRound className="h-7 w-7 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {paciente.nombre || "-"}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                          getEstadoClasses(!!paciente.isActive)
                        )}
                      >
                        {paciente.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      Médico asignado: {paciente.nombreMedico || "Sin asignar"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border bg-background/90 px-4 py-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Estado actual
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {paciente.isActive ? "Activo" : "Inactivo"}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-background/90 px-4 py-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Asignación
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {paciente.medicoId ? "Asignado" : "Pendiente"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Información principal</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Item icon={Phone} label="Teléfono" value={paciente.telefono} />
              <Item
                icon={MapPin}
                label="Dirección"
                value={paciente.direccion}
              />
              <Item
                icon={FileText}
                label="Código postal"
                value={paciente.codigoPostal}
              />
              <Item
                icon={UserSquare2}
                label="Médico asignado"
                value={paciente.nombreMedico || "Sin asignar"}
              />
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Documentación y registro</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Item icon={CreditCard} label="NIF" value={paciente.nif} />
              <Item
                icon={Shield}
                label="Seguridad social"
                value={paciente.numSeguridadSocial}
              />
              <Item
                icon={BadgeCheck}
                label="Estado"
                value={paciente.isActive ? "Activo" : "Inactivo"}
              />
            </div>
          </section>

          {!paciente.isActive && (
            <section className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100">
                  <XCircle className="h-4 w-4 text-rose-700" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-rose-800">
                    Paciente inactivo
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-rose-700">
                    Este paciente aparece actualmente como inactivo dentro del sistema.
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