"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalendarClock,
  CheckCircle2,
  Clock3,
  Loader2,
  Save,
  Trash2,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Medico } from "@/types/medico";
import { AsignarHorarioDto } from "@/types/horario";
import { useDiasSemana } from "@/hooks/use-enums";
import {
  useAssignSemanaToMedico,
  useDeleteHorario,
  useHorariosByMedico,
} from "@/hooks/use-horarios";
import { getErrorMessage } from "@/lib/extract-api-error";

interface MedicoHorariosDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medico: Medico | null;
}

type WeekForm = Record<
  number,
  {
    enabled: boolean;
    horaInicio: string;
    horaFin: string;
  }
>;

type DayErrors = Partial<
  Record<
    number,
    {
      horaInicio?: string;
      horaFin?: string;
      general?: string;
    }
  >
>;

const dayOrder = [1, 2, 3, 4, 5, 6, 7];

const fallbackDayNames: Record<number, string> = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

function normalizeDayName(value: string | null | undefined) {
  const raw = (value || "").trim().toLowerCase();

  const map: Record<string, number> = {
    lunes: 1,
    martes: 2,
    miercoles: 3,
    miércoles: 3,
    jueves: 4,
    viernes: 5,
    sabado: 6,
    sábado: 6,
    domingo: 7,
  };

  return map[raw] ?? 0;
}

function buildInitialWeekForm(): WeekForm {
  return {
    1: { enabled: false, horaInicio: "", horaFin: "" },
    2: { enabled: false, horaInicio: "", horaFin: "" },
    3: { enabled: false, horaInicio: "", horaFin: "" },
    4: { enabled: false, horaInicio: "", horaFin: "" },
    5: { enabled: false, horaInicio: "", horaFin: "" },
    6: { enabled: false, horaInicio: "", horaFin: "" },
    7: { enabled: false, horaInicio: "", horaFin: "" },
  };
}

function toTimeInput(value?: string | null) {
  if (!value) return "";
  return value.slice(0, 5);
}

function formatTimeForApi(value: string) {
  if (!value) return "";
  return value.length === 5 ? `${value}:00` : value;
}

function formatTimeForDisplay(value?: string | null) {
  if (!value) return "-";
  return value.slice(0, 5);
}

export function MedicoHorariosDialog({
  open,
  onOpenChange,
  medico,
}: MedicoHorariosDialogProps) {
  const medicoId = medico?.id;

  const { data, isLoading, isError } = useHorariosByMedico(medicoId, open);
  const { data: diasSemanaResponse } = useDiasSemana();

  const assignSemanaMutation = useAssignSemanaToMedico();
  const deleteHorarioMutation = useDeleteHorario();

  const [weekForm, setWeekForm] = useState<WeekForm>(buildInitialWeekForm());
  const [errors, setErrors] = useState<DayErrors>({});

  const diasSemana = useMemo(
    () => diasSemanaResponse?.data ?? [],
    [diasSemanaResponse]
  );

  const horarios = useMemo(() => data?.data ?? [], [data]);

  const dayNameMap = useMemo(() => {
    const map: Record<number, string> = { ...fallbackDayNames };
    for (const item of diasSemana) {
      if (item?.valor) {
        map[item.valor] = item.nombre || fallbackDayNames[item.valor];
      }
    }
    return map;
  }, [diasSemana]);

  const sortedHorarios = useMemo(() => {
    return [...horarios].sort((a, b) => {
      const dayA = normalizeDayName(a.diaSemana);
      const dayB = normalizeDayName(b.diaSemana);
      return dayA - dayB;
    });
  }, [horarios]);

  useEffect(() => {
    if (!open) return;

    const next = buildInitialWeekForm();

    for (const horario of horarios) {
      const day = normalizeDayName(horario.diaSemana);
      if (!day) continue;

      next[day] = {
        enabled: true,
        horaInicio: toTimeInput(horario.horaInicio),
        horaFin: toTimeInput(horario.horaFin),
      };
    }

    setWeekForm(next);
    setErrors({});
  }, [open, horarios]);

  const handleToggleDay = (day: number, enabled: boolean) => {
    setWeekForm((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [day]: undefined,
    }));
  };

  const handleChangeTime = (
    day: number,
    field: "horaInicio" | "horaFin",
    value: string
  ) => {
    setWeekForm((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value,
      },
    }));

    setErrors((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: undefined,
        general: undefined,
      },
    }));
  };

  const handleResetWeek = () => {
    setWeekForm(buildInitialWeekForm());
    setErrors({});
  };

  const validateWeek = () => {
    const nextErrors: DayErrors = {};

    for (const day of dayOrder) {
      const current = weekForm[day];
      if (!current.enabled) continue;

      if (!current.horaInicio) {
        nextErrors[day] = {
          ...nextErrors[day],
          horaInicio: "Selecciona una hora de inicio.",
        };
      }

      if (!current.horaFin) {
        nextErrors[day] = {
          ...nextErrors[day],
          horaFin: "Selecciona una hora de fin.",
        };
      }

      if (
        current.horaInicio &&
        current.horaFin &&
        current.horaInicio >= current.horaFin
      ) {
        nextErrors[day] = {
          ...nextErrors[day],
          general: "La hora de fin debe ser mayor que la de inicio.",
        };
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSaveWeek = async () => {
    if (!medicoId) return;

    const enabledDays = dayOrder.filter((day) => weekForm[day].enabled);

    if (enabledDays.length === 0) {
      toast.error("Selecciona al menos un día con horario.");
      return;
    }

    if (!validateWeek()) {
      toast.error("Revisa las horas de los días marcados.");
      return;
    }

    const payload: AsignarHorarioDto[] = enabledDays.map((day) => ({
      diaSemana: day,
      horaInicio: formatTimeForApi(weekForm[day].horaInicio),
      horaFin: formatTimeForApi(weekForm[day].horaFin),
    }));

    try {
      await assignSemanaMutation.mutateAsync({
        medicoId,
        payload,
      });

      toast.success("Horarios guardados correctamente.");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudieron guardar los horarios."));
    }
  };

  const handleDeleteHorario = async (horarioId: string) => {
    if (!medicoId) return;

    try {
      await deleteHorarioMutation.mutateAsync({
        horarioId,
        medicoId,
      });
      toast.success("Horario eliminado correctamente.");
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo eliminar el horario."));
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto rounded-3xl sm:max-w-5xl">
        <DialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            <CalendarClock className="h-3.5 w-3.5 text-primary" />
            Horarios del médico
          </div>

          <DialogTitle className="text-2xl">
            {medico?.nombre || "Médico"}
          </DialogTitle>

          <DialogDescription>
            Consulta, organiza y actualiza la disponibilidad semanal del médico.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <section className="overflow-hidden rounded-[2rem] border bg-background shadow-sm">
            <div className="relative p-6">
              <div className="absolute inset-0 " />

              <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    Médico seleccionado
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">
                    {medico?.nombre || "-"}
                  </h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Colegiado: {medico?.numColegiado || "-"}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border bg-background/90 px-4 py-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Horarios actuales
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {sortedHorarios.length}
                    </p>
                  </div>

                  <div className="rounded-2xl border bg-background/90 px-4 py-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">
                      Días activos
                    </p>
                    <p className="mt-1 text-2xl font-bold">
                      {dayOrder.filter((day) => weekForm[day].enabled).length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border bg-background p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">Horarios registrados</h3>
                <p className="text-sm text-muted-foreground">
                  Disponibilidad actual guardada en el sistema.
                </p>
              </div>
            </div>

            {isLoading ? (
              <div className="mt-4 rounded-2xl border bg-muted/20 p-6 text-sm text-muted-foreground">
                Cargando horarios...
              </div>
            ) : isError ? (
              <div className="mt-4 rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-sm text-destructive">
                Ocurrió un error cargando los horarios.
              </div>
            ) : sortedHorarios.length === 0 ? (
              <div className="mt-4 rounded-2xl border bg-muted/20 p-6 text-sm text-muted-foreground">
                Este médico no tiene horarios registrados todavía.
              </div>
            ) : (
              <div className="mt-4 grid gap-3 md:grid-cols-2">
                {sortedHorarios.map((horario) => {
                  const dayNumber = normalizeDayName(horario.diaSemana);
                  const dayLabel =
                    dayNameMap[dayNumber] || horario.diaSemana || "Día";

                  return (
                    <div
                      key={horario.id}
                      className="rounded-2xl border bg-muted/20 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <span className="inline-flex rounded-full border bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary">
                            {dayLabel}
                          </span>

                          <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                            <Clock3 className="h-4 w-4" />
                            <span>
                              {formatTimeForDisplay(horario.horaInicio)} -{" "}
                              {formatTimeForDisplay(horario.horaFin)}
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl text-destructive hover:text-destructive"
                          onClick={() => handleDeleteHorario(horario.id)}
                          disabled={deleteHorarioMutation.isPending}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          <section className="rounded-3xl border bg-background p-5 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="text-sm font-semibold">Configurar semana</h3>
                <p className="text-sm text-muted-foreground">
                  Activa los días necesarios y define el rango horario de consulta.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                className="rounded-2xl"
                onClick={handleResetWeek}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Limpiar semana
              </Button>
            </div>

            <div className="mt-4 grid gap-3">
              {dayOrder.map((day) => {
                const current = weekForm[day];
                const dayErrors = errors[day];
                const isActive = current.enabled;
                const dayLabel = dayNameMap[day] || fallbackDayNames[day];

                return (
                  <div
                    key={day}
                    className={cn(
                      "rounded-2xl border p-4 transition",
                      isActive ? "bg-primary/3" : "bg-muted/20",
                      dayErrors ? "border-destructive/40" : "border-border"
                    )}
                  >
                    <div className="grid gap-4 lg:grid-cols-[180px_1fr_1fr_auto] lg:items-start">
                      <div className="flex items-center gap-3 pt-1">
                        <input
                          type="checkbox"
                          checked={current.enabled}
                          onChange={(e) =>
                            handleToggleDay(day, e.target.checked)
                          }
                          className="h-4 w-4 rounded border"
                        />

                        <div>
                          <p className="font-medium">{dayLabel}</p>
                          <p className="text-xs text-muted-foreground">
                            {isActive ? "Horario activo" : "Sin horario"}
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">
                          Hora inicio
                        </label>
                        <input
                          type="time"
                          value={current.horaInicio}
                          onChange={(e) =>
                            handleChangeTime(day, "horaInicio", e.target.value)
                          }
                          disabled={!isActive}
                          className="h-11 w-full rounded-2xl border bg-background px-4 text-sm outline-none disabled:opacity-50"
                        />
                        {dayErrors?.horaInicio ? (
                          <p className="text-xs text-destructive">
                            {dayErrors.horaInicio}
                          </p>
                        ) : null}
                      </div>

                      <div className="space-y-2">
                        <label className="text-xs font-medium text-muted-foreground">
                          Hora fin
                        </label>
                        <input
                          type="time"
                          value={current.horaFin}
                          onChange={(e) =>
                            handleChangeTime(day, "horaFin", e.target.value)
                          }
                          disabled={!isActive}
                          className="h-11 w-full rounded-2xl border bg-background px-4 text-sm outline-none disabled:opacity-50"
                        />
                        {dayErrors?.horaFin ? (
                          <p className="text-xs text-destructive">
                            {dayErrors.horaFin}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        {isActive ? (
                          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                            <CheckCircle2 className="h-3.5 w-3.5" />
                            Activo
                          </span>
                        ) : (
                          <span className="inline-flex rounded-full border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
                            Inactivo
                          </span>
                        )}
                      </div>
                    </div>

                    {dayErrors?.general ? (
                      <p className="mt-3 text-xs text-destructive">
                        {dayErrors.general}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 flex justify-end">
              <Button
                className="rounded-2xl"
                onClick={handleSaveWeek}
                disabled={assignSemanaMutation.isPending || !medicoId}
              >
                {assignSemanaMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Guardar horarios
                  </>
                )}
              </Button>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}