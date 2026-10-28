import { PROJECTS } from '../data/portfolio';

export default function Projects() {
  return <div className="project-grid">{PROJECTS.map((project, index) => (
    <article className="project-card" key={project.name}>
      <div className="project-card-top"><span className="project-number">0{index + 1} / PROJECT</span><span className={`status status-${project.status.replace(/\s+/g, '-')}`}>{project.status}</span></div>
      <h3>{project.name}<span>↗</span></h3>
      <p>{project.pitch}</p>
      <div className="project-stack">{project.stack}</div>
      {project.details && <details><summary>read build notes <span>+</span></summary><p>{project.details}</p></details>}
      <div className="project-links">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub ↗
          </a>
        )}

        {project.liveDemoUrl && (
          <a
            href={project.liveDemoUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Live Demo ↗
          </a>
        )}
      </div>
    </article>
  ))}</div>;
}
