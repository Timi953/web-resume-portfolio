import { getAllProjects } from "@/lib/projects";
import { ProjectsContainer } from "@/components/ProjectsContainer";
import { BackButton } from "@/components/BackButton";

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="container mx-auto px-4 py-12 max-w-7xl">
      {/* Header */}
      <header className="mb-12 text-center">
        <BackButton />

        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          My Projects
        </h1>

        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          A collection of prototypes, SaaS applications, and interactive web experiences I have built.
          Each project represents a unique challenge and learning opportunity.
        </p>
      </header>

      {/* Filters and Grid */}
      <ProjectsContainer projects={projects} />
    </main>
  );
}
