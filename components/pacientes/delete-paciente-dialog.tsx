"use client";

import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDeletePaciente } from "@/hooks/use-pacientes";
import { getErrorMessage } from "@/lib/extract-api-error";
import { Paciente } from "@/types/paciente";

interface DeletePacienteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  paciente: Paciente | null;
}

export function DeletePacienteDialog({
  open,
  onOpenChange,
  paciente,
}: DeletePacienteDialogProps) {
  const deleteMutation = useDeletePaciente();

  const handleDelete = async () => {
    if (!paciente?.id) return;

    try {
      await deleteMutation.mutateAsync(paciente.id);
      toast.success("Paciente eliminado correctamente.");
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo eliminar el paciente."));
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="rounded-3xl">
        <AlertDialogHeader>
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full border bg-destructive/5 px-3 py-1.5 text-xs text-muted-foreground">
            <Trash2 className="h-3.5 w-3.5 text-destructive" />
            Acción permanente
          </div>

          <AlertDialogTitle className="text-2xl">
            Eliminar paciente
          </AlertDialogTitle>

          <AlertDialogDescription className="leading-7">
            Esta acción eliminará al paciente{" "}
            <span className="font-semibold text-foreground">
              {paciente?.nombre || "seleccionado"}
            </span>
            . Esta operación no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
          <p>
            <span className="font-medium">Nombre:</span>{" "}
            {paciente?.nombre || "-"}
          </p>
          <p className="mt-2">
            <span className="font-medium">NIF:</span> {paciente?.nif || "-"}
          </p>
          <p className="mt-2">
            <span className="font-medium">Médico asignado:</span>{" "}
            {paciente?.nombreMedico || "Sin asignar"}
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            className="rounded-2xl"
            disabled={deleteMutation.isPending}
          >
            Cancelar
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="rounded-2xl bg-destructive text-destructive-foreground hover:bg-destructive/90"
            disabled={deleteMutation.isPending}
          >
            {deleteMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Eliminando...
              </>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4" />
                Eliminar
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}