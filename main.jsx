import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, Send, Download, Brain, Code, Database,
  Cpu, Terminal, Globe, Menu, X, ChevronRight, Layers,
  ExternalLink, Trophy, Zap, FileText, BarChart2, Shield, Star
} from "lucide-react";

const T = {
  bg: "#050505", bgCard: "#0c0c0c",
  purple: "#8B5CF6", purpleLight: "#A78BFA", purpleDark: "#6D28D9",
  cyan: "#22D3EE", cyanLight: "#67E8F9",
  green: "#10B981", amber: "#F59E0B", pink: "#EC4899", red: "#EF4444",
  text: "#F0F0F0", muted: "#9CA3AF", subtle: "#4B5563",
  border: "rgba(255,255,255,0.07)",
};

const gt = (c1 = T.purple, c2 = T.cyan) => ({
  background: `linear-gradient(135deg, ${c1}, ${c2})`,
  WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
});

const AVISHI_CONTEXT = `You are an AI assistant for Avishi Sharma's portfolio. Answer concisely (2-4 sentences) and professionally.

AVISHI SHARMA — AI/ML Engineer · Computer Vision Researcher · Full Stack Developer
Education: B.Tech Computer Science (Information Security), VIT Vellore, CGPA: 9.04/10

EXPERIENCE:
- AI/ML Intern, C-DAC Noida: Built face detection & recognition pipelines; compared Haar Cascade, HOG, MMOD, RetinaFace, SCRFD models; implemented ArcFace embeddings; identity matching via cosine similarity
- Co-Secretary, IEEE Women in Engineering: Led chapter at VIT, organized workshops, mentored members
- Core Committee, VIT Dramatics Club: 3rd Place Monologue NIT Trichy, Finalist Mood Indigo IIT Bombay

PROJECTS:
1. Social Media Face Recognition — Python, OpenCV, RetinaFace, SCRFD, ArcFace. End-to-end pipeline + model comparison dashboard.
2. ZenHer — React, Node.js, Express, MongoDB. Women-centric wellness platform, partner collaboration, real-time features.
3. PlaceMe (FLAGSHIP) — AI placement platform: resume analysis, ATS scoring, job matching, resume optimization, company research, interview prep, AI career assistant. Stack: Next.js 15, TypeScript, Gemini/OpenAI, LangChain, RAG, Pinecone, Supabase.

SKILLS: Python, Java, C++, JavaScript, TypeScript, React, Next.js, Tailwind, Node.js, Express.js, FastAPI, OpenCV, ML/DL, ArcFace, RetinaFace, MongoDB, PostgreSQL, Supabase, Git, MATLAB

ACHIEVEMENTS: Team Captain MIDAS International Hackathon (Top 10), Finalist Mood Indigo IIT Bombay, 3rd Place Monologue NIT Trichy
Contact: avishi.sharma@email.com`;

const ROLES = ["AI/ML Engineer", "Computer Vision Researcher", "Full Stack Developer", "Product Builder"];

const SKILL_CATS = [
  { label: "AI / ML", color: T.purple, Icon: Brain, skills: ["Python", "OpenCV", "Computer Vision", "ArcFace", "RetinaFace", "SCRFD", "Machine Learning", "Deep Learning"] },
  { label: "Frontend", color: T.cyan, Icon: Code, skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript", "HTML5", "CSS3"] },
  { label: "Backend", color: T.green, Icon: Terminal, skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "WebSockets"] },
  { label: "Databases", color: T.amber, Icon: Database, skills: ["MongoDB", "PostgreSQL", "Supabase", "Pinecone", "SQL"] },
  { label: "Languages", color: T.red, Icon: Cpu, skills: ["Python", "JavaScript", "TypeScript", "Java", "C++"] },
  { label: "Tools", color: T.pink, Icon: Layers, skills: ["Git", "GitHub", "MATLAB", "Vercel", "WordPress"] },
];

const PROJECTS_DATA = [
  {
    badge: "Computer Vision", emoji: "🎯", title: "Face Recognition System", color: T.purple,
    desc: "End-to-end face detection and recognition pipeline comparing 5 state-of-the-art models with an interactive accuracy benchmark dashboard and real-time identity matching.",
    tech: ["Python", "OpenCV", "RetinaFace", "SCRFD", "ArcFace"],
    stats: [["5+", "Models"], ["99%+", "Accuracy"], ["Real-time", "Pipeline"]],
  },
  {
    badge: "Full Stack", emoji: "💜", title: "ZenHer", color: T.pink,
    desc: "A women-centric full-stack wellness platform with partner collaboration, interactive mindfulness activities, and real-time functionality built on the MERN stack.",
    tech: ["React", "Node.js", "Express.js", "MongoDB"],
    stats: [["MERN", "Stack"], ["Real-time", "Features"], ["Partner", "Collab"]],
  },
];

const EXPERIENCE_DATA = [
  {
    role: "AI/ML Intern", org: "C-DAC, Noida", period: "Internship", color: T.purple,
    bullets: [
      "Built end-to-end face detection and recognition pipelines from scratch",
      "Benchmarked Haar Cascade, HOG, MMOD, RetinaFace, and SCRFD models",
      "Implemented ArcFace embeddings for high-accuracy identity matching",
      "Applied cosine similarity for real-time identity verification at scale",
    ],
    tags: ["Python", "OpenCV", "Deep Learning", "Computer Vision", "ArcFace"],
  },
  {
    role: "Co-Secretary", org: "IEEE Women in Engineering", period: "Leadership", color: T.cyan,
    bullets: [
      "Co-led the IEEE WIE chapter at VIT Vellore with 200+ members",
      "Organized technical workshops, industry talks, and networking events",
      "Mentored junior members through technical and professional development",
    ],
    tags: ["Leadership", "Community Building", "Technical Events"],
  },
  {
    role: "Core Committee", org: "VIT Dramatics Club", period: "Extracurricular", color: T.pink,
    bullets: [
      "3rd Place winner at NIT Trichy's inter-college Monologue Competition",
      "Finalist at Mood Indigo — Asia's largest cultural festival, IIT Bombay",
      "Core committee member managing events and performance logistics",
    ],
    tags: ["Performance", "Leadership", "Competitions"],
  },
];

const ACHIEVEMENTS_DATA = [
  { emoji: "🏆", title: "MIDAS International Hackathon", badge: "Top 10 Globally", desc: "Led a team as captain to the Top 10 at MIDAS International Hackathon, competing with teams from across the globe.", color: T.amber },
  { emoji: "🎭", title: "Mood Indigo, IIT Bombay", badge: "Finalist", desc: "Competed at Mood Indigo — Asia's largest cultural festival — hosted by IIT Bombay and reached the finals.", color: T.purple },
  { emoji: "🎤", title: "Monologue Competition, NIT Trichy", badge: "3rd Place", desc: "Secured third position in the inter-college Monologue Competition at NIT Trichy.", color: T.cyan },
];

function NeuralCanvas() {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const nodes = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      nodes.current = Array.from({ length: 55 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() * 1.5 + 0.5,
        pulse: Math.random() * Math.PI * 2,
        cyan: Math.random() < 0.2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", e => {
      const r = canvas.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    });
    canvas.addEventListener("mouseleave", () => { mouse.current = { x: -9999, y: -9999 }; });

    const draw = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      const m = mouse.current;
      const ns = nodes.current;

      ns.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += 0.015;
        if (n.x < 0) n.x = W; if (n.x > W) n.x = 0;
        if (n.y < 0) n.y = H; if (n.y > H) n.y = 0;
        const dx = m.x - n.x, dy = m.y - n.y, d = Math.hypot(dx, dy);
        if (d < 180 && d > 0) { n.x += dx * 0.006; n.y += dy * 0.006; }
        const a = 0.35 + 0.2 * Math.sin(n.pulse);
        const rgb = n.cyan ? "34,211,238" : "139,92,246";
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        g.addColorStop(0, `rgba(${rgb},${a * 0.9})`);
        g.addColorStop(1, `rgba(${rgb},0)`);
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${a + 0.4})`; ctx.fill();
      });

      for (let i = 0; i < ns.length; i++) {
        const a = ns[i];
        const mdx = m.x - a.x, mdy = m.y - a.y, md = Math.hypot(mdx, mdy);
        if (md < 140) {
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(m.x, m.y);
          ctx.strokeStyle = `rgba(34,211,238,${(1 - md / 140) * 0.6})`; ctx.lineWidth = 0.8; ctx.stroke();
        }
        for (let j = i + 1; j < ns.length; j++) {
          const b = ns[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.hypot(dx, dy);
          if (d < 105) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(139,92,246,${(1 - d / 105) * 0.22})`; ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", cursor: "crosshair" }} />;
}

export default function Portfolio() {
  const [activeSection, setActiveSection] = useState("home");
  const [progress, setProgress] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hi! I'm Avishi's AI assistant. Ask me anything about her experience, projects, or skills — or tap a quick question below! 👋" }
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const [deleting, setDeleting] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const tot = document.documentElement.scrollHeight - window.innerHeight;
      if (tot > 0) setProgress((window.scrollY / tot) * 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id); });
    }, { threshold: 0.25 });
    ["home","about","experience","skills","projects","placeme","ai","achievements","recruiter","contact"]
      .forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const target = ROLES[roleIdx];
    let t;
    if (!deleting) {
      if (typed.length < target.length) {
        t = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 80);
      } else {
        t = setTimeout(() => setDeleting(true), 2600);
      }
    } else {
      if (typed.length > 0) {
        t = setTimeout(() => setTyped(typed.slice(0, -1)), 42);
      } else {
        setDeleting(false);
        setRoleIdx(p => (p + 1) % ROLES.length);
      }
    }
    return () => clearTimeout(t);
  }, [typed, deleting, roleIdx]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollTo = id => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenu(false);
  };

  const sendMessage = async () => {
    const text = chatInput.trim();
    if (!text || isTyping) return;
    const userMsg = { role: "user", text };
    const all = [...messages, userMsg];
    setChatInput(""); setMessages(all); setIsTyping(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: AVISHI_CONTEXT,
          messages: all.map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Connection error — please try again.";
      setMessages(p => [...p, { role: "assistant", text: reply }]);
    } catch {
      setMessages(p => [...p, { role: "assistant", text: "Connection error — please try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  const NAV = [
    { id: "home", label: "Home" }, { id: "about", label: "About" },
    { id: "experience", label: "Experience" }, { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" }, { id: "ai", label: "AI Chat" },
    { id: "achievements", label: "Awards" }, { id: "recruiter", label: "Recruiter" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div style={{ background: T.bg, color: T.text, fontFamily: '"Space Grotesk", Inter, sans-serif', minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #8B5CF6; border-radius: 2px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(26px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulseDot { 0%,100%{ opacity:.5; transform:scale(1); } 50%{ opacity:1; transform:scale(1.15); } }
        @keyframes blink { 0%,100%{ opacity:1; } 50%{ opacity:0; } }
        @keyframes tdot { 0%,100%{ transform:scale(1); } 50%{ transform:scale(1.2); } }
        .fu { animation: fadeUp .65s ease forwards; }
        .fu1 { animation: fadeUp .65s .15s ease both; }
        .fu2 { animation: fadeUp .65s .3s ease both; }
        .fu3 { animation: fadeUp .65s .45s ease both; }
        .fu4 { animation: fadeUp .65s .6s ease both; }
        .glass { background: rgba(12,12,12,0.78); backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px); border: 1px solid rgba(255,255,255,0.07); border-radius: 16px; }
        .glass-h { transition: all .28s ease; }
        .glass-h:hover { border-color: rgba(139,92,246,.28) !important; background: rgba(139,92,246,.04) !important; }
        .lift { transition: transform .28s cubic-bezier(.25,.46,.45,.94); }
        .lift:hover { transform: translateY(-5px); }
        .btn-p { background: linear-gradient(135deg, #8B5CF6, #7C3AED); color: #fff; border: none; padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-family: "Space Grotesk", sans-serif; transition: all .25s ease; text-decoration: none; white-space: nowrap; }
        .btn-p:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(139,92,246,.42); }
        .btn-o { background: transparent; color: #EDEDED; border: 1px solid rgba(255,255,255,.13); padding: 12px 24px; border-radius: 10px; font-size: 14px; font-weight: 500; cursor: pointer; display: inline-flex; align-items: center; gap: 8px; font-family: "Space Grotesk", sans-serif; transition: all .25s ease; text-decoration: none; white-space: nowrap; }
        .btn-o:hover { border-color: #8B5CF6; color: #A78BFA; transform: translateY(-2px); }
        .tag { display: inline-block; padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; border: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); color: #9CA3AF; transition: all .2s ease; }
        .tag:hover { border-color: rgba(139,92,246,.4); color: #A78BFA; }
        .nav-btn { background: none; border: none; cursor: pointer; font-family: "Space Grotesk", sans-serif; font-size: 13px; font-weight: 500; padding: 6px 11px; border-radius: 7px; transition: all .2s ease; white-space: nowrap; }
        .sl { font-size: 12px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; margin-bottom: 12px; }
        .sh2 { font-size: clamp(28px, 5vw, 44px); font-weight: 700; letter-spacing: -.025em; line-height: 1.1; }
        .cblink { animation: blink .8s ease infinite; }
        .tl-line { position:absolute; left:20px; top:0; bottom:0; width:1px; background: linear-gradient(to bottom, transparent, rgba(139,92,246,.55), transparent); }
        .tl-dot { position:absolute; left:13px; top:28px; width:14px; height:14px; border-radius:50%; border:2px solid #050505; }
        .pm-feat { padding:18px; border-radius:12px; border:1px solid rgba(255,255,255,.06); background:rgba(12,12,12,.5); transition:all .25s ease; }
        .pm-feat:hover { border-color:rgba(139,92,246,.3); background:rgba(139,92,246,.05); transform:translateY(-3px); }
        .tdot { width:7px; height:7px; border-radius:50%; background:#8B5CF6; animation: tdot 1.1s infinite; }
        .tdot:nth-child(2){animation-delay:.2s;} .tdot:nth-child(3){animation-delay:.4s;}
        @media(max-width:680px){.hide-sm{display:none!important;}.grid-2{grid-template-columns:1fr!important;}.grid-3{grid-template-columns:1fr!important;}.g3sm{grid-template-columns:1fr 1fr!important;}.arch-grid{grid-template-columns:1fr 1fr!important;}}
        @media(min-width:681px){.show-sm{display:none!important;}}
      `}</style>

      <div style={{ position:"fixed", top:0, left:0, zIndex:200, height:"2px", width:`${progress}%`, background:"linear-gradient(to right,#8B5CF6,#22D3EE)", transition:"width .12s" }} />

      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, height:"62px", display:"flex", alignItems:"center", justifyContent:"space-between", padding:"0 20px", background:"rgba(5,5,5,0.88)", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"10px", cursor:"pointer" }} onClick={() => scrollTo("home")}>
          <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:"linear-gradient(135deg,#8B5CF6,#22D3EE)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:"700", fontSize:"15px", color:"white", flexShrink:0 }}>A</div>
          <span style={{ fontWeight:"600", fontSize:"15px" }}>Avishi Sharma</span>
        </div>
        <div className="hide-sm" style={{ display:"flex", gap:"1px" }}>
          {NAV.map(n => (
            <button key={n.id} className="nav-btn" onClick={() => scrollTo(n.id)} style={{ color: activeSection===n.id ? T.purple : T.muted, background: activeSection===n.id ? "rgba(139,92,246,.1)" : "transparent" }}>{n.label}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:"10px", alignItems:"center" }}>
          <button className="btn-p hide-sm" style={{ padding:"8px 16px", fontSize:"13px" }}><Download size={13} /> Resume</button>
          <button className="show-sm" onClick={() => setMobileMenu(v => !v)} style={{ background:"none", border:"none", color:T.text, cursor:"pointer", padding:"6px" }}>{mobileMenu ? <X size={22}/> : <Menu size={22}/>}</button>
        </div>
      </nav>

      {mobileMenu && (
        <div style={{ position:"fixed", top:"62px", inset:0, background:"rgba(5,5,5,.97)", backdropFilter:"blur(24px)", zIndex:99, padding:"20px", display:"flex", flexDirection:"column", gap:"8px", overflowY:"auto" }}>
          {NAV.map(n => <button key={n.id} onClick={() => scrollTo(n.id)} style={{ background:"none", border:"1px solid rgba(255,255,255,.07)", borderRadius:"10px", padding:"14px 16px", color:T.text, fontSize:"16px", fontWeight:"500", textAlign:"left", cursor:"pointer", fontFamily:'"Space Grotesk",sans-serif' }}>{n.label}</button>)}
          <button className="btn-p" style={{ justifyContent:"center", marginTop:"8px" }}><Download size={14}/> Download Resume</button>
        </div>
      )}

      <main style={{ paddingTop:"62px" }}>

        {/* HERO */}
        <section id="home" style={{ position:"relative", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden", padding:"80px 20px 60px" }}>
          <NeuralCanvas />
          <div style={{ position:"absolute", top:0, left:0, right:0, height:"180px", background:`linear-gradient(to bottom,${T.bg},transparent)`, zIndex:1 }}/>
          <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"220px", background:`linear-gradient(to top,${T.bg},transparent)`, zIndex:1 }}/>
          <div style={{ position:"relative", zIndex:2, textAlign:"center", maxWidth:"860px", margin:"0 auto" }}>
            <div className="fu" style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"7px 16px", borderRadius:"100px", background:"rgba(139,92,246,.1)", border:"1px solid rgba(139,92,246,.32)", fontSize:"13px", color:T.purpleLight, fontWeight:"600", marginBottom:"28px" }}>
              <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:T.green, display:"inline-block", animation:"pulseDot 2s ease infinite" }}/>
              Open to Opportunities
            </div>
            <h1 className="fu1" style={{ fontSize:"clamp(36px,6.5vw,72px)", fontWeight:"700", lineHeight:1.08, letterSpacing:"-.03em", marginBottom:"22px" }}>
              Building Intelligent <span style={gt()}>Systems</span><br className="hide-sm"/> That Solve Real Problems
            </h1>
            <p className="fu2" style={{ fontSize:"clamp(15px,2.2vw,18px)", color:T.muted, lineHeight:1.7, maxWidth:"580px", margin:"0 auto 14px", fontWeight:"400" }}>
              AI/ML Engineer, Computer Vision Researcher, and Full Stack Developer focused on creating impactful AI-powered products.
            </p>
            <div className="fu2" style={{ fontSize:"clamp(14px,2vw,17px)", color:T.purple, fontWeight:"600", marginBottom:"36px", height:"26px", display:"flex", alignItems:"center", justifyContent:"center", gap:"2px" }}>
              {typed}<span className="cblink" style={{ color:T.cyan, fontWeight:"300" }}>|</span>
            </div>
            <div className="fu3" style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap", marginBottom:"60px" }}>
              <button className="btn-p" onClick={() => scrollTo("projects")}>View Projects <ChevronRight size={15}/></button>
              <button className="btn-o" onClick={() => scrollTo("recruiter")}><Download size={15}/> Recruiter Hub</button>
            </div>
            <div className="fu4" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px", maxWidth:"460px", margin:"0 auto" }}>
              {[{num:"9.04",label:"CGPA · VIT",color:T.purple},{num:"3+",label:"AI Projects",color:T.cyan},{num:"C-DAC",label:"Internship",color:T.green}].map(s => (
                <div key={s.label} className="glass" style={{ padding:"18px 8px", textAlign:"center" }}>
                  <div style={{ fontSize:"24px", fontWeight:"700", color:s.color }}>{s.num}</div>
                  <div style={{ fontSize:"11px", color:T.muted, marginTop:"4px" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" style={{ padding:"100px 20px", maxWidth:"1060px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"54px" }}>
            <div className="sl" style={{ color:T.purple }}>About</div>
            <h2 className="sh2">The Person Behind the Code</h2>
          </div>
          <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:"32px", alignItems:"start" }}>
            <div>
              <div className="glass" style={{ padding:"28px", marginBottom:"16px" }}>
                <p style={{ color:T.muted, lineHeight:1.8, fontSize:"15px", marginBottom:"16px" }}>I'm <strong style={{ color:T.text }}>Avishi Sharma</strong>, a Computer Science student (Information Security) at VIT Vellore with a deep focus on AI/ML and building products that make a real difference.</p>
                <p style={{ color:T.muted, lineHeight:1.8, fontSize:"15px", marginBottom:"16px" }}>My internship at <strong style={{ color:T.purple }}>C-DAC, Noida</strong> gave me production experience building face recognition systems — comparing 5 state-of-the-art models and implementing ArcFace embeddings for identity matching at scale.</p>
                <p style={{ color:T.muted, lineHeight:1.8, fontSize:"15px" }}>Beyond engineering, I co-lead <strong style={{ color:T.cyan }}>IEEE Women in Engineering</strong> at VIT, captained a team to Top 10 at MIDAS International Hackathon, and am a trained performer who reached the finals at IIT Bombay's Mood Indigo.</p>
              </div>
              <div style={{ display:"flex", gap:"10px", flexWrap:"wrap" }}>
                {[{Icon:Github,label:"GitHub"},{Icon:Linkedin,label:"LinkedIn"},{Icon:Mail,label:"Email"}].map(({Icon,label}) => (
                  <button key={label} className="btn-o" style={{ padding:"9px 16px", fontSize:"13px" }}><Icon size={15}/> {label}</button>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:"12px" }}>
              {[
                {e:"🎓",label:"Education",v:"B.Tech CS — Info Security",s:"VIT Vellore · CGPA 9.04 / 10",c:T.purple},
                {e:"💼",label:"Experience",v:"AI/ML Intern",s:"C-DAC, Noida",c:T.cyan},
                {e:"🎯",label:"Expertise",v:"AI/ML · CV · Full Stack",s:"Building intelligent systems",c:T.green},
                {e:"📍",label:"Location",v:"India",s:"Open to Remote & Relocation",c:T.amber},
              ].map(c => (
                <div key={c.label} className="glass glass-h lift" style={{ padding:"15px 18px", display:"flex", alignItems:"center", gap:"14px" }}>
                  <div style={{ width:"38px", height:"38px", borderRadius:"9px", flexShrink:0, background:`${c.c}18`, border:`1px solid ${c.c}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"17px" }}>{c.e}</div>
                  <div>
                    <div style={{ fontSize:"10.5px", color:T.muted, textTransform:"uppercase", letterSpacing:".08em", marginBottom:"2px" }}>{c.label}</div>
                    <div style={{ fontSize:"13.5px", fontWeight:"600" }}>{c.v}</div>
                    <div style={{ fontSize:"11.5px", color:T.muted }}>{c.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" style={{ padding:"100px 20px", background:"linear-gradient(to bottom,transparent,rgba(139,92,246,.03),transparent)" }}>
          <div style={{ maxWidth:"760px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"54px" }}>
              <div className="sl" style={{ color:T.purple }}>Experience</div>
              <h2 className="sh2">Where I've Worked & Led</h2>
            </div>
            <div style={{ position:"relative", paddingLeft:"50px" }}>
              <div className="tl-line"/>
              {EXPERIENCE_DATA.map((exp,i) => (
                <div key={i} style={{ position:"relative", marginBottom:"24px" }}>
                  <div className="tl-dot" style={{ background:exp.color, boxShadow:`0 0 14px ${exp.color}70` }}/>
                  <div className="glass glass-h" style={{ padding:"22px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:"10px", marginBottom:"12px" }}>
                      <div>
                        <h3 style={{ fontSize:"16px", fontWeight:"600", marginBottom:"3px" }}>{exp.role}</h3>
                        <div style={{ color:exp.color, fontSize:"13.5px", fontWeight:"500" }}>{exp.org}</div>
                      </div>
                      <span style={{ padding:"4px 10px", borderRadius:"6px", background:`${exp.color}18`, color:exp.color, fontSize:"11.5px", fontWeight:"600", flexShrink:0 }}>{exp.period}</span>
                    </div>
                    <ul style={{ listStyle:"none", marginBottom:"14px" }}>
                      {exp.bullets.map((b,j) => (
                        <li key={j} style={{ display:"flex", gap:"9px", color:T.muted, fontSize:"13.5px", lineHeight:1.6, marginBottom:"5px" }}>
                          <span style={{ color:exp.color, marginTop:"5px", flexShrink:0 }}>▸</span>{b}
                        </li>
                      ))}
                    </ul>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                      {exp.tags.map(t => <span key={t} className="tag" style={{ background:`${exp.color}10`, color:exp.color, border:`1px solid ${exp.color}25` }}>{t}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" style={{ padding:"100px 20px", maxWidth:"1060px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"54px" }}>
            <div className="sl" style={{ color:T.cyan }}>Skills</div>
            <h2 className="sh2">Technical Toolkit</h2>
            <p style={{ color:T.muted, marginTop:"12px", fontSize:"16px" }}>From algorithms to interfaces — full stack and AI-native.</p>
          </div>
          <div className="grid-3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px" }}>
            {SKILL_CATS.map(({label,color,Icon,skills}) => (
              <div key={label} className="glass glass-h lift" style={{ padding:"20px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"12px", marginBottom:"16px" }}>
                  <div style={{ width:"34px", height:"34px", borderRadius:"8px", background:`${color}18`, border:`1px solid ${color}30`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><Icon size={16} style={{ color }}/></div>
                  <div>
                    <div style={{ fontSize:"13.5px", fontWeight:"600" }}>{label}</div>
                    <div style={{ fontSize:"11px", color:T.muted }}>{skills.length} skills</div>
                  </div>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"6px" }}>
                  {skills.map(s => <span key={s} className="tag" style={{ background:`${color}10`, color:`${color}CC`, border:`1px solid ${color}1F`, fontSize:"11.5px", padding:"4px 10px" }}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" style={{ padding:"100px 20px", background:"linear-gradient(to bottom,transparent,rgba(34,211,238,.02),transparent)" }}>
          <div style={{ maxWidth:"1060px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"54px" }}>
              <div className="sl" style={{ color:T.cyan }}>Projects</div>
              <h2 className="sh2">Built to Solve, Designed to Scale</h2>
            </div>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"20px", marginBottom:"20px" }}>
              {PROJECTS_DATA.map(p => (
                <div key={p.title} className="glass glass-h lift" style={{ padding:"26px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"18px" }}>
                    <span style={{ padding:"4px 10px", borderRadius:"6px", background:`${p.color}18`, color:p.color, fontSize:"11.5px", fontWeight:"600" }}>{p.badge}</span>
                    <span style={{ fontSize:"26px" }}>{p.emoji}</span>
                  </div>
                  <h3 style={{ fontSize:"18px", fontWeight:"700", marginBottom:"10px" }}>{p.title}</h3>
                  <p style={{ color:T.muted, fontSize:"13.5px", lineHeight:1.65, marginBottom:"18px" }}>{p.desc}</p>
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"10px", marginBottom:"16px" }}>
                    {p.stats.map(([num,label]) => (
                      <div key={label} style={{ textAlign:"center", padding:"9px 6px", borderRadius:"8px", background:"rgba(255,255,255,.03)", border:`1px solid ${T.border}` }}>
                        <div style={{ fontSize:"13px", fontWeight:"700", color:p.color }}>{num}</div>
                        <div style={{ fontSize:"10.5px", color:T.muted, marginTop:"2px" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:"6px", marginBottom:"18px" }}>
                    {p.tech.map(t => <span key={t} className="tag" style={{ fontSize:"11.5px" }}>{t}</span>)}
                  </div>
                  <div style={{ display:"flex", gap:"8px" }}>
                    <button className="btn-o" style={{ flex:1, justifyContent:"center", padding:"9px", fontSize:"12.5px" }}><ExternalLink size={13}/> View Project</button>
                    <button className="btn-o" style={{ padding:"9px 13px" }}><Github size={13}/></button>
                  </div>
                </div>
              ))}
            </div>
            <div className="lift" onClick={() => scrollTo("placeme")} style={{ padding:"28px 32px", borderRadius:"16px", cursor:"pointer", background:"linear-gradient(135deg,rgba(139,92,246,.08),rgba(34,211,238,.05))", border:"1px solid rgba(139,92,246,.24)", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:"18px", transition:"all .3s ease" }} onMouseEnter={e => e.currentTarget.style.borderColor="rgba(139,92,246,.5)"} onMouseLeave={e => e.currentTarget.style.borderColor="rgba(139,92,246,.24)"}>
              <div>
                <span style={{ padding:"4px 12px", borderRadius:"6px", background:"rgba(139,92,246,.2)", color:T.purpleLight, fontSize:"11.5px", fontWeight:"600", display:"inline-block", marginBottom:"10px" }}>🚀 Flagship AI Product</span>
                <h3 style={{ fontSize:"22px", fontWeight:"700", marginBottom:"6px", ...gt() }}>PlaceMe</h3>
                <p style={{ color:T.muted, fontSize:"14px" }}>AI-powered placement platform with ATS scoring, resume analysis, and intelligent career guidance.</p>
              </div>
              <button className="btn-p">See Full Case Study <ChevronRight size={15}/></button>
            </div>
          </div>
        </section>

        {/* PLACEME */}
        <section id="placeme" style={{ padding:"100px 20px", background:"radial-gradient(ellipse at 50% 0%,rgba(139,92,246,.08) 0%,transparent 65%)" }}>
          <div style={{ maxWidth:"1060px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"60px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"6px 14px", borderRadius:"100px", background:"rgba(139,92,246,.1)", border:"1px solid rgba(139,92,246,.3)", fontSize:"12px", color:T.purpleLight, fontWeight:"600", marginBottom:"18px" }}>🚀 Flagship Project · AI-Powered Product</div>
              <h2 style={{ fontSize:"clamp(40px,7vw,68px)", fontWeight:"700", letterSpacing:"-.03em", marginBottom:"14px", ...gt() }}>PlaceMe</h2>
              <p style={{ fontSize:"17px", color:T.muted, maxWidth:"560px", margin:"0 auto", lineHeight:1.65 }}>The AI-powered placement platform that transforms how students prepare, apply, and land their dream jobs.</p>
            </div>
            <div className="g3sm" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"14px", marginBottom:"44px" }}>
              {[{n:"10+",l:"Core Features",s:"End-to-end placement flow",c:T.purple},{n:"RAG",l:"Architecture",s:"LangChain + Vector DB",c:T.cyan},{n:"AI-First",l:"Product Design",s:"Gemini / OpenAI powered",c:T.green}].map(m => (
                <div key={m.l} className="glass" style={{ padding:"22px", textAlign:"center" }}>
                  <div style={{ fontSize:"26px", fontWeight:"700", color:m.c, marginBottom:"4px" }}>{m.n}</div>
                  <div style={{ fontSize:"13.5px", fontWeight:"600", marginBottom:"3px" }}>{m.l}</div>
                  <div style={{ fontSize:"12px", color:T.muted }}>{m.s}</div>
                </div>
              ))}
            </div>
            <div style={{ marginBottom:"40px" }}>
              <h3 style={{ fontSize:"17px", fontWeight:"600", marginBottom:"20px" }}>Core Features</h3>
              <div className="g3sm" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"12px" }}>
                {[
                  {e:"📄",t:"ATS Score Generator",d:"Analyze resumes against JDs and get instant ATS scores with optimization tips."},
                  {e:"🎯",t:"Job Match Engine",d:"Semantic job matching using vector embeddings for precise role alignment."},
                  {e:"🤖",t:"AI Career Assistant",d:"RAG-powered chatbot answering career questions using personalized context."},
                  {e:"📊",t:"Application Tracker",d:"End-to-end placement pipeline tracker with status updates and analytics."},
                  {e:"🏢",t:"Company Intelligence",d:"AI-generated company research summaries and interview preparation guides."},
                  {e:"💬",t:"Mock Interviews",d:"AI-powered mock interview sessions with role-specific technical questions."},
                  {e:"✨",t:"Resume Optimizer",d:"Intelligent resume rewriting suggestions aligned with target job descriptions."},
                  {e:"🔍",t:"Skill Gap Analysis",d:"Identifies missing skills and recommends learning paths for target roles."},
                  {e:"📈",t:"Placement Analytics",d:"Personal dashboards with application insights and success probability scores."},
                ].map(f => (
                  <div key={f.t} className="pm-feat">
                    <div style={{ fontSize:"22px", marginBottom:"9px" }}>{f.e}</div>
                    <div style={{ fontSize:"13.5px", fontWeight:"600", marginBottom:"5px" }}>{f.t}</div>
                    <div style={{ fontSize:"12px", color:T.muted, lineHeight:1.55 }}>{f.d}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass" style={{ padding:"28px", marginBottom:"28px" }}>
              <h3 style={{ fontSize:"16px", fontWeight:"600", marginBottom:"20px" }}>System Architecture</h3>
              <div className="arch-grid" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"14px" }}>
                {[
                  {layer:"Frontend",items:["Next.js 15","TypeScript","Tailwind + Shadcn","Framer Motion"],c:T.cyan},
                  {layer:"Backend",items:["Next.js API Routes","FastAPI","LangChain","RAG Pipeline"],c:T.purple},
                  {layer:"AI Layer",items:["Gemini / OpenAI","Pinecone Vector DB","Embeddings","RAG Architecture"],c:T.green},
                  {layer:"Data + Auth",items:["Supabase PostgreSQL","Clerk Auth","File Storage","Real-time"],c:T.amber},
                ].map(l => (
                  <div key={l.layer} style={{ padding:"14px", borderRadius:"10px", background:"rgba(255,255,255,.02)", border:`1px solid ${l.c}1F` }}>
                    <div style={{ fontSize:"11px", fontWeight:"700", color:l.c, textTransform:"uppercase", letterSpacing:".08em", marginBottom:"10px" }}>{l.layer}</div>
                    {l.items.map(item => <div key={item} style={{ fontSize:"12px", color:T.muted, padding:"4px 0", borderBottom:"1px solid rgba(255,255,255,.04)" }}>{item}</div>)}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", justifyContent:"center" }}>
              {["Next.js 15","TypeScript","Tailwind","FastAPI","Gemini API","LangChain","Pinecone","Supabase","Clerk","Vercel","OpenAI","RAG"].map(t => (
                <span key={t} className="tag" style={{ background:"rgba(139,92,246,.08)", color:T.purpleLight, border:"1px solid rgba(139,92,246,.2)", padding:"7px 14px", fontSize:"12.5px" }}>{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* AI CHAT */}
        <section id="ai" style={{ padding:"100px 20px", maxWidth:"740px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"44px" }}>
            <div className="sl" style={{ color:T.purple }}>AI Assistant</div>
            <h2 className="sh2">Ask Avishi AI</h2>
            <p style={{ color:T.muted, marginTop:"12px", fontSize:"16px" }}>Trained on Avishi's resume, projects, and experience.</p>
          </div>
          <div className="glass" style={{ borderRadius:"20px", overflow:"hidden" }}>
            <div style={{ padding:"14px 22px", borderBottom:`1px solid ${T.border}`, display:"flex", alignItems:"center", gap:"12px", background:"rgba(139,92,246,.05)" }}>
              <div style={{ width:"34px", height:"34px", borderRadius:"9px", background:"linear-gradient(135deg,#8B5CF6,#22D3EE)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px" }}>🤖</div>
              <div>
                <div style={{ fontSize:"14px", fontWeight:"600" }}>Avishi's AI Assistant</div>
                <div style={{ fontSize:"12px", color:T.green, display:"flex", alignItems:"center", gap:"4px" }}>
                  <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:T.green, display:"inline-block" }}/>
                  Online · Powered by Claude
                </div>
              </div>
            </div>
            <div style={{ height:"360px", overflowY:"auto", padding:"20px", display:"flex", flexDirection:"column", gap:"14px" }}>
              {messages.map((m,i) => (
                <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
                  <div style={{ maxWidth:"82%", padding:"11px 14px", lineHeight:1.65, fontSize:"13.5px", borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px", background:m.role==="user"?"linear-gradient(135deg,#8B5CF6,#7C3AED)":"rgba(255,255,255,.05)", border:m.role==="user"?"none":`1px solid ${T.border}`, color:T.text }}>
                    {m.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div style={{ display:"flex", gap:"5px", alignItems:"center", padding:"11px 14px", width:"fit-content", borderRadius:"14px 14px 14px 4px", background:"rgba(255,255,255,.05)", border:`1px solid ${T.border}` }}>
                  <span className="tdot"/><span className="tdot"/><span className="tdot"/>
                </div>
              )}
              <div ref={chatEndRef}/>
            </div>
            {messages.length <= 1 && (
              <div style={{ padding:"0 20px 14px", display:"flex", gap:"7px", flexWrap:"wrap" }}>
                {["What did Avishi do at C-DAC?","Tell me about PlaceMe","Strongest technical skills?","Explain face recognition project"].map(q => (
                  <button key={q} onClick={() => setChatInput(q)} style={{ padding:"7px 12px", borderRadius:"7px", background:"rgba(139,92,246,.08)", border:"1px solid rgba(139,92,246,.2)", color:T.purpleLight, fontSize:"12px", cursor:"pointer", fontFamily:'"Space Grotesk",sans-serif', fontWeight:"500" }}>{q}</button>
                ))}
              </div>
            )}
            <div style={{ padding:"14px 20px", borderTop:`1px solid ${T.border}`, display:"flex", gap:"10px", alignItems:"center" }}>
              <input value={chatInput} onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key==="Enter" && sendMessage()} placeholder="Ask about experience, projects, skills..." style={{ flex:1, background:"rgba(255,255,255,.04)", border:`1px solid ${T.border}`, borderRadius:"9px", padding:"11px 14px", color:T.text, fontSize:"13.5px", fontFamily:'"Space Grotesk",sans-serif', outline:"none", transition:"border-color .2s" }} onFocus={e => e.target.style.borderColor=T.purple} onBlur={e => e.target.style.borderColor=T.border}/>
              <button className="btn-p" onClick={sendMessage} disabled={isTyping} style={{ padding:"11px 14px", opacity:isTyping?0.6:1 }}><Send size={15}/></button>
            </div>
          </div>
        </section>

        {/* ACHIEVEMENTS */}
        <section id="achievements" style={{ padding:"100px 20px", maxWidth:"840px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"54px" }}>
            <div className="sl" style={{ color:T.amber }}>Achievements</div>
            <h2 className="sh2">Recognition & Milestones</h2>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:"14px" }}>
            {ACHIEVEMENTS_DATA.map(a => (
              <div key={a.title} className="glass glass-h lift" style={{ padding:"22px", display:"flex", alignItems:"center", gap:"18px", flexWrap:"wrap" }}>
                <div style={{ width:"52px", height:"52px", borderRadius:"13px", flexShrink:0, background:`${a.color}18`, border:`1px solid ${a.color}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"26px" }}>{a.emoji}</div>
                <div style={{ flex:1, minWidth:"180px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap", marginBottom:"5px" }}>
                    <h3 style={{ fontSize:"15.5px", fontWeight:"600" }}>{a.title}</h3>
                    <span style={{ padding:"3px 9px", borderRadius:"6px", background:`${a.color}18`, color:a.color, fontSize:"11px", fontWeight:"700", textTransform:"uppercase", letterSpacing:".06em", flexShrink:0 }}>{a.badge}</span>
                  </div>
                  <p style={{ color:T.muted, fontSize:"13px", lineHeight:1.6 }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RECRUITER HUB */}
        <section id="recruiter" style={{ padding:"100px 20px", background:"radial-gradient(ellipse at 50% 50%,rgba(139,92,246,.06) 0%,transparent 65%)" }}>
          <div style={{ maxWidth:"860px", margin:"0 auto" }}>
            <div style={{ textAlign:"center", marginBottom:"54px" }}>
              <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", padding:"6px 14px", borderRadius:"100px", background:"rgba(139,92,246,.1)", border:"1px solid rgba(139,92,246,.3)", fontSize:"12px", color:T.purpleLight, fontWeight:"600", marginBottom:"18px" }}>👔 For Recruiters</div>
              <h2 className="sh2" style={{ marginBottom:"10px" }}>Recruiter Hub</h2>
              <p style={{ color:T.muted, fontSize:"15px" }}>Everything you need to evaluate Avishi — in one place.</p>
            </div>
            <div className="grid-2" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"20px", marginBottom:"28px" }}>
              <div className="glass" style={{ padding:"26px" }}>
                <h3 style={{ fontSize:"15px", fontWeight:"600", marginBottom:"18px" }}>📋 Quick Profile</h3>
                {[["Name","Avishi Sharma"],["Degree","B.Tech CS (Info Security)"],["University","VIT Vellore"],["CGPA","9.04 / 10"],["Primary Role","AI/ML Engineer · Full Stack"],["Experience","C-DAC AI/ML Internship"],["Availability","Immediately Available"],["Location","India · Open to Relocation"]].map(([k,v]) => (
                  <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"9px 0", borderBottom:`1px solid ${T.border}`, gap:"10px" }}>
                    <span style={{ color:T.muted, fontSize:"12.5px", flexShrink:0 }}>{k}</span>
                    <span style={{ color:T.text, fontSize:"12.5px", fontWeight:"500", textAlign:"right" }}>{v}</span>
                  </div>
                ))}
              </div>
              <div className="glass" style={{ padding:"26px" }}>
                <h3 style={{ fontSize:"15px", fontWeight:"600", marginBottom:"18px" }}>⚡ Core Competencies</h3>
                {[{s:"AI/ML & Computer Vision",l:92,c:T.purple},{s:"Python & Deep Learning",l:90,c:T.purple},{s:"Full Stack Development",l:85,c:T.cyan},{s:"React & TypeScript",l:85,c:T.cyan},{s:"DS & Algorithms",l:87,c:T.green},{s:"System Design",l:78,c:T.amber}].map(({s,l,c}) => (
                  <div key={s} style={{ marginBottom:"14px" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"5px" }}>
                      <span style={{ fontSize:"12.5px" }}>{s}</span>
                      <span style={{ fontSize:"11.5px", color:c }}>{l}%</span>
                    </div>
                    <div style={{ height:"4px", borderRadius:"2px", background:"rgba(255,255,255,.06)" }}>
                      <div style={{ height:"100%", borderRadius:"2px", width:`${l}%`, background:`linear-gradient(to right,${c},${c}88)` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", gap:"14px", flexWrap:"wrap", justifyContent:"center" }}>
              <button className="btn-p" style={{ fontSize:"14px", padding:"13px 26px" }}><Download size={15}/> Download Resume</button>
              <a href="mailto:avishi.sharma@email.com" className="btn-o" style={{ fontSize:"14px", padding:"13px 26px" }}><Mail size={15}/> avishi.sharma@email.com</a>
              <button className="btn-o" style={{ fontSize:"14px", padding:"13px 26px" }}><Linkedin size={15}/> LinkedIn</button>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" style={{ padding:"100px 20px", maxWidth:"680px", margin:"0 auto", textAlign:"center" }}>
          <div className="sl" style={{ color:T.purple }}>Contact</div>
          <h2 style={{ fontSize:"clamp(34px,6vw,56px)", fontWeight:"700", letterSpacing:"-.025em", marginBottom:"14px", lineHeight:1.1 }}>
            Let's Build Something <span style={gt()}>Remarkable</span>
          </h2>
          <p style={{ color:T.muted, fontSize:"16px", lineHeight:1.65, marginBottom:"44px" }}>Open to AI/ML roles, full stack opportunities, research collaborations, and interesting product ideas.</p>
          <div className="glass" style={{ padding:"36px", marginBottom:"28px" }}>
            <div style={{ fontSize:"32px", marginBottom:"14px" }}>📧</div>
            <div style={{ fontSize:"19px", fontWeight:"600", marginBottom:"6px" }}>avishi.sharma@email.com</div>
            <div style={{ color:T.muted, fontSize:"13.5px", marginBottom:"22px" }}>Response within 24 hours</div>
            <a href="mailto:avishi.sharma@email.com" className="btn-p" style={{ textDecoration:"none" }}><Mail size={15}/> Send a Message</a>
          </div>
          <div style={{ display:"flex", gap:"14px", justifyContent:"center", flexWrap:"wrap" }}>
            {[{Icon:Github,label:"GitHub"},{Icon:Linkedin,label:"LinkedIn"},{Icon:Globe,label:"Portfolio"}].map(({Icon,label}) => (
              <button key={label} className="btn-o" style={{ fontSize:"14px" }}><Icon size={15}/> {label}</button>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding:"28px 20px", borderTop:`1px solid ${T.border}`, maxWidth:"1060px", margin:"0 auto", display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:"14px" }}>
          <div style={{ color:T.muted, fontSize:"13px" }}>© 2024 Avishi Sharma · Built with ❤️ and AI</div>
          <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
            {["Python","React","OpenCV","Next.js","AI/ML"].map(t => (
              <span key={t} style={{ padding:"4px 10px", borderRadius:"6px", background:"rgba(139,92,246,.08)", color:T.purpleLight, fontSize:"11px", fontWeight:"500" }}>{t}</span>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}
