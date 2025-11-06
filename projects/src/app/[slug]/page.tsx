import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjects } from "@/lib/projects";
import { ProjectDetail } from "@/components/ProjectDetail";
import { BackButton } from "@/components/BackButton";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static paths for all projects
export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="container mx-auto px-4 py-12 max-w-5xl">
      <BackButton href="/projects" />
      <ProjectDetail project={project} />
    </main>
  );
}
