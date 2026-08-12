import React from "react";
import { GraduationCap, Award, Calendar, MapPin } from "lucide-react";
import { education, certifications } from "../data/experience";

export default function EducationCertifications() {
  return (
    <section id="education" className="education-certs-section">
      <div className="container education-certs-container">
        {/* Left Column: Education */}
        <div className="education-panel">
          <div className="section-header text-left">
            <span className="section-subtitle font-mono">&lt;academics&gt;</span>
            <h2 className="section-title">Education</h2>
          </div>

          <div className="education-cards-list">
            {education.map((edu, idx) => (
              <div key={idx} className="edu-card glass-panel">
                <div className="edu-card-icon-wrap">
                  <GraduationCap size={20} className="text-gradient-cyan" />
                </div>
                <div className="edu-card-content">
                  <div className="edu-meta-top">
                    <span className="edu-period font-mono">
                      <Calendar size={12} />
                      {edu.period}
                    </span>
                  </div>
                  <h3 className="edu-degree">{edu.degree}</h3>
                  <p className="edu-institution font-mono">{edu.institution}</p>
                  <p className="edu-location">
                    <MapPin size={11} />
                    <span>{edu.location}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Certifications */}
        <div className="certifications-panel">
          <div className="section-header text-left">
            <span className="section-subtitle font-mono">&lt;credentials&gt;</span>
            <h2 className="section-title">Certifications</h2>
          </div>

          <div className="certs-cards-list">
            {certifications.map((cert, idx) => (
              <div key={idx} className="cert-card glass-panel">
                <div className="cert-card-icon-wrap">
                  <Award size={20} className="text-gradient-green" />
                </div>
                <div className="cert-card-content">
                  <h3 className="cert-title">{cert.title}</h3>
                  <p className="cert-issuer font-mono">// {cert.issuer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
