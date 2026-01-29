import { motion } from 'framer-motion';
import { useState, useEffect, useRef, useCallback } from 'react';
import { FiGithub, FiLinkedin, FiTwitter, FiArrowDown } from 'react-icons/fi';
import './Hero.css';

// Neural Network Particle Canvas Component
function NeuralCanvas() {
    const canvasRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });
    const particlesRef = useRef([]);
    const animationRef = useRef(null);

    const initParticles = useCallback((canvas) => {
        const particles = [];
        const particleCount = Math.floor((canvas.width * canvas.height) / 15000);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2,
            });
        }
        return particles;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particlesRef.current = initParticles(canvas);
        };

        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        const handleMouseMove = (e) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const particles = particlesRef.current;
            const mouse = mouseRef.current;

            // Update and draw particles
            particles.forEach((particle, i) => {
                // Mouse interaction
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    const force = (150 - dist) / 150;
                    particle.vx += (dx / dist) * force * 0.02;
                    particle.vy += (dy / dist) * force * 0.02;
                }

                // Update position
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Damping
                particle.vx *= 0.99;
                particle.vy *= 0.99;

                // Wrap around edges
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 242, 255, ${particle.opacity})`;
                ctx.fill();

                // Draw connections
                for (let j = i + 1; j < particles.length; j++) {
                    const other = particles[j];
                    const connDx = other.x - particle.x;
                    const connDy = other.y - particle.y;
                    const connDist = Math.sqrt(connDx * connDx + connDy * connDy);

                    if (connDist < 120) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        const opacity = (1 - connDist / 120) * 0.2;
                        ctx.strokeStyle = `rgba(0, 242, 255, ${opacity})`;
                        ctx.lineWidth = 0.5;
                        ctx.stroke();
                    }
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [initParticles]);

    return <canvas ref={canvasRef} className="hero__canvas" />;
}

// Terminal Boot Component
function TerminalBoot() {
    const [lines, setLines] = useState([]);
    const [currentLine, setCurrentLine] = useState(0);

    const bootSequence = [
        { text: '> Initializing Neural Core...', delay: 0 },
        { text: '> Loading AI Modules...', delay: 500 },
        { text: '> System Status: ONLINE', delay: 1000 },
        { text: '> Portfolio v1.0 Initialized', delay: 1500 },
    ];

    useEffect(() => {
        if (currentLine < bootSequence.length) {
            const timer = setTimeout(() => {
                setLines((prev) => [...prev, bootSequence[currentLine].text]);
                setCurrentLine((prev) => prev + 1);
            }, bootSequence[currentLine].delay);
            return () => clearTimeout(timer);
        }
    }, [currentLine]);

    return (
        <div className="terminal terminal--boot">
            <div className="terminal__header">
                <span className="terminal__dot terminal__dot--red" />
                <span className="terminal__dot terminal__dot--yellow" />
                <span className="terminal__dot terminal__dot--green" />
                <span className="terminal__title">neural_terminal</span>
            </div>
            <div className="terminal__content">
                {lines.map((line, i) => (
                    <div key={i} className="terminal__line terminal__line--boot">
                        <span className={line.includes('ONLINE') ? 'terminal__success' : 'terminal__output'}>
                            {line}
                        </span>
                    </div>
                ))}
                {currentLine < bootSequence.length && (
                    <span className="typing-cursor" />
                )}
            </div>
        </div>
    );
}

const typingTexts = ['Autonomous Agents', 'Deepfake Detection', 'Fintech Systems', 'LLM Orchestration'];

function Hero() {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = typingTexts[currentTextIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentFullText.length) {
                    setDisplayText(currentFullText.slice(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(displayText.slice(0, -1));
                } else {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
                }
            }
        }, isDeleting ? 40 : 80);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentTextIndex]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
        },
    };

    return (
        <section id="home" className="hero">
            {/* Neural Network Canvas Background */}
            <NeuralCanvas />

            {/* Gradient Overlays */}
            <div className="hero__gradient hero__gradient--top" />
            <div className="hero__gradient hero__gradient--bottom" />

            <div className="container hero__container">
                <motion.div
                    className="hero__content"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Status Badge */}
                    <motion.div className="hero__status" variants={itemVariants}>
                        <span className="status">Available for Projects</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1 className="hero__title" variants={itemVariants}>
                        Engineering the{' '}
                        <span className="gradient-text">Next Generation</span>
                        <br />
                        of Agentic AI
                    </motion.h1>

                    {/* Typing Subtitle */}
                    <motion.div className="hero__typing-wrapper" variants={itemVariants}>
                        <span className="hero__typing-prefix">Specializing in </span>
                        <span className="hero__typing-text gradient-text--cyan">
                            {displayText}
                        </span>
                        <span className="typing-cursor" />
                    </motion.div>

                    {/* Description */}
                    <motion.p className="hero__description" variants={itemVariants}>
                        I architect autonomous systems, research deepfake detection,
                        and build production-grade fintech infrastructure.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div className="hero__cta" variants={itemVariants}>
                        <a href="#projects" className="btn btn-primary">
                            View Projects
                        </a>
                        <a href="#contact" className="btn btn-outline">
                            Get In Touch
                        </a>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div className="hero__social" variants={itemVariants}>
                        <a
                            href="https://github.com/priyank766"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero__social-link"
                            aria-label="GitHub"
                        >
                            <FiGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/priyank-patel-01469028b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero__social-link"
                            aria-label="LinkedIn"
                        >
                            <FiLinkedin />
                        </a>
                        <a
                            href="https://x.com/priyank_766"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hero__social-link"
                            aria-label="Twitter"
                        >
                            <FiTwitter />
                        </a>
                    </motion.div>
                </motion.div>

                {/* Terminal Boot Animation */}
                <motion.div
                    className="hero__terminal"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                >
                    <TerminalBoot />
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    className="hero__scroll"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <a href="#about" className="hero__scroll-link">
                        <span>Scroll</span>
                        <FiArrowDown />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
