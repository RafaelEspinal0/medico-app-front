import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { CreateMedicoDto, Medico, UpdateMedicoDto } from "@/types/medico";

export async function getMedicos() {
  const { data } = await api.get<ApiResponse<Medico[]>>("/api/Medicos");
  return data;
}

export async function getMedicoById(id: string) {
  const { data } = await api.get<ApiResponse<Medico>>(`/api/Medicos/${id}`);
  return data;
}

export async function createMedico(payload: CreateMedicoDto) {
  const { data } = await api.post<ApiResponse<boolean>>("/api/Medicos", payload);
  return data;
}

export async function updateMedico(id: string, payload: UpdateMedicoDto) {
  const { data } = await api.put<ApiResponse<boolean>>(`/api/Medicos/${id}`, payload);
  return data;
}

export async function deleteMedico(id: string) {
  const { data } = await api.delete<ApiResponse<boolean>>(`/api/Medicos/${id}`);
  return data;
}

export async function getHorariosByMedico(id: string) {
  const { data } = await api.get(`/api/Medicos/${id}/horarios`);
  return data;
}

export async function getMedicosSustitutosActivos() {
  const { data } = await api.get("/api/Medicos/sustitutos/activos");
  return data;
}