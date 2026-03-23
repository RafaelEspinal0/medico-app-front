"use client";

import {
  BadgeCheck,
  BriefcaseBusiness,
  CreditCard,
  FileText,
  MapPin,
  Phone,
  Shield,
  UserRound,
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
import { getTipoPersonalLabel } from "@/types/enums/tipo-personal.enum";
import { Personal } from "@/types/personal";

interface ViewPersonalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  personal: Personal | null;
}

function getTipoClasses(value: number | string | null | undefined) {
  const tipo = Number(value);

  switch (tipo) {
    case 1:
      return "bg-slate-50 text-slate-700 border-slate-200";
    case 2:
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case 3:
      return "bg-cyan-50 text-cyan-700 border-cyan-200";
    case 4:
      return "bg-amber-50 text-amber-700 border-amber-200";
    case 5:
      return "bg-violet-50 text-violet-700 border-violet-200";
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

export function ViewPersonalDialog({
  open,
  onOpenChange,
  personal,
}: ViewPersonalDialogProps) {
  if (!personal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-4xl">
        <DialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            <UserRound className="h-3.5 w-3.5 text-primary" />
            Detalle del empleado
          </div>

          <DialogTitle className="text-2xl">
            {personal.nombre || "Empleado"}
          </DialogTitle>

          <DialogDescription>
            Información general, documentación y tipo de puesto del empleado.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <section className="overflow-hidden rounded-[2rem] border bg-background shadow-sm">
            <div className="relative p-6">
              <div className="absolute inset-0" />

              <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                <div className="flex items-start gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-[1.5rem] bg-primary/10">
                    <UserRound className="h-7 w-7 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">
                      {personal.nombre || "-"}
                    </h2>

                    <div className="flex flex-wrap gap-2">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                          getTipoClasses(personal.tipoPersonal)
                        )}
                      >
                        {getTipoPersonalLabel(personal.tipoPersonal)}
                      </span>

                      <span
                        className={cn(
                          "inline-flex rounded-full border px-3 py-1 text-xs font-medium",
                          getEstadoClasses(!!personal.isActive)
                        )}
                      >
                        {personal.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      NIF: {personal.nif || "-"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border bg-background/90 px-4 py-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Estado actual
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {personal.isActive ? "Activo" : "Inactivo"}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-background/90 px-4 py-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Tipo de puesto
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {getTipoPersonalLabel(personal.tipoPersonal)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Información principal</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Item icon={Phone} label="Teléfono" value={personal.telefono} />
              <Item icon={MapPin} label="Provincia" value={personal.provincia} />
              <Item icon={MapPin} label="Población" value={personal.poblacion} />
              <Item
                icon={MapPin}
                label="Dirección"
                value={personal.direccion}
              />
              <Item
                icon={FileText}
                label="Código postal"
                value={personal.codigoPostal}
              />
              <Item
                icon={BriefcaseBusiness}
                label="Tipo de puesto"
                value={getTipoPersonalLabel(personal.tipoPersonal)}
              />
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Documentación y registro</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <Item icon={CreditCard} label="NIF" value={personal.nif} />
              <Item
                icon={Shield}
                label="Seguridad social"
                value={personal.numSeguridadSocial}
              />
              <Item
                icon={BadgeCheck}
                label="Estado"
                value={personal.isActive ? "Activo" : "Inactivo"}
              />
            </div>
          </section>

          {!personal.isActive && (
            <section className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-100">
                  <XCircle className="h-4 w-4 text-rose-700" />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-rose-800">
                    Empleado inactivo
                  </h3>
                  <p className="mt-1 text-sm leading-6 text-rose-700">
                    Este empleado aparece actualmente como inactivo dentro del sistema.
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