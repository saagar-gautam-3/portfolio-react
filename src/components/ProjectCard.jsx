import React, { useState } from "react";
import { GitBranch, ExternalLink, ChevronDown, ChevronUp, Terminal, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectCard({ project }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getMethodColor = (cat) => {
    if (cat.toLowerCase().includes("fastapi")) return "method-fastapi";
    if (cat.toLowerCase().includes("laravel")) return "method-laravel";
    return "method-default";
  };

  const getMethodText = (cat) => {
    if (cat.toLowerCase().includes("architecture") || cat.toLowerCase().includes("infrastructure")) return "POST";
    if (cat.toLowerCase().includes("full stack") || cat.toLowerCase().includes("development")) return "PUT";
    return "GET";
  };

  return (
    <div className={`project-card glass-panel ${isExpanded ? "expanded" : ""}`}>
      {/* Card Endpoint Header */}
      <div className="project-card-header" onClick={() => setIsExpanded(!isExpanded)}>
        <span className={`project-method ${getMethodColor(project.category)}`}>
          {getMethodText(project.category)}
        </span>
        <span className="project-endpoint font-mono">/projects/{project.id}</span>
        <button className="expand-indicator-btn" aria-label="Toggle details">
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Main Content Area */}
      <div className="project-card-body">
        <div className="project-meta-wrap">
          <h3 className="project-title">{project.title}</h3>
          <span className="project-category font-mono">{project.category}</span>
        </div>
        <p className="project-description">{project.description}</p>

        {/* Tech Stack List */}
        <div className="project-tech-list">
          {project.tech.map((t, idx) => (
            <span key={idx} className="tech-badge">
              {t}
            </span>
          ))}
        </div>

        {/* Expandable Details Container */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: "auto" },
                collapsed: { opacity: 0, height: 0 }
              }}
              transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
              className="project-drawer"
            >
              <div className="drawer-inner border-top">
                <div className="drawer-header-label font-mono">
                  <Terminal size={12} className="text-gradient-cyan" />
                  <span>system_log --contributions</span>
                </div>
                <ul className="contributions-list">
                  {project.contributions.map((c, idx) => (
                    <li key={idx} className="contribution-item">
                      <span className="bullet text-gradient-cyan">&gt;&gt;</span>
                      <span className="text-secondary">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Card Footer Links */}
        <div className="project-card-footer border-top">
          {project.github ? (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
              <GitBranch size={14} />
              <span>GitHub</span>
            </a>
          ) : (
            <span className="btn btn-tertiary btn-sm disabled-link" title="Code is in a private enterprise repository">
              <ShieldAlert size={14} />
              <span>Private Source</span>
            </span>
          )}

          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <ExternalLink size={14} />
              <span>Live Demo</span>
            </a>
          ) : (
            <span className="btn btn-tertiary btn-sm disabled-link" title="API-only backend services, no frontend UI">
              <Terminal size={14} />
              <span>Backend API</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
