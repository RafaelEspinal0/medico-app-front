import { useMemo } from "react";
import { useMedicos } from "@/hooks/use-medicos";
import { usePersonal } from "@/hooks/use-personal";
import { VacationAssignablePerson } from "@/types/vacacion";
import { getTipoPersonalLabel } from "@/types/enums/tipo-personal.enum";
import { getTipoMedicoLabel } from "@/types/enums/tipo-medito.enum";

export function useVacationPeople() {
  const medicosQuery = useMedicos();
  const personalQuery = usePersonal();

  const people = useMemo<VacationAssignablePerson[]>(() => {
    const medicos =
      medicosQuery.data?.data.map((item) => ({
        id: item.id,
        nombre: item.nombre || "Médico sin nombre",
        origen: "medico" as const,
        subtitulo: getTipoMedicoLabel(item.tipoMedico),
      })) ?? [];

    const personal =
      personalQuery.data?.data.map((item) => ({
        id: item.id,
        nombre: item.nombre || "Empleado sin nombre",
        origen: "personal" as const,
        subtitulo: getTipoPersonalLabel(item.tipoPersonal),
      })) ?? [];

    return [...medicos, ...personal].sort((a, b) =>
      a.nombre.localeCompare(b.nombre)
    );
  }, [medicosQuery.data, personalQuery.data]);

  return {
    people,
    isLoading: medicosQuery.isLoading || personalQuery.isLoading,
    isError: medicosQuery.isError || personalQuery.isError,
  };
}