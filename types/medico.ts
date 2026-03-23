export interface Medico {
  id: string;
  nombre: string | null;
  direccion: string | null;
  telefono: string | null;
  poblacion: string | null;
  provincia: string | null;
  codigoPostal: string | null;
  nif: string | null;
  numSeguridadSocial: string | null;
  numColegiado: string | null;
  tipoMedico: number | string | null;
  totalPacientes: number;
  isActive: boolean;
}

export interface CreateMedicoDto {
  nombre: string;
  direccion: string;
  telefono: string;
  poblacion: string;
  provincia: string;
  codigoPostal: string;
  nif: string;
  numSeguridadSocial: string;
  numColegiado: string;
  tipoMedico: number;
}

export interface UpdateMedicoDto {
  nombre: string;
  direccion: string;
  telefono: string;
  poblacion: string;
  provincia: string;
  codigoPostal: string;
  nif: string;
  numSeguridadSocial: string;
  numColegiado: string;
  tipoMedico: number;
}