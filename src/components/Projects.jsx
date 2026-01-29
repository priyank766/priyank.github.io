import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink, FiLayers, FiCreditCard, FiMic } from 'react-icons/fi';
import './Projects.css';

const projects = [
    {
        id: 1,
        title: 'Deepfake Detection Research',
        subtitle: 'Domain Adversarial Training',
        description: 'A robust deep learning framework to detect manipulated media using Domain Adversarial Training for domain-invariant feature learning.',
        highlight: 'Gradient Reversal Layer (GRL) for cross-domain generalization',
        tech: ['TensorFlow', 'ResNet50', 'TFRecord', 'Domain Adaptation'],
        icon: FiLayers,
        color: '#00F2FF',
        github: 'https://github.com/priyank766/DFD-Research',
        featured: true,
    },
    {
        id: 2,
        title: 'Multi-National Money Transfer',
        subtitle: 'Fintech Payment Infrastructure',
        description: 'Global fund transfer platform with multi-provider payment processing, real-time transaction monitoring, and automated KYC verification.',
        highlight: 'Multi-Gateway Integration: Stripe + Razorpay + Cashfree + Zumrails',
        tech: ['TypeScript', 'Next.js', 'FastAPI', 'PostgreSQL'],
        icon: FiCreditCard,
        color: '#7000FF',
        featured: true,
    },
    {
        id: 3,
        title: 'Vernacular Voice AI',
        subtitle: 'Gujarati Voice Agent',
        description: 'Conversational voice agent optimized for Gujarati language with real-time STT/TTS processing and cultural contextualization.',
        highlight: 'Cultural Contextualization for regional language nuances',
        tech: ['Python', 'Speech-to-Text', 'TTS', 'WebSockets'],
        icon: FiMic,
        color: '#00F2FF',
    },
    {
        id: 4,
        title: 'FrontFrEND',
        subtitle: 'AI Code Assistant',
        description: 'AI-powered assistant that analyzes frontend code, suggests UI/UX improvements, and automates GitHub pull requests.',
        highlight: 'Automated PR generation with visual diff previews',
        tech: ['LangChain', 'OpenAI', 'GitHub API', 'React'],
        icon: FiLayers,
        color: '#7000FF',
        github: 'https://github.com/priyank766/FrontFrEND',
    },
    {
        id: 5,
        title: 'WonderPlan',
        subtitle: 'AI Travel Planner',
        description: 'AI-powered travel planning application using Google ADK and A2A Protocol for personalized itineraries and recommendations.',
        highlight: 'Multi-agent microservices architecture',
        tech: ['Google ADK', 'A2A Protocol', 'Microservices', 'React'],
        icon: FiLayers,
        color: '#00F2FF',
        github: 'https://github.com/priyank766/WonderPLAN_Traveller',
    },
];

function Projects() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: 'easeOut' },
        },
    };

    return (
        <section id="projects" className="section projects">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="projects__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Project Deep Dives</h2>
                    <p className="section-subtitle">
                        Technical showcases demonstrating research depth and production-ready engineering.
                    </p>
                </motion.div>

                {/* Projects Bento Grid */}
                <motion.div
                    className="projects__grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {projects.map((project) => (
                        <motion.article
                            key={project.id}
                            className={`projects__card ${project.featured ? 'projects__card--featured' : ''}`}
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.3 },
                            }}
                            style={{ '--project-accent': project.color }}
                        >
                            {/* Glow Effect */}
                            <div className="projects__card-glow" />

                            {/* Header */}
                            <div className="projects__card-header">
                                <div
                                    className="projects__card-icon"
                                    style={{ color: project.color }}
                                >
                                    <project.icon />
                                </div>
                                <div className="projects__card-links">
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="projects__card-link"
                                            aria-label="View on GitHub"
                                        >
                                            <FiGithub />
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="projects__card-link"
                                            aria-label="View Demo"
                                        >
                                            <FiExternalLink />
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Content */}
                            <div className="projects__card-content">
                                <span className="projects__card-subtitle">{project.subtitle}</span>
                                <h3 className="projects__card-title">{project.title}</h3>
                                <p className="projects__card-desc">{project.description}</p>

                                {/* Technical Highlight */}
                                <div className="projects__card-highlight">
                                    <span className="projects__highlight-label">Technical Highlight:</span>
                                    <span className="projects__highlight-text" style={{ color: project.color }}>
                                        {project.highlight}
                                    </span>
                                </div>
                            </div>

                            {/* Tech Stack */}
                            <div className="projects__card-tech">
                                {project.tech.map((tech) => (
                                    <span key={tech} className="tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Projects;
