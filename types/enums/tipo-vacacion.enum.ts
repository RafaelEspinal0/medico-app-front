export const TIPO_VACACION = {
  PLANIFICADAS: 1,
  DISFRUTADAS: 2,
} as const;

export type TipoVacacionValue =
  (typeof TIPO_VACACION)[keyof typeof TIPO_VACACION];

export const tipoVacacionLabel: Record<number, string> = {
  1: "Planificadas",
  2: "Disfrutadas",
};

export function getTipoVacacionLabel(
  value: number | string | null | undefined
) {
  if (value == null) return "-";

  if (typeof value === "string") {
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) {
      return tipoVacacionLabel[numeric] ?? value;
    }
    return value;
  }

  return tipoVacacionLabel[value] ?? String(value);
}