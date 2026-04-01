import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createMedico,
  deleteMedico,
  getMedicoById,
  getMedicos,
  getMedicosSustitutos,
  getMedicosSustitutosActivos,
  updateMedico,
} from "@/services/medicos.service";
import { CreateMedicoDto, UpdateMedicoDto } from "@/types/medico";

export function useMedicos() {
  return useQuery({
    queryKey: ["medicos"],
    queryFn: getMedicos,
  });
}

export function useMedicoById(id?: string) {
  return useQuery({
    queryKey: ["medicos", id],
    queryFn: () => getMedicoById(id as string),
    enabled: !!id,
  });
}

export function useCreateMedico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMedicoDto) => createMedico(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicos"] });
    },
  });
}

export function useUpdateMedico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateMedicoDto }) =>
      updateMedico(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicos"] });
    },
  });
}

export function useDeleteMedico() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteMedico(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["medicos"] });
    },
  });
}

export function useMedicosSustitutos() {
  return useQuery({
    queryKey: ["medicos", "sustitutos"],
    queryFn: getMedicosSustitutos,
  });
}

export function useMedicosSustitutosActivos() {
  return useQuery({
    queryKey: ["medicos", "sustitutos", "activos"],
    queryFn: getMedicosSustitutosActivos,
  });
}