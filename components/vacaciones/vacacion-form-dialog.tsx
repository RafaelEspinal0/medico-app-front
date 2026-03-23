"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  useCreateVacacion,
  useUpdateVacacion,
} from "@/hooks/use-vacaciones";
import { getErrorMessage } from "@/lib/extract-api-error";
import { TIPO_VACACION } from "@/types/enums/tipo-vacacion.enum";
import {
  RegistrarVacacionDto,
  UpdateVacacionDto,
  Vacacion,
} from "@/types/vacacion";

type FormValues = {
  fechaInicio: string;
  fechaFin: string;
  tipoVacacion: number;
};

const initialValues: FormValues = {
  fechaInicio: "",
  fechaFin: "",
  tipoVacacion: TIPO_VACACION.PLANIFICADAS,
};

interface VacacionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vacacion?: Vacacion | null;
  empleadoId?: string;
}

function toDateInput(value?: string | null) {
  if (!value) return "";
  return value.slice(0, 10);
}

export function VacacionFormDialog({
  open,
  onOpenChange,
  vacacion,
  empleadoId,
}: VacacionFormDialogProps) {
  const isEditMode = !!vacacion;

  const createMutation = useCreateVacacion();
  const updateMutation = useUpdateVacacion();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const dialogTexts = useMemo(
    () => ({
      title: isEditMode ? "Editar vacación" : "Nueva vacación",
      description: isEditMode
        ? "Actualiza la información del período de vacación seleccionado."
        : "Completa la información para registrar un nuevo período de vacación.",
      submitLabel: isEditMode ? "Guardar cambios" : "Registrar vacación",
    }),
    [isEditMode]
  );

  useEffect(() => {
    if (!open) return;

    if (vacacion) {
      setValues({
        fechaInicio: toDateInput(vacacion.fechaInicio),
        fechaFin: toDateInput(vacacion.fechaFin),
        tipoVacacion:
          typeof vacacion.tipoVacacion === "string"
            ? Number(vacacion.tipoVacacion) || TIPO_VACACION.PLANIFICADAS
            : vacacion.tipoVacacion || TIPO_VACACION.PLANIFICADAS,
      });
    } else {
      setValues(initialValues);
    }

    setErrors({});
  }, [open, vacacion]);

  const setField = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!values.fechaInicio) {
      nextErrors.fechaInicio = "La fecha de inicio es obligatoria.";
    }

    if (!values.fechaFin) {
      nextErrors.fechaFin = "La fecha de fin es obligatoria.";
    }

    if (
      values.fechaInicio &&
      values.fechaFin &&
      values.fechaInicio > values.fechaFin
    ) {
      nextErrors.fechaFin =
        "La fecha de fin no puede ser menor que la fecha de inicio.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = (): RegistrarVacacionDto | UpdateVacacionDto => ({
    fechaInicio: values.fechaInicio,
    fechaFin: values.fechaFin,
    tipoVacacion: Number(values.tipoVacacion),
  });

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Revisa los campos obligatorios.");
      return;
    }

    const payload = buildPayload();
    const targetEmpleadoId = isEditMode ? vacacion?.empleadoId : empleadoId;

    if (!targetEmpleadoId) {
      toast.error("No se pudo identificar el colaborador para esta vacación.");
      return;
    }

    try {
      if (isEditMode && vacacion?.id) {
        await updateMutation.mutateAsync({
          vacacionId: vacacion.id,
          empleadoId: targetEmpleadoId,
          payload: payload as UpdateVacacionDto,
        });

        toast.success("Vacación actualizada correctamente.");
      } else {
        await createMutation.mutateAsync({
          empleadoId: targetEmpleadoId,
          payload: payload as RegistrarVacacionDto,
        });

        toast.success("Vacación registrada correctamente.");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          isEditMode
            ? "No se pudo actualizar la vacación."
            : "No se pudo registrar la vacación."
        )
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-3xl">
        <DialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 text-primary" />
            Gestión de vacaciones
          </div>

          <DialogTitle className="text-2xl">{dialogTexts.title}</DialogTitle>
          <DialogDescription>{dialogTexts.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Información principal</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha inicio *</label>
                <input
                  type="date"
                  value={values.fechaInicio}
                  onChange={(e) => setField("fechaInicio", e.target.value)}
                  className="h-11 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
                />
                {errors.fechaInicio ? (
                  <p className="text-xs text-destructive">
                    {errors.fechaInicio}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha fin *</label>
                <input
                  type="date"
                  value={values.fechaFin}
                  onChange={(e) => setField("fechaFin", e.target.value)}
                  className="h-11 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
                />
                {errors.fechaFin ? (
                  <p className="text-xs text-destructive">{errors.fechaFin}</p>
                ) : null}
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Tipo de vacación</label>
                <select
                  value={values.tipoVacacion}
                  onChange={(e) =>
                    setField("tipoVacacion", Number(e.target.value))
                  }
                  className="h-11 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
                >
                  <option value={TIPO_VACACION.PLANIFICADAS}>
                    Planificadas
                  </option>
                  <option value={TIPO_VACACION.DISFRUTADAS}>
                    Disfrutadas
                  </option>
                </select>
              </div>
            </div>
          </section>
        </div>

        <DialogFooter className="gap-2 sm:justify-end">
          <Button
            type="button"
            variant="outline"
            className="rounded-2xl"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>

          <Button
            type="button"
            className="rounded-2xl"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                {dialogTexts.submitLabel}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}