import { projects } from '@/constants';
import { ProjectCard } from '@/components/project-card';

export function Projects() {
  return (
    <div className='space-y-6'>
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          title={project.title}
          description={project.description}
          image={project.image}
          link={project.link}
        />
      ))}
    </div>
  );
}
