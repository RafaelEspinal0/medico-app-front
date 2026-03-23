"use client";

import { useMemo, useState } from "react";
import { Plus, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Paciente } from "@/types/paciente";
import { PacientesStats } from "./pacientes-stats";
import {
  AsignacionPacienteFilter,
  EstadoPacienteFilter,
  PacienteFilters,
} from "./paciente-filters";
import { PacientesTable } from "./pacientes-table";
import { PacienteFormDialog } from "./paciente-form-dialog";
import { ViewPacienteDialog } from "./view-paciente-dialog";
import { DeletePacienteDialog } from "./delete-paciente-dialog";

interface PacientesViewProps {
  pacientes: Paciente[];
}

export function PacientesView({ pacientes }: PacientesViewProps) {
  const [search, setSearch] = useState("");
  const [selectedEstado, setSelectedEstado] =
    useState<EstadoPacienteFilter>("todos");
  const [selectedAsignacion, setSelectedAsignacion] =
    useState<AsignacionPacienteFilter>("todos");

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewPaciente, setViewPaciente] = useState<Paciente | null>(null);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<Paciente | null>(
    null
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [pacienteToDelete, setPacienteToDelete] = useState<Paciente | null>(
    null
  );

  const filteredPacientes = useMemo(() => {
    return pacientes.filter((paciente) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        !q ||
        (paciente.nombre || "").toLowerCase().includes(q) ||
        (paciente.nif || "").toLowerCase().includes(q) ||
        (paciente.telefono || "").toLowerCase().includes(q) ||
        (paciente.nombreMedico || "").toLowerCase().includes(q);

      const matchesEstado =
        selectedEstado === "todos" ||
        (selectedEstado === "activos" && paciente.isActive) ||
        (selectedEstado === "inactivos" && !paciente.isActive);

      const matchesAsignacion =
        selectedAsignacion === "todos" ||
        (selectedAsignacion === "con-medico" && !!paciente.medicoId) ||
        (selectedAsignacion === "sin-medico" && !paciente.medicoId);

      return matchesSearch && matchesEstado && matchesAsignacion;
    });
  }, [pacientes, search, selectedEstado, selectedAsignacion]);

  const handleCreate = () => {
    setSelectedPaciente(null);
    setFormDialogOpen(true);
  };

  const handleView = (paciente: Paciente) => {
    setViewPaciente(paciente);
    setViewDialogOpen(true);
  };

  const handleEdit = (paciente: Paciente) => {
    setSelectedPaciente(paciente);
    setFormDialogOpen(true);
  };

  const handleAskDelete = (paciente: Paciente) => {
    setPacienteToDelete(paciente);
    setDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border bg-background shadow-sm">
        <div className="relative p-6 md:p-8">
          <div className="absolute inset-0" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <UserRound className="h-3.5 w-3.5 text-primary" />
                Gestión de pacientes
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Módulo de Pacientes
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Administra la información de los pacientes, su contacto,
                documentación y la asignación de médico desde una interfaz limpia
                y moderna.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl px-5" onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo paciente
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PacientesStats pacientes={pacientes} />

      <section className="rounded-3xl border bg-background p-5 shadow-sm md:p-6">
        <PacienteFilters
          search={search}
          onSearchChange={setSearch}
          selectedEstado={selectedEstado}
          onEstadoChange={setSelectedEstado}
          selectedAsignacion={selectedAsignacion}
          onAsignacionChange={setSelectedAsignacion}
          resultsCount={filteredPacientes.length}
        />

        <PacientesTable
          pacientes={filteredPacientes}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleAskDelete}
        />
      </section>

      <ViewPacienteDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        paciente={viewPaciente}
      />

      <PacienteFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        paciente={selectedPaciente}
      />

      <DeletePacienteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        paciente={pacienteToDelete}
      />
    </div>
  );
}