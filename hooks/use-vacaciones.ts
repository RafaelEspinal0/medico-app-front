import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createVacacion,
  getVacacionesByEmpleado,
  markVacacionAsDisfrutada,
  updateVacacion,
} from "@/services/vacaciones.service";
import { RegistrarVacacionDto, UpdateVacacionDto } from "@/types/vacacion";

export function useVacacionesByEmpleado(empleadoId?: string) {
  return useQuery({
    queryKey: ["vacaciones", "por-empleado", empleadoId],
    queryFn: () => getVacacionesByEmpleado(empleadoId as string),
    enabled: !!empleadoId,
  });
}

export function useCreateVacacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      empleadoId,
      payload,
    }: {
      empleadoId: string;
      payload: RegistrarVacacionDto;
    }) => createVacacion(empleadoId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["vacaciones", "por-empleado", variables.empleadoId],
      });
    },
  });
}

export function useUpdateVacacion() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      vacacionId,
      empleadoId,
      payload,
    }: {
      vacacionId: string;
      empleadoId: string;
      payload: UpdateVacacionDto;
    }) => updateVacacion(vacacionId, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["vacaciones", "por-empleado", variables.empleadoId],
      });
    },
  });
}

export function useMarkVacacionAsDisfrutada() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      vacacionId,
      empleadoId,
    }: {
      vacacionId: string;
      empleadoId: string;
    }) => markVacacionAsDisfrutada(vacacionId),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["vacaciones", "por-empleado", variables.empleadoId],
      });
    },
  });
}