import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types/project";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 text-lg">No projects found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, i) => (
        <div
          key={project.slug}
          className="animate-slide-up"
          style={{
            animationDelay: i * 100 + "ms",
            animationFillMode: 'both',
          }}
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </div>
  );
}
