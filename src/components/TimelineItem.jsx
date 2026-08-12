import React from "react";
import { Calendar, MapPin, Briefcase } from "lucide-react";

export default function TimelineItem({ item, index }) {
  return (
    <div className="timeline-item">
      {/* Connector Line & Dot */}
      <div className="timeline-connector-wrap">
        <div className="timeline-dot-outline">
          <div className="timeline-dot-inner"></div>
        </div>
        <div className="timeline-connector-line"></div>
      </div>

      {/* Experience Content Panel */}
      <div className="timeline-content-panel glass-panel">
        <div className="timeline-content-header">
          <div>
            <h3 className="timeline-role">{item.role}</h3>
            <div className="timeline-company-wrap">
              <Briefcase size={13} className="text-gradient-cyan" />
              <span className="timeline-company font-mono">{item.company}</span>
              <span className="separator">•</span>
              <MapPin size={12} className="text-muted" />
              <span className="timeline-location">{item.location}</span>
            </div>
          </div>
          <div className="timeline-period-badge">
            <Calendar size={12} />
            <span className="font-mono">{item.period}</span>
          </div>
        </div>

        {/* Responsibilities list */}
        <ul className="timeline-tasks-list">
          {item.responsibilities.map((resp, idx) => (
            <li key={idx} className="timeline-task-item">
              <span className="task-bullet font-mono">-</span>
              <span className="task-text">{resp}</span>
            </li>
          ))}
        </ul>

        {/* Tech used in this role */}
        <div className="timeline-tech-wrap">
          <span className="tech-label font-mono">stack_trace:</span>
          <div className="timeline-tech-tags">
            {item.tech.map((t, idx) => (
              <span key={idx} className="timeline-tech-badge font-mono">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
