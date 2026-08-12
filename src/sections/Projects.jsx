import React from "react";
import ProjectCard from "../components/ProjectCard";
import { projects } from "../data/projects";

export default function Projects() {
  return (
    <section id="projects" className="projects-section">
      {/* Visual background element */}
      <div className="section-glow-right"></div>

      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle font-mono">&lt;repository&gt;</span>
          <h2 className="section-title">Selected Projects</h2>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
