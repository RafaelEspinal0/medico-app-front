"use client";

import { useEffect, useMemo, useState } from "react";
import { Loader2, Save, Stethoscope } from "lucide-react";
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
import { TIPO_MEDICO } from "@/types/enums/tipo-medito.enum";
import { CreateMedicoDto, Medico, UpdateMedicoDto } from "@/types/medico";
import { useCreateMedico, useUpdateMedico } from "@/hooks/use-medicos";
import { getErrorMessage } from "@/lib/extract-api-error";

type FormValues = {
  nombre: string;
  direccion: string;
  telefono: string;
  poblacion: string;
  provincia: string;
  codigoPostal: string;
  nif: string;
  numSeguridadSocial: string;
  numColegiado: string;
  tipoMedico: number;
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
  numColegiado: "",
  tipoMedico: TIPO_MEDICO.TITULAR,
};

interface MedicoFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medico?: Medico | null;
}

export function MedicoFormDialog({
  open,
  onOpenChange,
  medico,
}: MedicoFormDialogProps) {
  const isEditMode = !!medico;

  const createMutation = useCreateMedico();
  const updateMutation = useUpdateMedico();

  const isSubmitting =
    createMutation.isPending || updateMutation.isPending;

  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>(
    {}
  );

  const dialogTexts = useMemo(
    () => ({
      title: isEditMode ? "Editar médico" : "Nuevo médico",
      description: isEditMode
        ? "Actualiza la información del médico seleccionado."
        : "Completa la información para registrar un nuevo médico.",
      submitLabel: isEditMode ? "Guardar cambios" : "Crear médico",
    }),
    [isEditMode]
  );

  useEffect(() => {
    if (!open) return;

    if (medico) {
      setValues({
        nombre: medico.nombre ?? "",
        direccion: medico.direccion ?? "",
        telefono: medico.telefono ?? "",
        poblacion: medico.poblacion ?? "",
        provincia: medico.provincia ?? "",
        codigoPostal: medico.codigoPostal ?? "",
        nif: medico.nif ?? "",
        numSeguridadSocial: medico.numSeguridadSocial ?? "",
        numColegiado: medico.numColegiado ?? "",
        tipoMedico:
          typeof medico.tipoMedico === "string"
            ? Number(medico.tipoMedico) || TIPO_MEDICO.TITULAR
            : medico.tipoMedico || TIPO_MEDICO.TITULAR,
      });
    } else {
      setValues(initialValues);
    }

    setErrors({});
  }, [open, medico]);

  const setField = <K extends keyof FormValues>(field: K, value: FormValues[K]) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof FormValues, string>> = {};

    if (!values.nombre.trim()) nextErrors.nombre = "El nombre es obligatorio.";
    if (!values.telefono.trim()) nextErrors.telefono = "El teléfono es obligatorio.";
    if (!values.provincia.trim()) nextErrors.provincia = "La provincia es obligatoria.";
    if (!values.nif.trim()) nextErrors.nif = "El NIF es obligatorio.";
    if (!values.numColegiado.trim()) {
      nextErrors.numColegiado = "El número de colegiado es obligatorio.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const buildPayload = (): CreateMedicoDto | UpdateMedicoDto => ({
    nombre: values.nombre.trim(),
    direccion: values.direccion.trim(),
    telefono: values.telefono.trim(),
    poblacion: values.poblacion.trim(),
    provincia: values.provincia.trim(),
    codigoPostal: values.codigoPostal.trim(),
    nif: values.nif.trim(),
    numSeguridadSocial: values.numSeguridadSocial.trim(),
    numColegiado: values.numColegiado.trim(),
    tipoMedico: Number(values.tipoMedico),
  });

  const handleSubmit = async () => {
    if (!validate()) {
      toast.error("Revisa los campos obligatorios.");
      return;
    }

    const payload = buildPayload();

    try {
      if (isEditMode && medico?.id) {
        await updateMutation.mutateAsync({
          id: medico.id,
          payload,
        });

        toast.success("Médico actualizado correctamente.");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Médico creado correctamente.");
      }

      onOpenChange(false);
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          isEditMode
            ? "No se pudo actualizar el médico."
            : "No se pudo crear el médico."
        )
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-3xl sm:max-w-4xl">
        <DialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-muted-foreground">
            <Stethoscope className="h-3.5 w-3.5 text-primary" />
            Gestión de médicos
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
                placeholder="Ej. Dra. Ana Martínez"
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
                <label className="text-sm font-medium">Tipo de médico</label>
                <select
                  value={values.tipoMedico}
                  onChange={(e) => setField("tipoMedico", Number(e.target.value))}
                  className="h-11 w-full rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
                >
                  <option value={TIPO_MEDICO.TITULAR}>Titular</option>
                  <option value={TIPO_MEDICO.INTERINO}>Interino</option>
                  <option value={TIPO_MEDICO.SUSTITUTO}>Sustituto</option>
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
                label="Número de colegiado *"
                value={values.numColegiado}
                onChange={(value) => setField("numColegiado", value)}
                error={errors.numColegiado}
                placeholder="Ej. CMD-10234"
              />

              <Field
                label="Número de seguridad social"
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