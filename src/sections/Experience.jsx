import React from "react";
import TimelineItem from "../components/TimelineItem";
import { experience } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-subtitle font-mono">&lt;history&gt;</span>
          <h2 className="section-title">Professional Experience</h2>
        </div>

        {/* Career Timeline */}
        <div className="experience-timeline-wrap">
          <div className="timeline-list">
            {experience.map((item, idx) => (
              <TimelineItem key={idx} item={item} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
