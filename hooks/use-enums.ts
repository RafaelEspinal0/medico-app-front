import { useQuery } from "@tanstack/react-query";
import { getDiasSemana, getTiposMedico } from "@/services/enums.service";

export function useTiposMedico() {
  return useQuery({
    queryKey: ["enums", "tipos-medico"],
    queryFn: getTiposMedico,
    staleTime: 1000 * 60 * 30,
  });
}

export function useDiasSemana() {
  return useQuery({
    queryKey: ["enums", "dias-semana"],
    queryFn: getDiasSemana,
    staleTime: 1000 * 60 * 30,
  });
}