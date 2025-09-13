import { Github, Link as LinkIcon, CalendarClock, Users } from "lucide-react";
import Image from "next/image";

export default function ProjectCard({ project }: { project: any }) {
  return (
    <article className="card overflow-hidden hover:-translate-y-1 transition-transform">
      {project.image && (
        <div className="relative w-full aspect-[16/9] bg-neutral-800/50">
          <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
        </div>
      )}
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-semibold">{project.title}</h3>
        <p className="text-neutral-300">{project.description}</p>
        <ul className="flex flex-wrap gap-2">
          {project.tech?.map((t: string, i: number) => (
            <li key={i} className="text-xs bg-neutral-800 px-2 py-1 rounded-md border border-neutral-700">{t}</li>
          ))}
        </ul>
        <div className="flex items-center gap-4 text-sm text-neutral-400">
          {project.year && <span className="inline-flex items-center gap-1"><CalendarClock size={16}/> {project.year}</span>}
          {project.team && <span className="inline-flex items-center gap-1"><Users size={16}/> {project.team}</span>}
        </div>
        <div className="pt-2 flex gap-3">
          {project.github && (
            <a className="underline inline-flex items-center gap-1" href={project.github} target="_blank" rel="noreferrer">
              <Github size={16}/> Source
            </a>
          )}
          {project.link && (
            <a className="underline inline-flex items-center gap-1" href={project.link} target="_blank" rel="noreferrer">
              <LinkIcon size={16}/> Live
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
