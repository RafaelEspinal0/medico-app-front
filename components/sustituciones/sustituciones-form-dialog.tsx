"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarSync, Loader2, Save } from "lucide-react";
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
import { useCreateSustitucion } from "@/hooks/use-sustituciones";
import { getErrorMessage } from "@/lib/extract-api-error";
import { Medico } from "@/types/medico";
import { RegistrarSustitucionDto } from "@/types/sustitucion";

type FormValues = {
  fechaAltaSustitucion: string;
  fechaBajaSustitucion: string;
};

const initialValues: FormValues = {
  fechaAltaSustitucion: "",
  fechaBajaSustitucion: "",
};

interface SustitucionFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medico: Medico | null;
}

export function SustitucionFormDialog({
  open,
  onOpenChange,
  medico,
}: SustitucionFormDialogProps) {
  const createMutation = useCreateSustitucion();
  const isSubmitting = createMutation.isPending;

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const dialogTexts = useMemo(
    () => ({
      title: "Registrar sustitución",
      description:
        "Completa las fechas para registrar un nuevo período de sustitución.",
      submitLabel: "Guardar sustitución",
    }),
    []
  );

  useEffect(() => {
    if (!open) return;
    setValues(initialValues);
    setErrors({});
  }, [open]);

  const setField = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!values.fechaAltaSustitucion) {
      nextErrors.fechaAltaSustitucion =
        "La fecha de alta de sustitución es obligatoria.";
    }

    if (
      values.fechaAltaSustitucion &&
      values.fechaBajaSustitucion &&
      values.fechaAltaSustitucion > values.fechaBajaSustitucion
    ) {
      nextErrors.fechaBajaSustitucion =
        "La fecha de baja no puede ser menor que la fecha de alta.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = (): RegistrarSustitucionDto => ({
    fechaAlta: values.fechaAltaSustitucion,
    fechaBaja: values.fechaBajaSustitucion || null,
  });

  const handleSubmit = async () => {
    if (!medico?.id) {
      toast.error("No se pudo identificar el médico.");
      return;
    }

    if (!validate()) {
      toast.error("Revisa los campos obligatorios.");
      return;
    }

    try {
      await createMutation.mutateAsync({
        medicoId: medico.id,
        payload: buildPayload(),
      });

      toast.success("Sustitución registrada correctamente.");
      onOpenChange(false);
    } catch (error) {
      toast.error(
        getErrorMessage(error, "No se pudo registrar la sustitución.")
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-3xl">
        <DialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            <CalendarSync className="h-3.5 w-3.5 text-primary" />
            Gestión de sustituciones
          </div>

          <DialogTitle className="text-2xl">{dialogTexts.title}</DialogTitle>
          <DialogDescription>{dialogTexts.description}</DialogDescription>
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

          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Datos de sustitución</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha alta *</label>
                <input
                  type="date"
                  value={values.fechaAltaSustitucion}
                  onChange={(e) =>
                    setField("fechaAltaSustitucion", e.target.value)
                  }
                  className="h-11 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
                />
                {errors.fechaAltaSustitucion ? (
                  <p className="text-xs text-destructive">
                    {errors.fechaAltaSustitucion}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Fecha baja</label>
                <input
                  type="date"
                  value={values.fechaBajaSustitucion}
                  onChange={(e) =>
                    setField("fechaBajaSustitucion", e.target.value)
                  }
                  className="h-11 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
                />
                {errors.fechaBajaSustitucion ? (
                  <p className="text-xs text-destructive">
                    {errors.fechaBajaSustitucion}
                  </p>
                ) : null}
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