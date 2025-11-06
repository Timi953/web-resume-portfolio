export type ProjectStatus = 'live' | 'in-development' | 'archived';

export type ProjectCategory =
  | 'SaaS'
  | 'Landing Page'
  | 'Dashboard'
  | 'Mobile App'
  | 'Tool'
  | 'E-commerce'
  | 'Portfolio'
  | 'Other';

export interface ProjectLink {
  demo?: string;
  github?: string;
  caseStudy?: string;
  documentation?: string;
}

export interface ProjectDetails {
  overview: string;
  challenges?: string;
  outcomes?: string;
  images: string[];
}

export interface ProjectMeta {
  technologies: string[];
  category: ProjectCategory;
  date: string; // ISO date format: "2025-03-15"
  duration?: string; // e.g., "3 months"
}

export interface ProjectMCP {
  shadcnComponents: string[];
  tweakcnCustomizations?: {
    theme?: string;
    animations?: string;
  };
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  thumbnail: string;
  featured: boolean;
  status: ProjectStatus;
  details: ProjectDetails;
  links: ProjectLink;
  meta: ProjectMeta;
  mcp?: ProjectMCP;
}

export interface ProjectFilters {
  search: string;
  technologies: string[];
  categories: ProjectCategory[];
  status: ProjectStatus[];
  sortBy: 'date' | 'title' | 'featured';
  sortOrder: 'asc' | 'desc';
}
