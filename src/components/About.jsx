import { motion } from 'framer-motion';
import { FiCode, FiBriefcase, FiBookOpen } from 'react-icons/fi';
import './About.css';

const stats = [
    { icon: FiCode, value: '10+', label: 'Projects Built' },
    { icon: FiBriefcase, value: '3+', label: 'Internships' },
    { icon: FiBookOpen, value: 'B.E', label: 'AI & ML' },
];

function About() {
    return (
        <section id="about" className="section about">
            <div className="container">
                <motion.div
                    className="about__wrapper"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Terminal-style About */}
                    <div className="about__content">
                        <div className="terminal about__terminal">
                            <div className="terminal__header">
                                <span className="terminal__dot terminal__dot--red" />
                                <span className="terminal__dot terminal__dot--yellow" />
                                <span className="terminal__dot terminal__dot--green" />
                                <span className="terminal__title">about_priyank.sh</span>
                            </div>
                            <div className="terminal__content about__terminal-content">
                                <div className="terminal__line">
                                    <span className="terminal__prompt">$</span>
                                    <span className="terminal__command">cat about.txt</span>
                                </div>
                                <div className="about__text">
                                    <p>
                                        I'm <span className="text-accent">Priyank Patel</span>, an AI Engineer
                                        pursuing B.E in AI & ML at LD College of Engineering (CGPA: 8.4).
                                    </p>
                                    <p>
                                        I specialize in building <span className="text-accent">autonomous AI agents</span>,
                                        researching <span className="text-accent">deepfake detection</span>, and architecting
                                        <span className="text-accent"> production-grade fintech systems</span>.
                                    </p>
                                    <p>
                                        Currently working on MLOps pipelines, vernacular voice AI, and
                                        multi-gateway payment infrastructure for global transactions.
                                    </p>
                                </div>
                                <div className="terminal__line">
                                    <span className="terminal__prompt">$</span>
                                    <span className="typing-cursor" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="about__stats">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                className="about__stat"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <stat.icon className="about__stat-icon" />
                                <span className="about__stat-value gradient-text">{stat.value}</span>
                                <span className="about__stat-label">{stat.label}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default About;
