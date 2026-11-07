import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionTemplate, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Code2, Eye, Layers3, MousePointer2, Pause, Play, RotateCcw, Sparkles } from "lucide-react";
import SectionHeading from "./SectionHeading.jsx";

const experiments = [
  { id: "ui", label: "Interactive UI Lab", note: "Components & states", icon: Layers3 },
  { id: "motion", label: "CSS Motion Lab", note: "Shape, speed & direction", icon: Sparkles },
  { id: "components", label: "Component Showcase", note: "Navigation & feedback", icon: Code2 },
  { id: "visual", label: "Visual Experiments", note: "Color, texture & cursor", icon: Eye },
];

const initialState = {
  ui: { theme: "night", accent: "#849275", name: "Sagar", density: "comfortable", toggled: true, checked: true, liked: false, loading: false, feedback: "Choose a control to see its state change." },
  motion: { style: "orbit", speed: "3", direction: "normal", playing: true, revision: 0 },
  components: { page: "Overview", online: true, liked: false, expanded: false, popover: false, feedback: "Component states are ready to explore." },
  visual: { first: "#849275", second: "#b85f45", angle: "135", surface: "night", pattern: true, shape: "diamond" },
};

export default function Playground() {
  const [activeId, setActiveId] = useState("ui");
  const [state, setState] = useState(initialState);
  const reduce = useReducedMotion();
  const loadingTimer = useRef(null);
  const active = experiments.find((experiment) => experiment.id === activeId) || experiments[0];
  const update = (experiment, key, value) => setState((current) => ({ ...current, [experiment]: { ...current[experiment], [key]: value } }));

  useEffect(() => () => window.clearTimeout(loadingTimer.current), []);
  const runLoadingAction = () => {
    window.clearTimeout(loadingTimer.current);
    update("ui", "loading", true);
    update("ui", "feedback", "A short loading state is running.");
    loadingTimer.current = window.setTimeout(() => {
      setState((current) => ({ ...current, ui: { ...current.ui, loading: false, feedback: "The loading action completed." } }));
    }, 900);
  };

  return <section className="section playground-section" id="playground"><div className="container">
    <SectionHeading number="03" eyebrow="INTERACTION STUDIO / LIVE EXPERIMENTS" title={<>An interactive space<br/>for <em>digital experiments.</em></>} detail="Small explorations in interface design, motion, and the details that make digital products feel alive."/>
    <div className="play-workspace">
      <nav className="experiment-nav" aria-label="Choose an interactive experiment">{experiments.map((experiment, index) => {
        const Icon = experiment.icon;
        return <button type="button" key={experiment.id} className={activeId === experiment.id ? "active" : ""} aria-pressed={activeId === experiment.id} onClick={() => setActiveId(experiment.id)}><span className="experiment-number">0{index + 1}</span><span className="experiment-label"><b>{experiment.label}</b><small>{experiment.note}</small></span><Icon size={16} aria-hidden="true"/></button>;
      })}<div className="experiment-nav-foot"><span>FOUR WORKING STUDIES</span><span>SELECT TO EXPLORE <ArrowDownRight size={12} aria-hidden="true"/></span></div></nav>
      <div className="experiment-display">
        <div className="experiment-display-head"><div><span>EXPERIMENT / {String(experiments.indexOf(active) + 1).padStart(2, "0")}</span><h3>{active.label}</h3></div><span className="display-live"><i aria-hidden="true"/>LIVE PREVIEW</span></div>
        <AnimatePresence mode="wait" initial={false}><motion.div key={activeId} className="experiment-preview" initial={reduce ? false : { opacity: 0, y: 9 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: reduce ? 0 : .24 }}>
          {activeId === "ui" && <InteractiveUILab value={state.ui} update={update} onLoading={runLoadingAction}/>}
          {activeId === "motion" && <MotionLab value={state.motion} update={update} reduce={reduce}/>}
          {activeId === "components" && <ComponentShowcase value={state.components} update={update}/>}
          {activeId === "visual" && <VisualExperiments value={state.visual} update={update} reduce={reduce}/>}
        </motion.div></AnimatePresence>
      </div>
    </div>
    <div className="playground-signoff"><span>BUILT TO BE TOUCHED / ALL CONTROLS CHANGE THE PREVIEW</span><span>KATHMANDU · NEPAL <i aria-hidden="true">✳</i></span></div>
  </div></section>;
}

function InteractiveUILab({ value, update, onLoading }) {
  return <div className={`ui-lab theme-${value.theme} density-${value.density}`} style={{ "--demo-accent": value.accent }}>
    <div className="ui-lab-heading"><div><span className="lab-kicker">01 / INTERFACE STATES</span><h4>{value.name.trim() ? `Good to see you, ${value.name.trim()}.` : "Your interface, in context."}</h4><p>Each control changes a real preview state.</p></div><button type="button" className="theme-control" aria-label={`Switch to ${value.theme === "night" ? "warm ivory" : "night"} preview theme`} onClick={() => update("ui", "theme", value.theme === "night" ? "ivory" : "night")}><span aria-hidden="true">{value.theme === "night" ? "◐" : "◑"}</span>{value.theme === "night" ? "Night" : "Warm ivory"}</button></div>
    <div className="ui-lab-grid">
      <div className="ui-control-column">
        <label className="play-field">NAME IN PREVIEW<input value={value.name} onChange={(event) => update("ui", "name", event.target.value)} placeholder="Type a name" autoComplete="off"/></label>
        <label className="play-field">PREVIEW DENSITY<select value={value.density} onChange={(event) => update("ui", "density", event.target.value)}><option value="comfortable">Comfortable</option><option value="compact">Compact</option></select></label>
        <div className="ui-accent-picker"><span>ACCENT COLOR</span><div role="group" aria-label="Choose interface accent">{[["#849275","Himalayan moss"],["#b85f45","Terracotta"],["#7896a1","Glacier blue"]].map(([color,label])=><button type="button" key={color} aria-label={label} aria-pressed={value.accent===color} className={value.accent===color?"active":""} style={{"--swatch-color":color}} onClick={()=>update("ui","accent",color)}/>)}</div></div>
        <div className="play-control-pair"><label className="play-switch-row"><span>NOTIFICATIONS</span><button type="button" role="switch" aria-checked={value.toggled} className={`play-switch ${value.toggled ? "on" : ""}`} onClick={() => update("ui", "toggled", !value.toggled)}><i/><span className="sr-only">Notifications</span></button></label>
        <label className="play-check-row"><input type="checkbox" checked={value.checked} onChange={(event) => update("ui", "checked", event.target.checked)}/><span>Remember preference</span></label></div>
      </div>
      <div className="ui-component-column">
        <div className="ui-button-row"><button type="button" className="lab-button primary" onClick={() => update("ui", "feedback", "Primary action selected.")}>Primary action <ArrowUpRight size={14} aria-hidden="true"/></button><button type="button" className="lab-button secondary" onClick={() => update("ui", "feedback", "Secondary action selected.")}>Secondary</button></div>
        <div className="ui-button-row"><button type="button" className="lab-button outline" onClick={onLoading} disabled={value.loading}>{value.loading ? <><span className="button-spinner" aria-hidden="true"/>Loading</> : <><Play size={13} aria-hidden="true"/>Run loading state</>}</button><button type="button" className="lab-button disabled" disabled>Unavailable</button></div>
        <button type="button" className={`ui-mini-card ${value.liked ? "liked" : ""}`} onClick={() => { update("ui", "liked", !value.liked); update("ui", "feedback", value.liked ? "Card removed from saved items." : "Card saved to your collection."); }} aria-pressed={value.liked}><span className="mini-card-mark">SG</span><span><b>Small details, considered.</b><small>Interactive card · {value.liked ? "Saved" : "Select to save"}</small></span><span className="mini-card-like" aria-hidden="true">{value.liked ? "♥" : "♡"}</span></button>
      </div>
    </div>
    <div className="ui-lab-status" role="status" aria-live="polite"><i aria-hidden="true"/>{value.feedback}<span>ACCENT / {value.accent}</span></div>
  </div>;
}

function MotionLab({ value, update, reduce }) {
  const reset = () => { update("motion", "style", "orbit"); update("motion", "speed", "3"); update("motion", "direction", "normal"); update("motion", "playing", true); update("motion", "revision", value.revision + 1); };
  return <div className="motion-lab">
    <div className="motion-controls"><label className="play-field">MOTION STUDY<select value={value.style} onChange={(event) => update("motion", "style", event.target.value)}><option value="orbit">Orbit</option><option value="float">Float</option><option value="pulse">Pulse</option><option value="drift">Drift</option></select></label>
      <label className="play-field">DIRECTION<select value={value.direction} onChange={(event) => update("motion", "direction", event.target.value)}><option value="normal">Forward</option><option value="reverse">Reverse</option><option value="alternate">Alternate</option></select></label>
      <label className="play-field range-field">SPEED <output htmlFor="motion-speed">{Number(value.speed).toFixed(1)}s</output><input id="motion-speed" type="range" min="0.8" max="6" step="0.2" value={value.speed} onChange={(event) => update("motion", "speed", event.target.value)}/></label>
      <div className="motion-action-row"><button type="button" className="lab-button primary" onClick={() => update("motion", "playing", !value.playing)} disabled={reduce} aria-pressed={value.playing}>{reduce ? <><Pause size={14} aria-hidden="true"/>Motion reduced</> : value.playing ? <><Pause size={14} aria-hidden="true"/>Pause motion</> : <><Play size={14} aria-hidden="true"/>Play motion</>}</button><button type="button" className="lab-button secondary" onClick={reset}><RotateCcw size={13} aria-hidden="true"/>Reset</button></div>
      {reduce && <p className="reduced-motion-note">Reduced motion is enabled on this device. The shape stays still.</p>}
    </div>
    <div className={`motion-stage ${reduce ? "reduce-motion" : ""}`} style={{ "--shape-duration": `${value.speed}s`, "--shape-direction": value.direction }}><div className="motion-stage-grid" aria-hidden="true"/><div className="motion-orbit-ring" aria-hidden="true"/><div key={value.revision} className={`motion-shape shape-${value.style} ${value.playing && !reduce ? "is-playing" : ""}`} aria-label={`${value.style} geometric animation`} role="img"><i/><b/><span/></div><span className="motion-stage-label">CSS TRANSFORM / {value.style.toUpperCase()}</span><span className="motion-stage-axis" aria-hidden="true">X / Y</span></div>
  </div>;
}

function ComponentShowcase({ value, update }) {
  const popoverButton = useRef(null);
  useEffect(() => {
    if (!value.popover) return undefined;
    const closeOnEscape = (event) => { if (event.key === "Escape") { update("components", "popover", false); popoverButton.current?.focus(); } };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [value.popover, update]);
  return <div className="component-lab">
    <div className="showcase-topline"><span>02 / REUSABLE INTERFACE PARTS</span><span className={`showcase-status ${value.online ? "online" : "offline"}`}><i/>{value.online ? "SYSTEM READY" : "SYSTEM PAUSED"}</span></div>
    <div className="showcase-nav" role="group" aria-label="Preview navigation">{["Overview", "Projects", "Notes"].map((page) => <button type="button" key={page} aria-pressed={value.page === page} onClick={() => update("components", "page", page)}>{page}</button>)}<button ref={popoverButton} type="button" className="popover-trigger" aria-expanded={value.popover} aria-controls="component-popover" onClick={() => update("components", "popover", !value.popover)}>Quick menu <ArrowDownRight size={13} aria-hidden="true"/></button></div>
    <div className="component-popover" id="component-popover" role="group" aria-label="Quick menu" hidden={!value.popover}><b>Quick menu</b><p>Choose a section to preview its selected state.</p><div>{["Overview", "Projects", "Notes"].map((page) => <button type="button" key={page} onClick={() => { update("components", "page", page); update("components", "popover", false); }}>{page}<ArrowRight size={12} aria-hidden="true"/></button>)}</div></div>
    <div className="showcase-content"><div className="showcase-card"><span className="lab-kicker">{value.page.toUpperCase()} / COMPONENT 01</span><h4>{value.page === "Overview" ? "A clear path through the interface." : value.page === "Projects" ? "Selected work, with room to breathe." : "Useful notes for what comes next."}</h4><p>Reusable components make consistent states easier to understand and work with.</p>{value.expanded && <p className="showcase-expanded">This card is now expanded. Its supporting content is part of the same component state.</p>}<div><button type="button" className="lab-button primary" onClick={() => update("components", "expanded", !value.expanded)}>{value.expanded ? "Show less" : "Read the note"}<ArrowUpRight size={13} aria-hidden="true"/></button><button type="button" className="showcase-like" aria-label={value.liked ? "Remove saved state" : "Save this card"} aria-pressed={value.liked} onClick={() => update("components", "liked", !value.liked)}>{value.liked ? "♥ Saved" : "♡ Save"}</button></div></div>
      <div className="showcase-side"><span className="lab-kicker">STATUS INDICATOR</span><p><span className={`status-pip ${value.online ? "online" : "offline"}`}/>{value.online ? "All systems operational" : "System paused"}</p><button type="button" className="lab-button secondary" aria-pressed={value.online} onClick={() => update("components", "online", !value.online)}>Toggle status</button><div className="showcase-feedback" role="status" aria-live="polite">{value.feedback}</div></div></div>
  </div>;
}

function VisualExperiments({ value, update, reduce }) {
  const x=useMotionValue("50%");
  const y=useMotionValue("50%");
  const glow=useMotionTemplate`radial-gradient(250px circle at ${x} ${y}, color-mix(in srgb, ${value.first} 58%, transparent), transparent 72%)`;
  const pointerMove=(event)=>{if(reduce)return;const rect=event.currentTarget.getBoundingClientRect();x.set(`${((event.clientX-rect.left)/rect.width)*100}%`);y.set(`${((event.clientY-rect.top)/rect.height)*100}%`);};
  return <div className="visual-lab">
    <div className="visual-controls"><label className="play-field color-field">FIRST COLOR<input type="color" value={value.first} onChange={(event) => update("visual", "first", event.target.value)}/><output>{value.first}</output></label><label className="play-field color-field">SECOND COLOR<input type="color" value={value.second} onChange={(event) => update("visual", "second", event.target.value)}/><output>{value.second}</output></label><label className="play-field range-field">GRADIENT ANGLE <output htmlFor="gradient-angle">{value.angle}°</output><input id="gradient-angle" type="range" min="0" max="360" step="5" value={value.angle} onChange={(event) => update("visual", "angle", event.target.value)}/></label>
      <label className="play-field">SURFACE VARIATION<select value={value.surface} onChange={(event) => update("visual", "surface", event.target.value)}><option value="night">Night field</option><option value="ivory">Warm ivory</option><option value="moss">Moss field</option></select></label><label className="play-check-row visual-pattern-check"><input type="checkbox" checked={value.pattern} onChange={(event) => update("visual", "pattern", event.target.checked)}/><span>Animated grid pattern</span></label><div className="shape-selector" role="group" aria-label="Choose a geometric composition">{["diamond", "circle", "cross"].map((shape) => <button type="button" key={shape} className={value.shape === shape ? "active" : ""} aria-pressed={value.shape === shape} onClick={() => update("visual", "shape", shape)}>{shape}</button>)}</div>
    </div>
    <div className={`visual-canvas surface-${value.surface} ${value.pattern ? "pattern-on" : ""}`} style={{ "--gradient-angle": `${value.angle}deg`, "--visual-one": value.first, "--visual-two": value.second, "--surface-base": value.surface === "ivory" ? "#eeeae2" : value.surface === "moss" ? "#626b4e" : "#202622" }} onPointerMove={pointerMove} onPointerLeave={() => { x.set("50%"); y.set("50%"); }}><motion.div className="visual-cursor-glow" style={{ background: reduce ? "none" : glow }} aria-hidden="true"/><div className={`visual-geometry geometry-${value.shape}`} aria-hidden="true"><i/><b/><span/></div><div className="visual-canvas-label"><span><MousePointer2 size={13} aria-hidden="true"/> POINTER / {reduce ? "STILL" : "RESPONSIVE"}</span><span>CSS GRADIENT / {value.angle}°</span></div><span className="visual-grid-note">COLOR STUDY / 04</span></div>
  </div>;
}
