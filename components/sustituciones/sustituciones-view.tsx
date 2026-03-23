"use client";

import { useMemo, useState } from "react";
import { CalendarSync, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Medico } from "@/types/medico";
import { SustitucionesStats } from "./sustituciones-stats";
import {
  EstadoSustitucionFilter,
  SustitucionesFilters,
} from "./sustituciones-filters";
import { SustitucionesTable } from "./sustituciones-table";
import { SustitucionFormDialog } from "./sustituciones-form-dialog";
import { ViewSustitucionDialog } from "./view-sustitucion-dialog";

interface SustitucionesViewProps {
  medicos: Medico[];
}

export function SustitucionesView({ medicos }: SustitucionesViewProps) {
  const [search, setSearch] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("todos");
  const [selectedEstado, setSelectedEstado] =
    useState<EstadoSustitucionFilter>("todos");

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewMedico, setViewMedico] = useState<Medico | null>(null);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedMedico, setSelectedMedico] = useState<Medico | null>(null);

  const filteredMedicos = useMemo(() => {
    return medicos.filter((medico) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        !q ||
        (medico.nombre || "").toLowerCase().includes(q) ||
        (medico.provincia || "").toLowerCase().includes(q) ||
        (medico.numColegiado || "").toLowerCase().includes(q) ||
        (medico.telefono || "").toLowerCase().includes(q);

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

  const handleViewHistorial = (medico: Medico) => {
    setViewMedico(medico);
    setViewDialogOpen(true);
  };

  const handleCreateSustitucion = (medico: Medico) => {
    setSelectedMedico(medico);
    setFormDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[2rem] border bg-background shadow-sm">
        <div className="relative p-6 md:p-8">
          <div className="absolute inset-0 " />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
                <CalendarSync className="h-3.5 w-3.5 text-primary" />
                Gestión de sustituciones
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Módulo de Sustituciones
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Consulta el historial de sustituciones y registra nuevos períodos
                de sustitución para los médicos del sistema.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl px-5" disabled>
                <Plus className="mr-2 h-4 w-4" />
                Nueva sustitución
              </Button>
            </div>
          </div>
        </div>
      </section>

      <SustitucionesStats medicos={medicos} />

      <section className="rounded-3xl border bg-background p-5 shadow-sm md:p-6">
        <SustitucionesFilters
          search={search}
          onSearchChange={setSearch}
          selectedTipo={selectedTipo}
          onTipoChange={setSelectedTipo}
          selectedEstado={selectedEstado}
          onEstadoChange={setSelectedEstado}
          resultsCount={filteredMedicos.length}
        />

        <SustitucionesTable
          medicos={filteredMedicos}
          onViewHistorial={handleViewHistorial}
          onCreateSustitucion={handleCreateSustitucion}
        />
      </section>

      <ViewSustitucionDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        medico={viewMedico}
      />

      <SustitucionFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        medico={selectedMedico}
      />
    </div>
  );
}