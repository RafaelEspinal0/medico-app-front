"use client";

import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export type EstadoSustitucionFilter = "todos" | "activos" | "inactivos";

interface SustitucionesFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedEstado: EstadoSustitucionFilter;
  onEstadoChange: (value: EstadoSustitucionFilter) => void;
  resultsCount: number;
}

export function SustitucionesFilters({
  search,
  onSearchChange,
  selectedEstado,
  onEstadoChange,
  resultsCount,
}: SustitucionesFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Médicos sustitutos</h2>
          <p className="text-sm text-muted-foreground">
            Busca y filtra médicos sustitutos para consultar o registrar sustituciones.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          {resultsCount} resultado(s)
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, provincia, colegiado o teléfono"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 rounded-2xl pl-10"
          />
        </div>

        <select
          value={selectedEstado}
          onChange={(e) =>
            onEstadoChange(e.target.value as EstadoSustitucionFilter)
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