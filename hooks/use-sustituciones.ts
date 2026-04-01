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
    mutationFn: (payload: RegistrarSustitucionDto) =>
      createSustitucion(payload),
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["sustituciones", "por-medico", payload.medicoSustitutoId],
      });
      queryClient.invalidateQueries({
        queryKey: ["medicos", "sustitutos", "activos"],
      });
    },
  });
}