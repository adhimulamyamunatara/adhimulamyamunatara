import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────
   DATA — Yamuna Tara Adhimulam
───────────────────────────────────────── */
const NAV_LINKS = ["About", "Skills", "Projects", "Education", "Awards", "Contact"];

const STATS = [
  { num: 8, suffix: ".68", label: "Current CGPA" },
  { num: 5, suffix: "+", label: "Projects Completed" },
  { num: 3, suffix: "+", label: "Certifications" },
  { num: 940, suffix: "", label: "Inter Marks" },
];

const SKILL_CATEGORIES = [
  {
    icon: "💻", title: "Programming", color: "#22d3ee",
    skills: [
      { name: "Python", pct: 90 },
      { name: "C", pct: 85 },
      { name: "Java", pct: 80 },
    ]
  },
  {
    icon: "⚙️", title: "Frameworks & Libs", color: "#a78bfa",
    skills: [
      { name: "NumPy / Pandas", pct: 85 },
      { name: "Streamlit", pct: 88 },
      { name: "Django", pct: 75 },
    ]
  },
  {
    icon: "🧠", title: "AI / ML", color: "#f472b6",
    skills: [
      { name: "Machine Learning Basics", pct: 82 },
      { name: "Generative AI", pct: 78 },
      { name: "Chatbot Development", pct: 85 },
    ]
  },
  {
    icon: "🛠️", title: "Tools", color: "#34d399",
    skills: [
      { name: "Git / GitHub", pct: 85 },
      { name: "VS Code", pct: 90 },
      { name: "Flowise", pct: 70 },
    ]
  },
];

const PROJECTS = [
  {
    emoji: "🧠", bg: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
    tags: ["Python", "Streamlit", "AI"],
    title: "MindBuddy — Mental Wellness Chatbot",
    desc: "Developed a chatbot to assist students with mental wellness support. Focuses on providing accessible, immediate support for student stress and mental health.",
    metrics: [{ label: "Tech", val: "Streamlit" }, { label: "Goal", val: "Wellness" }],
    links: [{ label: "GitHub", href: "https://github.com" }],
    featured: true,
  },
  {
    emoji: "🐦", bg: "linear-gradient(135deg,#1a0533,#2d1b69,#11998e)",
    tags: ["Django", "Web App", "CRUD"],
    title: "TwitterLite Web App",
    desc: "Built a social web app with authentication, admin panel, and CRUD operations for post management. Leveraged Django's robust backend capabilities.",
    metrics: [{ label: "Year", val: "2025" }, { label: "Framework", val: "Django" }],
    links: [{ label: "GitHub", href: "https://github.com" }],
    featured: true,
  },
  {
    emoji: "🤖", bg: "linear-gradient(135deg,#0d0d0d,#1a1a2e,#16213e)",
    tags: ["GenAI", "Flowise", "LLM"],
    title: "Generative AI Chatbots",
    desc: "Built various chatbot applications using Streamlit and Flowise with prompt-based AI interactions for dynamic user experiences.",
    metrics: [{ label: "Current", val: "2026" }, { label: "Tech", val: "Flowise" }],
    links: [{ label: "GitHub", href: "https://github.com" }],
    featured: false,
  },
];

const EDUCATION = [
  {
    period: "2024 — 2028", color: "#22d3ee",
    title: "B.Tech CSE (AI & ML)",
    desc: "Vignan’s Nirula Institute of Technology & Science for Women. CGPA: 8.68 (upto II-I). Aspiring AI Engineer.",
    icons: ["🎓", "🏛️"],
  },
  {
    period: "2022 — 2024", color: "#a78bfa",
    title: "Intermediate (MPC)",
    desc: "Sri Chaitanya Junior College (SCJC), Tenali. Marks: 940 / 1000. Master Minds Awardee.",
    icons: ["📘", "🏅"],
  },
  {
    period: "2021 — 2022", color: "#f472b6",
    title: "SSC (10th Class)",
    desc: "Viveka High School (VHS), Tenali. Marks: 574 / 600.",
    icons: ["🖊️", "🏫"],
  },
];

const ACHIEVEMENTS = [
  { icon: "📜", label: "Vidyadhan Scholar", color: "#22d3ee" },
  { icon: "🛰️", label: "ISRO IIRS Remote Sensing", color: "#a78bfa" },
  { icon: "🇮🇳", label: "Swarna Andhra @2047", color: "#34d399" },
  { icon: "🤝", label: "NSS Volunteer", color: "#fbbf24" },
];

/* ─────────────────────────────────────────
   HOOKS & UTILS
───────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useCounter(target, suffix, active, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
      else setVal(target);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return (val === target && suffix.startsWith('.') ? target + suffix : val + suffix);
}

const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Outfit:wght@300;400;500;600&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }
  body {
    background: #030712;
    color: #f0f9ff;
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: #0c1120; }
  ::-webkit-scrollbar-thumb { background: #22d3ee44; border-radius: 2px; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; } to { opacity: 1; }
  }
  @keyframes orbPulse {
    0%,100% { transform: scale(1) translate(0,0); opacity: .10; }
    33%      { transform: scale(1.08) translate(30px,-20px); opacity: .14; }
    66%      { transform: scale(.94) translate(-20px,25px); opacity: .09; }
  }
  @keyframes pulse {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:.4; transform:scale(.75); }
  }
`;

function NeuralCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, nodes = [], raf;
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 60; i++) {
      nodes.push({ 
        x: Math.random()*window.innerWidth, y: Math.random()*window.innerHeight,
        vx: (Math.random()-.5)*.2, vy: (Math.random()-.5)*.2, r: Math.random()*1.5+.5 
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI*2);
        ctx.fillStyle = "rgba(34,211,238,.4)"; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} style={{ position:"fixed",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:0,opacity:.3 }} />;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("About");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:100,
      display:"flex",alignItems:"center",justifyContent:"space-between",
      padding: scrolled ? ".7rem 3rem" : "1.2rem 3rem",
      background:"rgba(3,7,18,0.8)",backdropFilter:"blur(20px)",
      borderBottom:"1px solid rgba(99,179,237,0.1)",
      transition:"padding 0.3s ease",
    }}>
      <a href="#home" style={{fontFamily:"'Space Mono',monospace",fontSize:".9rem",color:"#22d3ee",textDecoration:"none",letterSpacing:".05em"}}>
        &lt;<span style={{color:"#a78bfa"}}>yamuna</span>.ai /&gt;
      </a>
      <div style={{display:"flex",gap:"2rem",listStyle:"none"}}>
        {NAV_LINKS.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`}
            onClick={()=>setActive(l)}
            style={{
              fontFamily:"'Space Mono',monospace",fontSize:".68rem",textTransform:"uppercase",
              letterSpacing:".12em",textDecoration:"none",
              color: active===l ? "#22d3ee" : "#64748b",
              transition:"color .2s",position:"relative",paddingBottom:4,
            }}>
            {l}
            {active===l && <span style={{position:"absolute",bottom:0,left:0,height:1,width:"100%",background:"#22d3ee"}}/>}
          </a>
        ))}
      </div>
    </nav>
  );
}

function SectionLabel({num, text}) {
  const [ref, vis] = useInView();
  return <p ref={ref} style={{
    fontFamily:"'Space Mono',monospace",fontSize:".72rem",color:"#22d3ee",
    textTransform:"uppercase",letterSpacing:".2em",marginBottom:".6rem",
    opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(16px)",
    transition:"all .6s ease",
  }}>{num} — {text}</p>;
}

function SectionTitle({children, center=false}) {
  const [ref, vis] = useInView();
  return <h2 ref={ref} style={{
    fontFamily:"'Syne',sans-serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",
    fontWeight:800,lineHeight:1.1,letterSpacing:"-.03em",marginBottom:"3rem",
    textAlign: center?"center":"left",
    opacity: vis?1:0, transform: vis?"translateY(0)":"translateY(20px)",
    transition:"all .6s ease .1s",
  }}>{children}</h2>;
}

function Home() {
  return (
    <section id="home" style={{minHeight:"100vh",display:"flex",alignItems:"center",padding:"0 3rem",paddingTop:90,position:"relative",zIndex:1,overflow:"hidden"}}>
      <div style={{maxWidth:860,position:"relative",zIndex:1}}>
        <div style={{
          display:"inline-flex",alignItems:"center",gap:".5rem",
          fontFamily:"'Space Mono',monospace",fontSize:".72rem",color:"#22d3ee",
          background:"rgba(34,211,238,.07)",border:"1px solid rgba(34,211,238,.2)",
          borderRadius:"2rem",padding:".35rem .9rem",marginBottom:"1.8rem",
          animation:"fadeUp .8s ease both",
        }}>
          <span style={{width:7,height:7,borderRadius:"50%",background:"#22d3ee",animation:"pulse 2s infinite"}} />
          Vidyadhan Scholar · Tenali, AP 🇮🇳
        </div>

        <h1 style={{fontFamily:"'Syne',sans-serif",fontSize:"clamp(3rem,8vw,6rem)",fontWeight:800,lineHeight:.95,letterSpacing:"-.04em",marginBottom:"1rem",animation:"fadeUp .8s ease .1s both"}}>
          Yamuna Tara
          <span style={{display:"block",background:"linear-gradient(135deg,#22d3ee,#a78bfa,#f472b6)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text"}}>
            AI & ML Engineer
          </span>
        </h1>

        <p style={{fontSize:"1.1rem",color:"#94a3b8",lineHeight:1.8,maxWidth:600,marginBottom:"2.5rem",animation:"fadeUp .8s ease .3s both"}}>
          B.Tech CSE student at VNITSW. Passionate about <strong style={{color:"#f0f9ff"}}>Machine Learning, Generative AI, and Data Science</strong>. 
          Building smart solutions like MindBuddy to make a meaningful impact.
        </p>

        <div style={{display:"flex",gap:"1rem",animation:"fadeUp .8s ease .4s both"}}>
          <a href="#projects" style={{padding:".85rem 2rem",background:"linear-gradient(135deg,#22d3ee,#a78bfa)",color:"#000",fontFamily:"'Syne',sans-serif",fontWeight:700,borderRadius:6,textDecoration:"none"}}>
            View Projects
          </a>
          <a href="https://linkedin.com" style={{padding:".85rem 2rem",border:"1px solid rgba(99,179,237,.15)",color:"#f0f9ff",fontFamily:"'Syne',sans-serif",fontWeight:600,borderRadius:6,textDecoration:"none"}}>
            LinkedIn Profile
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" style={{padding:"7rem 3rem",maxWidth:1200,margin:"0 auto",position:"relative",zIndex:1}}>
      <SectionLabel num="01" text="About Me" />
      <SectionTitle>Aspiring <span style={{color:"#22d3ee"}}>AI Specialist</span></SectionTitle>
      <div style={{display:"grid",gridTemplateColumns:"1.1fr .9fr",gap:"5rem"}}>
        <div>
          <p style={{color:"#94a3b8",lineHeight:1.85,marginBottom:"1.2rem",fontSize:"1.1rem"}}>
            I am a B.Tech CSE (AI & ML) student at Vignan's Nirula Institute of Technology & Science for Women. 
            My focus is on creating <strong style={{color:"#f0f9ff"}}>intelligent systems</strong> that solve real-world problems. 
          </p>
          <p style={{color:"#94a3b8",lineHeight:1.85,fontSize:"1.1rem"}}>
            From developing mental wellness chatbots to social web apps, I've consistently applied my skills in Python, Django, and ML to build functional, user-centric applications. 
            I am a dedicated Vidyadhan Scholar and an active NSS volunteer.
          </p>

          <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:"1rem",marginTop:"2.5rem"}}>
            {STATS.map((s,i) => {
              const [ref, vis] = useInView();
              const val = useCounter(s.num, s.suffix, vis);
              return (
                <div key={i} ref={ref} style={{background:"#111827",padding:"1.6rem",borderRadius:14,border:"1px solid rgba(99,179,237,0.1)"}}>
                  <div style={{fontSize:"2.2rem",fontWeight:800,color:"#22d3ee",fontFamily:"'Syne',sans-serif"}}>{val}</div>
                  <div style={{fontSize:".8rem",color:"#64748b",textTransform:"uppercase"}}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div style={{background:"#0c1120",borderRadius:16,padding:"2rem",border:"1px solid rgba(34,211,238,0.1)",display:"flex",flexDirection:"column",justifyContent:"center"}}>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:".8rem",lineHeight:1.8}}>
            <span style={{color:"#64748b"}}>// Current Focus</span><br/>
            <span style={{color:"#a78bfa"}}>status</span>: <span style={{color:"#fbbf24"}}>"Sophomore Student"</span>,<br/>
            <span style={{color:"#a78bfa"}}>interest</span>: <span style={{color:"#fbbf24"}}>"GenAI & Machine Learning"</span>,<br/>
            <span style={{color:"#a78bfa"}}>goal</span>: <span style={{color:"#fbbf24"}}>"Secure AI Internship"</span>,<br/>
            <span style={{color:"#a78bfa"}}>motto</span>: <span style={{color:"#fbbf24"}}>"Keep Learning, Keep Building"</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ category, delay }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      background:"#111827",padding:"1.8rem",borderRadius:16,border:"1px solid rgba(99,179,237,0.08)",
      opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(20px)",
      transition:`all 0.6s ease ${delay}ms`
    }}>
      <div style={{fontSize:"2rem",marginBottom:".8rem"}}>{category.icon}</div>
      <h3 style={{fontFamily:"'Syne',sans-serif",color:category.color,marginBottom:"1.2rem"}}>{category.title}</h3>
      {category.skills.map(s => (
        <div key={s.name} style={{marginBottom:".8rem"}}>
          <div style={{display:"flex",justifyContent:"space-between",fontSize:".75rem",marginBottom:".3rem"}}>
            <span>{s.name}</span><span>{s.pct}%</span>
          </div>
          <div style={{height:3,background:"rgba(255,255,255,0.05)",borderRadius:2}}>
            <div style={{height:"100%",background:category.color,width:vis?`${s.pct}%`:"0%",transition:"width 1s ease"}}/>
          </div>
        </div>
      ))}
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" style={{padding:"7rem 3rem",background:"#0c1120"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <SectionLabel num="02" text="Skills" />
        <SectionTitle>Technical <span style={{color:"#22d3ee"}}>Expertise</span></SectionTitle>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4, 1fr)",gap:"1.4rem"}}>
          {SKILL_CATEGORIES.map((c,i) => <SkillCard key={i} category={c} delay={i*100} />)}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, delay }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      background:"#111827",borderRadius:18,overflow:"hidden",border:"1px solid rgba(99,179,237,0.08)",
      opacity:vis?1:0,transform:vis?"translateY(0)":"translateY(32px)",
      transition:`all 0.6s ease ${delay}ms`
    }}>
      <div style={{height:140,background:project.bg,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"3rem"}}>{project.emoji}</div>
      <div style={{padding:"1.5rem"}}>
        <div style={{display:"flex",gap:".4rem",marginBottom:".8rem"}}>
          {project.tags.map(t=><span key={t} style={{fontSize:".6rem",background:"rgba(34,211,238,0.1)",color:"#22d3ee",padding:".2rem .5rem",borderRadius:4}}>{t}</span>)}
        </div>
        <h3 style={{fontSize:"1.1rem",marginBottom:".6rem"}}>{project.title}</h3>
        <p style={{fontSize:".85rem",color:"#64748b",lineHeight:1.6,marginBottom:"1.2rem"}}>{project.desc}</p>
        <div style={{display:"flex",gap:"1rem"}}>
          {project.links.map(l=><a key={l.label} href={l.href} style={{fontSize:".75rem",color:"#a78bfa",textDecoration:"none"}}> {l.label} ↗</a>)}
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" style={{padding:"7rem 3rem",maxWidth:1200,margin:"0 auto"}}>
      <SectionLabel num="03" text="Portfolio" />
      <SectionTitle>Featured <span style={{color:"#22d3ee"}}>Projects</span></SectionTitle>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:"1.4rem"}}>
        {PROJECTS.map((p,i)=><ProjectCard key={i} project={p} delay={i*100} />)}
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" style={{padding:"7rem 3rem",background:"#0c1120"}}>
      <div style={{maxWidth:1200,margin:"0 auto"}}>
        <SectionLabel num="04" text="Background" />
        <SectionTitle>Academic <span style={{color:"#22d3ee"}}>Timeline</span></SectionTitle>
        
        <div style={{display:"grid",gridTemplateColumns:"1fr .5fr",gap:"4rem"}}>
          <div style={{position:"relative",paddingLeft:"2rem",borderLeft:"1px solid rgba(34,211,238,0.2)"}}>
            {EDUCATION.map((e,i) => (
              <div key={i} style={{marginBottom:"3rem",position:"relative"}}>
                <div style={{position:"absolute",left:"-2.45rem",top:0,width:14,height:14,borderRadius:"50%",background:e.color,boxShadow:`0 0 10px ${e.color}`}} />
                <div style={{fontSize:".7rem",color:e.color,fontWeight:700,marginBottom:".4rem"}}>{e.period}</div>
                <h3 style={{fontSize:"1.3rem",marginBottom:".4rem",fontFamily:"'Syne',sans-serif"}}>{e.title}</h3>
                <p style={{color:"#94a3b8",lineHeight:1.6,maxWidth:600}}>{e.desc}</p>
                <div style={{marginTop:".8rem",display:"flex",gap:".5rem"}}>
                  {e.icons.map(ic=><span key={ic} style={{fontSize:"1.2rem"}}>{ic}</span>)}
                </div>
              </div>
            ))}
          </div>

          <div>
            <div style={{background:"rgba(34,211,238,0.03)",border:"1px solid rgba(34,211,238,0.1)",borderRadius:20,padding:"2rem"}}>
              <h3 style={{fontFamily:"'Syne',sans-serif",fontSize:"1.1rem",marginBottom:"1.5rem",color:"#22d3ee"}}>Certifications & Honors</h3>
              {ACHIEVEMENTS.map((a,i) => (
                <div key={i} style={{display:"flex",alignItems:"center",gap:"1rem",marginBottom:"1.2rem"}}>
                  <div style={{width:40,height:40,borderRadius:10,background:`${a.color}15`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"1.2rem",color:a.color,border:`1px solid ${a.color}30`}}>
                    {a.icon}
                  </div>
                  <span style={{fontSize:".9rem",fontWeight:500}}>{a.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{padding:"7rem 3rem",textAlign:"center"}}>
      <SectionLabel num="06" text="Connect" />
      <SectionTitle center>Let's <span style={{color:"#22d3ee"}}>Work Together</span></SectionTitle>
      <div style={{display:"flex",justifyContent:"center",gap:"2rem",marginTop:"4rem"}}>
        <a href="mailto:yamuna@example.com" style={{fontSize:"1.5rem",color:"#22d3ee"}}>Email</a>
        <a href="https://linkedin.com" style={{fontSize:"1.5rem",color:"#a78bfa"}}>LinkedIn</a>
        <a href="https://github.com" style={{fontSize:"1.5rem",color:"#34d399"}}>GitHub</a>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <>
      <style>{GLOBAL_CSS}</style>
      <NeuralCanvas />
      <Nav />
      <Home />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Contact />
      <footer style={{padding:"2rem",textAlign:"center",borderTop:"1px solid rgba(255,255,255,0.05)",fontSize:".7rem",color:"#64748b"}}>
        © 2026 Yamuna Tara Adhimulam · Built with React & AI
      </footer>
    </>
  );
}
