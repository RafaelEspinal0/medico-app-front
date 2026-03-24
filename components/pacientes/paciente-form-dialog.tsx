"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Save, UserRound } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { useCreatePaciente, useUpdatePaciente } from "@/hooks/use-pacientes";
import { useMedicos } from "@/hooks/use-medicos";
import { getErrorMessage } from "@/lib/extract-api-error";
import {
  CreatePacienteDto,
  Paciente,
  UpdatePacienteDto,
} from "@/types/paciente";

type FormValues = {
  nombre: string;
  direccion: string;
  telefono: string;
  codigoPostal: string;
  nif: string;
  numSeguridadSocial: string;
  medicoId: string;
};

const initialValues: FormValues = {
  nombre: "",
  direccion: "",
  telefono: "",
  codigoPostal: "",
  nif: "",
  numSeguridadSocial: "",
  medicoId: "",
};

interface PacienteFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente?: Paciente | null;
}

export function PacienteFormDialog({
  open,
  onOpenChange,
  paciente,
}: PacienteFormDialogProps) {
  const isEditMode = !!paciente;

  const createMutation = useCreatePaciente();
  const updateMutation = useUpdatePaciente();
  const { data: medicosResponse } = useMedicos();

  const medicos = medicosResponse?.data ?? [];
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const dialogTexts = useMemo(
    () => ({
      title: isEditMode ? "Editar paciente" : "Nuevo paciente",
      description: isEditMode
        ? "Actualiza la información del paciente seleccionado."
        : "Completa la información para registrar un nuevo paciente.",
      submitLabel: isEditMode ? "Guardar cambios" : "Crear paciente",
    }),
    [isEditMode]
  );

  useEffect(() => {
    if (!open) return;

    if (paciente) {
      setValues({
        nombre: paciente.nombre ?? "",
        direccion: paciente.direccion ?? "",
        telefono: paciente.telefono ?? "",
        codigoPostal: paciente.codigoPostal ?? "",
        nif: paciente.nif ?? "",
        numSeguridadSocial: paciente.numSeguridadSocial ?? "",
        medicoId: paciente.medicoId ?? "",
      });
    } else {
      setValues(initialValues);
    }

    setErrors({});
  }, [open, paciente]);

  const setField = <K extends keyof FormValues>(
    field: K,
    value: FormValues[K]
  ) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!values.nombre.trim()) nextErrors.nombre = "El nombre es obligatorio.";
    if (!values.telefono.trim())
      nextErrors.telefono = "El teléfono es obligatorio.";
    if (!values.nif.trim()) nextErrors.nif = "El NIF es obligatorio.";
    if (!values.numSeguridadSocial.trim()) {
      nextErrors.numSeguridadSocial =
        "El número de seguridad social es obligatorio.";
    }
    if (!values.medicoId.trim()) {
      nextErrors.medicoId = "Debes asignar un médico.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };


  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Revisa los campos obligatorios.");
      return;
    }

    const basePayload = {
      nombre: values.nombre.trim(),
      direccion: values.direccion.trim(),
      telefono: values.telefono.trim(),
      codigoPostal: values.codigoPostal.trim(),
      nif: values.nif.trim(),
      numSeguridadSocial: values.numSeguridadSocial.trim(),
      medicoId: values.medicoId,
    }

    try {
      if (isEditMode && paciente?.id) {
        const payload: UpdatePacienteDto = {
          id: paciente.id,
          ...basePayload,
        }

        await updateMutation.mutateAsync({
          id: paciente.id,
          payload,
        });
        toast.success("Paciente actualizado correctamente.");
      } else {
        const payload: CreatePacienteDto = basePayload;
        await createMutation.mutateAsync(payload);
        toast.success("Paciente creado correctamente.");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          isEditMode
            ? "No se pudo actualizar el paciente."
            : "No se pudo crear el paciente."
        )
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-4xl">
        <DialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            <UserRound className="h-3.5 w-3.5 text-primary" />
            Gestión de pacientes
          </div>

          <DialogTitle className="text-2xl">{dialogTexts.title}</DialogTitle>
          <DialogDescription>{dialogTexts.description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-2">
          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Información principal</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field
                label="Nombre completo *"
                value={values.nombre}
                onChange={(value) => setField("nombre", value)}
                error={errors.nombre}
                placeholder="Ej. Juan Pérez"
              />

              <Field
                label="Teléfono *"
                value={values.telefono}
                onChange={(value) => setField("telefono", value)}
                error={errors.telefono}
                placeholder="Ej. (809) 555-0000"
              />

              <Field
                label="Dirección"
                value={values.direccion}
                onChange={(value) => setField("direccion", value)}
                error={errors.direccion}
                placeholder="Ej. Calle Principal #12"
              />

              <Field
                label="Código postal"
                value={values.codigoPostal}
                onChange={(value) => setField("codigoPostal", value)}
                error={errors.codigoPostal}
                placeholder="Ej. 10101"
              />
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Documentación y asignación</h3>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field
                label="NIF *"
                value={values.nif}
                onChange={(value) => setField("nif", value)}
                error={errors.nif}
                placeholder="Ej. 001-0000000-0"
              />

              <Field
                label="Número de seguridad social *"
                value={values.numSeguridadSocial}
                onChange={(value) => setField("numSeguridadSocial", value)}
                error={errors.numSeguridadSocial}
                placeholder="Ej. NSS-123456789"
              />

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium">Médico asignado *</label>
                <select
                  value={values.medicoId}
                  onChange={(e) => setField("medicoId", e.target.value)}
                  className="h-11 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
                >
                  <option value="">Selecciona un médico</option>
                  {medicos.map((medico) => (
                    <option key={medico.id} value={medico.id}>
                      {medico.nombre || "Médico sin nombre"}
                    </option>
                  ))}
                </select>
                {errors.medicoId ? (
                  <p className="text-xs text-destructive">{errors.medicoId}</p>
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

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{label}</label>
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-11 rounded-2xl"
      />
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}