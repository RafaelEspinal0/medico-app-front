"use client";

import { useMemo, useState } from "react";
import { CalendarDays, Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { VacacionesStats } from "./vacaciones-stats";
import {
  TipoVacacionFilter,
  VacacionesFilters,
} from "./vacaciones-filters";
import { VacacionesTable } from "./vacaciones-table";
import { VacacionFormDialog } from "./vacacion-form-dialog";
import { ViewVacacionDialog } from "./view-vacacion-dialog";
import { useVacationPeople } from "@/hooks/use-vacation-people";
import { useVacacionesByEmpleado } from "@/hooks/use-vacaciones";
import { Vacacion } from "@/types/vacacion";

export function VacacionesView() {
  const [selectedEmpleadoId, setSelectedEmpleadoId] = useState("");
  const [search, setSearch] = useState("");
  const [selectedTipo, setSelectedTipo] =
    useState<TipoVacacionFilter>("todos");

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewVacacion, setViewVacacion] = useState<Vacacion | null>(null);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedVacacion, setSelectedVacacion] = useState<Vacacion | null>(
    null
  );

  const {
    people,
    isLoading: isPeopleLoading,
    isError: isPeopleError,
  } = useVacationPeople();

  const {
    data: vacacionesResponse,
    isLoading: isVacacionesLoading,
    isError: isVacacionesError,
  } = useVacacionesByEmpleado(selectedEmpleadoId || undefined);

  const selectedPerson = useMemo(
    () => people.find((person) => person.id === selectedEmpleadoId) ?? null,
    [people, selectedEmpleadoId]
  );

  const vacaciones = useMemo(
    () => vacacionesResponse?.data ?? [],
    [vacacionesResponse]
  );

  const filteredVacaciones = useMemo(() => {
    return vacaciones.filter((vacacion) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        !q || (vacacion.nombreEmpleado || "").toLowerCase().includes(q);

      const matchesTipo =
        selectedTipo === "todos" ||
        String(vacacion.tipoVacacion ?? "") === selectedTipo;

      return matchesSearch && matchesTipo;
    });
  }, [vacaciones, search, selectedTipo]);

  const handleCreate = () => {
    setSelectedVacacion(null);
    setFormDialogOpen(true);
  };

  const handleView = (vacacion: Vacacion) => {
    setViewVacacion(vacacion);
    setViewDialogOpen(true);
  };

  const handleEdit = (vacacion: Vacacion) => {
    setSelectedVacacion(vacacion);
    setFormDialogOpen(true);
  };

  if (isPeopleLoading) {
    return (
      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          Cargando colaboradores...
        </p>
      </div>
    );
  }

  if (isPeopleError) {
    return (
      <div className="rounded-3xl border bg-background p-6 shadow-sm">
        <p className="text-sm text-destructive">
          Ocurrió un error cargando médicos y empleados.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border bg-background shadow-sm">
        <div className="relative p-6 md:p-8">
          <div className="absolute" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <CalendarDays className="h-3.5 w-3.5 text-primary" />
                Gestión de vacaciones
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Módulo de Vacaciones
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Administra los períodos de vacaciones planificados y disfrutados
                de médicos y empleados desde una interfaz limpia y moderna.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="rounded-2xl px-5"
                onClick={handleCreate}
                disabled={!selectedEmpleadoId}
              >
                <Plus className="mr-2 h-4 w-4" />
                Nueva vacación
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border bg-background p-5 shadow-sm md:p-6">
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="text-lg font-semibold">Seleccionar colaborador</h2>
            <p className="text-sm text-muted-foreground">
              Elige un médico o empleado para consultar y gestionar sus
              vacaciones.
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.3fr_auto]">
            <select
              value={selectedEmpleadoId}
              onChange={(e) => setSelectedEmpleadoId(e.target.value)}
              className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
            >
              <option value="">Selecciona un colaborador</option>
              {people.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.nombre} —{" "}
                  {person.origen === "medico" ? "Médico" : "Empleado"}
                  {person.subtitulo ? ` (${person.subtitulo})` : ""}
                </option>
              ))}
            </select>

            {selectedPerson ? (
              <div className="inline-flex items-center gap-2 rounded-2xl border bg-muted/40 px-4 py-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {selectedPerson.nombre} —{" "}
                {selectedPerson.origen === "medico" ? "Médico" : "Empleado"}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {!selectedEmpleadoId ? (
        <div className="rounded-3xl border bg-background px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <CalendarDays className="h-5 w-5 text-muted-foreground" />
          </div>
          <p className="mt-4 font-medium">Selecciona un colaborador</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Primero elige un médico o empleado para ver sus vacaciones.
          </p>
        </div>
      ) : isVacacionesLoading ? (
        <div className="rounded-3xl border bg-background p-6 shadow-sm">
          <p className="text-sm text-muted-foreground">
            Cargando vacaciones del colaborador...
          </p>
        </div>
      ) : isVacacionesError ? (
        <div className="rounded-3xl border bg-background p-6 shadow-sm">
          <p className="text-sm text-destructive">
            Ocurrió un error cargando las vacaciones del colaborador.
          </p>
        </div>
      ) : (
        <>
          <VacacionesStats vacaciones={vacaciones} />

          <section className="rounded-3xl border bg-background p-5 shadow-sm md:p-6">
            <VacacionesFilters
              search={search}
              onSearchChange={setSearch}
              selectedTipo={selectedTipo}
              onTipoChange={setSelectedTipo}
              resultsCount={filteredVacaciones.length}
            />

            <VacacionesTable
              vacaciones={filteredVacaciones}
              onView={handleView}
              onEdit={handleEdit}
            />
          </section>
        </>
      )}

      <ViewVacacionDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        vacacion={viewVacacion}
      />

      <VacacionFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        vacacion={selectedVacacion}
        empleadoId={selectedEmpleadoId}
      />
    </div>
  );
}