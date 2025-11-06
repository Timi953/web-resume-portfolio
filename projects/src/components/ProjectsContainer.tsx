'use client';

import { useState, useMemo } from "react";
import { ProjectGrid } from "./ProjectGrid";
import { ProjectFilters } from "./ProjectFilters";
import type { Project, ProjectCategory, ProjectStatus } from "@/types/project";
import { filterProjects, sortProjects } from "@/lib/projects";

interface ProjectsContainerProps {
  projects: Project[];
}

export function ProjectsContainer({ projects }: ProjectsContainerProps) {
  const [filters, setFilters] = useState({
    search: '',
    technologies: [] as string[],
    categories: [] as ProjectCategory[],
    status: [] as ProjectStatus[],
    sortBy: 'featured' as 'date' | 'title' | 'featured',
    sortOrder: 'desc' as 'asc' | 'desc',
  });

  // Filter and sort projects
  const filteredProjects = useMemo(() => {
    let result = filterProjects(projects, filters);
    result = sortProjects(result, filters.sortBy, filters.sortOrder);
    return result;
  }, [projects, filters]);

  return (
    <>
      <ProjectFilters
        filters={filters}
        onFiltersChange={setFilters}
      />
      <ProjectGrid projects={filteredProjects} />
    </>
  );
}
