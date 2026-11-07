import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronDown, Code2, ExternalLink, GitBranch, Layers3, MapPin, Menu, Network, Send, ShieldCheck, X } from "lucide-react";
import { profile } from "./data/profile";
import { experience, education, certifications } from "./data/experience";
import { skillCategories } from "./data/skills";
import { projects } from "./data/projects";
import portrait from "./assets/Image.jpeg";

const navigation = [["About", "about"], ["Stack", "stack"], ["Playground", "playground"], ["Work", "work"], ["Journey", "journey"], ["Nepal", "nepal"], ["Contact", "contact"]];
const evidencedSkills = new Set(skillCategories.flatMap((category) => category.skills));
const stackGroups = [
  { name: "Backend", icon: Network, items: ["FastAPI", "Laravel", "RESTful APIs", "SQLAlchemy 2.0", "Async Backend Development", "Clean Architecture", "Modular Services", "Service-Oriented Architecture"] },
  { name: "Languages", icon: Code2, items: ["Python", "PHP"] },
  { name: "Data", icon: Layers3, items: ["PostgreSQL", "MySQL", "Database Design", "Query Optimization"] },
  { name: "Security", icon: ShieldCheck, items: ["JWT Authentication", "RBAC Authorization", "Authentication & Authorization"] },
  { name: "Frontend integration", icon: Code2, items: ["React", "Next.js"] },
  { name: "Tools", icon: Layers3, items: ["Docker", "Git", "GitHub", "Linux", "CI/CD Basics", "API Documentation"] },
].map((category) => ({ ...category, items: category.items.filter((skill) => evidencedSkills.has(skill)) }));
const coreStack = ["FastAPI", "Laravel", "Python", "PostgreSQL", "MySQL", "Docker"];
const marks = { FastAPI: "F", Laravel: "L", Python: "Py", PostgreSQL: "PG", MySQL: "My", Docker: "D", React: "⚛", "Next.js": "N", PHP: "php", Git: "⌘" };
const projectColors = ["#c76d4d", "#85a896", "#d4a84f", "#698db2", "#b87355", "#8a9f75"];
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

function Reveal({ children, className = "", delay = 0, as: Tag = "div", ...props }) {
  const reduce = useReducedMotion();
  const Component = motion[Tag] || motion.div;
  return <Component className={className} variants={fadeUp} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.13 }} transition={{ delay }} {...props}>{children}</Component>;
}

function SectionLabel({ number, eyebrow, title, detail, light = false }) {
  return <Reveal className={`section-label ${light ? "light" : ""}`}><div className="section-label-top"><span>{number}</span><i />{eyebrow}</div><div className="section-label-bottom"><h2>{title}</h2>{detail && <p>{detail}</p>}</div></Reveal>;
}

function Preloader({ onFinish }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { onFinish(); return; }
    const timer = window.setTimeout(onFinish, 1450);
    return () => window.clearTimeout(timer);
  }, [onFinish, reduce]);
  return <motion.div className="preloader" initial={{ opacity: 1 }} exit={{ opacity: 0, y: -18, transition: { duration: 0.48, ease: "easeInOut" } }} aria-label={`Welcome to ${profile.name}'s portfolio`}><div className="preloader-mark" aria-hidden="true">SG</div><div className="preloader-name"><span>{profile.name}</span></div></motion.div>;
}

function HimalayanScene({ pointerX, pointerY }) {
  const reduce = useReducedMotion();
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [-4, 4]);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [3, -3]);
  return <motion.div className="himalaya-scene" style={reduce ? {} : { rotateX, rotateY }} aria-label="Layered Himalayan ridges and a Kathmandu signal point" role="img">
    <div className="scene-label scene-label-top"><span className="signal-dot" /> KATHMANDU VALLEY <i>27°42′ N / 85°19′ E</i></div>
    <svg className="mountain-svg" viewBox="0 0 760 480" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <defs><linearGradient id="peak-back" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#9ca58c" stopOpacity=".26"/><stop offset="1" stopColor="#9ca58c" stopOpacity=".02"/></linearGradient><linearGradient id="peak-front" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#c56e4e" stopOpacity=".82"/><stop offset="1" stopColor="#8c4e3d" stopOpacity=".45"/></linearGradient></defs>
      <motion.path d="M0 285 82 230 125 253 220 144 268 190 346 88 390 147 464 52 530 164 590 105 664 202 714 168 760 205V480H0Z" fill="url(#peak-back)" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.25, delay: .24 }} />
      <path className="ridge-line ridge-one" d="m18 283 64-53 43 23 95-109 48 46 78-102 44 59 74-145 66 112 60-59 74 97 50-34 46 37" />
      <motion.path d="M0 337 104 268 160 304 248 212 302 272 388 172 432 235 515 128 574 224 639 178 702 265 760 226V480H0Z" fill="url(#peak-front)" initial={reduce ? false : { opacity: 0, y: 36 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: .43 }} />
      <path className="ridge-line ridge-two" d="m2 337 102-69 56 36 88-92 54 60 86-100 44 63 83-107 59 96 65-46 63 87 58-39" />
      <path className="contour contour-a" d="M-10 366c118-63 180 48 303-6s213-102 340-26 96 38 152 7"/><path className="contour contour-b" d="M-12 393c132-61 181 43 316-11s209-95 332-23 104 31 150 4"/><path className="contour contour-c" d="M-8 420c138-57 191 42 329-11s218-88 330-24 92 33 117 12"/>
      <motion.g className="scene-signal" initial={reduce ? false : { opacity: 0, scale: .4 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .9, duration: .55 }}><circle cx="512" cy="253" r="16"/><circle cx="512" cy="253" r="30"/><circle cx="512" cy="253" r="45"/><circle className="signal-core" cx="512" cy="253" r="4"/></motion.g>
      <text x="535" y="248" className="map-text">KATHMANDU</text><text x="535" y="265" className="map-subtext">NPT · UTC+5:45</text>
      <path className="flight-path" d="M126 305C215 250 276 328 355 271S447 206 512 253" />
      <motion.circle className="route-point" r="4" initial={{ offsetDistance: "0%" }} animate={{ offsetDistance: "100%" }} transition={{ duration: 7, repeat: Infinity, ease: "linear" }} style={{ offsetPath: "path('M126 305 C215 250 276 328 355 271 S447 206 512 253')" }} />
    </svg>
    <div className="scene-label scene-label-bottom"><span>HIMALAYAN RIDGELINE STUDY</span><b>BASE / KATHMANDU</b><i>BACKEND SYSTEMS · DIGITAL PRODUCTS</i></div>
    <div className="scene-index">01 <i /> 27°42′N</div>
  </motion.div>;
}

function Hero() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const move = (event) => {
    if (event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - .5);
    pointerY.set((event.clientY - rect.top) / rect.height - .5);
  };
  const reset = () => { pointerX.set(0); pointerY.set(0); };
  return <section className="hero" id="home"><div className="hero-grain" /><div className="hero-wrap">
    <motion.div className="hero-copy" variants={stagger} initial="hidden" animate="show">
      <motion.div className="hero-overline" variants={fadeUp}><span className="live-pip" /> KATHMANDU, NEPAL <i>—</i> AVAILABLE FOR COLLABORATION</motion.div>
      <motion.p className="hero-identity" variants={fadeUp}>PORTFOLIO / 2026 <span>✳</span></motion.p>
      <motion.h1 variants={fadeUp}><span>{profile.name.split(" ")[0]}</span><em>{profile.name.split(" ").slice(1).join(" ")}.</em></motion.h1>
      <motion.div className="hero-title-row" variants={fadeUp}><p>{profile.title}<span> · </span>{profile.subtitle}</p><span className="hero-location"><MapPin size={14}/>{profile.location}</span></motion.div>
      <motion.p className="hero-intro" variants={fadeUp}>I build dependable digital systems with a considered eye for how they work, feel, and grow.</motion.p>
      <motion.div className="hero-actions" variants={fadeUp}><a className="btn btn-clay" href="#work">Explore selected work <ArrowDownRight size={16}/></a><a className="btn btn-line" href="#contact">Start a conversation <ArrowUpRight size={16}/></a></motion.div>
      <motion.div className="hero-proof" variants={fadeUp}><span>3+ YEARS EXPERIENCE</span><i /><span>FASTAPI / LARAVEL / PYTHON</span></motion.div>
    </motion.div>
    <motion.div className="hero-visual" onPointerMove={move} onPointerLeave={reset} initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, delay: .32 }}><HimalayanScene pointerX={pointerX} pointerY={pointerY}/></motion.div>
    <a className="hero-scroll" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15}/></a>
  </div></section>;
}

function AboutSection() {
  return <section className="section about-section" id="about"><div className="container"><SectionLabel number="01" eyebrow="A LITTLE ABOUT ME" title={<>Grounded in place.<br/><em>Built to connect.</em></>} detail="The work is technical. The intention is human: make complex systems easier to trust, use, and extend." light/><div className="about-layout">
    <Reveal className="portrait-wrap"><div className="portrait-frame"><img src={portrait} alt={`Portrait of ${profile.name}`} loading="lazy"/><span className="portrait-side-label">KATHMANDU / NEPAL</span><span className="portrait-corner">27°42′N</span></div><div className="portrait-caption"><span>PERSONAL PROFILE</span><i>01 — 01</i></div></Reveal>
    <Reveal className="about-story" delay={.12}><p className="story-kicker">ENGINEERING WITH INTENTION</p><p className="story-lead">I’m <b>{profile.name}</b>, a {profile.title.toLowerCase()} based in {profile.location}.</p><p>{profile.summary}</p><p>My approach is shaped by secure access, modular architecture, clear data models, and the everyday craft of making software maintainable.</p><div className="principles"><span>01 <b>Clarity before complexity</b></span><span>02 <b>Security built in</b></span><span>03 <b>Systems made to evolve</b></span></div><div className="about-meta"><div><small>LANGUAGES</small><b>{profile.languages.map((language) => language.name).join(" · ")}</b></div><div><small>EDUCATION</small><b>{education[0]?.degree}</b></div></div></Reveal>
  </div></div></section>;
}

function SkillsSection() {
  const [groupName, setGroupName] = useState("Backend");
  const [selected, setSelected] = useState("FastAPI");
  const group = stackGroups.find((item) => item.name === groupName) || stackGroups[0];
  const allSkills = useMemo(() => [...new Set(stackGroups.flatMap((item) => item.items))], []);
  const categoryFor = (skill) => stackGroups.find((item) => item.items.includes(skill))?.name || "Technology";
  return <section className="section stack-section" id="stack"><div className="container"><SectionLabel number="02" eyebrow="THE TECHNICAL LANDSCAPE" title={<>A toolkit for <em>real work.</em></>} detail="Tools and disciplines from my professional work—organized by how I use them, not by made-up scores."/>
    <div className="stack-layout"><Reveal className="stack-orbit-panel"><div className="orbit-caption"><span>CORE SYSTEM / 06 NODES</span><span>SELECT A NODE <ArrowDown size={12}/></span></div><div className="orbit-map"><svg viewBox="0 0 500 400" aria-hidden="true"><ellipse cx="250" cy="200" rx="205" ry="82"/><ellipse cx="250" cy="200" rx="205" ry="82" transform="rotate(60 250 200)"/><ellipse cx="250" cy="200" rx="205" ry="82" transform="rotate(-60 250 200)"/><path d="M250 200 77 200M250 200 164 52M250 200 336 52M250 200 423 200M250 200 336 348M250 200 164 348"/></svg><div className="orbit-core"><span>SG / KTM</span><b>BUILD<br/>WITH CARE</b><small>BACKEND SYSTEMS</small></div>{coreStack.map((skill, index) => <button type="button" key={skill} onClick={() => {setSelected(skill);setGroupName(categoryFor(skill));}} className={`orbit-tech orbit-tech-${index} ${selected===skill?"chosen":""}`} aria-label={`Explore ${skill}`}><i>{marks[skill]||skill.slice(0,2)}</i><span>{skill}</span></button>)}</div><div className="orbit-selection"><span>SELECTED TECHNOLOGY</span><b>{selected}</b><small>{categoryFor(selected)} <i>·</i> used in professional projects</small></div></Reveal>
    <Reveal className="stack-index" delay={.1}><div className="stack-tabs" role="tablist" aria-label="Technology categories">{stackGroups.map(({name,icon:Icon})=><button type="button" key={name} role="tab" aria-selected={groupName===name} className={groupName===name?"active":""} onClick={()=>{setGroupName(name);setSelected(stackGroups.find(x=>x.name===name)?.items[0]||"")}}><Icon size={15}/>{name}<ChevronDown size={13}/></button>)}</div><div className="stack-detail" role="tabpanel"><span className="stack-detail-index">TECHNOLOGY GROUP / {String(stackGroups.findIndex((item)=>item.name===groupName)+1).padStart(2,"0")}</span><h3>{group.name}</h3><p>{group.name === "Frontend integration" ? "Frontend technologies I use to connect backend services with product interfaces." : group.name === "Backend" ? "Frameworks and engineering practices for secure, maintainable application services." : `Capabilities and tools from my ${group.name.toLowerCase()} work.`}</p><div className="stack-nodes">{group.items.map((skill,index)=><button type="button" key={skill} className={selected===skill?"selected":""} onClick={()=>setSelected(skill)}><i>{marks[skill]||String(index+1).padStart(2,"0")}</i><span>{skill}</span><ArrowUpRight size={13}/></button>)}</div><div className="stack-footnote"><span>{allSkills.length} SKILLS / NO PROFICIENCY CLAIMS</span><i className="signal-dot"/></div></div></Reveal></div>
  </div></section>;
}

function PlaygroundSection() {
  const [accent, setAccent] = useState("moss");
  const [darkPreview, setDarkPreview] = useState(true);
  const [motionOn, setMotionOn] = useState(true);
  const [liked, setLiked] = useState(false);
  const [complete, setComplete] = useState(false);
  const [spot, setSpot] = useState({x:50,y:50});
  const moveSpot = (event) => { const rect=event.currentTarget.getBoundingClientRect();setSpot({x:((event.clientX-rect.left)/rect.width)*100,y:((event.clientY-rect.top)/rect.height)*100}); };
  return <section className="section playground-section" id="playground"><div className="container"><SectionLabel number="03" eyebrow="INTERACTION STUDIO" title={<>Small systems.<br/><em>Real responses.</em></>} detail="A working UI lab: adjust the palette, pause the motion, switch the surface, and try the controls."/>
    <Reveal className={`play-lab ${darkPreview?"preview-dark":"preview-light"} ${motionOn?"motion-running":"motion-paused"}`} data-accent={accent} style={{"--spot-x":`${spot.x}%`,"--spot-y":`${spot.y}%`}} onPointerMove={moveSpot}>
      <div className="play-lab-head"><div><span className="play-index">UI PLAYGROUND / 01</span><h3>Field notes, in motion.</h3></div><button className="motion-toggle" type="button" aria-pressed={motionOn} onClick={()=>setMotionOn(!motionOn)}><span className={`switch ${motionOn?"on":""}`} /> Motion {motionOn?"on":"paused"}</button></div>
      <div className="play-lab-grid"><div className="play-controls"><div className="control-group"><span>01 / ACCENT STUDY</span><div className="swatches" role="group" aria-label="Preview accent color">{[["moss","Himalayan moss"],["terracotta","Valley terracotta"],["glacier","Glacier blue"]].map(([name,label])=><button type="button" key={name} className={`swatch swatch-${name} ${accent===name?"active":""}`} aria-label={label} aria-pressed={accent===name} onClick={()=>setAccent(name)}/>)}</div></div><div className="control-group"><span>02 / SURFACE</span><button type="button" className="surface-toggle" onClick={()=>setDarkPreview(!darkPreview)}><i>{darkPreview?"◐":"◑"}</i>{darkPreview?"Night interface":"Ivory interface"}<ArrowRight size={14}/></button></div><div className="control-group"><span>03 / COMPONENT STATE</span><button type="button" className={`demo-action ${complete?"done":""}`} onClick={()=>setComplete(!complete)}>{complete?<><Check size={15}/> State updated</>:<>Run interaction <ArrowUpRight size={15}/></>}</button></div><p>Each control changes the preview. No decorative dead ends.</p></div>
        <div className={`component-preview ${liked?"is-liked":""}`}><div className="preview-top"><span><i className="signal-dot"/> COMPONENT / CARD-01</span><span>RESPONSIVE UI</span></div><div className="preview-art"><div className="preview-sun"/><svg viewBox="0 0 520 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 145 68 105 110 125 180 61 222 105 294 37 340 84 400 25 456 104 520 65v135H0Z"/><path d="M0 167 78 127 131 143 205 98 250 127 327 73 385 125 440 77 520 114v86H0Z"/></svg><span className="preview-art-note">VISUAL STUDY / HIMALAYAN RIDGE</span></div><div className="preview-card-copy"><span>INTERFACE / EXPERIMENT 01</span><h4>A little signal<br/>from Kathmandu.</h4><p>One palette, one interaction, one responsive component.</p><div className="preview-actions"><button type="button" onClick={()=>setComplete(!complete)}>{complete?"Revert state":"Try this state"}<ArrowRight size={14}/></button><button type="button" className="like-button" aria-label={liked?"Remove like":"Like this component"} aria-pressed={liked} onClick={()=>setLiked(!liked)}>{liked?"♥":"♡"}</button></div></div><div className="preview-coordinates">27°42′N / 85°19′E</div></div>
      </div>
      <div className="play-lab-footer"><span>LIVE COMPONENT PREVIEW</span><span>HOVER / CLICK / EXPLORE <ArrowUpRight size={12}/></span></div>
    </Reveal>
  </div></section>;
}

function ProjectArtwork({ project, index, color }) {
  return <div className="project-artwork" style={{"--project-accent":color}}><img className="project-artwork-image" src={project.image} alt={project.imageAlt} loading="lazy"/><div className="artwork-top"><span>CASE / {String(index+1).padStart(2,"0")}</span><span>{project.category.toUpperCase()}</span></div><span className="artwork-caption">ILLUSTRATIVE COVER · NOT PRODUCT UI</span></div>;
}

function ProjectModal({ project, index, color, onClose }) {
  const reduce = useReducedMotion();
  const closeButton = useRef(null);
  useEffect(()=>{const old=document.body.style.overflow;const previous=document.activeElement;document.body.style.overflow="hidden";closeButton.current?.focus();const key=(e)=>{if(e.key==="Escape")onClose();};window.addEventListener("keydown",key);return()=>{document.body.style.overflow=old;window.removeEventListener("keydown",key);previous?.focus?.()}},[onClose]);
  return <motion.div className="modal-scrim" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={(e)=>{if(e.target===e.currentTarget)onClose()}}><motion.article className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={reduce?false:{opacity:0,y:24,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:14,scale:.98}} transition={{duration:.35}}><button ref={closeButton} className="modal-close" type="button" onClick={onClose} aria-label="Close project details"><X size={19}/></button><ProjectArtwork project={project} index={index} color={color}/><div className="modal-content"><span className="project-category">{project.category}</span><h2 id="modal-title">{project.title}</h2><p>{project.description}</p><div className="modal-two-col"><div><span className="modal-kicker">CONTRIBUTIONS</span><ul>{project.contributions.map((item)=><li key={item}>{item}</li>)}</ul></div><div><span className="modal-kicker">TECHNOLOGIES</span><div className="modal-tech">{project.tech.map((item)=><span key={item}>{item}</span>)}</div></div></div><div className="modal-links">{project.github&&<a href={project.github} target="_blank" rel="noreferrer">Source repository <GitBranch size={15}/></a>}{project.live&&<a href={project.live} target="_blank" rel="noreferrer">Live product <ExternalLink size={15}/></a>}{!project.github&&!project.live&&<span>Project URLs are not included in the verified portfolio data.</span>}</div></div></motion.article></motion.div>;
}

function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);
  const close=()=>setActiveProject(null);
  return <section className="section work-section" id="work"><div className="container"><SectionLabel number="04" eyebrow="SELECTED WORK / SYSTEMS" title={<>Built for people.<br/><em>Made to hold up.</em></>} detail="A selection of backend and product work from my portfolio. Open a card for its project notes."/>
    <motion.div className="projects-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{once:true,amount:.08}}>{projects.map((project,index)=><motion.article className="project-card" key={project.id} variants={fadeUp} style={{"--project-accent":projectColors[index%projectColors.length]}} whileHover={{y:-7,transition:{duration:.25}}}><button className="project-card-button" type="button" onClick={()=>setActiveProject({project,index})} aria-label={`View case study: ${project.title}`}><ProjectArtwork project={project} index={index} color={projectColors[index%projectColors.length]}/><div className="project-card-content"><div className="project-category-row"><span>{project.category}</span><span>0{index+1} / 06</span></div><h3>{project.title}<ArrowUpRight size={17}/></h3><p>{project.description}</p><div className="project-tags">{project.tech.slice(0,4).map((item)=><span key={item}>{item}</span>)}</div><span className="case-link">OPEN PROJECT NOTES <ArrowRight size={14}/></span></div></button></motion.article>)}</motion.div>
  </div><AnimatePresence>{activeProject&&<ProjectModal project={activeProject.project} index={activeProject.index} color={projectColors[activeProject.index%projectColors.length]} onClose={close}/>}</AnimatePresence></section>;
}

function JourneySection() {
  const items=[...experience.map((item)=>({...item,type:"EXPERIENCE"})),...education.map((item)=>({role:item.degree,company:item.institution,location:item.location,period:item.period,responsibilities:[],tech:[],type:"EDUCATION"}))];
  return <section className="section journey-section" id="journey"><div className="container"><SectionLabel number="05" eyebrow="CAREER / EDUCATION" title={<>A practice, <em>in progress.</em></>} detail="A real timeline of professional experience and education, rooted in Kathmandu." light/><div className="journey-list"><motion.div className="journey-spine" initial={{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true,amount:.15}} transition={{duration:1.35,ease:[.22,1,.36,1]}}/>{items.map((item,index)=><JourneyItem key={`${item.company}-${item.period}`} item={item} index={index}/>)}</div>
    {certifications.length>0&&<Reveal className="cert-row"><span>CERTIFICATIONS</span><div>{certifications.map((item)=><span className="cert-chip" key={item.title}><i/> {item.title}</span>)}</div></Reveal>}
  </div></section>;
}

function JourneyItem({item,index}) {
  return <motion.article className="journey-item" initial={{opacity:0,x:20}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.35}} transition={{duration:.55,delay:index*.1}}><div className="journey-node"><i/></div><div className="journey-period">{item.period}<span>{item.type}</span></div><div className="journey-card"><div className="journey-card-head"><div><h3>{item.role}</h3><p>{item.company} <i>·</i> {item.location}</p></div><span>0{index+1}</span></div>{item.responsibilities.length>0&&<ul>{item.responsibilities.slice(0,3).map((detail)=><li key={detail}>{detail}</li>)}</ul>}{item.tech.length>0&&<div className="journey-tags">{item.tech.map((tech)=><span key={tech}>{tech}</span>)}</div>}</div></motion.article>;
}

function NepalSection() {
  const [scene,setScene]=useState("range");
  return <section className="section nepal-section" id="nepal"><div className="container"><SectionLabel number="06" eyebrow="LOCAL PERSPECTIVE / 27.7172° N" title={<>Made here.<br/><em>Connected everywhere.</em></>} detail="A place is more than a backdrop. Kathmandu shapes the perspective I bring to building digital systems."/>
    <div className="nepal-feature"><Reveal className="nepal-copy"><span className="nepal-kicker"><MapPin size={14}/> {profile.location.toUpperCase()}</span><h3>From the valley,<br/>with a wider view.</h3><p>My work begins in Kathmandu and reaches through software: reliable APIs, secure access, thoughtful data models, and tools built to serve real product needs.</p><div className="nepal-facts"><span><small>LOCAL TIME</small><b>NPT / UTC+5:45</b></span><span><small>WORKING LANGUAGE</small><b>{profile.languages.map(x=>x.name).join(" · ")}</b></span></div><a href="#contact" className="nepal-link">Connect with me <ArrowUpRight size={15}/></a></Reveal>
    <Reveal className={`heritage-visual scene-${scene}`} delay={.12}><div className="heritage-controls" role="tablist" aria-label="Nepal visual studies">{[["range","Himalaya"],["valley","Valley"],["courtyard","Courtyard"]].map(([key,label])=><button type="button" role="tab" aria-selected={scene===key} className={scene===key?"active":""} key={key} onClick={()=>setScene(key)}>{label}</button>)}</div><svg className="heritage-svg" viewBox="0 0 800 470" preserveAspectRatio="xMidYMid meet" aria-label="Illustrative study of Himalayan ridges and Kathmandu Valley rooflines">
      <defs><linearGradient id="heritage-sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#273033"/><stop offset="1" stopColor="#54463f"/></linearGradient><pattern id="brick-grid" width="20" height="12" patternUnits="userSpaceOnUse"><path d="M0 0H20M0 6H20M10 0V6M0 6V12" fill="none" stroke="#ddac84" strokeOpacity=".22" strokeWidth=".7"/></pattern></defs>
      <rect width="800" height="470" fill="url(#heritage-sky)"/><circle className="heritage-moon" cx="620" cy="125" r="35"/>
      <g className="heritage-range"><path d="M0 276 98 189 155 219 265 102 325 177 413 61 470 157 556 85 615 166 691 117 800 220V470H0Z" fill="#818d81" fillOpacity=".55"/><path d="M0 325 113 236 179 274 291 172 347 225 453 128 504 209 601 150 676 245 731 193 800 256V470H0Z" fill="#56655e"/><path d="m265 102 60 75-39-16-28 15-19-16zm148-41 57 96-36-20-26 15-19-20zm143 24 59 81-34-18-29 12-18-15" fill="#eee9d8" fillOpacity=".72"/></g>
      <g className="heritage-valley"><path d="M0 321 800 291V470H0Z" fill="#684d40"/><path d="M0 345 800 317V470H0Z" fill="url(#brick-grid)"/><g className="temple-silhouette" fill="#be7654" stroke="#dfaa7f" strokeWidth="2"><path d="M510 321h160v-12H510zM522 309l-18-12h196l-18 12zM530 297h122v-9H530zM540 288l-16-11h154l-16 11zM548 277h106v-8H548zM555 269l-13-10h132l-13 10zM565 259h84v-7h-84zM606 252v-31h5v31zm-34 69v-39h5v39zm64 0v-39h5v39z"/></g><path className="wood-window" d="M100 365h112v76H100zm17 12v52m19-52v52m19-52v52m19-52v52M100 391h112"/></g>
      <g className="heritage-courtyard"><path d="M270 362h240v108H270z" fill="#303a37" stroke="#c9906c" strokeWidth="2"/><path d="M255 362h270l-30-27H285z" fill="#927155"/><path d="M323 335v-52m-45 52h135m-118-9 12-13h107l12 13m-109-13 14-13h79l14 13" fill="none" stroke="#d8a875" strokeWidth="3"/><path d="M350 282v-20m-19 20 19-31 19 31" fill="none" stroke="#d8a875" strokeWidth="3"/><path d="M378 389h30v81h-30z" fill="#b45f44"/><circle cx="393" cy="377" r="13" fill="#c7a56c"/></g>
      <path className="heritage-contours" d="M20 395c105-62 183 13 280-26s162-46 254-9 137 19 226-14M-5 425c113-58 190 17 302-22s160-35 255 0 155 10 254-19M20 455c106-48 185 16 292-18s175-27 263 3 151 11 242-16"/><g className="heritage-point"><circle cx="393" cy="377" r="7"/><circle cx="393" cy="377" r="18"/></g>
      <text x="32" y="48">KATHMANDU VALLEY / VISUAL STUDY</text><text x="32" y="68">HIMALAYAN FOOTHILLS · NEPAL</text><text x="687" y="438">27°42′N</text>
    </svg><div className="heritage-caption"><span>{scene==="range"?"RIDGELINE / ATMOSPHERIC LAYERS":scene==="valley"?"VALLEY / ROOFLINE STUDY":"COURTYARD / SPATIAL STUDY"}</span><span>ILLUSTRATIVE, NOT A SPECIFIC MONUMENT</span></div></Reveal></div>
  </div></section>;
}

function ContactSection() {
  const [form,setForm]=useState({name:"",email:"",objective:"API build",message:""});
  const [sent,setSent]=useState(false);
  const submit=(event)=>{event.preventDefault();const subject=encodeURIComponent(`Portfolio inquiry: ${form.objective}`);const body=encodeURIComponent(`Hello Sagar,\n\n${form.message}\n\nName: ${form.name}\nEmail: ${form.email}\nObjective: ${form.objective}`);window.location.href=`mailto:${profile.email}?subject=${subject}&body=${body}`;setSent(true);};
  return <section className="section contact-section" id="contact"><div className="container"><Reveal className="contact-head"><span>LET’S BUILD SOMETHING USEFUL</span><h2>Good work starts<br/>with <em>a conversation.</em></h2><p>Have a system to shape, an opportunity, or a question? Reach me in Kathmandu or from wherever you are.</p></Reveal><div className="contact-layout"><Reveal className="contact-details"><div className="contact-coordinate"><span>LOCAL NODE</span><b><i className="signal-dot"/> {profile.location}</b><small>NPT / UTC+5:45</small></div><a className="contact-email" href={`mailto:${profile.email}`}><span>WRITE DIRECTLY</span><b>{profile.email}</b><ArrowUpRight size={19}/></a><div className="contact-socials"><a href={profile.github} target="_blank" rel="noreferrer"><GitBranch size={15}/> GitHub <ArrowUpRight size={12}/></a><a href={profile.linkedin} target="_blank" rel="noreferrer"><ArrowUpRight size={15}/> LinkedIn <ArrowUpRight size={12}/></a></div><a className="resume-link" href={profile.resumeUrl} download="Sagar_Gautam_CV.pdf">Download my CV <ArrowDown size={14}/></a></Reveal>
    <Reveal><form className="contact-form" onSubmit={submit}><div className="form-title"><span>CONTACT / 01</span><b>Tell me what you have in mind.</b></div><label>Your name<input required autoComplete="name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name"/></label><label>Email address<input required type="email" autoComplete="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label><fieldset><legend>What are you looking to build?</legend><div className="objective-buttons">{["API build","Web product","Collaboration"].map(value=><label key={value} className={form.objective===value?"selected":""}><input type="radio" name="objective" value={value} checked={form.objective===value} onChange={e=>setForm({...form,objective:e.target.value})}/>{value}</label>)}</div></fieldset><label>Your message<textarea rows="4" required value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="Share the idea, context, and what a good outcome looks like."/></label><button className="btn btn-clay form-send" type="submit">{sent?"Open your email app":"Send an email"}{sent?<Check size={16}/>:<Send size={15}/>}</button><small className="form-note">OPENS YOUR EMAIL APP WITH THE DETAILS FILLED IN</small></form></Reveal>
  </div></div></section>;
}

function App() {
  const [loading,setLoading]=useState(true);
  const [menuOpen,setMenuOpen]=useState(false);
  const finishLoading=()=>setLoading(false);
  const reduce=useReducedMotion();
  return <><AnimatePresence>{loading&&!reduce&&<Preloader key="preloader" onFinish={finishLoading}/>}</AnimatePresence><header className="site-header"><a className="wordmark" href="#home" aria-label="Sagar Gautam home"><span>SG</span><i>·</i></a><div className="header-location"><span className="signal-dot"/>{profile.location.toUpperCase()} <i>27°42′N</i></div><nav className={menuOpen?"main-nav open":"main-nav"} aria-label="Main navigation">{navigation.map(([label,id])=><a href={`#${id}`} key={id} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav><a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={14}/></a><button className="menu-button" type="button" aria-label={menuOpen?"Close menu":"Open menu"} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</button></header>
    <main><Hero/><AboutSection/><SkillsSection/><PlaygroundSection/><ProjectsSection/><JourneySection/><NepalSection/><ContactSection/></main><footer className="site-footer"><div className="footer-top"><a href="#home" className="footer-mark">SG<i>.</i></a><p>Built with care in {profile.location}.</p><a href="#home" className="back-top">BACK TO THE BEGINNING <ArrowUpRight size={14}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><div>{navigation.slice(0,4).map(([label,id])=><a href={`#${id}`} key={id}>{label}</a>)}</div><span>27°42′N / 85°19′E</span></div></footer></>;
}

export default App;
