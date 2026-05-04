import { useEffect, useRef, useState } from 'react';
import './App.css';

const CONTACT_EMAIL = 'priyank8445@gmail.com';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;
const LINKEDIN_URL = 'https://www.linkedin.com/in/priyank766/';
const GITHUB_URL = 'https://github.com/priyank766';
const X_URL = 'https://x.com/priyank_766';

const navLinks = [
  { id: 'about', label: 'about' },
  { id: 'work', label: 'work' },
  { id: 'projects', label: 'projects' },
  { id: 'research', label: 'research' },
  { id: 'stack', label: 'stack' },
];

const sideIndexIds = ['top', 'about', 'work', 'projects', 'research', 'stack', 'freelance', 'contact'];

const experiences = [
  {
    date: 'Nov\'2025 — Jan\'2026',
    company: 'ChaitanyaAI',
    meta: 'Remote · Internship',
    role: 'AI / ML Intern',
    detail:
      'Architected end-to-end MLOps pipelines for automated training and deployment. Reduced model latency through quantization and integration tuning. Built a conversational voice agent with realtime STT/TTS and a monitoring stack tracking drift and system health.',
    tags: ['MLOps', 'Quantization', 'Voice AI', 'Monitoring'],
  },
  {
    date: 'Oct\'2025 — Dec\'2025',
    company: 'Zenith India',
    meta: 'Remote · Internship',
    role: 'AI / ML Intern',
    detail:
      'Developed a finance Prompt Evaluator using sentence-transformers and RAG. Engineered a GEO Agent to analyse LLM ranking patterns for web visibility. Built an AI Fashion Trend Monitor with Selenium for automated extraction.',
    tags: ['RAG', 'Sentence-Transformers', 'GEO', 'Selenium'],
  },
    {
    date: 'Dec\'2025 — Jan\'2026',
    company: 'Innover-Global',
    meta: 'Remote · Freelance',
    role: 'Full-Stack Engineer',
    detail:
      'Engineered a global fund-transfer platform with Stripe, Razorpay, Cashfree and Zumrails. Built the admin dashboard for real-time monitoring; implemented one-time, recurring and subscription payment flows; integrated third-party KYC for automated user verification.',
    tags: ['Next.js', 'FastAPI', 'Postgres', 'Multi-Gateway'],
  }
];

const stackGroups = [
  { title: ['Agentic', 'AI', 'left'], items: ['LangGraph · LangChain', 'Multi-agent systems', 'ReAct · Tool-use', 'MCP servers', 'Google ADK · A2A'] },
  { title: ['LLM &', 'GenAI', 'right'], items: ['Gemini · OpenAI', 'Ollama · Local LLMs', 'RAG systems', 'Prompt engineering', 'QLoRA fine-tuning'] },
  { title: ['ML', 'Research', 'right'], items: ['PyTorch · TensorFlow', 'Domain adaptation', 'Computer vision', 'Sentence-transformers', 'STT / TTS'] },
  { title: ['', 'MLOps', 'left'], items: ['Docker · Kubernetes', 'Model quantization', 'Drift monitoring', 'CI/CD', 'Triton · vLLM'] },
  { title: ['', 'Frontend', 'left'], items: ['React · Next.js', 'TypeScript', 'Three.js · R3F', 'Tailwind', 'Zustand'] },
  { title: ['', 'Backend', 'left'], items: ['FastAPI · Python', 'Node.js', 'WebSockets · SSE', 'SQLAlchemy', 'REST + RPC'] },
  { title: ['', 'Fintech', 'left'], items: ['Stripe · Razorpay', 'Cashfree · Zumrails', 'KYC integrations', 'Recurring billing', 'Multi-gateway routing'] },
  { title: ['', 'Data', 'left'], items: ['PostgreSQL · MongoDB', 'SQLite · Redis', 'Vector stores', 'TFRecord pipelines', 'RDKit · Pandas'] },
];

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.69 0 3.84-2.34 4.69-4.57 4.94.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.13 20.16 22 16.42 22 12 22 6.48 17.52 2 12 2z" />
  </svg>
);

const LinkedInIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14zM8.34 18.34V10.5H5.67v7.84h2.67zM7 9.34a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zM18.34 18.34v-4.3c0-2.3-1.23-3.36-2.86-3.36-1.32 0-1.91.73-2.24 1.24V10.5h-2.67v7.84h2.67v-4.36c0-.24.02-.48.09-.65.19-.48.62-.97 1.35-.97.95 0 1.33.72 1.33 1.78v4.2h2.33z" />
  </svg>
);

const XIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
);

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const PinIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 6v6l4 2" />
  </svg>
);

function StackTitle({ pre, em, em_position }) {
  if (em_position === 'right') {
    return <>{pre} <em>{em}</em></>;
  }
  return <><em>{em}</em>{pre ? <> {pre}</> : null}</>;
}

function ProjectCardCortex() {
  return (
    <div className="project__visual pv-cortex">
      <div className="pv">
        <div className="pv__head"><span><span className="pv__head-dot" />cortex / agent loop</span><span>v0.4.1</span></div>
        <div className="pv__terminal">
          <div><span className="acc">user</span> → analyze ./project/src</div>
          <div><span className="ok">✓</span> file_search · 28 files</div>
          <div><span className="ok">✓</span> file_read · main.py</div>
          <div><span className="key">⟳</span> shell_exec · pytest <span className="ok">[approved]</span></div>
          <div><span className="ok">✓</span> 14 passed · 2 skipped</div>
          <div><span className="acc">_</span></div>
        </div>
        <div className="pv__rule" />
        <div className="pv__title">React · FastAPI · Docker sandbox</div>
      </div>
    </div>
  );
}

function ProjectCardBio() {
  return (
    <div className="project__visual pv-bio">
      <div className="pv">
        <div className="pv__head"><span><span className="pv__head-dot" />bioagent · langgraph</span><span>p53 / aspirin</span></div>
        <svg className="pv__shape" style={{ top: '30%', left: '10%', width: '80%', height: '50%' }} viewBox="0 0 400 200" preserveAspectRatio="none">
          <defs>
            <linearGradient id="bgrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#c4623a" stopOpacity="0" />
              <stop offset="50%" stopColor="#c4623a" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#c4623a" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,100 Q40,50 80,80 T160,90 T240,70 T320,110 T400,80" stroke="url(#bgrad)" strokeWidth="1.5" fill="none" />
          <path d="M0,120 Q40,70 80,100 T160,110 T240,90 T320,130 T400,100" stroke="url(#bgrad)" strokeWidth="1" fill="none" opacity="0.6" />
          <circle cx="80" cy="80" r="3" fill="#c4623a" />
          <circle cx="160" cy="90" r="3" fill="#c4623a" />
          <circle cx="240" cy="70" r="3" fill="#c4623a" />
          <circle cx="320" cy="110" r="3" fill="#c4623a" />
        </svg>
        <div className="pv__title" style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>AlphaFold · P2Rank · AutoDock Vina</div>
      </div>
    </div>
  );
}

function ProjectCardHermes() {
  return (
    <div className="project__visual pv-hermes">
      <div className="pv">
        <div className="pv__head"><span><span className="pv__head-dot" />hermes-bio · investigate</span><span>6 / 6 verified</span></div>
        <div className="pv__terminal" style={{ marginTop: 16 }}>
          <div><span className="acc">disease</span> · type 2 diabetes mellitus</div>
          <div><span className="key">→</span> target picked · <span className="ok">PPARG (P37231)</span></div>
          <div><span className="key">→</span> structure · PDB 1FM6</div>
          <div><span className="key">→</span> top approved · <span className="ok">Rosiglitazone</span></div>
          <div><span className="acc">repurpose</span> · cross-indication</div>
          <div><span className="key">→</span> Sirolimus · Tacrolimus · Farglitazar</div>
        </div>
        <div className="pv__rule" />
        <div className="pv__title">UniProt · OpenTargets · ChEMBL · MCP</div>
      </div>
    </div>
  );
}

function ProjectCardCAD() {
  return (
    <div className="project__visual pv-cad">
      <div className="pv">
        <div className="pv__head"><span><span className="pv__head-dot" />cadai · scene</span><span>three.js</span></div>
        <svg className="pv__shape" style={{ top: '25%', left: '50%', transform: 'translateX(-50%)', width: 200, height: 140 }} viewBox="0 0 200 140">
          <g stroke="#c4623a" strokeWidth="1" fill="none" opacity="0.8">
            <path d="M40,40 L120,40 L160,20 L160,100 L120,120 L40,120 Z" />
            <path d="M40,40 L40,120" />
            <path d="M120,40 L120,120" />
            <path d="M40,40 L80,20 L160,20" />
            <path d="M80,20 L80,100 L120,120" />
            <path d="M80,100 L40,120" />
          </g>
          <circle cx="160" cy="20" r="2" fill="#c4623a" />
          <circle cx="40" cy="40" r="2" fill="#c4623a" />
          <circle cx="120" cy="120" r="2" fill="#c4623a" />
        </svg>
        <div className="pv__terminal" style={{ position: 'absolute', bottom: 24, left: 24, right: 24 }}>
          <div><span className="acc">create_shape</span> · cylinder r=12</div>
          <div><span className="acc">boolean_subtract</span> · base ∖ cyl</div>
          <div><span className="acc">apply_material</span> · brushed_steel</div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('pp-theme');
    return stored === 'light' || stored === 'dark' ? stored : 'light';
  });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('top');
  const spotlightRef = useRef(null);

  const [formData, setFormData] = useState({ name: '', email: '', message: '', honey: '' });
  const [formState, setFormState] = useState({ status: 'idle', message: '' });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pp-theme', theme);
  }, [theme]);

  useEffect(() => {
    const onMove = (e) => {
      const sp = spotlightRef.current;
      if (!sp) return;
      const r = sp.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width) * 100;
      const y = ((e.clientY - r.top) / r.height) * 100;
      sp.style.setProperty('--mx', x + '%');
      sp.style.setProperty('--my', y + '%');
    };
    document.addEventListener('mousemove', onMove);
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let active = 'top';
      for (const id of sideIndexIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= window.innerHeight * 0.4) active = id;
      }
      setActiveSection(active);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const isSubmitting = formState.status === 'submitting';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting || formData.honey) return;
    setFormState({ status: 'submitting', message: 'Sending your message...' });
    const payload = new FormData();
    payload.append('name', formData.name.trim());
    payload.append('email', formData.email.trim());
    payload.append('message', formData.message.trim());
    payload.append('_subject', 'New portfolio message');
    payload.append('_template', 'table');
    payload.append('_captcha', 'false');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: payload,
      });
      const ct = response.headers.get('content-type') || '';
      const result = ct.includes('application/json') ? await response.json() : { message: await response.text() };
      const fail = result && (result.success === false || result.success === 'false');
      if (!response.ok || fail) throw new Error(result?.message || 'Message failed');
      setFormState({ status: 'success', message: "Sent · I'll be in touch within 24 hours." });
      setFormData({ name: '', email: '', message: '', honey: '' });
    } catch (err) {
      setFormState({
        status: 'error',
        message: `Could not send right now. Please email me directly at ${CONTACT_EMAIL}.`,
      });
    }
  };

  return (
    <>
      <nav className={`nav${scrolled ? ' is-scrolled' : ''}`}>
        <div className="container nav__inner">
          <a href="#top" className="nav__brand">
            <span className="nav__brand-dot" />
            Priyank Patel
          </a>
          <div className="nav__menu">
            {navLinks.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="nav__link">{l.label}</a>
            ))}
          </div>
          <div className="nav__right">
            <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
              <span className="theme-toggle__thumb">
                {theme === 'dark' ? (
                  <svg className="theme-toggle__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" /></svg>
                ) : (
                  <svg className="theme-toggle__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" /></svg>
                )}
              </span>
            </button>
            <a href="#contact" className="nav__cta">Get in touch</a>
          </div>
        </div>
      </nav>

      <div className="side-index">
        {sideIndexIds.map((id) => (
          <a key={id} href={`#${id}`} className={`side-index__dot${activeSection === id ? ' active' : ''}`} title={id} />
        ))}
      </div>

      {/* HERO */}
      <section className="hero" id="top">
        <div className="hero__grid-bg" />
        <div className="hero__spotlight" ref={spotlightRef} />
        <div className="container hero__inner">
          <div className="hero__top">
            <span className="hero__location"><span className="hero__live-dot" />Ahmedabad, India · 23.0225°N</span>
            <span className="hero__year">© Folio · Index MMXXVI</span>
          </div>

          <h1 className="hero__title">
            <span className="hero__title-line"><span className="hero__title-inner">Engineering</span></span>
            <span className="hero__title-line"><span className="hero__title-inner"><em>autonomous</em> systems</span></span>
            <span className="hero__title-line"><span className="hero__title-inner"><span className="stroke">that think</span>.</span></span>
          </h1>

          <div className="hero__bottom">
            <p className="hero__lede">
              AI/ML engineer working at the intersection of agentic AI, applied ML research, and production-grade fintech infrastructure.
            </p>
            <div className="hero__meta">
              <div className="hero__meta-row"><span className="hero__meta-key">[ROLE]</span><span className="hero__meta-val">AI / ML Engineer</span></div>
              <div className="hero__meta-row"><span className="hero__meta-key">[EDU]</span><span className="hero__meta-val">B.E AI &amp; ML · LDCE · 8.4 CGPA</span></div>
              <div className="hero__meta-row"><span className="hero__meta-key">[STATUS]</span><span className="hero__meta-val">Open to opportunities</span></div>
              <div className="hero__rotating">
                <span>currently shipping</span>
                <span className="hero__rotating-track">
                  <span className="hero__rotating-list">
                    <span>Autonomous Agents</span>
                    <span>Fintech Systems</span>
                    <span>Voice AI</span>
                    <span>Deepfake Research</span>
                    <span>Autonomous Agents</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="hero__scroll-cue">
          <span>Scroll</span>
          <span className="hero__scroll-line" />
        </div>
      </section>

      {/* ABOUT */}
      <section className="section section--invert" id="about">
        <div className="container">
          <div className="section__head reveal">
            <div>
              <span className="eyebrow">About</span>
              <h2 className="section-title">A quiet <em>obsession</em><br />with systems<br />that <em>act</em>.</h2>
            </div>
            <p className="section__head-sub">
              Building AI that doesn't just talk — it reasons, decides, and ships work. From research labs to production fintech.
            </p>
          </div>

          <div className="about__grid reveal">
            <div className="portrait">
              <svg className="portrait__svg" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                <defs>
                  <linearGradient id="ringG" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#c4623a" stopOpacity="0" />
                    <stop offset="50%" stopColor="#c4623a" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#c4623a" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id="orbG" cx="0.4" cy="0.35" r="0.7">
                    <stop offset="0%" stopColor="#e89968" stopOpacity="1" />
                    <stop offset="50%" stopColor="#c4623a" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="#5a2c18" stopOpacity="1" />
                  </radialGradient>
                  <radialGradient id="haloG" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0%" stopColor="#c4623a" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#c4623a" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <circle cx="200" cy="220" r="180" fill="url(#haloG)" />
                <ellipse cx="200" cy="220" rx="160" ry="60" fill="none" stroke="url(#ringG)" strokeWidth="1" transform="rotate(-12 200 220)" />
                <ellipse cx="200" cy="220" rx="170" ry="40" fill="none" stroke="url(#ringG)" strokeWidth="1" transform="rotate(20 200 220)" opacity="0.6" />
                <ellipse cx="200" cy="220" rx="140" ry="80" fill="none" stroke="url(#ringG)" strokeWidth="0.8" transform="rotate(-30 200 220)" opacity="0.5" />
                <circle cx="200" cy="220" r="100" fill="url(#orbG)" />
                <circle cx="170" cy="195" r="35" fill="#f5d4a8" opacity="0.4" />
                <circle cx="220" cy="200" r="5" fill="#3a1a0c" opacity="0.45" />
                <circle cx="190" cy="245" r="3" fill="#3a1a0c" opacity="0.4" />
                <circle cx="240" cy="250" r="6" fill="#3a1a0c" opacity="0.5" />
                <circle cx="170" cy="240" r="2" fill="#3a1a0c" opacity="0.35" />
                <circle cx="225" cy="175" r="2" fill="#3a1a0c" opacity="0.35" />
                <circle cx="60" cy="80" r="1" fill="#f5f1ea" opacity="0.7" />
                <circle cx="340" cy="60" r="1.5" fill="#f5f1ea" opacity="0.85" />
                <circle cx="80" cy="400" r="1" fill="#f5f1ea" opacity="0.6" />
                <circle cx="350" cy="430" r="1.2" fill="#f5f1ea" opacity="0.7" />
                <g stroke="#f5f1ea" strokeWidth="0.6" opacity="0.4" fill="none">
                  <line x1="350" y1="100" x2="370" y2="100" />
                  <line x1="360" y1="90" x2="360" y2="110" />
                  <circle cx="360" cy="100" r="6" />
                </g>
              </svg>
              <div className="portrait__overlay">
                <div className="portrait__corners"><span>P · P</span><span>FIG. 01</span></div>
                <div className="portrait__sig">Priyank<small>AI Engineer · est. 2025</small></div>
                <div className="portrait__bottom"><span>Ahmedabad · IN</span><span>23.0225°N</span></div>
              </div>
            </div>

            <div className="about__copy">
              <h3>I architect <em>autonomous</em> systems and ship the rest of the stack myself.</h3>
              <p>I'm <strong>Priyank Patel</strong>, an AI Engineer pursuing B.E in AI &amp; ML at LD College of Engineering with a CGPA of 8.4. My focus sits at the intersection of <strong>agentic AI</strong>, applied ML research, and <strong>production fintech infrastructure</strong>.</p>
              <p>I'm currently building MLOps pipelines, Gujarati-first vernacular voice agents, and multi-gateway payment systems for global transactions. Outside of contracts, I research <strong>recursive language models</strong> and <strong>deepfake detection via domain adversarial training</strong>.</p>
              <p>I prefer software that does work over software that explains itself.</p>
              <div className="about__stats">
                <div><div className="about__stat-num"><em>10</em>+</div><div className="about__stat-label">Shipped projects</div></div>
                <div><div className="about__stat-num"><em>3</em></div><div className="about__stat-label">Engineering roles</div></div>
                <div><div className="about__stat-num"><em>2</em></div><div className="about__stat-label">Research lines</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="section section--alt" id="work">
        <div className="container">
          <div className="section__head reveal">
            <div>
              <span className="eyebrow">Selected work</span>
              <h2 className="section-title">Where I've <em>shipped</em>.</h2>
            </div>
            <p className="section__head-sub">
              Three engagements across AI research, MLOps, and fintech — one on retainer, two through end of year.
            </p>
          </div>
          <div className="exp__list reveal">
            {experiences.map((x) => (
              <div className="exp__row" key={x.company}>
                <div className="exp__date">{x.date}</div>
                <div>
                  <div className="exp__company">{x.company}</div>
                  <div className="exp__company-meta">{x.meta}</div>
                </div>
                <div>
                  <div className="exp__role">{x.role}</div>
                  <div className="exp__role-detail">{x.detail}</div>
                </div>
                <div className="exp__tags">
                  {x.tags.map((t) => <span key={t} className="exp__tag">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section className="section section--invert" id="projects">
        <div className="container">
          <div className="section__head reveal">
            <div>
              <span className="eyebrow">Selected projects</span>
              <h2 className="section-title">Things I've <em>built</em>.</h2>
            </div>
            <p className="section__head-sub">
              Production agents and research-grade systems. Each one ships, each one solves a real problem.
            </p>
          </div>

          <div className="projects__list reveal">
            <article className="project">
              <div className="project__head">
                <h3><em>Cortex</em></h3>
                <div className="project__sub">Open-source agent workspace</div>
                <ProjectCardCortex />
              </div>
              <div className="project__body">
                <p className="project__desc">
                  An agent workspace that operates inside a real project folder instead of stopping at chat. ReAct-style reasoning loop with scoped file access, persistent SQLite conversations, and Docker-sandboxed shell execution with approval controls.
                </p>
                <div className="project__highlight">
                  Streams progress, tool calls, artifacts and diffs to the UI in real-time — not a chatbot, a working colleague.
                </div>
                <div className="project__tags">
                  {['React', 'FastAPI', 'Gemini', 'Ollama', 'Docker', 'WebSocket'].map((t) => <span key={t} className="project__tag">{t}</span>)}
                </div>
                <div className="project__links">
                  <a href="https://github.com/priyank766/Cortex" target="_blank" rel="noopener noreferrer" className="project__link">
                    <GithubIcon />GitHub
                  </a>
                </div>
              </div>
            </article>

            <article className="project">
              <div className="project__head">
                <h3><em>BioAgent</em></h3>
                <div className="project__sub">Agentic structural biology platform</div>
                <ProjectCardBio />
              </div>
              <div className="project__body">
                <p className="project__desc">
                  An AI research assistant for structural biology — natural language in, autonomous LangGraph agent out. Plans, executes, recovers across AlphaFold DB, P2Rank pocket detection, AutoDock Vina docking and Foldseek similarity search.
                </p>
                <div className="project__highlight">
                  "Find binding pockets in p53 and dock aspirin into the largest one." — and it does.
                </div>
                <div className="project__tags">
                  {['LangGraph', 'FastAPI', 'AlphaFold', 'NGL Viewer', 'Cytoscape'].map((t) => <span key={t} className="project__tag">{t}</span>)}
                </div>
                <div className="project__links">
                  <a href="https://github.com/priyank766/BioAgent-ALPHAFOLD" target="_blank" rel="noopener noreferrer" className="project__link">
                    <GithubIcon />GitHub
                  </a>
                </div>
              </div>
            </article>

            <article className="project">
              <div className="project__head">
                <h3><em>Hermes</em>-BIO</h3>
                <div className="project__sub">Drug-discovery agentic harness</div>
                <ProjectCardHermes />
              </div>
              <div className="project__body">
                <p className="project__desc">
                  An agentic harness for drug discovery: <span style={{ color: 'var(--text)' }}>disease name → ranked candidates, underexplored targets, cross-indication leads.</span> Gemini function-calling loop chained across UniProt, OpenTargets, RCSB PDB, AlphaFold DB and ChEMBL with persistent memory.
                </p>
                <div className="project__highlight">
                  Recovers canonical disease–target pairs in 6/6 textbook diseases. Picks 2023 FDA approvals on 4/4 hard-mode cases. Ships as CLI, web UI, and MCP server.
                </div>
                <div className="project__tags">
                  {['Gemini Agent', 'MCP', 'RDKit', 'SQLite', 'FastAPI', 'Tailwind'].map((t) => <span key={t} className="project__tag">{t}</span>)}
                </div>
                <div className="project__links">
                  <a href="https://github.com/priyank766/Hermes-BIO" target="_blank" rel="noopener noreferrer" className="project__link">
                    <GithubIcon />GitHub
                  </a>
                </div>
              </div>
            </article>

            <article className="project">
              <div className="project__head">
                <h3>CAD<em>ai</em></h3>
                <div className="project__sub">Natural-language 3D CAD agent</div>
                <ProjectCardCAD />
              </div>
              <div className="project__body">
                <p className="project__desc">
                  A three-tier CAD environment where the AI <strong style={{ color: 'var(--text)' }}>acts rather than converses</strong>. Users issue commands; the agent executes geometric and scene modifications via an atomic tool registry — boolean ops, transforms, materials — streamed live to a Three.js viewport.
                </p>
                <div className="project__highlight">
                  The interface shows a log of completed actions, not chat. Centralized scene state means undo, redo, and parametric replay come for free.
                </div>
                <div className="project__tags">
                  {['React Three Fiber', 'Three.js', 'Zustand', 'Google ADK', 'FastAPI'].map((t) => <span key={t} className="project__tag">{t}</span>)}
                </div>
                <div className="project__links">
                  <a href="https://github.com/priyank766/CADai" target="_blank" rel="noopener noreferrer" className="project__link">
                    <GithubIcon />GitHub
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* RESEARCH */}
      <section className="section" id="research">
        <div className="container">
          <div className="section__head reveal">
            <div>
              <span className="eyebrow">Research</span>
              <h2 className="section-title">Open <em>questions</em><br />I'm chasing.</h2>
            </div>
            <p className="section__head-sub">
              Two ongoing research lines — both reproducible, both with code that runs on a single laptop GPU.
            </p>
          </div>

          <div className="research__grid reveal">
            <div className="research__card">
              <span className="research__card-tag">Long-context inference</span>
              <h3>Recursive Language <em>Models</em></h3>
              <p className="research__card-desc">
                A reproducible head-to-head comparison framework for RLM vs. vanilla LLM on long-context tasks — same model, completely different architecture. The LLM never sees the full document; it writes Python that recursively queries focused chunks until it calls <code style={{ fontFamily: 'var(--mono)', fontSize: 13 }}>FINAL(answer)</code>.
              </p>
              <div className="research__metrics">
                <div><div className="research__metric-val"><em>67</em>%</div><div className="research__metric-label">RLM @ 64K · vanilla 33%</div></div>
                <div><div className="research__metric-val"><em>0</em>%</div><div className="research__metric-label">Vanilla @ 128K · context rot</div></div>
                <div><div className="research__metric-val">QLoRA</div><div className="research__metric-label">SFT · 6GB VRAM</div></div>
                <div><div className="research__metric-val">Muon</div><div className="research__metric-label">Optimizer ablation</div></div>
              </div>
              <a href="https://priyank766.github.io/RLM/" target="_blank" rel="noopener noreferrer" className="research__link">
                <GithubIcon />Read the project →
              </a>
            </div>

            <div className="research__card">
              <span className="research__card-tag">Media forensics</span>
              <h3>Deepfake <em>Detection</em></h3>
              <p className="research__card-desc">
                A robust deep-learning framework for detecting manipulated media using <strong style={{ color: 'var(--text)' }}>Domain Adversarial Training</strong> with a Gradient Reversal Layer. Forces the feature extractor to learn domain-invariant representations — generalising across deepfake generation methods unseen at training time.
              </p>
              <div className="research__metrics">
                <div><div className="research__metric-val">ResNet<em>50</em></div><div className="research__metric-label">Feature backbone</div></div>
                <div><div className="research__metric-val">GRL</div><div className="research__metric-label">Adversarial coupling</div></div>
                <div><div className="research__metric-val">TFRecord</div><div className="research__metric-label">Streaming pipeline</div></div>
                <div><div className="research__metric-val">Cross-<em>domain</em></div><div className="research__metric-label">Generalisation focus</div></div>
              </div>
              <a href="https://github.com/priyank766/DFD-Research" target="_blank" rel="noopener noreferrer" className="research__link">
                <GithubIcon />Read the project →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STACK */}
      <section className="section section--alt" id="stack">
        <div className="container">
          <div className="section__head reveal">
            <div>
              <span className="eyebrow">Stack</span>
              <h2 className="section-title">The <em>tools</em> I reach for.</h2>
            </div>
            <p className="section__head-sub">
              Specialisations grouped by where I spend my time, not by what's trending this week.
            </p>
          </div>

          <div className="stack__grid reveal">
            {stackGroups.map((g, i) => (
              <div className="stack__cell" key={i}>
                <div className="stack__cell-title">
                  <StackTitle pre={g.title[0]} em={g.title[1]} em_position={g.title[2]} />
                </div>
                <ul className="stack__cell-list">
                  {g.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </div>
            ))}
          </div>

          <div className="stack__marquee">
            <div className="stack__marquee-track">
              {[...Array(2)].map((_, k) => (
                <span key={k} style={{ display: 'inline-flex', gap: 56 }}>
                  <span>Python</span><span>·</span>
                  <span><em>Agentic AI</em></span><span>·</span>
                  <span>FastAPI</span><span>·</span>
                  <span><em>LangGraph</em></span><span>·</span>
                  <span>Three.js</span><span>·</span>
                  <span><em>MLOps</em></span><span>·</span>
                  <span>Gemini</span><span>·</span>
                  <span><em>RAG</em></span><span>·</span>
                  <span>Next.js</span><span>·</span>
                  <span><em>Fintech</em></span><span>·</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREELANCE */}
      <section className="section" id="freelance">
        <div className="container">
          <div className="freelance__inner reveal">
            <div>
              <span className="eyebrow">Open for projects</span>
              <h2>Hire me for <em>AI</em><br />that ships.</h2>
              <p>
                Looking for an engineer to build production-grade AI? I take on focused, well-scoped contracts in agentic systems, fintech infrastructure, and applied ML — usually 4–12 weeks, always with a working artifact at the end.
              </p>
              <a href="#contact" className="freelance__cta-btn">Start a project →</a>
            </div>
            <div className="freelance__services">
              <div className="freelance__service">
                <svg className="freelance__service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                <div className="freelance__service-title">Agentic Systems</div>
                <p className="freelance__service-desc">LangGraph and ADK-based autonomous agents with tool-use, planning, and recovery loops.</p>
              </div>
              <div className="freelance__service">
                <svg className="freelance__service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19h16M4 15l4-6 4 4 4-7 4 5" /><circle cx="8" cy="9" r="1.5" /><circle cx="12" cy="13" r="1.5" /><circle cx="16" cy="6" r="1.5" /></svg>
                <div className="freelance__service-title">RAG & LLM Apps</div>
                <p className="freelance__service-desc">Retrieval pipelines, vector stores, and production-ready LLM integrations on Gemini, OpenAI, or local Ollama.</p>
              </div>
              <div className="freelance__service">
                <svg className="freelance__service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 4 18 3-9h4" /></svg>
                <div className="freelance__service-title">MLOps Pipelines</div>
                <p className="freelance__service-desc">Training, deployment, drift monitoring, and quantization for low-latency inference at scale.</p>
              </div>
              <div className="freelance__service">
                <svg className="freelance__service-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
                <div className="freelance__service-title">Voice & Vision AI</div>
                <p className="freelance__service-desc">Realtime STT/TTS conversational agents and computer-vision systems including domain-adversarial detection.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="section section--invert" id="contact">
        <div className="container">
          <span className="eyebrow">Let's talk</span>
          <h2 className="contact__big">Have a <em>project</em><br /><span className="stroke">in mind?</span></h2>

          <div className="contact__grid">
            <div>
              <p className="contact__lede">
                I read every message. The fastest way to reach me is email — I usually reply within 24 hours.
              </p>

              <div className="contact__channels">
                <a href={`mailto:${CONTACT_EMAIL}`} className="contact__channel">
                  <span className="contact__channel-icon"><MailIcon /></span>
                  <span className="contact__channel-text">
                    <span className="contact__channel-label">Email</span>
                    <span className="contact__channel-val">{CONTACT_EMAIL}</span>
                  </span>
                </a>
                <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="contact__channel">
                  <span className="contact__channel-icon"><GithubIcon /></span>
                  <span className="contact__channel-text">
                    <span className="contact__channel-label">GitHub</span>
                    <span className="contact__channel-val">@priyank766</span>
                  </span>
                </a>
                <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="contact__channel">
                  <span className="contact__channel-icon"><LinkedInIcon /></span>
                  <span className="contact__channel-text">
                    <span className="contact__channel-label">LinkedIn</span>
                    <span className="contact__channel-val">/in/priyank766</span>
                  </span>
                </a>
                <a href={X_URL} target="_blank" rel="noopener noreferrer" className="contact__channel">
                  <span className="contact__channel-icon"><XIcon /></span>
                  <span className="contact__channel-text">
                    <span className="contact__channel-label">X (Twitter)</span>
                    <span className="contact__channel-val">@priyank_766</span>
                  </span>
                </a>
                <div className="contact__channel">
                  <span className="contact__channel-icon"><PinIcon /></span>
                  <span className="contact__channel-text">
                    <span className="contact__channel-label">Based in</span>
                    <span className="contact__channel-val">Ahmedabad, India</span>
                  </span>
                </div>
                <div className="contact__channel">
                  <span className="contact__channel-icon"><ClockIcon /></span>
                  <span className="contact__channel-text">
                    <span className="contact__channel-label">Reply time</span>
                    <span className="contact__channel-val">Within 24 hours</span>
                  </span>
                </div>
              </div>
            </div>

            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label htmlFor="cn">Name</label>
                <input id="cn" name="name" type="text" placeholder="Your full name" required value={formData.name} onChange={handleInputChange} />
              </div>
              <div className="contact__field">
                <label htmlFor="ce">Email</label>
                <input id="ce" name="email" type="email" placeholder="your@email.com" required value={formData.email} onChange={handleInputChange} />
              </div>
              <div className="contact__field">
                <label htmlFor="cm">Message</label>
                <textarea id="cm" name="message" rows="4" placeholder="Tell me about the project — scope, timeline, what's at stake." required value={formData.message} onChange={handleInputChange} />
              </div>
              <input className="contact__honey" type="text" name="honey" tabIndex="-1" autoComplete="off" aria-hidden="true" value={formData.honey} onChange={handleInputChange} />
              <button type="submit" className="contact__submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : formState.status === 'success' ? "Sent · I'll be in touch" : 'Send message →'}
              </button>
              {formState.message && (
                <p className={`contact__feedback contact__feedback--${formState.status}`} role="status" aria-live="polite">
                  {formState.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer__inner">
          <span>© {new Date().getFullYear()} Priyank Patel</span>
          <div className="footer__socials">
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
            <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="X"><XIcon /></a>
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email"><MailIcon /></a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default App;
