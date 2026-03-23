import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignHorarioToMedico,
  assignSemanaToMedico,
  deleteHorario,
  getHorariosByMedico,
} from "@/services/horarios.service";
import { AsignarHorarioDto } from "@/types/horario";

export function useHorariosByMedico(medicoId?: string, enabled = true) {
  return useQuery({
    queryKey: ["horarios", "medico", medicoId],
    queryFn: () => getHorariosByMedico(medicoId as string),
    enabled: !!medicoId && enabled,
  });
}

export function useAssignHorarioToMedico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      medicoId,
      payload,
    }: {
      medicoId: string;
      payload: AsignarHorarioDto;
    }) => assignHorarioToMedico(medicoId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["horarios", "medico", variables.medicoId],
      });
    },
  });
}

export function useAssignSemanaToMedico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      medicoId,
      payload,
    }: {
      medicoId: string;
      payload: AsignarHorarioDto[];
    }) => assignSemanaToMedico(medicoId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["horarios", "medico", variables.medicoId],
      });
    },
  });
}

export function useDeleteHorario() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      horarioId,
      medicoId,
    }: {
      horarioId: string;
      medicoId: string;
    }) => deleteHorario(horarioId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["horarios", "medico", variables.medicoId],
      });
    },
  });
}