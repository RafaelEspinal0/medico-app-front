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
import { useCreatePersonal, useUpdatePersonal } from "@/hooks/use-personal";
import { getErrorMessage } from "@/lib/extract-api-error";
import { TIPO_PERSONAL } from "@/types/enums/tipo-personal.enum";
import {
  CreatePersonalDto,
  Personal,
  UpdatePersonalDto,
} from "@/types/personal";

type FormValues = {
  nombre: string;
  direccion: string;
  telefono: string;
  poblacion: string;
  provincia: string;
  codigoPostal: string;
  nif: string;
  numSeguridadSocial: string;
  tipoPersonal: number;
};

const initialValues: FormValues = {
  nombre: "",
  direccion: "",
  telefono: "",
  poblacion: "",
  provincia: "",
  codigoPostal: "",
  nif: "",
  numSeguridadSocial: "",
  tipoPersonal: TIPO_PERSONAL.ADMINISTRATIVO,
};

interface PersonalFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  personal?: Personal | null;
}

export function PersonalFormDialog({
  open,
  onOpenChange,
  personal,
}: PersonalFormDialogProps) {
  const isEditMode = !!personal;

  const createMutation = useCreatePersonal();
  const updateMutation = useUpdatePersonal();

  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormValues, string>>
  >({});

  const dialogTexts = useMemo(
    () => ({
      title: isEditMode ? "Editar empleado" : "Nuevo empleado",
      description: isEditMode
        ? "Actualiza la información del empleado seleccionado."
        : "Completa la información para registrar un nuevo empleado.",
      submitLabel: isEditMode ? "Guardar cambios" : "Crear empleado",
    }),
    [isEditMode]
  );

  useEffect(() => {
    if (!open) return;

    if (personal) {
      setValues({
        nombre: personal.nombre ?? "",
        direccion: personal.direccion ?? "",
        telefono: personal.telefono ?? "",
        poblacion: personal.poblacion ?? "",
        provincia: personal.provincia ?? "",
        codigoPostal: personal.codigoPostal ?? "",
        nif: personal.nif ?? "",
        numSeguridadSocial: personal.numSeguridadSocial ?? "",
        tipoPersonal:
          typeof personal.tipoPersonal === "string"
            ? Number(personal.tipoPersonal) || TIPO_PERSONAL.ADMINISTRATIVO
            : personal.tipoPersonal || TIPO_PERSONAL.ADMINISTRATIVO,
      });
    } else {
      setValues(initialValues);
    }

    setErrors({});
  }, [open, personal]);

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
    if (!values.telefono.trim()) {
      nextErrors.telefono = "El teléfono es obligatorio.";
    }
    if (!values.provincia.trim()) {
      nextErrors.provincia = "La provincia es obligatoria.";
    }
    if (!values.nif.trim()) nextErrors.nif = "El NIF es obligatorio.";
    if (!values.numSeguridadSocial.trim()) {
      nextErrors.numSeguridadSocial =
        "El número de seguridad social es obligatorio.";
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
      poblacion: values.poblacion.trim(),
      provincia: values.provincia.trim(),
      codigoPostal: values.codigoPostal.trim(),
      nif: values.nif.trim(),
      numSeguridadSocial: values.numSeguridadSocial.trim(),
      tipoPersonal: Number(values.tipoPersonal),
    };

    try {
      if (isEditMode && personal?.id) {
        const payload: UpdatePersonalDto = {
          id: personal.id,
          ...basePayload,
        };

        await updateMutation.mutateAsync({
          id: personal.id,
          payload,
        });

        toast.success("Empleado actualizado correctamente.");
      } else {
        const payload: CreatePersonalDto = basePayload;

        await createMutation.mutateAsync(payload);
        toast.success("Empleado creado correctamente.");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          isEditMode
            ? "No se pudo actualizar el empleado."
            : "No se pudo crear el empleado."
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
            Gestión de empleados
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
                placeholder="Ej. Laura Pérez"
              />

              <Field
                label="Teléfono *"
                value={values.telefono}
                onChange={(value) => setField("telefono", value)}
                error={errors.telefono}
                placeholder="Ej. (809) 555-0000"
              />

              <Field
                label="Provincia *"
                value={values.provincia}
                onChange={(value) => setField("provincia", value)}
                error={errors.provincia}
                placeholder="Ej. Santo Domingo"
              />

              <Field
                label="Población"
                value={values.poblacion}
                onChange={(value) => setField("poblacion", value)}
                error={errors.poblacion}
                placeholder="Ej. Distrito Nacional"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de empleado</label>
                <select
                  value={values.tipoPersonal}
                  onChange={(e) =>
                    setField("tipoPersonal", Number(e.target.value))
                  }
                  className="h-11 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
                >
                  <option value={TIPO_PERSONAL.ADMINISTRATIVO}>
                    Administrativo
                  </option>
                  <option value={TIPO_PERSONAL.ENFERMERO}>Enfermero</option>
                  <option value={TIPO_PERSONAL.TECNICO}>Técnico</option>
                  <option value={TIPO_PERSONAL.LIMPIEZA}>Limpieza</option>
                  <option value={TIPO_PERSONAL.SEGURIDAD}>Seguridad</option>
                </select>
              </div>

              <Field
                label="Dirección"
                value={values.direccion}
                onChange={(value) => setField("direccion", value)}
                error={errors.direccion}
                placeholder="Ej. Calle Principal #12"
              />
            </div>
          </section>

          <section className="rounded-3xl border bg-muted/20 p-5">
            <h3 className="text-sm font-semibold">Documentación y registro</h3>

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

              <Field
                label="Código postal"
                value={values.codigoPostal}
                onChange={(value) => setField("codigoPostal", value)}
                error={errors.codigoPostal}
                placeholder="Ej. 10101"
              />
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