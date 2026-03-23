import { api } from "@/lib/api";
import { ApiResponse } from "@/types/api";
import {
  CreatePersonalDto,
  Personal,
  UpdatePersonalDto,
} from "@/types/personal";

export async function getPersonal() {
  const { data } = await api.get<ApiResponse<Personal[]>>("/api/Personal");
  return data;
}

export async function getPersonalById(id: string) {
  const { data } = await api.get<ApiResponse<Personal>>(`/api/Personal/${id}`);
  return data;
}

export async function createPersonal(payload: CreatePersonalDto) {
  const { data } = await api.post<ApiResponse<string>>("/api/Personal", payload);
  return data;
}

export async function updatePersonal(id: string, payload: UpdatePersonalDto) {
  const { data } = await api.put<ApiResponse<boolean>>(
    `/api/Personal/${id}`,
    payload
  );
  return data;
}

export async function deletePersonal(id: string) {
  const { data } = await api.delete<ApiResponse<boolean>>(`/api/Personal/${id}`);
  return data;
}