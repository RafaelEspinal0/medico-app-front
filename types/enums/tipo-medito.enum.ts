export const TIPO_MEDICO = {
  TITULAR: 1,
  INTERINO: 2,
  SUSTITUTO: 3,
} as const;

export type TipoMedicoValue =
  (typeof TIPO_MEDICO)[keyof typeof TIPO_MEDICO];

export const tipoMedicoLabel: Record<number, string> = {
  1: "Titular",
  2: "Interino",
  3: "Sustituto",
};

export function getTipoMedicoLabel(value: number | string | null | undefined) {
  if (value == null) return "-";

  if (typeof value === "string") {
    const numeric = Number(value);
    if (!Number.isNaN(numeric)) {
      return tipoMedicoLabel[numeric] ?? value;
    }
    return value;
  }

  return tipoMedicoLabel[value] ?? String(value);
}