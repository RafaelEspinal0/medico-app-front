import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPaciente,
  deletePaciente,
  getPacienteById,
  getPacientes,
  getPacientesByMedico,
  updatePaciente,
} from "@/services/pacientes.service";
import { CreatePacienteDto, UpdatePacienteDto } from "@/types/paciente";

export function usePacientes() {
  return useQuery({
    queryKey: ["pacientes"],
    queryFn: getPacientes,
  });
}

export function usePacienteById(id?: string) {
  return useQuery({
    queryKey: ["pacientes", id],
    queryFn: () => getPacienteById(id as string),
    enabled: !!id,
  });
}

export function usePacientesByMedico(medicoId?: string) {
  return useQuery({
    queryKey: ["pacientes", "por-medico", medicoId],
    queryFn: () => getPacientesByMedico(medicoId as string),
    enabled: !!medicoId,
  });
}

export function useCreatePaciente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePacienteDto) => createPaciente(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    },
  });
}

export function useUpdatePaciente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePacienteDto;
    }) => updatePaciente(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    },
  });
}

export function useDeletePaciente() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePaciente(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pacientes"] });
    },
  });
}