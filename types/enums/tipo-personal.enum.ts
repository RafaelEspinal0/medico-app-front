export const TIPO_PERSONAL = {
  ADMINISTRATIVO: 1,
  ENFERMERO: 2,
  TECNICO: 3,
  LIMPIEZA: 4,
  SEGURIDAD: 5,
} as const;

export type TipoPersonalValue =
  (typeof TIPO_PERSONAL)[keyof typeof TIPO_PERSONAL];

export const tipoPersonalLabel: Record<number, string> = {
  1: "Administrativo",
  2: "Enfermero",
  3: "Técnico",
  4: "Limpieza",
  5: "Seguridad",
};

export function getTipoPersonalLabel(
  value: number | string | null | undefined
) {
  if (value == null) return "-";

  if (typeof value === "string") {
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) {
      return tipoPersonalLabel[numeric] ?? value;
    }
    return value;
  }

  return tipoPersonalLabel[value] ?? String(value);
}