import { motion } from 'framer-motion';
import { FiMail, FiMapPin, FiSend } from 'react-icons/fi';
import './Contact.css';

function Contact() {
    return (
        <section id="contact" className="section contact">
            <div className="container">
                <motion.div
                    className="contact__wrapper"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Header */}
                    <div className="contact__header">
                        <h2 className="section-title">Get In Touch</h2>
                        <p className="section-subtitle">
                            Have a project in mind or want to collaborate?
                            I'm always open to discussing new opportunities.
                        </p>
                    </div>

                    {/* Contact Grid */}
                    <div className="contact__grid">
                        {/* Info Cards */}
                        <div className="contact__info">
                            <motion.div
                                className="contact__info-card glass-card"
                                whileHover={{ y: -4 }}
                            >
                                <FiMail className="contact__info-icon" />
                                <div>
                                    <h4>Email</h4>
                                    <a href="mailto:priyank8445@gmail.com">
                                        priyank8445@gmail.com
                                    </a>
                                </div>
                            </motion.div>

                            <motion.div
                                className="contact__info-card glass-card"
                                whileHover={{ y: -4 }}
                            >
                                <FiMapPin className="contact__info-icon" />
                                <div>
                                    <h4>Location</h4>
                                    <span>Ahmedabad, India</span>
                                </div>
                            </motion.div>
                        </div>

                        {/* Contact Form */}
                        <form className="contact__form glass-card">
                            <div className="contact__form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                />
                            </div>
                            <div className="contact__form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                            <div className="contact__form-group">
                                <label htmlFor="message">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    placeholder="Tell me about your project..."
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary contact__submit">
                                <FiSend />
                                Send Message
                            </button>
                        </form>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default Contact;
