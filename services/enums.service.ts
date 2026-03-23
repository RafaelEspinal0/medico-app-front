import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import { EnumValueDto } from "@/types/horario";

export async function getTiposMedico() {
  const { data } = await api.get("/api/Enums/tipo-medico");
  return data;
}

export async function getDiasSemana() {
  const { data } = await api.get<ApiResponse<EnumValueDto[]>>(
    "/api/Enums/dia-semana"
  );
  return data;
}