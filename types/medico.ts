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
  nombre: string | null;
  direccion: string | null;
  telefono: string | null;
  poblacion: string | null;
  provincia: string | null;
  codigoPostal: string | null;
  nif: string | null;
  numSeguridadSocial: string | null;
  numColegiado: string | null;
  tipoMedico: number;
}

export interface UpdateMedicoDto {
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
  tipoMedico: number;
}

export interface MedicoSustitutoActivoDto {
  id: string;
  nombre: string | null;
  numColegiado: string | null;
  telefono: string | null;
  provincia: string | null;
  fechaAltaSustitucion: string;
  fechaBajaSustitucion: string | null;
  diasEnSustitucion: number;
}