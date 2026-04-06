import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
    FiArrowRight,
    FiBriefcase,
    FiCheckCircle,
    FiCode,
    FiExternalLink,
    FiGithub,
    FiLayers,
    FiLinkedin,
    FiMail,
    FiMapPin,
    FiMoon,
    FiSend,
    FiSun,
    FiTwitter,
} from 'react-icons/fi';
import './App.css';

const LINKEDIN_URL = 'https://www.linkedin.com/in/priyank766/';
const CONTACT_EMAIL = 'priyank8445@gmail.com';
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${CONTACT_EMAIL}`;

const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#experience' },
    { label: 'Research', href: '#research' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
];

const quickStats = [
    { value: '10+', label: 'Projects Delivered' },
    { value: '2', label: 'Industry Roles' },
    { value: 'B.E.', label: 'AI & ML ' },
];

const focusAreas = [
    {
        icon: FiLayers,
        title: 'Agentic Systems',
        description: 'End-to-end autonomous workflows with planning, tool use, and execution loops.',
    },
    {
        icon: FiCode,
        title: 'Applied AI Research',
        description: 'Model experimentation in deepfake detection, retrieval systems, and evaluation.',
    },
    {
        icon: FiBriefcase,
        title: 'Fintech Engineering',
        description: 'Secure payment infrastructure, KYC integration, and production backend pipelines.',
    },
];

const experiences = [
    {
        company: 'Innover-Global',
        role: 'Full Stack Engineer (Freelance)',
        period: 'December 2025 - January 2026',
        highlights: [
            'Built a global money transfer flow with Stripe, Razorpay, Cashfree, and Zumrails.',
            'Designed admin monitoring interfaces for transaction lifecycle visibility.',
            'Implemented one-time, recurring, and subscription payment orchestration.',
        ],
    },
    {
        company: 'ChaitanyaAI',
        role: 'AI and ML Intern',
        period: 'November 2025 - January 2026',
        highlights: [
            'Engineered MLOps pipelines for continuous model training and deployment.',
            'Optimized model inference paths for lower production latency.',
            'Developed real-time conversational voice-agent architecture.',
        ],
    },
    {
        company: 'Zenith India',
        role: 'AI and ML Intern',
        period: 'October 2025 - December 2025',
        highlights: [
            'Built a finance prompt evaluator using sentence-transformers and RAG.',
            'Developed a GEO agent for LLM ranking and visibility analysis.',
            'Shipped automation pipelines for AI-driven trend monitoring.',
        ],
    },
];

const skillGroups = [
    {
        title: 'AI and ML',
        items: ['LangGraph','Google ADK', 'RAG Systems', 'Deep Learning', 'TensorFlow', 'PyTorch'],
    },
    {
        title: 'Backend and Infra',
        items: ['FastAPI', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'API Design'],
    },
    {
        title: 'Frontend and Product',
        items: ['React', 'TypeScript', 'Vite', 'UX Systems', 'Data Visualization'],
    },
];

const projects = [
    {
        title: 'Cortex',
        category: 'Open Source Agent Workspace',
        description:
            'An open-source workspace where an AI agent operates inside real project folders using scoped file access, conversation memory, and sandboxed shell execution.',
        highlight: 'ReAct-style agent loop with real-time tool event streaming.',
        stack: ['React', 'FastAPI', 'SQLite', 'Docker Sandbox', 'Agent Loop'],
        github: 'https://github.com/priyank766/Cortex',
    },
    {
        title: 'BioAgent-ALPHAFOLD',
        category: 'Agentic Bioinformatics Platform',
        description:
            'Natural-language bioinformatics assistant that coordinates structural biology workflows through a LangGraph-driven autonomous agent.',
        highlight: 'Integrated AlphaFold DB, P2Rank, AutoDock Vina, and Foldseek in one pipeline.',
        stack: ['LangGraph', 'FastAPI', 'React', 'AlphaFold DB', 'AutoDock Vina'],
        github: 'https://github.com/priyank766/BioAgent-ALPHAFOLD',
    },
    {
        title: 'Multi-National Money Transfer',
        category: 'Fintech Infrastructure',
        description:
            'A payment platform for international transfers with provider abstraction, KYC orchestration, and transaction controls.',
        highlight: 'Multi-gateway transaction orchestration in production workflows.',
        stack: ['TypeScript', 'Next.js', 'FastAPI', 'PostgreSQL'],
    },
    {
        title: 'FrontFrEND',
        category: 'Developer Tooling',
        description:
            'AI-assisted frontend review companion that identifies improvements and supports engineering workflow automation.',
        highlight: 'Developer feedback loop paired with GitHub workflow acceleration.',
        stack: ['LangChain', 'OpenAI', 'GitHub API', 'React'],
        github: 'https://github.com/priyank766/FrontFrEND',
    },
];

const research = [
    {
        title: 'Recursive Language Models (RLM)',
        category: 'AI Architecture Research',
        description:
            'A local, reproducible research project implementing and benchmarking Recursive Language Models against standard LLM inference for long-context tasks. RLM addresses "context rot" by storing documents in an external Python REPL, keeping active context small and preventing attention dilution.',
        highlight: 'Successfully answered queries on a 52,719-character document in 3 recursive sub-calls, bypassing ~16K character KV cache truncation.',
        stack: ['Python 3.12', 'Ollama', 'QLoRA', 'Custom REPL Engine'],
        github: 'https://priyank766.github.io/RLM/',
    },
    {
        title: 'Deepfake Detection Research',
        category: 'Media Forensics',
        description:
            'Research-oriented deep learning setup for manipulated media detection with strong cross-domain behavior and domain-adversarial training for improved generalization.',
        highlight: 'Domain-adversarial training for stronger cross-domain generalization.',
        stack: ['TensorFlow', 'ResNet50', 'Domain Adaptation', 'Computer Vision'],
        github: 'https://github.com/priyank766/DFD-Research',
    },
];

const fadeInUp = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-120px' },
    transition: { duration: 0.65, ease: 'easeOut' },
};

function App() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        honey: '',
    });
    const [formState, setFormState] = useState({
        status: 'idle',
        message: '',
    });

    const [theme, setTheme] = useState(() => {
        if (typeof window === 'undefined') {
            return 'light';
        }

        const savedTheme = window.localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }

        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };
    const currentYear = useMemo(() => new Date().getFullYear(), []);
    const isSubmitting = formState.status === 'submitting';

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting || formData.honey) {
            return;
        }

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
                headers: {
                    Accept: 'application/json',
                },
                body: payload,
            });

            const contentType = response.headers.get('content-type') || '';
            let result = null;

            if (contentType.includes('application/json')) {
                result = await response.json();
            } else {
                const text = await response.text();
                result = { message: text };
            }

            const isExplicitFailure = result && (result.success === false || result.success === 'false');
            const isSuccess = response.ok && !isExplicitFailure;

            if (!isSuccess) {
                throw new Error(result?.message || 'Message failed');
            }

            setFormState({
                status: 'success',
                message: 'Message sent successfully. I will get back to you soon.',
            });
            setFormData({
                name: '',
                email: '',
                message: '',
                honey: '',
            });
        } catch (error) {
            setFormState({
                status: 'error',
                message: error instanceof Error && error.message
                    ? `Could not send right now (${error.message}). Please email me directly at priyank8445@gmail.com.`
                    : 'Could not send right now. Please email me directly at priyank8445@gmail.com.',
            });
        }
    };

    return (
        <div className="site-shell">
            <div className="ambient ambient--one" aria-hidden="true" />
            <div className="ambient ambient--two" aria-hidden="true" />
            <div className="ambient ambient--grid" aria-hidden="true" />

            <header className="topbar">
                <div className="layout topbar__inner">
                    <a className="brand" href="#home" aria-label="Priyank home">
                        Priyank Patel
                    </a>

                    <nav className="topbar__nav" aria-label="Primary">
                        {navLinks.map((link) => (
                            <a key={link.href} href={link.href} className="topbar__link">
                                {link.label}
                            </a>
                        ))}
                    </nav>

                    <div className="topbar__actions">
                        <button
                            type="button"
                            className="topbar__theme"
                            onClick={toggleTheme}
                            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            {theme === 'dark' ? <FiSun /> : <FiMoon />}
                        </button>
                        <a className="topbar__cta" href="#contact">
                            Let&apos;s Talk
                        </a>
                    </div>
                </div>
            </header>

            <main className="layout page-main">
                <motion.section id="home" className="section-panel hero" {...fadeInUp}>
                    <div className="hero__content">
                        <h1>
                            Building practical AI systems with a clean,
                            <span> human-centered product lens.</span>
                        </h1>
                        <p className="hero__summary">
                            I design and ship agentic workflows, applied AI products, and fintech systems that are reliable in real-world use.
                        </p>

                        <div className="hero__actions">
                            <a className="btn btn--primary" href="#projects">
                                Explore Projects
                                <FiArrowRight />
                            </a>
                            <a className="btn btn--ghost" href={`mailto:${CONTACT_EMAIL}`}>
                                <FiMail />
                                Email Me
                            </a>
                        </div>

                        <div className="hero__socials">
                            <a href="https://github.com/priyank766" target="_blank" rel="noreferrer">
                                <FiGithub />
                                GitHub
                            </a>
                            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                                <FiLinkedin />
                                LinkedIn
                            </a>
                            <a href="https://x.com/priyank_766" target="_blank" rel="noreferrer">
                                <FiTwitter />
                                X
                            </a>
                        </div>
                    </div>

                    <div className="hero__panel">
                        <p className="hero__panel-label">Looking for opportunities</p>
                        <h2>Production-grade agent experiences</h2>
                        <p>
                            Building systems where models can reason, inspect context, execute safe actions, and produce trackable results.
                        </p>

                        <div className="hero__stats">
                            {quickStats.map((stat) => (
                                <div key={stat.label} className="hero__stat">
                                    <strong>{stat.value}</strong>
                                    <span>{stat.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.section>

                <motion.section id="about" className="section-panel" {...fadeInUp}>
                    <div className="section-heading">
                        <p className="section-heading__kicker">About</p>
                        <h2>Design taste meets engineering depth.</h2>
                    </div>

                    <div className="about-lead">
                        <p>
                            I am Priyank Patel, pursuing B.E in AI and ML at LD College of Engineering. I enjoy turning ambitious AI ideas into dependable products with thoughtful interfaces and scalable architecture. My recent work spans agentic tooling, deepfake detection research, multilingual AI interaction, and payment infrastructure engineering.
                        </p>
                    </div>

                    <div className="about-focus-row">
                        {focusAreas.map((area) => (
                            <article key={area.title} className="about-card about-card--focus">
                                <area.icon className="about-card__icon" />
                                <h3>{area.title}</h3>
                                <p>{area.description}</p>
                            </article>
                        ))}
                    </div>
                </motion.section>

                <motion.section id="experience" className="section-panel" {...fadeInUp}>
                    <div className="section-heading">
                        <p className="section-heading__kicker">Experience</p>
                        <h2>Recent roles and outcomes.</h2>
                    </div>

                    <div className="timeline">
                        {experiences.map((item) => (
                            <article key={item.company} className="timeline__item">
                                <div className="timeline__node" aria-hidden="true">
                                    <span className="timeline__dot" />
                                </div>
                                <div className="timeline__card">
                                    <div className="timeline__meta">
                                        <h3>{item.role}</h3>
                                        <p>{item.company}</p>
                                        <span>{item.period}</span>
                                    </div>

                                    <ul>
                                        {item.highlights.map((highlight) => (
                                            <li key={highlight}>{highlight}</li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        ))}
                    </div>
                </motion.section>

                <motion.section id="research" className="section-panel" {...fadeInUp}>
                    <div className="section-heading">
                        <p className="section-heading__kicker">Research</p>
                        <h2>Explorations in AI and model behavior.</h2>
                    </div>

                    <div className="projects-grid projects-grid--research">
                        {research.map((item) => (
                            <article key={item.title} className="project-card">
                                <div className="project-card__top">
                                    <p>{item.category}</p>
                                    {item.github && (
                                        <a href={item.github} target="_blank" rel="noreferrer" aria-label={`${item.title} repository`}>
                                            <FiGithub />
                                        </a>
                                    )}
                                </div>

                                <h3>{item.title}</h3>
                                <p className="project-card__desc">{item.description}</p>

                                <p className="project-card__highlight">{item.highlight}</p>

                                <div className="project-card__tags">
                                    {item.stack.map((tech) => (
                                        <span key={tech}>{tech}</span>
                                    ))}
                                </div>

                                {item.github && (
                                    <a className="project-card__link" href={item.github} target="_blank" rel="noreferrer">
                                        View Research
                                        <FiExternalLink />
                                    </a>
                                )}
                            </article>
                        ))}
                    </div>
                </motion.section>

                <motion.section id="projects" className="section-panel" {...fadeInUp}>
                    <div className="section-heading">
                        <p className="section-heading__kicker">Projects</p>
                        <h2>Selected engineering builds.</h2>
                    </div>

                    <div className="projects-grid">
                        {projects.map((project) => (
                            <article key={project.title} className="project-card">
                                <div className="project-card__top">
                                    <p>{project.category}</p>
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noreferrer" aria-label={`${project.title} repository`}>
                                            <FiGithub />
                                        </a>
                                    )}
                                </div>

                                <h3>{project.title}</h3>
                                <p className="project-card__desc">{project.description}</p>

                                <p className="project-card__highlight">{project.highlight}</p>

                                <div className="project-card__tags">
                                    {project.stack.map((tech) => (
                                        <span key={tech}>{tech}</span>
                                    ))}
                                </div>

                                {project.github && (
                                    <a className="project-card__link" href={project.github} target="_blank" rel="noreferrer">
                                        View Repository
                                        <FiExternalLink />
                                    </a>
                                )}
                            </article>
                        ))}
                    </div>
                </motion.section>

                <motion.section id="skills" className="section-panel" {...fadeInUp}>
                    <div className="section-heading">
                        <p className="section-heading__kicker">Skills</p>
                        <h2>Tools I work with regularly.</h2>
                    </div>

                    <div className="skill-grid">
                        {skillGroups.map((group) => (
                            <article className="skill-card" key={group.title}>
                                <h3>{group.title}</h3>
                                <div className="skill-tags">
                                    {group.items.map((skill) => (
                                        <span key={skill}>{skill}</span>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </motion.section>

                <motion.section id="contact" className="section-panel" {...fadeInUp}>
                    <div className="section-heading">
                        <p className="section-heading__kicker">Contact</p>
                        <h2>Let&apos;s build something useful together.</h2>
                    </div>

                    <div className="contact-grid">
                        <article className="contact-info">
                            <h3>Available for projects and collaborations.</h3>
                            <p>
                                If you have an idea, a team need, or a product challenge in AI, web systems, or automation, send a message and I will reply quickly.
                            </p>

                            <a href={`mailto:${CONTACT_EMAIL}`}>
                                <FiMail />
                                {CONTACT_EMAIL}
                            </a>
                            <p>
                                <FiMapPin />
                                Ahmedabad, India
                            </p>
                            <a href={LINKEDIN_URL} target="_blank" rel="noreferrer">
                                <FiLinkedin />
                                LinkedIn Profile
                            </a>
                        </article>

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <label htmlFor="name">Name</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Your full name"
                                value={formData.name}
                                onChange={handleInputChange}
                                required
                            />

                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />

                            <label htmlFor="message">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows="5"
                                placeholder="Tell me about your project"
                                value={formData.message}
                                onChange={handleInputChange}
                                required
                            />

                            <input
                                className="contact-form__honey"
                                type="text"
                                name="honey"
                                value={formData.honey}
                                onChange={handleInputChange}
                                tabIndex="-1"
                                autoComplete="off"
                                aria-hidden="true"
                            />

                            <button className="btn btn--primary" type="submit" disabled={isSubmitting}>
                                <FiSend />
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>

                            {formState.message && (
                                <p
                                    className={`form-feedback form-feedback--${formState.status}`}
                                    role="status"
                                    aria-live="polite"
                                >
                                    {formState.status === 'success' && <FiCheckCircle />}
                                    <span>{formState.message}</span>
                                </p>
                            )}

                            <p className="contact-form__note">
                                Form submissions are sent directly to {CONTACT_EMAIL}.
                            </p>
                        </form>
                    </div>
                </motion.section>
            </main>

            <footer className="site-footer">
                <div className="layout site-footer__inner">
                    <p>Copyright {currentYear} Priyank Patel</p>
                    <div>
                        <a href="https://github.com/priyank766" target="_blank" rel="noreferrer" aria-label="GitHub profile">
                            <FiGithub />
                        </a>
                        <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                            <FiLinkedin />
                        </a>
                        <a href="https://x.com/priyank_766" target="_blank" rel="noreferrer" aria-label="X profile">
                            <FiTwitter />
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;