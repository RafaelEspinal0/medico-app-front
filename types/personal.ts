export interface Personal {
  id: string;
  nombre: string | null;
  direccion: string | null;
  telefono: string | null;
  poblacion: string | null;
  provincia: string | null;
  codigoPostal: string | null;
  nif: string | null;
  numSeguridadSocial: string | null;
  tipoPersonal: number | string | null;
  isActive: boolean;
}

export interface CreatePersonalDto {
  nombre: string;
  direccion: string;
  telefono: string;
  poblacion: string;
  provincia: string;
  codigoPostal: string;
  nif: string;
  numSeguridadSocial: string;
  tipoPersonal: number;
}

export interface UpdatePersonalDto {
  id: string;
  nombre: string;
  direccion: string;
  telefono: string;
  poblacion: string;
  provincia: string;
  codigoPostal: string;
  nif: string;
  numSeguridadSocial: string;
  tipoPersonal: number;
}