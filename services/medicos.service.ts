import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  CreateMedicoDto,
  Medico,
  MedicoSustitutoActivoDto,
  UpdateMedicoDto,
} from "@/types/medico";

export async function getMedicos() {
  const { data } = await api.get<ApiResponse<Medico[]>>("/api/Medicos");
  return data;
}

export async function getMedicoById(id: string) {
  const { data } = await api.get<ApiResponse<Medico>>(`/api/Medicos/${id}`);
  return data;
}

export async function getMedicosSustitutos() {
  const { data } = await api.get<ApiResponse<Medico[]>>(
    "/api/Medicos/sustitutos"
  );
  return data;
}

export async function getMedicosSustitutosActivos() {
  const { data } = await api.get<ApiResponse<MedicoSustitutoActivoDto[]>>(
    "/api/Medicos/sustitutos/activos"
  );
  return data;
}

export async function createMedico(payload: CreateMedicoDto) {
  const { data } = await api.post<ApiResponse<string>>("/api/Medicos", payload);
  return data;
}

export async function updateMedico(id: string, payload: UpdateMedicoDto) {
  const { data } = await api.put<ApiResponse<boolean>>(
    `/api/Medicos/${id}`,
    payload
  );
  return data;
}

export async function deleteMedico(id: string) {
  const { data } = await api.delete<ApiResponse<boolean>>(
    `/api/Medicos/${id}`
  );
  return data;
}

