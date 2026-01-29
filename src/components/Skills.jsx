import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Skills.css';

const skills = [
    { name: 'Agentic AI', category: 'core', size: 'xl' },
    { name: 'MLOps', category: 'core', size: 'xl' },
    { name: 'LLM Orchestration', category: 'core', size: 'lg' },
    { name: 'LangGraph', category: 'core', size: 'lg' },
    { name: 'Python', category: 'language', size: 'xl' },
    { name: 'TensorFlow', category: 'ml', size: 'lg' },
    { name: 'PyTorch', category: 'ml', size: 'lg' },
    { name: 'RAG Systems', category: 'core', size: 'lg' },
    { name: 'Kubernetes', category: 'devops', size: 'md' },
    { name: 'Docker', category: 'devops', size: 'md' },
    { name: 'React', category: 'frontend', size: 'md' },
    { name: 'Node.js', category: 'backend', size: 'md' },
    { name: 'FastAPI', category: 'backend', size: 'md' },
    { name: 'PostgreSQL', category: 'database', size: 'sm' },
    { name: 'MongoDB', category: 'database', size: 'sm' },
    { name: 'Computer Vision', category: 'ml', size: 'md' },
    { name: 'NLP', category: 'ml', size: 'md' },
    { name: 'Prompt Engineering', category: 'core', size: 'lg' },
    { name: 'Sentence Transformers', category: 'ml', size: 'md' },
    { name: 'Git', category: 'devops', size: 'sm' },
    { name: 'CI/CD', category: 'devops', size: 'sm' },
    { name: 'TypeScript', category: 'language', size: 'sm' },
    { name: 'Google Gemini', category: 'core', size: 'md' },
    { name: 'Voice AI', category: 'core', size: 'md' },
    { name: 'STT/TTS', category: 'ml', size: 'sm' },
];

function Skills() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.03,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0, rotate: -10 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                type: 'spring',
                stiffness: 200,
                damping: 15,
            },
        },
    };

    const getCategoryColor = (category) => {
        const colors = {
            core: 'skill--core',
            ml: 'skill--ml',
            language: 'skill--language',
            devops: 'skill--devops',
            frontend: 'skill--frontend',
            backend: 'skill--backend',
            database: 'skill--database',
        };
        return colors[category] || '';
    };

    return (
        <section id="skills" className="skills section" ref={ref}>
            <div className="container">
                <motion.div
                    className="skills__header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="skills__label">// Tech Stack</span>
                    <h2 className="section-title">Skill Orbit</h2>
                    <p className="section-subtitle">
                        Technologies and tools in my neural workspace. Hover to explore the ecosystem.
                    </p>
                </motion.div>

                <motion.div
                    className="skill-cloud"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                >
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            className={`skill-tag skill-tag--${skill.size} ${getCategoryColor(skill.category)}`}
                            variants={itemVariants}
                            whileHover={{
                                scale: 1.15,
                                y: -5,
                                transition: { type: 'spring', stiffness: 400 }
                            }}
                            style={{
                                animationDelay: `${index * 0.1}s`,
                            }}
                        >
                            {skill.name}
                        </motion.div>
                    ))}
                </motion.div>

                {/* Legend */}
                <motion.div
                    className="skills__legend"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.8, duration: 0.5 }}
                >
                    <div className="legend-item">
                        <span className="legend-dot legend-dot--core" />
                        <span>Core Expertise</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot legend-dot--ml" />
                        <span>ML/AI</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot legend-dot--devops" />
                        <span>DevOps</span>
                    </div>
                    <div className="legend-item">
                        <span className="legend-dot legend-dot--language" />
                        <span>Languages</span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Skills;
