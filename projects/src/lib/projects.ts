import projectsData from "@/data/projects.json";
import type { Project, ProjectCategory, ProjectStatus } from "@/types/project";

export function getAllProjects(): Project[] {
  return projectsData.projects as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projectsData.projects.find((p) => p.slug === slug) as Project | undefined;
}

export function getFeaturedProjects(): Project[] {
  return projectsData.projects.filter((p) => p.featured) as Project[];
}

export function filterProjects(
  projects: Project[],
  filters: {
    search?: string;
    technologies?: string[];
    categories?: ProjectCategory[];
    status?: ProjectStatus[];
  }
): Project[] {
  let filtered = [...projects];

  // Search filter
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.title.toLowerCase().includes(searchLower) ||
        p.description.toLowerCase().includes(searchLower) ||
        p.tagline.toLowerCase().includes(searchLower)
    );
  }

  // Technology filter
  if (filters.technologies && filters.technologies.length > 0) {
    filtered = filtered.filter((p) =>
      filters.technologies!.some((tech) =>
        p.meta.technologies.map(t => t.toLowerCase()).includes(tech.toLowerCase())
      )
    );
  }

  // Category filter
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter((p) =>
      filters.categories!.includes(p.meta.category)
    );
  }

  // Status filter
  if (filters.status && filters.status.length > 0) {
    filtered = filtered.filter((p) =>
      filters.status!.includes(p.status)
    );
  }

  return filtered;
}

export function sortProjects(
  projects: Project[],
  sortBy: 'date' | 'title' | 'featured',
  order: 'asc' | 'desc' = 'desc'
): Project[] {
  const sorted = [...projects];

  sorted.sort((a, b) => {
    let comparison = 0;

    switch (sortBy) {
      case 'date':
        comparison = new Date(a.meta.date).getTime() - new Date(b.meta.date).getTime();
        break;
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'featured':
        comparison = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        break;
    }

    return order === 'asc' ? comparison : -comparison;
  });

  return sorted;
}

export function getAllTechnologies(): string[] {
  const techs = new Set<string>();
  projectsData.projects.forEach((p: any) => {
    p.meta.technologies.forEach((tech: string) => techs.add(tech));
  });
  return Array.from(techs).sort();
}

export function getAllCategories(): ProjectCategory[] {
  const categories = new Set<ProjectCategory>();
  projectsData.projects.forEach((p: any) => {
    categories.add(p.meta.category);
  });
  return Array.from(categories).sort();
}
