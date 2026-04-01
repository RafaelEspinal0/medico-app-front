export interface Sustitucion {
  id: string;
  medicoId: string;
  nombreMedico: string | null;
  medicoTitularId: string;
  nombreMedicoTitular: string | null;
  fechaAlta: string;
  fechaBaja: string | null;
  estaActiva: boolean;
}

export interface RegistrarSustitucionDto {
  medicoSustitutoId: string;
  medicoTitularId: string;
  fechaAlta: string;
  fechaBaja?: string | null;
}