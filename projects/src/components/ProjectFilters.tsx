'use client';

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { ProjectCategory, ProjectStatus } from "@/types/project";

interface ProjectFiltersProps {
  filters: {
    search: string;
    technologies: string[];
    categories: ProjectCategory[];
    status: ProjectStatus[];
    sortBy: 'date' | 'title' | 'featured';
    sortOrder: 'asc' | 'desc';
  };
  onFiltersChange: (filters: ProjectFiltersProps['filters']) => void;
}

export function ProjectFilters({ filters, onFiltersChange }: ProjectFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const hasActiveFilters = filters.search.length > 0;

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      technologies: [],
      categories: [],
      status: [],
      sortBy: 'featured',
      sortOrder: 'desc',
    });
  };

  const updateSearch = (search: string) => {
    onFiltersChange({ ...filters, search });
  };

  return (
    <div className="mb-8 space-y-4">
      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search projects..."
            value={filters.search}
            onChange={(e) => updateSearch(e.target.value)}
            className="pl-10 bg-slate-900/50 border-slate-800 focus:border-cyan-500"
          />
        </div>

        {hasActiveFilters && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="border-slate-800"
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
}
