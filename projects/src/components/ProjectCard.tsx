import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import type { Project } from "@/types/project";
import { STATUS_COLORS, CATEGORY_ICONS } from "@/lib/constants";
import { cn, truncate } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group overflow-hidden border-slate-800 bg-slate-900/50 backdrop-blur transition-all hover:border-cyan-500/50 hover:shadow-lg hover:shadow-cyan-500/10">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {project.featured && (
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
              ⭐ Featured
            </Badge>
          )}
          <Badge className={cn("border", STATUS_COLORS[project.status])}>
            {project.status === 'live' && '🟢'}
            {project.status === 'in-development' && '🔵'}
            {project.status === 'archived' && '⚪'}
            {' '}
            {project.status.replace('-', ' ')}
          </Badge>
        </div>

        {/* Category icon */}
        <div className="absolute top-4 right-4 text-2xl">
          {CATEGORY_ICONS[project.meta.category]}
        </div>
      </div>

      {/* Content */}
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-slate-400 mt-1">
              {project.tagline}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-slate-300 text-sm leading-relaxed">
          {truncate(project.description, 150)}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.meta.technologies.slice(0, 4).map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-slate-800 text-slate-300 hover:bg-slate-700"
            >
              {tech}
            </Badge>
          ))}
          {project.meta.technologies.length > 4 && (
            <Badge variant="secondary" className="bg-slate-800 text-slate-400">
              +{project.meta.technologies.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between gap-2">
        {/* External links */}
        <div className="flex gap-2">
          {project.links.demo && (
            <Button
              size="sm"
              variant="ghost"
              className="hover:bg-slate-800"
              asChild
            >
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Demo
              </a>
            </Button>
          )}
          {project.links.github && (
            <Button
              size="sm"
              variant="ghost"
              className="hover:bg-slate-800"
              asChild
            >
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4 mr-1" />
                Code
              </a>
            </Button>
          )}
        </div>

        {/* View details */}
        <Button
          size="sm"
          className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          asChild
        >
          <Link href={`/projects/${project.slug}`}>
            Details
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
