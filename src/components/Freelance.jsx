import { motion } from 'framer-motion';
import { FiZap, FiShield, FiLayout, FiServer } from 'react-icons/fi';
import './Freelance.css';

const services = [
    {
        icon: FiZap,
        title: 'AI Automation',
        description: 'Custom AI agents and workflow automation systems.',
    },
    {
        icon: FiLayout,
        title: 'Admin Dashboards',
        description: 'Real-time monitoring and management interfaces.',
    },
    {
        icon: FiShield,
        title: 'KYC Integration',
        description: 'Automated identity verification systems.',
    },
    {
        icon: FiServer,
        title: 'Payment Systems',
        description: 'Multi-gateway payment infrastructure.',
    },
];

function Freelance() {
    return (
        <section id="freelance" className="section freelance">
            <div className="container">
                <motion.div
                    className="freelance__wrapper"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Background Glow */}
                    <div className="freelance__glow" />

                    {/* Content */}
                    <div className="freelance__content">
                        <span className="freelance__badge">Open for Projects</span>
                        <h2 className="freelance__title">
                            Hire for{' '}
                            <span className="gradient-text--purple">AI Automation</span>
                        </h2>
                        <p className="freelance__description">
                            Looking for an AI engineer to build production-grade systems?
                            I specialize in autonomous agents, fintech infrastructure, and
                            custom AI solutions tailored to your business needs.
                        </p>

                        {/* Services Grid */}
                        <div className="freelance__services">
                            {services.map((service, index) => (
                                <motion.div
                                    key={service.title}
                                    className="freelance__service"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <service.icon className="freelance__service-icon" />
                                    <div>
                                        <h4 className="freelance__service-title">{service.title}</h4>
                                        <p className="freelance__service-desc">{service.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="freelance__cta">
                            <a href="#contact" className="btn btn-secondary">
                                Let's Discuss Your Project
                            </a>
                            <a href="mailto:priyank8445@gmail.com" className="btn btn-outline">
                                priyank8445@gmail.com
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Freelance;
