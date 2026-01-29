import { motion } from 'framer-motion';
import {
    FiCpu, FiCode, FiDatabase, FiCloud,
    FiTerminal, FiLayers, FiZap, FiGlobe
} from 'react-icons/fi';
import './TechStack.css';

const specializations = [
    {
        title: 'Agentic AI',
        icon: FiCpu,
        color: '#00F2FF',
        description: 'Building autonomous systems that think, plan, and execute.',
        skills: ['Autonomous Agents', 'OpenHands', 'Multi-Agent Systems', 'ReAct Patterns'],
        highlight: true,
    },
    {
        title: 'Generative AI',
        icon: FiZap,
        color: '#7000FF',
        description: 'LLM orchestration and vernacular voice models.',
        skills: ['LLM Fine-tuning', 'Prompt Engineering', 'RAG Systems', 'Voice AI (Gujarati)'],
    },
    {
        title: 'Full-Stack & Fintech',
        icon: FiGlobe,
        color: '#00F2FF',
        description: 'Production-grade payment infrastructure.',
        skills: ['Stripe', 'Razorpay', 'Cashfree', 'Zumrails', 'KYC APIs'],
    },
    {
        title: 'ML Research',
        icon: FiLayers,
        color: '#7000FF',
        description: 'Domain adaptation and media forensics.',
        skills: ['Deepfake Detection', 'Domain Adversarial Training', 'Transfer Learning'],
    },
];

const techStack = [
    { name: 'Python', category: 'Language' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'PyTorch', category: 'ML' },
    { name: 'TensorFlow', category: 'ML' },
    { name: 'LangChain', category: 'AI' },
    { name: 'Next.js', category: 'Web' },
    { name: 'React', category: 'Web' },
    { name: 'FastAPI', category: 'Backend' },
    { name: 'Docker', category: 'DevOps' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Redis', category: 'Database' },
];

function TechStack() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    return (
        <section id="skills" className="section techstack">
            <div className="container">
                {/* Section Header */}
                <motion.div
                    className="techstack__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">The Intelligence Stack</h2>
                    <p className="section-subtitle">
                        Specialized capabilities across AI research, engineering, and production systems.
                    </p>
                </motion.div>

                {/* Bento Grid - Specializations */}
                <motion.div
                    className="bento-grid techstack__grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                >
                    {specializations.map((spec, index) => (
                        <motion.div
                            key={spec.title}
                            className={`bento-item techstack__card ${spec.highlight ? 'bento-item--span-2 techstack__card--highlight' : ''
                                }`}
                            variants={itemVariants}
                            whileHover={{
                                y: -8,
                                boxShadow: `0 0 40px ${spec.color}33`,
                            }}
                            style={{ '--card-accent': spec.color }}
                        >
                            <div className="techstack__card-icon" style={{ color: spec.color }}>
                                <spec.icon />
                            </div>
                            <h3 className="techstack__card-title">{spec.title}</h3>
                            <p className="techstack__card-desc">{spec.description}</p>
                            <div className="techstack__card-skills">
                                {spec.skills.map((skill) => (
                                    <span
                                        key={skill}
                                        className="tag"
                                        style={{
                                            borderColor: `${spec.color}4D`,
                                            background: `${spec.color}1A`,
                                            color: spec.color,
                                        }}
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Tech Marquee */}
                <motion.div
                    className="techstack__marquee"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="techstack__marquee-track">
                        {[...techStack, ...techStack].map((tech, index) => (
                            <div key={`${tech.name}-${index}`} className="techstack__marquee-item">
                                <span className="techstack__marquee-name">{tech.name}</span>
                                <span className="techstack__marquee-dot">•</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default TechStack;
