import React from "react";
import { ArrowRight, Download, Send } from "lucide-react";
import ApiConsole from "../components/ApiConsole";
import { profile } from "../data/profile";

export default function Hero() {
  const handleScrollTo = (id) => {
    const target = document.querySelector(id);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth"
      });
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        {/* Left Side: Pitch and Metadata */}
        <div className="hero-pitch">
          <div className="system-status-tag font-mono">
            <span className="pulse-dot"></span>
            <span>SYSTEM: ONLINE | DEPLOYED_TO_PRODUCTION</span>
          </div>

          <h1 className="hero-name font-mono">
            <span className="prompt-char">&gt; </span>
            {profile.name}
          </h1>

          <h2 className="hero-title">
            <span className="text-gradient-cyan">{profile.title}</span>
          </h2>
          <p className="hero-subtitle font-mono">{profile.subtitle}</p>

          <p className="hero-bio">{profile.summary.split(".")[0]}. Asynchronous architectures, relational schemas, and highly optimized database relations are my core expertise.</p>

          {/* Environmental Meta (Ubuntu CLI feel) */}
          <div className="sys-meta-grid font-mono">
            <div className="meta-item">
              <span className="meta-key">LOC:</span>
              <span className="meta-val">{profile.location}</span>
            </div>
            <div className="meta-item">
              <span className="meta-key">EXP:</span>
              <span className="meta-val">3+ Years</span>
            </div>
            <div className="meta-item">
              <span className="meta-key">DB_PREF:</span>
              <span className="meta-val">PostgreSQL</span>
            </div>
            <div className="meta-item">
              <span className="meta-key">LANGS:</span>
              <span className="meta-val">Python, PHP, JS</span>
            </div>
          </div>

          {/* Call-to-actions */}
          <div className="hero-actions">
            <button onClick={() => handleScrollTo("#projects")} className="btn btn-primary">
              <span>View Projects</span>
              <ArrowRight size={16} />
            </button>
            <button onClick={() => handleScrollTo("#contact")} className="btn btn-secondary">
              <span>Contact Me</span>
              <Send size={14} />
            </button>
            <a
              href={profile.resumeUrl}
              download="Sagar_Gautam_Resume.pdf"
              className="btn btn-tertiary resume-download-btn"
              title="Download PDF version of CV"
            >
              <Download size={14} />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Right Side: Interactive Console */}
        <div className="hero-visual">
          <ApiConsole />
        </div>
      </div>
    </section>
  );
}
