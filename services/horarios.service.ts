import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { AsignarHorarioDto, Horario } from "@/types/horario";

export async function getHorariosByMedico(medicoId: string) {
  const { data } = await api.get<ApiResponse<Horario[]>>(
    `/api/Horarios/medico/${medicoId}`
  );
  return data;
}

export async function assignHorarioToMedico(
  medicoId: string,
  payload: AsignarHorarioDto
) {
  const { data } = await api.post<ApiResponse<string>>(
    `/api/Horarios/medico/${medicoId}`,
    payload
  );
  return data;
}

export async function assignSemanaToMedico(
  medicoId: string,
  payload: AsignarHorarioDto[]
) {
  const { data } = await api.post<ApiResponse<string[]>>(
    `/api/Horarios/medico/${medicoId}/semana`,
    payload
  );
  return data;
}

export async function deleteHorario(horarioId: string) {
  const { data } = await api.delete<ApiResponse<boolean>>(
    `/api/Horarios/${horarioId}`
  );
  return data;
}