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
import { useDeleteMedico } from "@/hooks/use-medicos";
import { getErrorMessage } from "@/lib/extract-api-error";
import { Medico } from "@/types/medico";

interface DeleteMedicoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medico: Medico | null;
}

export function DeleteMedicoDialog({
  open,
  onOpenChange,
  medico,
}: DeleteMedicoDialogProps) {
  const deleteMutation = useDeleteMedico();

  const handleDelete = async () => {
    if (!medico?.id) return;

    try {
      await deleteMutation.mutateAsync(medico.id);
      toast.success("Médico eliminado correctamente.");
      onOpenChange(false);
    } catch (error) {
      toast.error(getErrorMessage(error, "No se pudo eliminar el médico."));
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
            Eliminar médico
          </AlertDialogTitle>

          <AlertDialogDescription className="leading-7">
            Esta acción eliminará al médico{" "}
            <span className="font-semibold text-foreground">
              {medico?.nombre || "seleccionado"}
            </span>
            . Esta operación no se puede deshacer.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="rounded-2xl border bg-muted/20 p-4 text-sm">
          <p>
            <span className="font-medium">Nombre:</span>{" "}
            {medico?.nombre || "-"}
          </p>
          <p className="mt-2">
            <span className="font-medium">NIF:</span> {medico?.nif || "-"}
          </p>
          <p className="mt-2">
            <span className="font-medium">Colegiado:</span>{" "}
            {medico?.numColegiado || "-"}
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