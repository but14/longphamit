import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import projects from "@/data/projects.json";

export const metadata = {
  title: "Dự án | Portfolio"
}

export default function Projects() {
  return (
    <Section title="Dự án đã thực hiện" subtitle="Tổng hợp dự án tiêu biểu trong quá trình học tập và làm việc.">
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} />
        ))}
      </div>
    </Section>
  );
}
