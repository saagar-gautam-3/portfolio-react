import React from "react";
import DatabaseSchema from "../components/DatabaseSchema";
import { profile } from "../data/profile";

export default function About() {
  return (
    <section id="about" className="about-section">
      <div className="container about-container">
        {/* Left Side: Biography text */}
        <div className="about-bio-panel">
          <div className="section-header">
            <span className="section-subtitle font-mono">&lt;description&gt;</span>
            <h2 className="section-title">About Me</h2>
          </div>
          <div className="bio-paragraphs">
            <p>
              I am a dedicated Backend Engineer based in Kathmandu, Nepal, with <strong>3+ years of professional experience</strong> architecting scalable RESTful APIs, securing system access, and organizing optimized database structures.
            </p>
            <p>
              My backend stack centers around <strong>FastAPI (Python)</strong> for high-performance, asynchronous services, and <strong>Laravel (PHP)</strong> for robust, structure-driven web backends. I specialize in database schemas design, indexing, and complex queries optimization, with <strong>PostgreSQL</strong> and <strong>MySQL</strong> being my primary instruments of choice.
            </p>
            <p>
              I am highly familiar with configuring enterprise access control systems, specifically <strong>Role-Based Access Control (RBAC)</strong> and <strong>JWT validation</strong>. I write clean, maintainable code following Service-Oriented (SOA) and modular clean architecture guidelines, ensuring that services remain secure, easy to scale, and developer-friendly.
            </p>
            <p>
              Whether working with local platforms or international product engineering teams, I prioritize fast load times, system integrity, Dockerized reproducible environments, and seamless integrations.
            </p>
          </div>
        </div>

        {/* Right Side: Relational database visualization */}
        <div className="about-visual-panel">
          <div className="visual-header-desc font-mono">
            <span>// database_schema_relationship_graph</span>
          </div>
          <DatabaseSchema />
        </div>
      </div>
    </section>
  );
}
