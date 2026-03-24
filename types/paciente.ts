export interface Paciente {
  id: string;
  nombre: string | null;
  direccion: string | null;
  telefono: string | null;
  codigoPostal: string | null;
  nif: string | null;
  numSeguridadSocial: string | null;
  medicoId: string | null;
  nombreMedico: string | null;
  isActive: boolean;
}

export interface CreatePacienteDto {
  nombre: string;
  direccion: string;
  telefono: string;
  codigoPostal: string;
  nif: string;
  numSeguridadSocial: string;
  medicoId: string;
}

export interface UpdatePacienteDto {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  codigoPostal: string;
  nif: string;
  numSeguridadSocial: string;
  medicoId: string;
}