import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ArrowDown, ArrowDownRight, ArrowRight, ArrowUpRight, Check, ExternalLink, GitBranch, MapPin, Menu, Send, X } from "lucide-react";
import { profile } from "./data/profile";
import { experience, education, certifications } from "./data/experience";
import { projects } from "./data/projects";
import portrait from "./assets/Image.jpeg";
import SectionHeading from "./components/SectionHeading.jsx";
import Playground from "./components/Playground.jsx";

const navigation = [["About", "about"], ["Stack", "stack"], ["Playground", "playground"], ["Work", "work"], ["Journey", "journey"], ["Nepal", "nepal"], ["Contact", "contact"]];
const skillUniverse = [
  { name: "FastAPI", category: "Backend", mark: "FA", description: "Python framework for building APIs.", usage: "Used to develop and maintain RESTful APIs and backend services.", projects: ["Food Delivery Platform", "Event Scheduling System"], source: ["experience", "projects"] },
  { name: "Laravel", category: "Backend", mark: "La", description: "PHP framework for web application backends.", usage: "Used for API development, MVC applications, and production backend features.", projects: ["Zyabaa E-commerce Platform", "Soaltee Hotel Platform"], source: ["experience", "projects"] },
  { name: "RESTful APIs", category: "Backend", mark: "API", description: "HTTP interfaces organized around resources and standard methods.", usage: "Built and maintained APIs for production applications and project workflows.", projects: ["Event Scheduling System", "Zyabaa E-commerce Platform"], source: ["experience", "projects"] },
  { name: "SQLAlchemy 2.0", category: "Backend", mark: "SA", description: "Python SQL toolkit and object-relational mapper.", usage: "Listed in the Food Delivery Platform technology stack.", projects: ["Food Delivery Platform"], source: ["projects"] },
  { name: "Authentication & RBAC", category: "Backend", mark: "RBAC", description: "JWT authentication and role-based authorization for protected application access.", usage: "Implemented authentication and permission systems in backend work.", projects: ["Enterprise Dynamic RBAC System", "Event Scheduling System"], source: ["experience", "projects"] },
  { name: "Python", category: "Languages", mark: "Py", description: "Programming language used across the backend portfolio.", usage: "Used with FastAPI for API and backend system development.", projects: ["Food Delivery Platform", "Event Scheduling System"], source: ["profile", "projects"] },
  { name: "PHP", category: "Languages", mark: "php", description: "Programming language used with Laravel applications.", usage: "Used for Laravel backend development and application features.", projects: ["Zyabaa E-commerce Platform", "Soaltee Hotel Platform"], source: ["experience", "projects"] },
  { name: "PostgreSQL", category: "Databases", mark: "PG", description: "Relational database used across backend systems.", usage: "Used for application data, schemas, and backend workflows.", projects: ["Event Scheduling System", "Enterprise Dynamic RBAC System"], source: ["experience", "projects"] },
  { name: "MySQL", category: "Databases", mark: "My", description: "Relational database used with Laravel applications.", usage: "Used for application data, relationships, and backend modules.", projects: ["Soaltee Hotel Platform", "Zyabaa E-commerce Platform"], source: ["experience", "projects"] },
  { name: "React", category: "Frontend", mark: "Re", description: "Component-based library for building user interfaces.", usage: "Included in the verified frontend integration skills.", projects: [], source: ["skills"] },
  { name: "Next.js", category: "Frontend", mark: "N", description: "React framework for web applications.", usage: "Used alongside Laravel APIs in a full-stack project.", projects: ["Zyabaa E-commerce Platform"], source: ["projects"] },
  { name: "Docker", category: "Tools", mark: "Dk", description: "Container tooling for packaging and running applications.", usage: "Included in the professional backend stack and current role technologies.", projects: [], source: ["profile", "experience"] },
  { name: "Git", category: "Tools", mark: "Git", description: "Version control used in collaborative development workflows.", usage: "Used in team workflows during backend development.", projects: [], source: ["experience"] },
  { name: "Linux", category: "Tools", mark: "Lx", description: "Operating system environment included in the technical skills inventory.", usage: "Listed among development and infrastructure tools.", projects: [], source: ["skills"] },
  { name: "Backend architecture", category: "Architecture", mark: "BA", description: "Structuring backend services into maintainable systems.", usage: "Experience and profile data describe modular and scalable backend architecture.", projects: ["Event Scheduling System", "Enterprise Dynamic RBAC System"], source: ["profile", "experience", "projects"] },
  { name: "API design", category: "Architecture", mark: "AD", description: "Designing API boundaries, access, and application workflows.", usage: "Supported by REST API development and secure API design competencies.", projects: ["Event Scheduling System", "Zyabaa E-commerce Platform"], source: ["skills", "experience", "projects"] },
  { name: "Database modeling", category: "Architecture", mark: "DM", description: "Organizing relational data and application relationships.", usage: "Project and experience records cite schema design, database relationships, and data modeling.", projects: ["Food Delivery Platform", "Enterprise Dynamic RBAC System"], source: ["experience", "projects"] },
  { name: "Access control", category: "Architecture", mark: "AC", description: "Defining roles and permissions for protected application features.", usage: "JWT authentication and RBAC authorization are documented in experience and project data.", projects: ["Enterprise Dynamic RBAC System", "Event Scheduling System"], source: ["experience", "projects"] },
];
const skillCategoriesForExplorer = ["All", "Backend", "Languages", "Databases", "Frontend", "Tools", "Architecture"];
const projectColors = ["#c76d4d", "#85a896", "#d4a84f", "#698db2", "#b87355", "#8a9f75"];
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const heroSequence = { hidden: {}, show: { transition: { delayChildren: 0.1, staggerChildren: 0.11 } } };
const heroReveal = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0, transition: { duration: 0.58, ease: [0.22, 1, 0.36, 1] } } };
const nameReveal = { hidden: { opacity: 0, y: "105%" }, show: { opacity: 1, y: 0, transition: { duration: 0.82, ease: [0.22, 1, 0.36, 1] } } };

function Reveal({ children, className = "", delay = 0, as: Tag = "div", ...props }) {
  const reduce = useReducedMotion();
  const Component = motion[Tag] || motion.div;
  return <Component className={className} variants={fadeUp} initial={reduce ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.13 }} transition={{ delay }} {...props}>{children}</Component>;
}

function Preloader({ onFinish }) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) { onFinish(); return; }
    const timer = window.setTimeout(onFinish, 480);
    return () => window.clearTimeout(timer);
  }, [onFinish, reduce]);
  return <motion.div className="preloader" role="status" aria-label={`Introducing ${profile.name}`} initial={{ opacity: 1 }} exit={{ opacity: 0, y: -12, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }}><div className="preloader-mark" aria-hidden="true">SG</div><div className="preloader-name"><span>{profile.name}</span></div></motion.div>;
}

function HimalayanScene({ pointerX, pointerY }) {
  const reduce = useReducedMotion();
  const farX = useTransform(pointerX, [-0.5, 0.5], [5, -5]);
  const middleX = useTransform(pointerX, [-0.5, 0.5], [-8, 8]);
  const nearX = useTransform(pointerX, [-0.5, 0.5], [-12, 12]);
  const depthY = useTransform(pointerY, [-0.5, 0.5], [4, -4]);
  return <div className="himalaya-scene" role="img" aria-label="Illustrative layered Himalayan ridgelines with a Kathmandu location marker; not real elevation data">
    <div className="scene-label scene-label-top"><span className="scene-coordinate-dot" aria-hidden="true" /> <span>KATHMANDU VALLEY</span><i>27°42′ N / 85°19′ E</i></div>
    <svg className="mountain-svg" viewBox="0 0 760 500" preserveAspectRatio="xMidYMid meet" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="peak-atmosphere" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#a9b49a" stopOpacity=".2"/><stop offset="1" stopColor="#a9b49a" stopOpacity="0"/></linearGradient>
        <linearGradient id="peak-mid" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#8b9982" stopOpacity=".52"/><stop offset="1" stopColor="#67776a" stopOpacity=".22"/></linearGradient>
        <linearGradient id="peak-terracotta" x1="0" x2="1" y1="0" y2="1"><stop stopColor="#bf7659" stopOpacity=".76"/><stop offset="1" stopColor="#8c5141" stopOpacity=".58"/></linearGradient>
        <linearGradient id="scene-fade" x1="0" x2="1" y1="0" y2="0"><stop stopColor="#20231f" stopOpacity=".7"/><stop offset=".22" stopColor="#20231f" stopOpacity="0"/><stop offset=".82" stopColor="#20231f" stopOpacity="0"/><stop offset="1" stopColor="#20231f" stopOpacity=".66"/></linearGradient>
        <pattern id="terrain-grid" width="52" height="52" patternUnits="userSpaceOnUse"><path d="M52 0H0V52" fill="none" stroke="#e8e2d3" strokeOpacity=".08" strokeWidth=".7"/><circle cx="0" cy="0" r="1.1" fill="#e8e2d3" fillOpacity=".18"/></pattern>
      </defs>
      <rect className="terrain-grid" width="760" height="500" fill="url(#terrain-grid)" />
      <motion.g style={reduce ? undefined : { x: farX, y: depthY }} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .9, delay: .25 }}>
        <path d="M0 290 68 246 123 270 204 183 260 226 337 123 382 178 457 87 515 178 574 129 642 214 699 179 760 226V500H0Z" fill="url(#peak-atmosphere)" />
        <path className="ridge-line ridge-one" d="m8 291 60-45 55 24 81-87 56 43 77-103 45 55 75-91 58 91 59-49 68 85 57-35 65 47" />
      </motion.g>
      <motion.g style={reduce ? undefined : { x: middleX }} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .4 }}>
        <path d="M0 340 78 296 145 321 226 230 279 274 368 177 411 232 496 141 554 236 617 186 684 273 733 237 760 256V500H0Z" fill="url(#peak-mid)" />
        <path className="ridge-line ridge-two" d="m2 340 76-44 67 25 81-91 53 44 89-97 43 55 85-91 58 95 63-50 67 87 49-36 27 19" />
      </motion.g>
      <motion.g style={reduce ? undefined : { x: nearX }} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: .55 }}>
        <path d="M0 385 97 323 154 354 252 263 307 314 393 211 438 278 526 174 584 276 646 224 707 310 756 280 760 500H0Z" fill="url(#peak-terracotta)" />
        <path className="ridge-line ridge-three" d="m2 385 95-62 57 31 98-91 55 51 86-103 45 67 88-104 58 102 62-52 61 86 49-30" />
      </motion.g>
      <g className="terrain-contours">
        <path className="terrain-contour terrain-contour-a" d="M-12 352c92-39 125 30 219 13s133-77 222-38 154 40 247-6 75-22 105-12" />
        <path className="terrain-contour terrain-contour-b" d="M-12 375c96-35 129 29 222 12s130-70 224-34 153 39 248-5 72-21 103-11" />
        <path className="terrain-contour terrain-contour-c" d="M-12 402c101-39 134 26 229 8s133-67 225-29 150 37 246-7 70-20 97-10" />
        <path className="terrain-contour terrain-contour-d" d="M-12 431c104-37 137 24 234 5s134-62 228-25 146 36 241-8 68-18 94-9" />
        <path className="terrain-contour terrain-contour-e" d="M-12 460c107-34 142 22 239 2s136-56 230-20 142 34 237-8 67-18 91-9" />
      </g>
      <rect width="760" height="500" fill="url(#scene-fade)" />
      <motion.g className="scene-signal" initial={reduce ? false : { opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .92, duration: .5 }}>
        <circle className="signal-ring signal-ring-a" cx="533" cy="309" r="13"/><circle className="signal-ring signal-ring-b" cx="533" cy="309" r="25"/><circle className="signal-core" cx="533" cy="309" r="3.5"/>
      </motion.g>
      <path className="elevation-tick" d="M80 270v-16m0 21v-3m33-13v-8m0 13v-3m34 5v-18m0 23v-3m507-27v-14m0 19v-3m35 15v-8m0 13v-3" />
      <text x="553" y="302" className="map-text">KATHMANDU</text><text x="553" y="319" className="map-subtext">NPT · UTC+5:45</text>
      <path className="coordinate-route" d="M168 345C272 284 347 365 425 325S488 289 533 309" />
    </svg>
    <div className="scene-label scene-label-bottom"><span>HIMALAYAN RIDGELINE / CONCEPT STUDY</span><b>27°42′ N · 85°19′ E</b><i>ILLUSTRATIVE · NO ELEVATION SCALE</i></div>
    <div className="scene-index" aria-hidden="true">01 <i /> TERRAIN STUDY</div>
  </div>;
}

function Hero() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const reduce = useReducedMotion();
  const mobileViewport = useRef(window.matchMedia("(max-width: 760px)"));
  const move = (event) => {
    if (reduce || mobileViewport.current.matches || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - .5);
    pointerY.set((event.clientY - rect.top) / rect.height - .5);
  };
  const reset = () => { pointerX.set(0); pointerY.set(0); };
  return <section className="hero" id="home" aria-labelledby="hero-title"><div className="hero-grain" aria-hidden="true" /><div className="hero-wrap">
    <motion.div className="hero-copy" variants={heroSequence} initial={reduce ? false : "hidden"} animate="show">
      <motion.div className="hero-overline" variants={heroReveal}><span className="live-pip" aria-hidden="true" /> <span>{profile.location.toUpperCase()}</span><i aria-hidden="true">/</i><span>BACKEND SYSTEMS</span></motion.div>
      <motion.p className="hero-identity" variants={heroReveal}>PORTFOLIO / 2026 <span aria-hidden="true">✳</span></motion.p>
      <h1 className="hero-name" id="hero-title" aria-label={profile.name}><span className="hero-name-mask"><motion.span variants={reduce ? undefined : nameReveal}>{profile.name.split(" ")[0]}</motion.span></span><span className="hero-name-mask hero-name-second"><motion.em variants={reduce ? undefined : nameReveal}>{profile.name.split(" ").slice(1).join(" ")}</motion.em></span></h1>
      <motion.div className="hero-title-row" variants={heroReveal}><p><strong>{profile.title}</strong><span> / </span>{profile.subtitle}</p><span className="hero-location"><MapPin size={14} aria-hidden="true"/>{profile.location}</span></motion.div>
      <motion.p className="hero-intro" variants={heroReveal}>{profile.summary.split(".")[0]}.</motion.p>
      <motion.div className="hero-actions" variants={heroReveal}><a className="btn btn-clay" href="#work">Explore selected work <ArrowDownRight size={16} aria-hidden="true"/></a><a className="btn btn-line" href="#contact">Start a conversation <ArrowUpRight size={16} aria-hidden="true"/></a></motion.div>
      <motion.div className="hero-proof" variants={heroReveal}><span>3+ YEARS EXPERIENCE</span><i aria-hidden="true"/><span>FASTAPI / LARAVEL / POSTGRESQL</span></motion.div>
    </motion.div>
    <motion.div className="hero-visual" onPointerMove={move} onPointerLeave={reset} initial={reduce ? false : { opacity: 0, scale: .985 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: reduce ? 0 : .35, ease: [.22, 1, .36, 1] }}><HimalayanScene pointerX={pointerX} pointerY={pointerY}/></motion.div>
    <a className="hero-scroll" href="#about"><span>SCROLL TO EXPLORE</span><ArrowDown size={15} aria-hidden="true"/></a>
  </div></section>;
}

function AboutSection() {
  return <section className="section about-section" id="about" aria-label="About Sagar Gautam"><div className="container about-container">
    <svg className="about-contours" viewBox="0 0 720 620" preserveAspectRatio="none" aria-hidden="true" focusable="false"><path d="M725 20c-86 40-65 103-158 137s-181 18-215 87 7 119-62 150S97 406-12 468"/><path d="M739 48c-93 42-73 100-163 131s-170 22-207 87 7 113-66 146S91 438-21 500"/><path d="M744 77c-97 39-80 97-168 126s-159 24-199 88 7 107-69 141S87 470-28 532"/><path d="M748 108c-100 37-87 92-173 120s-149 27-191 89 7 101-72 136S83 502-35 564"/><path d="M753 141c-103 34-94 87-177 113s-139 29-183 91 7 94-75 130S79 534-42 596"/></svg>
    <div className="about-layout">
      <Reveal className="portrait-wrap"><div className="portrait-frame"><img src={portrait} alt={`Portrait of ${profile.name}`} loading="lazy" decoding="async"/><span className="portrait-side-label">{profile.location.toUpperCase()}</span><span className="portrait-corner">27°42′ N / 85°19′ E</span><span className="portrait-frame-index" aria-hidden="true">01 / PROFILE</span></div><div className="portrait-caption"><span>BASED IN KATHMANDU</span><i>NEPAL · NPT</i></div></Reveal>
      <div className="about-story">
        <SectionHeading number="01" eyebrow="A LITTLE ABOUT ME" title={<>Grounded in<br/><em>Kathmandu.</em></>} detail="Thoughtful backend engineering for products that need to be clear, dependable, and ready to grow."/>
        <Reveal className="about-prose" delay={.08}><p className="story-lead">I’m <b>{profile.name}</b>, a {profile.title.toLowerCase()} based in {profile.location}.</p><p>My work centers on RESTful APIs and backend systems for production web applications. I work with FastAPI and Laravel, using Python, PostgreSQL, and MySQL across the systems I build.</p><p>I care about the details that make software easier to trust and maintain: clear service boundaries, secure access, and data models that teams can understand as a product evolves.</p><p>For me, good engineering starts with the practical problem in front of a team and leaves behind a system they can continue to work with.</p></Reveal>
        <Reveal className="about-meta" delay={.16}><div><small>CORE STACK</small><b>{profile.subtitle}</b></div><div><small>LANGUAGES</small><b>{profile.languages.map((language) => language.name).join(" · ")}</b></div><div><small>EDUCATION</small><b>{education[0]?.degree}</b></div></Reveal>
      </div>
    </div>
  </div></section>;
}

function SkillsSection() {
  const [groupName, setGroupName] = useState("All");
  const [selected, setSelected] = useState("FastAPI");
  const reduce = useReducedMotion();
  const shownSkills = groupName === "All" ? skillUniverse : skillUniverse.filter((skill) => skill.category === groupName);
  const selectedSkill = skillUniverse.find((skill) => skill.name === selected) || skillUniverse[0];
  const selectCategory = (category) => {
    setGroupName(category);
    setSelected((current) => skillUniverse.find((skill) => category === "All" || skill.category === category)?.name || current);
  };
  const nodePosition = (index, count) => {
    const ringSize = Math.ceil(count / 2);
    const ring = Math.floor(index / ringSize);
    const indexInRing = index % ringSize;
    const nodesInRing = Math.min(ringSize, count - ring * ringSize);
    const angle = (-Math.PI / 2) + (indexInRing / nodesInRing) * Math.PI * 2 + ring * .12;
    const radiusX = ring === 0 ? .415 : .235;
    const radiusY = ring === 0 ? .405 : .225;
    return { x: 50 + Math.cos(angle) * radiusX * 100, y: 50 + Math.sin(angle) * radiusY * 100 };
  };
  return <section className="section stack-section" id="stack"><div className="container"><SectionHeading number="02" eyebrow="THE TECHNICAL LANDSCAPE" title={<>A toolkit for <em>real work.</em></>} detail="Tools and disciplines from my professional work—organized by how I use them, not by made-up scores."/>
    <Reveal className="skill-category-nav" delay={.04}><div className="skill-category-list" role="group" aria-label="Filter technologies by category">{skillCategoriesForExplorer.map((category,index)=><button type="button" key={category} className={groupName===category?"active":""} aria-pressed={groupName===category} onClick={()=>selectCategory(category)}><span>{String(index+1).padStart(2,"0")}</span>{category}</button>)}</div></Reveal>
    <div className="stack-layout">
      <Reveal className="stack-orbit-panel" aria-label="Interactive technology constellation">
        <div className="orbit-caption"><span>TECHNOLOGY UNIVERSE / {String(shownSkills.length).padStart(2,"0")} NODES</span><span>SELECT A TECHNOLOGY <ArrowDown size={12} aria-hidden="true"/></span></div>
        <div className="orbit-map" role="group" aria-label={`${groupName} technology nodes`}>
          <svg className="orbit-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><circle className="orbit-ring orbit-ring-outer" cx="50" cy="50" r="41"/><circle className="orbit-ring orbit-ring-inner" cx="50" cy="50" r="23"/>{shownSkills.map((skill,index)=>{const point=nodePosition(index,shownSkills.length);return <motion.line key={skill.name} className={selected===skill.name?"orbit-link is-active":"orbit-link"} x1="50" y1="50" x2={point.x} y2={point.y} initial={reduce?false:{pathLength:0,opacity:0}} animate={{pathLength:1,opacity:selected===skill.name?.72:.3}} transition={{duration:reduce?0:.4,delay:reduce?0:index*.018}}/>;})}</svg>
          <motion.div className="orbit-core" layout transition={reduce?{duration:0}:{duration:.35}}><span>SG / KTM</span><b>BACKEND<br/>ENGINEERING</b><small>CONNECTED SYSTEMS</small></motion.div>
          <AnimatePresence mode="popLayout" initial={false}>{shownSkills.map((skill,index)=>{const point=nodePosition(index,shownSkills.length);return <motion.button layout key={skill.name} type="button" className={`orbit-tech ${selected===skill.name?"chosen":""}`} style={{left:`${point.x}%`,top:`${point.y}%`}} onClick={()=>setSelected(skill.name)} aria-label={`Select ${skill.name}, ${skill.category}`} aria-pressed={selected===skill.name} initial={reduce?false:{opacity:0,scale:.88}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:.88}} transition={reduce?{duration:0}:{duration:.28,delay:index*.012}}><i aria-hidden="true">{skill.mark}</i><span>{skill.name}</span></motion.button>;})}</AnimatePresence>
        </div>
        <div className="orbit-footnote"><span>SELECTED NODE CONNECTS TO THE CORE</span><span>NO PROFICIENCY SCORES</span></div>
      </Reveal>
      <Reveal className="stack-index" delay={.1}>
        <div className="skill-detail-kicker"><span>SELECTED TECHNOLOGY</span><span>{String(skillUniverse.findIndex((skill)=>skill.name===selectedSkill.name)+1).padStart(2,"0")} / {String(skillUniverse.length).padStart(2,"0")}</span></div>
        <AnimatePresence mode="wait" initial={false}><motion.div key={selectedSkill.name} className="stack-detail" role="region" aria-live="polite" aria-label={`${selectedSkill.name} details`} initial={reduce?false:{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={reduce?undefined:{opacity:0,y:-7}} transition={{duration:reduce?0:.2}}>
          <span className="stack-detail-index">{selectedSkill.category.toUpperCase()} / FIELD NOTE</span><h3>{selectedSkill.name}</h3><p>{selectedSkill.description}</p><div className="skill-usage"><span>IN PRACTICE</span><p>{selectedSkill.usage}</p></div>
          {selectedSkill.projects.length>0&&<div className="skill-projects"><span>RELATED WORK</span>{selectedSkill.projects.map((project)=><a className="skill-project" href="#work" key={project}>{project}<ArrowUpRight size={13} aria-hidden="true"/></a>)}</div>}
        </motion.div></AnimatePresence>
        <div className="stack-footnote"><span>{selectedSkill.source.join(" / ").toUpperCase()} · VERIFIED PORTFOLIO DATA</span><i className="signal-dot" aria-hidden="true"/></div>
      </Reveal>
    </div>
  </div></section>;
}

function ProjectArtwork({ project, index, color }) {
  return <div className="project-artwork" style={{"--project-accent":color}}><img className="project-artwork-image" src={project.image} alt={project.imageAlt} loading="lazy" decoding="async"/><div className="artwork-top"><span>CASE / {String(index+1).padStart(2,"0")}</span><span>{project.category.toUpperCase()}</span></div><span className="artwork-caption">CONTEXTUAL COVER · NOT PRODUCT UI</span></div>;
}

function ProjectModal({ project, index, color, onClose }) {
  const reduce = useReducedMotion();
  const closeButton = useRef(null);
  const dialogRef = useRef(null);
  useEffect(()=>{const old=document.body.style.overflow;const previous=document.activeElement;document.body.style.overflow="hidden";closeButton.current?.focus();const key=(event)=>{if(event.key==="Escape"){onClose();return;}if(event.key==="Tab"){const focusable=[...dialogRef.current.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])')];const first=focusable[0];const last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}}};window.addEventListener("keydown",key);return()=>{document.body.style.overflow=old;window.removeEventListener("keydown",key);previous?.focus?.()}},[onClose]);
  return <motion.div className="modal-scrim" initial={reduce?false:{opacity:0}} animate={{opacity:1}} exit={reduce?undefined:{opacity:0}} transition={{duration:reduce?0:.2}} onMouseDown={(event)=>{if(event.target===event.currentTarget)onClose()}}><motion.article ref={dialogRef} className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-description" tabIndex={-1} initial={reduce?false:{opacity:0,y:24,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={reduce?undefined:{opacity:0,y:14,scale:.98}} transition={{duration:reduce?0:.35}}><button ref={closeButton} className="modal-close" type="button" onClick={onClose} aria-label="Close project details"><X size={19} aria-hidden="true"/></button><ProjectArtwork project={project} index={index} color={color}/><div className="modal-content"><span className="project-category">{project.category}</span><h2 id="modal-title">{project.title}</h2><p id="modal-description">{project.description}</p><div className="modal-two-col"><div><span className="modal-kicker">CONTRIBUTIONS / FEATURES</span><ul>{project.contributions.map((item)=><li key={item}>{item}</li>)}</ul></div><div><span className="modal-kicker">TECHNOLOGIES</span><div className="modal-tech">{project.tech.map((item)=><span key={item}>{item}</span>)}</div></div></div><div className="modal-links">{project.github&&<a href={project.github} target="_blank" rel="noreferrer">Source repository <GitBranch size={15}/></a>}{project.live&&<a href={project.live} target="_blank" rel="noreferrer">Live product <ExternalLink size={15}/></a>}</div></div></motion.article></motion.div>;
}

function ProjectsSection() {
  const [activeProject, setActiveProject] = useState(null);
  const reduce = useReducedMotion();
  const close=()=>setActiveProject(null);
  return <section className="section work-section" id="work"><div className="container"><SectionHeading number="04" eyebrow="SELECTED WORK / SYSTEMS" title={<>Built for people.<br/><em>Made to hold up.</em></>} detail="A curated record of backend systems, interfaces, and product work. Each note stays close to the work documented here."/>
    <motion.div className="projects-grid" variants={stagger} initial={reduce?false:"hidden"} whileInView={reduce?undefined:"show"} viewport={{once:true,amount:.08}}>{projects.map((project,index)=><motion.article className={`project-card project-card-${index+1} ${index===0?"project-card-featured":""}`} key={project.id} variants={fadeUp} style={{"--project-accent":projectColors[index%projectColors.length]}} whileHover={reduce?undefined:{y:-4,transition:{duration:.25}}}><button className="project-card-button" type="button" onClick={()=>setActiveProject({project,index})} aria-label={`Open case study ${String(index+1).padStart(2,"0")}: ${project.title}`}><ProjectArtwork project={project} index={index} color={projectColors[index%projectColors.length]}/><div className="project-card-content"><div className="project-category-row"><span>{project.category}</span><span>0{index+1} / 06</span></div><h3>{project.title}<ArrowUpRight size={17} aria-hidden="true"/></h3><p>{project.description}</p><div className="project-tags">{project.tech.slice(0,index===0?6:4).map((item)=><span key={item}>{item}</span>)}</div><span className="case-link">READ PROJECT NOTE <ArrowRight size={14} aria-hidden="true"/></span></div></button></motion.article>)}</motion.div>
  </div><AnimatePresence>{activeProject&&<ProjectModal project={activeProject.project} index={activeProject.index} color={projectColors[activeProject.index%projectColors.length]} onClose={close}/>}</AnimatePresence></section>;
}

function JourneySection() {
  const reduce=useReducedMotion();
  return <section className="section journey-section" id="journey"><div className="container"><SectionHeading number="05" eyebrow="CAREER / EDUCATION" title={<>A practice, <em>in progress.</em></>} detail="A considered record of the work and study behind my backend engineering practice, rooted in Kathmandu."/>
    <JourneyGroup title="Professional experience" eyebrow="01 / WORK" items={experience} reduce={reduce} />
    <JourneyGroup title="Education" eyebrow="02 / STUDY" items={education.map((item)=>({...item,role:item.degree,company:item.institution,responsibilities:[],tech:[],type:"EDUCATION"}))} reduce={reduce} />
    {certifications.length>0&&<Reveal className="cert-row"><span>ADDITIONAL CREDENTIALS</span><ul>{certifications.map((item)=><li className="cert-chip" key={item.title}><i aria-hidden="true"/>{item.title}</li>)}</ul></Reveal>}
  </div></section>;
}

function JourneyGroup({title,eyebrow,items,reduce}) {
  return <section className="journey-group" aria-label={title}><header className="journey-group-heading"><span>{eyebrow}</span><h3>{title}</h3><i aria-hidden="true"/></header><div className="journey-track"><motion.div className="journey-spine" aria-hidden="true" initial={reduce?false:{scaleY:0}} whileInView={{scaleY:1}} viewport={{once:true,amount:.1}} transition={{duration:reduce?0:1.35,ease:[.22,1,.36,1]}}/><ol className="journey-list">{items.map((item,index)=><JourneyItem key={`${item.company}-${item.period}`} item={item} index={index} reduce={reduce}/>)}</ol></div></section>;
}

function JourneyItem({item,index,reduce}) {
  const itemRef=useRef(null);
  const active=useInView(itemRef,{once:true,amount:.25});
  return <motion.li ref={itemRef} className={`journey-item ${active?"is-active":""}`} initial={reduce?false:{opacity:0,y:18}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.25}} transition={{duration:reduce?0:.55,delay:reduce?0:index*.1,ease:[.22,1,.36,1]}}><div className="journey-node" aria-hidden="true"><i/></div><div className="journey-period"><time>{item.period}</time><span>{item.type||"EXPERIENCE"}</span></div><article className="journey-card"><div className="journey-card-head"><div><h4>{item.role}</h4><p>{item.company} <i aria-hidden="true">·</i> {item.location}</p></div><span aria-hidden="true">0{index+1}</span></div>{item.responsibilities.length>0&&<ul>{item.responsibilities.map((detail)=><li key={detail}>{detail}</li>)}</ul>}{item.tech.length>0&&<div className="journey-tags" aria-label="Technologies used">{item.tech.map((tech)=><span key={tech}>{tech}</span>)}</div>}</article></motion.li>;
}

const nepalChapters = [
  { id: "himalayas", label: "Himalayas", index: "01", title: "The long line of the Himalaya.", description: "This illustrative ridgeline places Kathmandu within a layered mountain landscape. Its forms are atmospheric and expressive, not mapped terrain or elevation data.", visualDescription: "Illustrative Himalayan ridgelines with mist, topographic contour lines, and a Kathmandu location marker; not an elevation map.", note: "ILLUSTRATIVE · NO ELEVATION DATA", metadata: "KATHMANDU / 27°42′ N · 85°19′ E", detail: "RANGE / VALLEY / FOOTHILLS" },
  { id: "valley", label: "Kathmandu Valley", index: "02", title: "A valley shaped in brick & timber.", description: "In the Kathmandu Valley, historic urban forms bring fired brick, timber structures, terracotta roof tiles, and carved windows together. This line study is inspired by those materials; it does not depict a named monument.", visualDescription: "Original illustrative study inspired by Kathmandu Valley architecture, with tiered roof silhouettes, brick patterning, timber lattice, and courtyard forms; not a specific monument.", note: "ARCHITECTURAL STUDY · NO NAMED MONUMENT", metadata: "BRICK / TIMBER / TERRACOTTA", detail: "BUILT FORM / COURTYARD / CRAFT" },
  { id: "craft", label: "Art & Craft", index: "03", title: "Precision, pattern, and care.", description: "Newar craft traditions span brick, stone, timber, and bronze. This original abstract study takes cues only from the dense linework and rich palette seen in Nepalese paubha painting. Paubhas often carry devotional meaning, so sacred figures and symbols are not reproduced here.", visualDescription: "Original non-figurative geometric art study using fine linework and warm earth, terracotta, and gold colors; no sacred or devotional figures are shown.", note: "NON-FIGURATIVE STUDY · NO SACRED FIGURES", metadata: "LINE / MATERIAL / COLOR", detail: "GEOMETRY / LATTICE / PALETTE" },
];

function NepalArtwork({ chapter, reduce }) {
  const pointerX=useMotionValue(0);
  const pointerY=useMotionValue(0);
  const farX=useTransform(pointerX,[-.5,.5],[3,-3]);
  const middleX=useTransform(pointerX,[-.5,.5],[-5,5]);
  const depthY=useTransform(pointerY,[-.5,.5],[2,-2]);
  const move=(event)=>{if(reduce||event.pointerType!=="mouse")return;const rect=event.currentTarget.getBoundingClientRect();pointerX.set((event.clientX-rect.left)/rect.width-.5);pointerY.set((event.clientY-rect.top)/rect.height-.5);};
  const reset=()=>{pointerX.set(0);pointerY.set(0);};
  return <div className="heritage-artwork" role="img" aria-label={chapter.visualDescription} onPointerMove={move} onPointerLeave={reset}>
    <AnimatePresence mode="wait" initial={false}><motion.div key={chapter.id} className={`heritage-scene scene-${chapter.id}`} initial={reduce?false:{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={reduce?undefined:{opacity:0,y:-6}} transition={{duration:reduce?0:.42,ease:[.22,1,.36,1]}}>
      <svg className="heritage-svg" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="heritage-sky" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#202927"/><stop offset=".58" stopColor="#45443d"/><stop offset="1" stopColor="#80624e"/></linearGradient>
          <linearGradient id="heritage-mist" x1="0" x2="1"><stop stopColor="#f1ead9" stopOpacity="0"/><stop offset=".48" stopColor="#f1ead9" stopOpacity=".24"/><stop offset="1" stopColor="#f1ead9" stopOpacity="0"/></linearGradient>
          <pattern id="brick-grid" width="20" height="12" patternUnits="userSpaceOnUse"><path d="M0 0H20M0 6H20M10 0V6M0 6V12" fill="none" stroke="#ddac84" strokeOpacity=".3" strokeWidth=".7"/></pattern>
          <pattern id="craft-grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M0 0H42V42H0zM0 0l42 42M42 0 0 42M21 0v42M0 21h42" fill="none" stroke="#d7ad77" strokeOpacity=".58" strokeWidth=".8"/><path d="M8 8h26v26H8zM8 8l26 26m0-26L8 34" fill="none" stroke="#bd7050" strokeOpacity=".64" strokeWidth=".8"/></pattern>
        </defs>
        <rect width="800" height="500" fill="url(#heritage-sky)"/>
        <circle className="heritage-moon" cx="620" cy="122" r="34"/>
        <motion.g style={reduce?undefined:{x:farX,y:depthY}} className="heritage-range">
          <path d="M0 278 98 189 155 219 265 102 325 177 413 61 470 157 556 85 615 166 691 117 800 220V500H0Z" fill="#849275" fillOpacity=".58"/>
          <path d="M0 326 113 236 179 274 291 172 347 225 453 128 504 209 601 150 676 245 731 193 800 256V500H0Z" fill="#59665d"/>
          <path d="m265 102 60 75-39-16-28 15-19-16zm148-41 57 96-36-20-26 15-19-20zm143 24 59 81-34-18-29 12-18-15" fill="#eee9d8" fillOpacity=".78"/>
          <path className="heritage-ridge-line" d="m0 278 98-89 57 30 110-117 60 75 88-116 57 96 86-72 59 81 76-49 109 103"/>
        </motion.g>
        <motion.g style={reduce?undefined:{x:middleX}} className="heritage-valley">
          <path d="M0 323 800 292V500H0Z" fill="#684d40"/>
          <path d="M0 345 800 317V500H0Z" fill="url(#brick-grid)"/>
          <g className="temple-silhouette" fill="#a75f48" stroke="#d5a474" strokeWidth="2">
            <path d="M510 322h160v-12H510zM522 310l-18-12h196l-18 12zM530 298h122v-9H530zM540 289l-16-11h154l-16 11zM548 278h106v-8H548zM555 270l-13-10h132l-13 10zM565 260h84v-7h-84zM606 253v-31h5v31zm-34 69v-39h5v39zm64 0v-39h5v39z"/>
            <path d="M105 353h112v-9H105zm9-9-13-10h120l-13 10zm8-10h78v-8h-78zm7-8-10-9h94l-10 9zm30-9v-18h4v18zm-17 44v-33h4v33zm40 0v-33h4v33z"/>
          </g>
          <path className="wood-window" d="M100 370h112v75H100zm17 11v52m19-52v52m19-52v52m19-52v52M100 396h112"/>
          <path className="heritage-courtyard" d="M270 378h240v122H270z" fill="#303a37" stroke="#c9906c" strokeWidth="2"/>
          <path d="M255 378h270l-30-27H285z" fill="#927155"/>
          <path d="M323 351v-52m-45 52h135m-118-9 12-13h107l12 13m-109-13 14-13h79l14 13m-76-13v-20" fill="none" stroke="#d8a875" strokeWidth="3"/>
        </motion.g>
        <g className="heritage-craft">
          <rect x="128" y="68" width="544" height="370" fill="#2b2b27" fillOpacity=".38" stroke="#cf9b69" strokeOpacity=".7"/>
          <rect x="145" y="84" width="510" height="338" fill="url(#craft-grid)" stroke="#dfb77f" strokeOpacity=".6"/>
          <path className="craft-frame" d="M192 112h416v282H192zM208 128h384v250H208z"/>
          <path d="M400 154 548 253 400 352 252 253Z" fill="#a95439" fillOpacity=".28" stroke="#d2a36c" strokeWidth="1.4"/>
          <path d="M400 184 502 253 400 322 298 253Z" fill="none" stroke="#d9bd91" strokeWidth="1.2"/>
          <path d="M400 206 470 253 400 300 330 253Z" fill="#747d60" fillOpacity=".48" stroke="#d9bd91" strokeWidth="1.1"/>
          <path className="craft-detail" d="M208 253h82m220 0h82M400 128v52m0 146v52M208 180l34 20m350 106 34 20M592 180l-34 20M242 306l-34 20"/>
        </g>
        <g className="heritage-mist"><path d="M-20 255c114-42 204 30 319-4s199-41 314-6 154 8 219-12v100c-80 27-137 16-225-7s-185-25-286 7-210-19-341 15z" fill="url(#heritage-mist)"/><path d="M-20 296c130-31 208 22 319-4s200-33 318-4 149 8 215-8" fill="none" stroke="#efe7d4" strokeOpacity=".24"/></g>
        <g className="heritage-contours" fill="none" stroke="#e2b693" strokeWidth="1" strokeDasharray="5 9">
          <path d="M-14 365c104-62 183 13 280-26s162-46 254-9 137 19 294-14"/><path d="M-14 392c113-58 190 17 302-22s160-35 255 0 155 10 271-19"/><path d="M-14 422c106-48 185 16 292-18s175-27 263 3 151 11 273-16"/><path d="M-14 448c97-42 170 13 270-15s167-23 250 3 148 9 275-12"/>
        </g>
        <g className="heritage-point"><circle cx="393" cy="377" r="6"/><circle cx="393" cy="377" r="17"/></g>
        <text className="heritage-map-label" x="30" y="38">NEPAL / VISUAL FIELD STUDY</text><text className="heritage-map-note" x="30" y="56">{chapter.detail.toUpperCase()}</text>
        <text className="heritage-coordinate" x="627" y="460">27°42′ N / 85°19′ E</text>
      </svg>
    </motion.div></AnimatePresence>
    <div className="heritage-stage-top"><span><i aria-hidden="true"/>{chapter.index} / 03 · {chapter.detail.toUpperCase()}</span><span>KATHMANDU, NEPAL</span></div>
    <div className="heritage-caption"><span>{chapter.metadata}</span><span>{chapter.note}</span></div>
  </div>;
}

function NepalSection() {
  const [chapterId,setChapterId]=useState("himalayas");
  const reduce=useReducedMotion();
  const chapter=nepalChapters.find((item)=>item.id===chapterId)||nepalChapters[0];
  return <section className="section nepal-section" id="nepal"><div className="container"><SectionHeading number="06" eyebrow="NEPAL / LANDSCAPE, CULTURE, CRAFT" title={<>Rooted in Nepal.<br/><em>Inspired by its contrasts.</em></>} detail="As a developer based in Kathmandu, I see geography, built heritage, and careful craft as distinct but connected layers. That relationship informs how I think about dependable digital systems: shaped by context, clear in structure, and made with care."/>
    <div className="nepal-feature">
      <Reveal className="nepal-copy" delay={.06}><span className="nepal-kicker"><MapPin size={14} aria-hidden="true"/> {profile.location.toUpperCase()}</span>
        <div className="heritage-controls" role="group" aria-label="Explore Nepal chapters">{nepalChapters.map((item)=><button type="button" key={item.id} className={chapterId===item.id?"active":""} aria-pressed={chapterId===item.id} onClick={()=>setChapterId(item.id)}><span>{item.index}</span>{item.label}</button>)}</div>
        <AnimatePresence mode="wait" initial={false}><motion.div key={chapter.id} className="nepal-chapter-copy" aria-live="polite" initial={reduce?false:{opacity:0,y:9}} animate={{opacity:1,y:0}} exit={reduce?undefined:{opacity:0,y:-6}} transition={{duration:reduce?0:.28}}><h3>{chapter.title}</h3><p>{chapter.description}</p><div className="chapter-detail"><span>FIELD NOTES</span><b>{chapter.detail}</b></div></motion.div></AnimatePresence>
        <div className="nepal-facts"><span><small>LOCAL NODE</small><b>KATHMANDU · NEPAL</b></span><span><small>TIME ZONE</small><b>NPT / UTC+5:45</b></span></div>
        <a href="#contact" className="nepal-link">Connect with me <ArrowUpRight size={15} aria-hidden="true"/></a>
      </Reveal>
      <Reveal className="heritage-wrap" delay={.12}><NepalArtwork chapter={chapter} reduce={reduce}/></Reveal>
    </div>
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
  const [activeSection,setActiveSection]=useState("home");
  const [isMobile,setIsMobile]=useState(()=>window.matchMedia("(max-width: 760px)").matches);
  const menuButtonRef=useRef(null);
  const finishLoading=()=>setLoading(false);
  const reduce=useReducedMotion();
  useEffect(()=>{
    const query=window.matchMedia("(max-width: 760px)");
    const updateViewport=()=>{setIsMobile(query.matches);if(!query.matches)setMenuOpen(false);};
    query.addEventListener("change",updateViewport);
    return ()=>query.removeEventListener("change",updateViewport);
  },[]);
  useEffect(()=>{
    const observer=new IntersectionObserver((entries)=>{
      const current=entries.filter((entry)=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if(current)setActiveSection(current.target.id);
    },{rootMargin:"-18% 0px -70% 0px",threshold:0});
    navigation.forEach(([,id])=>{const section=document.getElementById(id);if(section)observer.observe(section);});
    return ()=>observer.disconnect();
  },[]);
  useEffect(()=>{
    if(!menuOpen)return undefined;
    const closeOnEscape=(event)=>{if(event.key==="Escape"){setMenuOpen(false);menuButtonRef.current?.focus();}};
    window.addEventListener("keydown",closeOnEscape);
    return ()=>window.removeEventListener("keydown",closeOnEscape);
  },[menuOpen]);
  return <><a className="skip-link" href="#main-content">Skip to main content</a><AnimatePresence>{loading&&!reduce&&<Preloader key="preloader" onFinish={finishLoading}/>}</AnimatePresence><header className="site-header"><a className="wordmark" href="#home" aria-label="Sagar Gautam home"><span>SG</span><i>·</i></a><div className="header-location"><span className="signal-dot"/>{profile.location.toUpperCase()} <i>27°42′N</i></div><nav id="primary-navigation" className={menuOpen?"main-nav open":"main-nav"} aria-label="Main navigation" aria-hidden={isMobile&&!menuOpen} inert={isMobile&&!menuOpen}>{navigation.map(([label,id])=><a href={`#${id}`} key={id} tabIndex={isMobile&&!menuOpen?-1:undefined} aria-current={activeSection===id?"location":undefined} onClick={()=>setMenuOpen(false)}>{label}</a>)}</nav><a className="header-contact" href="#contact">Let’s talk <ArrowUpRight size={14}/></a><button ref={menuButtonRef} className="menu-button" type="button" aria-label={menuOpen?"Close menu":"Open menu"} aria-expanded={menuOpen} aria-controls="primary-navigation" onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X aria-hidden="true"/>:<Menu aria-hidden="true"/>}</button></header>
    <main id="main-content"><Hero/><AboutSection/><SkillsSection/><Playground/><ProjectsSection/><JourneySection/><NepalSection/><ContactSection/></main><footer className="site-footer"><div className="footer-top"><a href="#home" className="footer-mark">SG<i>.</i></a><p>Built with care in {profile.location}.</p><a href="#home" className="back-top">BACK TO THE BEGINNING <ArrowUpRight size={14}/></a></div><div className="footer-bottom"><span>© {new Date().getFullYear()} {profile.name}</span><div>{navigation.slice(0,4).map(([label,id])=><a href={`#${id}`} key={id}>{label}</a>)}</div><span>27°42′N / 85°19′E</span></div></footer></>;
}

export default App;
