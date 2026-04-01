"use client";

import {
  CalendarClock,
  CalendarRange,
  ShieldCheck,
  UserCheck,
  UserRound,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSustitucionesByMedico } from "@/hooks/use-sustituciones";
import { Medico } from "@/types/medico";

interface ViewSustitucionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medico: Medico | null;
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

export function ViewSustitucionDialog({
  open,
  onOpenChange,
  medico,
}: ViewSustitucionDialogProps) {
  const medicoId = medico?.id;

  const { data, isLoading, isError } = useSustitucionesByMedico(
    medicoId,
    open
  );

  const sustituciones = data?.data ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-5xl">
        <DialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            <CalendarSyncIcon />
            Historial de sustituciones
          </div>

          <DialogTitle className="text-2xl">
            {medico?.nombre || "Médico"}
          </DialogTitle>

          <DialogDescription>
            Consulta los períodos de sustitución registrados para este médico.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Médico seleccionado</h3>

            <div className="mt-4 rounded-2xl border bg-background p-4">
              <p className="font-semibold">{medico?.nombre || "-"}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Colegiado: {medico?.numColegiado || "-"}
              </p>
              <p className="text-sm text-muted-foreground">
                Provincia: {medico?.provincia || "-"}
              </p>
            </div>
          </section>

          <section className="rounded-3xl border bg-background p-5 shadow-sm">
            <div>
              <h3 className="text-sm font-semibold">Sustituciones registradas</h3>
              <p className="text-sm text-muted-foreground">
                Historial de períodos de alta y baja del médico.
              </p>
            </div>

            {isLoading ? (
              <div className="mt-4 rounded-2xl border bg-muted/20 p-6 text-sm text-muted-foreground">
                Cargando historial de sustituciones...
              </div>
            ) : isError ? (
              <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
                Ocurrió un error cargando el historial de sustituciones.
              </div>
            ) : sustituciones.length === 0 ? (
              <div className="mt-4 rounded-2xl border bg-muted/20 p-6 text-sm text-muted-foreground">
                Este médico no tiene sustituciones registradas.
              </div>
            ) : (
              <div className="mt-4 grid gap-3">
                {sustituciones.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border bg-muted/20 p-4"
                  >
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                      <InfoItem
                        icon={UserRound}
                        label="Médico sustituto"
                        value={item.nombreMedico}
                      />
                      <InfoItem
                        icon={UserCheck}
                        label="Médico titular"
                        value={item.nombreMedicoTitular}
                      />
                      <InfoItem
                        icon={CalendarClock}
                        label="Fecha alta"
                        value={formatDate(item.fechaAlta)}
                      />
                      <InfoItem
                        icon={CalendarRange}
                        label="Fecha baja"
                        value={formatDate(item.fechaBaja)}
                      />
                      <InfoItem
                        icon={ShieldCheck}
                        label="Estado"
                        value={item.estaActiva ? "Activa" : "Inactiva"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function InfoItem({
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

function CalendarSyncIcon() {
  return <CalendarSyncSmall className="h-3.5 w-3.5 text-primary" />;
}

function CalendarSyncSmall(props: React.SVGProps<SVGSVGElement>) {
  return <CalendarClock {...props} />;
}