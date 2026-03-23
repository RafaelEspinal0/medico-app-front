export interface Horario {
  id: string;
  diaSemana: string | null;
  horaInicio: string;
  horaFin: string;
}

export interface AsignarHorarioDto {
  diaSemana: number;
  horaInicio: string;
  horaFin: string;
}

export interface EnumValueDto {
  valor: number;
  nombre: string | null;
}