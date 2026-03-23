"use client";

import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export type EstadoPersonalFilter = "todos" | "activos" | "inactivos";

interface PersonalFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedTipo: string;
  onTipoChange: (value: string) => void;
  selectedEstado: EstadoPersonalFilter;
  onEstadoChange: (value: EstadoPersonalFilter) => void;
  resultsCount: number;
}

export function PersonalFilters({
  search,
  onSearchChange,
  selectedTipo,
  onTipoChange,
  selectedEstado,
  onEstadoChange,
  resultsCount,
}: PersonalFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Listado de empleados</h2>
          <p className="text-sm text-muted-foreground">
            Filtra, busca y visualiza la información principal del personal.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          {resultsCount} resultado(s)
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.3fr_220px_220px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, provincia, NIF o teléfono"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 rounded-2xl pl-10"
          />
        </div>

        <select
          value={selectedTipo}
          onChange={(e) => onTipoChange(e.target.value)}
          className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
        >
          <option value="todos">Tipo: Todos</option>
          <option value="1">Tipo: Administrativo</option>
          <option value="2">Tipo: Enfermero</option>
          <option value="3">Tipo: Técnico</option>
          <option value="4">Tipo: Limpieza</option>
          <option value="5">Tipo: Seguridad</option>
        </select>

        <select
          value={selectedEstado}
          onChange={(e) =>
            onEstadoChange(e.target.value as EstadoPersonalFilter)
          }
          className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
        >
          <option value="todos">Estado: Todos</option>
          <option value="activos">Estado: Activos</option>
          <option value="inactivos">Estado: Inactivos</option>
        </select>
      </div>
    </div>
  );
}