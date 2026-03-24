export interface Vacacion {
  id: string;
  empleadoId: string | null;
  nombreEmpleado: string | null;
  fechaInicio: string | null;
  fechaFin: string | null;
  tipoVacacion: number | string | null;
}

export interface RegistrarVacacionDto {
  fechaInicio: string;
  fechaFin: string;
  tipoVacacion: number;
}

export interface UpdateVacacionDto {
  id: string;
  fechaInicio: string;
  fechaFin: string;
  tipoVacacion: number;
}

export type VacationAssignablePerson = {
  id: string;
  nombre: string;
  origen: "medico" | "personal";
  subtitulo?: string;
};