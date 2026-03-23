"use client";

import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export type TipoVacacionFilter = "todos" | "1" | "2";

interface VacacionesFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedTipo: TipoVacacionFilter;
  onTipoChange: (value: TipoVacacionFilter) => void;
  resultsCount: number;
}

export function VacacionesFilters({
  search,
  onSearchChange,
  selectedTipo,
  onTipoChange,
  resultsCount,
}: VacacionesFiltersProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold">Listado de vacaciones</h2>
          <p className="text-sm text-muted-foreground">
            Filtra y visualiza los períodos de vacaciones registrados.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          {resultsCount} resultado(s)
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-[1.3fr_240px]">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre del empleado"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="h-11 rounded-2xl pl-10"
          />
        </div>

        <select
          value={selectedTipo}
          onChange={(e) => onTipoChange(e.target.value as TipoVacacionFilter)}
          className="h-11 rounded-2xl border bg-background px-4 text-sm outline-none transition focus:border-primary"
        >
          <option value="todos">Tipo: Todos</option>
          <option value="1">Tipo: Planificadas</option>
          <option value="2">Tipo: Disfrutadas</option>
        </select>
      </div>
    </div>
  );
}