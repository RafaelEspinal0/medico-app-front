import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  RegistrarSustitucionDto,
  Sustitucion,
} from "@/types/sustitucion";

export async function getSustitucionesByMedico(medicoId: string) {
  const { data } = await api.get<ApiResponse<Sustitucion[]>>(
    `/api/Sustituciones/por-medico/${medicoId}`
  );
  return data;
}

export async function createSustitucion(payload: RegistrarSustitucionDto) {
  const { data } = await api.post<ApiResponse<string>>(
    `/api/Sustituciones`,
    payload
  );
  return data;
}

