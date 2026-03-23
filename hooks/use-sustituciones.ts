import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSustitucion,
  getSustitucionesByMedico,
} from "@/services/sustituciones.service";
import { RegistrarSustitucionDto } from "@/types/sustitucion";

export function useSustitucionesByMedico(
  medicoId?: string,
  enabled = true
) {
  return useQuery({
    queryKey: ["sustituciones", "por-medico", medicoId],
    queryFn: () => getSustitucionesByMedico(medicoId as string),
    enabled: !!medicoId && enabled,
  });
}

export function useCreateSustitucion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      medicoId,
      payload,
    }: {
      medicoId: string;
      payload: RegistrarSustitucionDto;
    }) => createSustitucion(medicoId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["sustituciones", "por-medico", variables.medicoId],
      });
    },
  });
}