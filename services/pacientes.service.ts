import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  CreatePacienteDto,
  Paciente,
  UpdatePacienteDto,
} from "@/types/paciente";

export async function getPacientes() {
  const { data } = await api.get<ApiResponse<Paciente[]>>("/api/Pacientes");
  return data;
}

export async function getPacienteById(id: string) {
  const { data } = await api.get<ApiResponse<Paciente>>(`/api/Pacientes/${id}`);
  return data;
}

export async function createPaciente(payload: CreatePacienteDto) {
  const { data } = await api.post<ApiResponse<boolean>>(
    "/api/Pacientes",
    payload
  );
  return data;
}

export async function updatePaciente(id: string, payload: UpdatePacienteDto) {
  const { data } = await api.put<ApiResponse<boolean>>(
    `/api/Pacientes/${id}`,
    payload
  );
  return data;
}

export async function deletePaciente(id: string) {
  const { data } = await api.delete<ApiResponse<boolean>>(
    `/api/Pacientes/${id}`
  );
  return data;
}

export async function getPacientesByMedico(medicoId: string) {
  const { data } = await api.get<ApiResponse<Paciente[]>>(
    `/api/Pacientes/por-medico/${medicoId}`
  );
  return data;
}