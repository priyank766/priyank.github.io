import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiCalendar } from 'react-icons/fi';
import './Experience.css';

const experiences = [
    {
        company: 'Innover-Global',
        role: 'Full Stack Engineer (Freelance)',
        period: 'Dec 2025 - Present',
        location: 'Remote',
        color: '#7000FF',
        highlights: [
            'Engineered a global fund transfer platform with Stripe, Zumrails, Razorpay, and Cashfree integration',
            'Architected full-stack admin dashboard for real-time transaction monitoring',
            'Developed end-to-end payment flows for one-time, recurring, and subscription models',
            'Integrated third-party KYC APIs for automated user verification',
        ],
    },
    {
        company: 'ChaitanyaAI',
        role: 'AI/ML Intern',
        period: 'Nov 2025 - Present',
        location: 'Remote',
        color: '#00F2FF',
        highlights: [
            'Architected end-to-end MLOps pipelines for automated model training and deployment',
            'Improved model latency via quantization and efficient integration strategies',
            'Engineered conversational voice agent with real-time STT/TTS frameworks',
            'Implemented monitoring stacks for model drift and system health tracking',
        ],
    },
    {
        company: 'Zenith India',
        role: 'AI/ML Intern',
        period: 'Oct 2025 - Dec 2025',
        location: 'Remote',
        color: '#00F2FF',
        highlights: [
            'Developed Finance Prompt Evaluator using Sentence-Transformers and RAG',
            'Engineered GEO Agent to analyze LLM ranking patterns for web visibility',
            'Built AI Fashion Trend Monitor with Selenium for automated data extraction',
        ],
    },
];

function Experience() {
    return (
        <section id="experience" className="section experience">
            <div className="container">
                {/* Header */}
                <motion.div
                    className="experience__header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="section-title">Work Experience</h2>
                    <p className="section-subtitle">
                        Building production systems across AI, fintech, and MLOps.
                    </p>
                </motion.div>

                {/* Timeline */}
                <div className="experience__timeline">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            className="experience__item"
                            initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            style={{ '--exp-color': exp.color }}
                        >
                            <div className="experience__marker" />
                            <div className="experience__card glass-card">
                                <div className="experience__card-header">
                                    <h3 className="experience__company">{exp.company}</h3>
                                    <span className="experience__role" style={{ color: exp.color }}>
                                        {exp.role}
                                    </span>
                                </div>
                                <div className="experience__meta">
                                    <span className="experience__meta-item">
                                        <FiCalendar />
                                        {exp.period}
                                    </span>
                                    <span className="experience__meta-item">
                                        <FiMapPin />
                                        {exp.location}
                                    </span>
                                </div>
                                <ul className="experience__highlights">
                                    {exp.highlights.map((highlight, i) => (
                                        <li key={i}>{highlight}</li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Experience;
