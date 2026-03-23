import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPersonal,
  deletePersonal,
  getPersonal,
  getPersonalById,
  updatePersonal,
} from "@/services/personal.service";
import { CreatePersonalDto, UpdatePersonalDto } from "@/types/personal";

export function usePersonal() {
  return useQuery({
    queryKey: ["personal"],
    queryFn: getPersonal,
  });
}

export function usePersonalById(id?: string) {
  return useQuery({
    queryKey: ["personal", id],
    queryFn: () => getPersonalById(id as string),
    enabled: !!id,
  });
}

export function useCreatePersonal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePersonalDto) => createPersonal(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personal"] });
    },
  });
}

export function useUpdatePersonal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePersonalDto;
    }) => updatePersonal(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personal"] });
    },
  });
}

export function useDeletePersonal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deletePersonal(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["personal"] });
    },
  });
}