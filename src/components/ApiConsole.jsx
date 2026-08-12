import React, { useState, useEffect, useRef } from "react";
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check, Code } from "lucide-react";
import { profile } from "../data/profile";
import { skillCategories } from "../data/skills";
import { projects } from "../data/projects";
import { experience } from "../data/experience";

export default function ApiConsole() {
  const [activeTab, setActiveTab] = useState("api"); // 'api' or 'cli'
  const [selectedRoute, setSelectedRoute] = useState("/api/profile");
  const [jsonOutput, setJsonOutput] = useState("");
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const typingTimerRef = useRef(null);

  // CLI States
  const [cliInput, setCliInput] = useState("");
  const [cliHistory, setCliHistory] = useState([
    { text: "Welcome to Sagar Gautam's CLI Console v1.0.0", type: "system" },
    { text: "Type 'help' to see list of available commands.", type: "system" },
    { text: "", type: "empty" }
  ]);
  const cliEndRef = useRef(null);
  const inputRef = useRef(null);

  const routes = [
    { path: "/api/profile", label: "GET /api/profile" },
    { path: "/api/skills", label: "GET /api/skills" },
    { path: "/api/experience", label: "GET /api/experience" },
    { path: "/api/projects", label: "GET /api/projects" }
  ];

  // Route JSON Map
  const getRouteData = (route) => {
    switch (route) {
      case "/api/profile":
        return {
          name: profile.name,
          role: profile.title,
          specialty: profile.subtitle,
          location: profile.location,
          contact: {
            email: profile.email,
            phone: profile.phone
          },
          summary: "Backend Engineer with 3+ years of experience specialized in building secure, async, highly-optimized APIs and relational schemas."
        };
      case "/api/skills":
        return skillCategories.reduce((acc, cat) => {
          acc[cat.title.toLowerCase().replace(" & ", "_").replace(" ", "_")] = cat.skills;
          return acc;
        }, {});
      case "/api/experience":
        return experience.map(exp => ({
          role: exp.role,
          company: exp.company,
          period: exp.period,
          key_responsibilities: exp.responsibilities.slice(0, 2), // trim for display
          stack: exp.tech
        }));
      case "/api/projects":
        return projects.map(proj => ({
          title: proj.title,
          stack: proj.tech,
          category: proj.category,
          tagline: proj.description
        }));
      default:
        return { error: "Route not found" };
    }
  };

  const triggerTyping = (targetText) => {
    setIsTyping(true);
    setJsonOutput("");
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);

    let index = 0;
    // Fast typewriter: chunks of characters or full string in intervals
    const intervalTime = Math.max(5, Math.floor(150 / targetText.length));
    
    typingTimerRef.current = setInterval(() => {
      if (index < targetText.length) {
        // Grab a slice to speed up JSON printing while maintaining typing flow
        const increment = targetText.length > 500 ? 5 : 2;
        setJsonOutput(targetText.slice(0, index + increment));
        index += increment;
      } else {
        setJsonOutput(targetText);
        setIsTyping(false);
        clearInterval(typingTimerRef.current);
      }
    }, intervalTime);
  };

  useEffect(() => {
    if (activeTab === "api") {
      const dataStr = JSON.stringify(getRouteData(selectedRoute), null, 2);
      triggerTyping(dataStr);
    }
  }, [selectedRoute, activeTab]);

  useEffect(() => {
    if (activeTab === "cli") {
      cliEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [cliHistory, activeTab]);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // CLI Command Processor
  const handleCliSubmit = (e) => {
    e.preventDefault();
    const cmd = cliInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...cliHistory, { text: `sagargautam@api-console:~$ ${cliInput}`, type: "input" }];
    
    let responseText = "";
    let responseType = "output";

    switch (cmd) {
      case "help":
        responseText = "Available commands: \n  about      - Profile summary\n  skills     - Category wise skills\n  experience - Career history summary\n  projects   - Show listed portfolio projects\n  github     - Visit GitHub profile\n  linkedin   - Visit LinkedIn profile\n  contact    - Print contact endpoints\n  clear      - Clear terminal screen";
        break;
      case "about":
        responseText = `Sagar Gautam\n${profile.subtitle}\nBased in ${profile.location}\n\n${profile.summary}`;
        break;
      case "skills":
        responseText = skillCategories
          .map(cat => `[${cat.title}]\n  ${cat.skills.join(", ")}`)
          .join("\n\n");
        break;
      case "experience":
        responseText = experience
          .map(exp => `• ${exp.role} @ ${exp.company} (${exp.period})\n  - ${exp.responsibilities[0]}`)
          .join("\n\n");
        break;
      case "projects":
        responseText = projects
          .map(proj => `• ${proj.title} [${proj.tech.slice(0, 3).join(", ")}]\n  - ${proj.description}`)
          .join("\n\n");
        break;
      case "github":
        window.open(profile.github, "_blank");
        responseText = `Opening GitHub profile: ${profile.github}`;
        break;
      case "linkedin":
        window.open(profile.linkedin, "_blank");
        responseText = `Opening LinkedIn profile: ${profile.linkedin}`;
        break;
      case "contact":
        responseText = `Email: ${profile.email}\nPhone: ${profile.phone}\nAddress: ${profile.location}`;
        break;
      case "clear":
        setCliHistory([]);
        setCliInput("");
        return;
      default:
        responseText = `bash: command not found: ${cmd}. Type 'help' for instructions.`;
        responseType = "error";
    }

    setCliHistory([...newHistory, { text: responseText, type: responseType }, { text: "", type: "empty" }]);
    setCliInput("");
  };

  const focusCliInput = () => {
    if (activeTab === "cli") {
      inputRef.current?.focus();
    }
  };

  return (
    <div className="api-console-wrapper glass-panel">
      {/* Console Header */}
      <div className="console-header">
        <div className="header-dots">
          <span className="dot dot-red"></span>
          <span className="dot dot-yellow"></span>
          <span className="dot dot-green"></span>
        </div>
        <div className="header-title">
          {activeTab === "api" ? "GET - https://api.sagargautam.dev/v1" : "sagargautam@api-console: ~"}
        </div>
        <div className="console-modes">
          <button
            onClick={() => setActiveTab("api")}
            className={`mode-btn ${activeTab === "api" ? "active" : ""}`}
            title="API GUI Mode"
          >
            <Code size={14} />
            <span className="btn-txt">API Client</span>
          </button>
          <button
            onClick={() => setActiveTab("cli")}
            className={`mode-btn ${activeTab === "cli" ? "active" : ""}`}
            title="CLI Shell Mode"
          >
            <TerminalIcon size={14} />
            <span className="btn-txt">SSH Terminal</span>
          </button>
        </div>
      </div>

      {/* Tab 1: API Explorer */}
      {activeTab === "api" && (
        <div className="console-body api-explorer">
          {/* Route selector bar */}
          <div className="route-bar">
            <span className="request-method">GET</span>
            <div className="route-select-wrapper">
              <select
                value={selectedRoute}
                onChange={(e) => setSelectedRoute(e.target.value)}
                className="route-select"
              >
                {routes.map((r) => (
                  <option key={r.path} value={r.path}>
                    https://api.sagargautam.dev/v1{r.path}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={() => {
                const dataStr = JSON.stringify(getRouteData(selectedRoute), null, 2);
                triggerTyping(dataStr);
              }}
              className="send-btn"
              disabled={isTyping}
            >
              <Play size={12} fill="currentColor" />
              <span>SEND</span>
            </button>
          </div>

          {/* Response headers */}
          <div className="response-meta">
            <span className="status-badge">
              <span className="status-indicator"></span>
              200 OK
            </span>
            <span className="time-badge">12ms</span>
            <button className="copy-btn" onClick={handleCopy} title="Copy response body">
              {copied ? <Check size={14} className="text-green" /> : <Copy size={14} />}
            </button>
          </div>

          {/* JSON Payload View */}
          <div className="code-display">
            <pre className="json-pre">
              <code>
                {/* Visual coloring for JSON key-value */}
                {jsonOutput}
              </code>
            </pre>
          </div>
        </div>
      )}

      {/* Tab 2: SSH Terminal */}
      {activeTab === "cli" && (
        <div className="console-body terminal-cli" onClick={focusCliInput}>
          <div className="terminal-log">
            {cliHistory.map((item, idx) => {
              if (item.type === "empty") {
                return <div key={idx} className="terminal-empty-line">&nbsp;</div>;
              }
              return (
                <div key={idx} className={`terminal-line line-${item.type}`}>
                  {item.text}
                </div>
              );
            })}
            <div ref={cliEndRef} />
          </div>

          {/* Command Prompt Line */}
          <form onSubmit={handleCliSubmit} className="terminal-prompt-line">
            <span className="prompt-label">sagargautam@api-console:~$</span>
            <input
              ref={inputRef}
              type="text"
              value={cliInput}
              onChange={(e) => setCliInput(e.target.value)}
              className="terminal-input"
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <span className="cursor-blink">_</span>
          </form>
        </div>
      )}
    </div>
  );
}
