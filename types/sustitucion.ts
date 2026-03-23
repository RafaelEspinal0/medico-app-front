export interface Sustitucion {
  id: string;
  nombre: string | null;
  numColegiado: string | null;
  telefono: string | null;
  provincia: string | null;
  fechaAltaSustitucion: string;
  fechaBajaSustitucion: string | null;
  diasEnSustitucion: number;
}

export interface RegistrarSustitucionDto {
  fechaAltaSustitucion: string;
  fechaBajaSustitucion?: string | null;
}