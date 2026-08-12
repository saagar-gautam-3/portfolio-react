import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import EducationCertifications from "./sections/EducationCertifications";
import Contact from "./sections/Contact";
import { Terminal } from "lucide-react";
import { profile } from "./data/profile";

export default function App() {
  return (
    <ThemeProvider>
      {/* Decorative background grid and ambient radial lights */}
      <div className="bg-grid-pattern"></div>
      <div className="bg-radial-glow"></div>

      {/* Main Glassmorphic Navigation */}
      <Navbar />

      {/* Structured Sections assembly */}
      <main className="portfolio-main">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <EducationCertifications />
        <Contact />
      </main>

      {/* Premium Developer-themed Footer */}
      <footer className="portfolio-footer border-top font-mono">
        <div className="container footer-container">
          <div className="footer-meta">
            <div className="footer-logo">
              <Terminal size={14} className="text-gradient-cyan" />
              <span>sagargautam.dev</span>
            </div>
            <p className="footer-copy">
              © {new Date().getFullYear()} {profile.name}. All rights reserved.
            </p>
          </div>

          <div className="footer-diagnostics">
            <span className="diagnostic-item">
              <span className="diagnostic-label">env:</span>
              <span className="diagnostic-val text-green">production</span>
            </span>
            <span className="diagnostic-item">
              <span className="diagnostic-label">db:</span>
              <span className="diagnostic-val text-green">connected</span>
            </span>
            <span className="diagnostic-item">
              <span className="diagnostic-label">ssl:</span>
              <span className="diagnostic-val text-green">active</span>
            </span>
            <span className="diagnostic-item status-indicator-badge">
              <span className="pulse-dot"></span>
              <span className="text-green font-weight-bold">200 OK</span>
            </span>
          </div>
        </div>
      </footer>
    </ThemeProvider>
  );
}
