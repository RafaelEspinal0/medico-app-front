import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  RegistrarVacacionDto,
  UpdateVacacionDto,
  Vacacion,
} from "@/types/vacacion";

export async function getVacacionesByEmpleado(empleadoId: string) {
  const { data } = await api.get<ApiResponse<Vacacion[]>>(
    `/api/Vacaciones/por-empleado/${empleadoId}`
  );
  return data;
}

export async function createVacacion(
  empleadoId: string,
  payload: RegistrarVacacionDto
) {
  const { data } = await api.post<ApiResponse<string>>(
    `/api/Vacaciones/empleado/${empleadoId}`,
    payload
  );
  return data;
}

export async function updateVacacion(
  vacacionId: string,
  payload: UpdateVacacionDto
) {
  const { data } = await api.put<ApiResponse<boolean>>(
    `/api/Vacaciones/${vacacionId}`,
    payload
  );
  return data;
}

export async function markVacacionAsDisfrutada(vacacionId: string) {
  const { data } = await api.patch<ApiResponse<boolean>>(
    `/api/Vacaciones/${vacacionId}/marcar-disfrutada`
  );
  return data;
}