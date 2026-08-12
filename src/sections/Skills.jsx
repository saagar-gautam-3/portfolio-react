import React from "react";
import { Server, Database, ShieldCheck, Cpu, GitBranch, LayoutGrid } from "lucide-react";
import { skillCategories, coreCompetencies } from "../data/skills";

export default function Skills() {
  const getCategoryIcon = (categoryTitle) => {
    switch (categoryTitle) {
      case "Backend Development":
        return <Server size={18} className="text-gradient-cyan" />;
      case "Database Technologies":
        return <Database size={18} className="text-gradient-cyan" />;
      case "Authentication & Security":
        return <ShieldCheck size={18} className="text-gradient-cyan" />;
      case "Architecture & Development":
        return <Cpu size={18} className="text-gradient-cyan" />;
      case "DevOps & Tools":
        return <GitBranch size={18} className="text-gradient-cyan" />;
      case "Frontend Integration":
        return <LayoutGrid size={18} className="text-gradient-cyan" />;
      default:
        return <Server size={18} className="text-gradient-cyan" />;
    }
  };

  return (
    <section id="skills" className="skills-section">
      {/* Background visual accents */}
      <div className="section-glow-left"></div>

      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle font-mono">&lt;capabilities&gt;</span>
          <h2 className="section-title">Technical Stack & Competencies</h2>
        </div>

        {/* Skills Category Grid */}
        <div className="skills-grid">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="skills-category-card glass-panel">
              <div className="category-header">
                {getCategoryIcon(category.title)}
                <h3 className="category-title font-mono">{category.title}</h3>
              </div>
              <div className="skills-tags-wrap">
                {category.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="tech-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Core Competencies panel */}
        <div className="competencies-panel glass-panel border-top">
          <h3 className="competencies-title font-mono">// Core Competencies Summary</h3>
          <div className="competencies-grid">
            {coreCompetencies.map((comp, idx) => (
              <div key={idx} className="competency-item">
                <span className="bullet text-gradient-cyan">&gt;</span>
                <span className="competency-text">{comp}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
