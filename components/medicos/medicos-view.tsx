"use client";

import { useMemo, useState } from "react";
import { CalendarClock, Plus, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Medico } from "@/types/medico";
import { MedicosStats } from "./medicos-stats";
import { MedicoFilters, EstadoMedicoFilter } from "./medico-filters";
import { MedicosTable } from "./medicos-table";
import { MedicoFormDialog } from "./medico-form-dialog";
import { DeleteMedicoDialog } from "./delete-medico-dialog";
import { ViewMedicoDialog } from "./view-medico-dialog";
import { MedicoHorariosDialog } from "./medico-horarios-dialog";

interface MedicosViewProps {
  medicos: Medico[];
}

export function MedicosView({ medicos }: MedicosViewProps) {
  const [search, setSearch] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("todos");
  const [selectedEstado, setSelectedEstado] =
    useState<EstadoMedicoFilter>("todos");

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewMedico, setViewMedico] = useState<Medico | null>(null);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedMedico, setSelectedMedico] = useState<Medico | null>(null);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [medicoToDelete, setMedicoToDelete] = useState<Medico | null>(null);

  const [horariosDialogOpen, setHorariosDialogOpen] = useState(false);
  const [horariosMedico, setHorariosMedico] = useState<Medico | null>(null);

  const filteredMedicos = useMemo(() => {
    return medicos.filter((medico) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        !q ||
        (medico.nombre || "").toLowerCase().includes(q) ||
        (medico.provincia || "").toLowerCase().includes(q) ||
        (medico.nif || "").toLowerCase().includes(q) ||
        (medico.numColegiado || "").toLowerCase().includes(q);

      const matchesTipo =
        selectedTipo === "todos" ||
        String(medico.tipoMedico ?? "") === selectedTipo;

      const matchesEstado =
        selectedEstado === "todos" ||
        (selectedEstado === "activos" && medico.isActive) ||
        (selectedEstado === "inactivos" && !medico.isActive);

      return matchesSearch && matchesTipo && matchesEstado;
    });
  }, [medicos, search, selectedTipo, selectedEstado]);

  const handleCreate = () => {
    setSelectedMedico(null);
    setFormDialogOpen(true);
  };

  const handleView = (medico: Medico) => {
    setViewMedico(medico);
    setViewDialogOpen(true);
  };

  const handleEdit = (medico: Medico) => {
    setSelectedMedico(medico);
    setFormDialogOpen(true);
  };

  const handleAskDelete = (medico: Medico) => {
    setMedicoToDelete(medico);
    setDeleteDialogOpen(true);
  };

  const handleOpenHorarios = (medico: Medico) => {
    setHorariosMedico(medico);
    setHorariosDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border bg-background shadow-sm">
        <div className="relative p-6 md:p-8">
          <div className="absolute inset-0" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <Stethoscope className="h-3.5 w-3.5 text-primary" />
                Gestión de médicos
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Módulo de Médicos
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Administra la información del personal médico, su tipo, contacto,
                ubicación y carga de pacientes desde una interfaz limpia y moderna.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl px-5" onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo médico
              </Button>

              <Button
                variant="outline"
                className="rounded-2xl px-5"
                disabled
                title="Selecciona un médico desde la tabla para ver sus horarios"
              >
                <CalendarClock className="mr-2 h-4 w-4" />
                Ver horarios
              </Button>
            </div>
          </div>
        </div>
      </section>

      <MedicosStats medicos={medicos} />

      <section className="rounded-3xl border bg-background p-5 shadow-sm md:p-6">
        <MedicoFilters
          search={search}
          onSearchChange={setSearch}
          selectedTipo={selectedTipo}
          onTipoChange={setSelectedTipo}
          selectedEstado={selectedEstado}
          onEstadoChange={setSelectedEstado}
          resultsCount={filteredMedicos.length}
        />

        <MedicosTable
          medicos={filteredMedicos}
          onView={handleView}
          onHorarios={handleOpenHorarios}
          onEdit={handleEdit}
          onDelete={handleAskDelete}
        />
      </section>

      <ViewMedicoDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        medico={viewMedico}
      />

      <MedicoFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        medico={selectedMedico}
      />

      <DeleteMedicoDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        medico={medicoToDelete}
      />

      <MedicoHorariosDialog
        open={horariosDialogOpen}
        onOpenChange={setHorariosDialogOpen}
        medico={horariosMedico}
      />
    </div>
  );
}