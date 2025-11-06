import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ExternalLink, Github, Calendar, Clock, Folder } from "lucide-react";
import type { Project } from "@/types/project";
import { STATUS_COLORS, CATEGORY_ICONS } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

interface ProjectDetailProps {
  project: Project;
}

export function ProjectDetail({ project }: ProjectDetailProps) {
  return (
    <article className="space-y-8">
      {/* Hero Section */}
      <div className="space-y-4">
        {/* Title */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              {project.title}
            </h1>
            <p className="text-xl text-slate-300">
              {project.tagline}
            </p>
          </div>

          <div className="text-4xl">
            {CATEGORY_ICONS[project.meta.category]}
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-3 items-center text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {formatDate(project.meta.date)}
          </div>

          {project.meta.duration && (
            <>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {project.meta.duration}
              </div>
            </>
          )}

          <span>•</span>
          <div className="flex items-center gap-2">
            <Folder className="h-4 w-4" />
            {project.meta.category}
          </div>
        </div>

        {/* Status & Featured Badges */}
        <div className="flex gap-2">
          <Badge className={cn("border", STATUS_COLORS[project.status])}>
            {project.status === 'live' && '🟢'}
            {project.status === 'in-development' && '🔵'}
            {project.status === 'archived' && '⚪'}
            {' '}
            {project.status.replace('-', ' ')}
          </Badge>

          {project.featured && (
            <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
              ⭐ Featured Project
            </Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3">
          {project.links.demo && (
            <Button
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              asChild
            >
              <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Live Demo
              </a>
            </Button>
          )}

          {project.links.github && (
            <Button
              size="lg"
              variant="outline"
              className="border-slate-700 hover:bg-slate-800"
              asChild
            >
              <a href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                View Source Code
              </a>
            </Button>
          )}
        </div>
      </div>

      <Separator className="bg-slate-800" />

      {/* Main Image */}
      {project.details.images.length > 0 && (
        <div className="relative aspect-video rounded-lg overflow-hidden border border-slate-800">
          <Image
            src={project.details.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Description */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">About This Project</h2>
        <p className="text-slate-300 leading-relaxed whitespace-pre-line">
          {project.details.overview}
        </p>
      </section>

      {/* Challenges */}
      {project.details.challenges && (
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Challenges & Solutions</h2>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {project.details.challenges}
          </p>
        </section>
      )}

      {/* Outcomes */}
      {project.details.outcomes && (
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Results & Impact</h2>
          <p className="text-slate-300 leading-relaxed whitespace-pre-line">
            {project.details.outcomes}
          </p>
        </section>
      )}

      <Separator className="bg-slate-800" />

      {/* Technologies */}
      <section>
        <h2 className="text-2xl font-semibold text-white mb-4">Technologies Used</h2>
        <div className="flex flex-wrap gap-2">
          {project.meta.technologies.map((tech) => (
            <Badge
              key={tech}
              variant="secondary"
              className="bg-slate-800 text-slate-300 hover:bg-slate-700 text-sm px-3 py-1"
            >
              {tech}
            </Badge>
          ))}
        </div>
      </section>

      {/* Additional Screenshots */}
      {project.details.images.length > 1 && (
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">More Screenshots</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.details.images.slice(1).map((image, index) => (
              <div
                key={index}
                className="relative aspect-video rounded-lg overflow-hidden border border-slate-800"
              >
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
