"use client";

import { useMemo, useState } from "react";
import { Plus, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Personal } from "@/types/personal";
import { PersonalStats } from "./personal-stats";
import {
  EstadoPersonalFilter,
  PersonalFilters,
} from "./personal-filters";
import { PersonalTable } from "./personal-table";
import { PersonalFormDialog } from "./personal-form-dialog";
import { ViewPersonalDialog } from "./view-personal-dialog";
import { DeletePersonalDialog } from "./delete-personal-dialog";

interface PersonalViewProps {
  personal: Personal[];
}

export function PersonalView({ personal }: PersonalViewProps) {
  const [search, setSearch] = useState("");
  const [selectedTipo, setSelectedTipo] = useState("todos");
  const [selectedEstado, setSelectedEstado] =
    useState<EstadoPersonalFilter>("todos");

  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewPersonal, setViewPersonal] = useState<Personal | null>(null);

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedPersonal, setSelectedPersonal] = useState<Personal | null>(
    null
  );

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [personalToDelete, setPersonalToDelete] = useState<Personal | null>(
    null
  );

  const filteredPersonal = useMemo(() => {
    return personal.filter((item) => {
      const q = search.trim().toLowerCase();

      const matchesSearch =
        !q ||
        (item.nombre || "").toLowerCase().includes(q) ||
        (item.provincia || "").toLowerCase().includes(q) ||
        (item.poblacion || "").toLowerCase().includes(q) ||
        (item.nif || "").toLowerCase().includes(q) ||
        (item.telefono || "").toLowerCase().includes(q);

      const matchesTipo =
        selectedTipo === "todos" ||
        String(item.tipoPersonal ?? "") === selectedTipo;

      const matchesEstado =
        selectedEstado === "todos" ||
        (selectedEstado === "activos" && item.isActive) ||
        (selectedEstado === "inactivos" && !item.isActive);

      return matchesSearch && matchesTipo && matchesEstado;
    });
  }, [personal, search, selectedTipo, selectedEstado]);

  const handleCreate = () => {
    setSelectedPersonal(null);
    setFormDialogOpen(true);
  };

  const handleView = (item: Personal) => {
    setViewPersonal(item);
    setViewDialogOpen(true);
  };

  const handleEdit = (item: Personal) => {
    setSelectedPersonal(item);
    setFormDialogOpen(true);
  };

  const handleAskDelete = (item: Personal) => {
    setPersonalToDelete(item);
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
                Gestión de empleados
              </div>

              <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
                Módulo de Empleados
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground md:text-base">
                Administra la información del personal, su contacto, ubicación,
                documentación y tipo de puesto desde una interfaz limpia y moderna.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button className="rounded-2xl px-5" onClick={handleCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Nuevo empleado
              </Button>
            </div>
          </div>
        </div>
      </section>

      <PersonalStats personal={personal} />

      <section className="rounded-3xl border bg-background p-5 shadow-sm md:p-6">
        <PersonalFilters
          search={search}
          onSearchChange={setSearch}
          selectedTipo={selectedTipo}
          onTipoChange={setSelectedTipo}
          selectedEstado={selectedEstado}
          onEstadoChange={setSelectedEstado}
          resultsCount={filteredPersonal.length}
        />

        <PersonalTable
          personal={filteredPersonal}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleAskDelete}
        />
      </section>

      <ViewPersonalDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        personal={viewPersonal}
      />

      <PersonalFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        personal={selectedPersonal}
      />

      <DeletePersonalDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        personal={personalToDelete}
      />
    </div>
  );
}