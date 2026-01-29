import { FiGithub, FiLinkedin, FiTwitter, FiHeart } from 'react-icons/fi';
import './Footer.css';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer__container">
                <div className="footer__content">
                    {/* Logo */}
                    <div className="footer__brand">
                        <span className="footer__logo">
                            <span className="footer__logo-bracket">&lt;</span>
                            <span className="footer__logo-name">Priyank</span>
                            <span className="footer__logo-slash">/</span>
                            <span className="footer__logo-bracket">&gt;</span>
                        </span>
                        <p className="footer__tagline">
                            Engineering the future with AI.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div className="footer__social">
                        <a
                            href="https://github.com/priyank766"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-link"
                            aria-label="GitHub"
                        >
                            <FiGithub />
                        </a>
                        <a
                            href="https://www.linkedin.com/in/priyank-patel-01469028b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-link"
                            aria-label="LinkedIn"
                        >
                            <FiLinkedin />
                        </a>
                        <a
                            href="https://x.com/priyank_766"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="footer__social-link"
                            aria-label="Twitter"
                        >
                            <FiTwitter />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="footer__bottom">
                    <p className="footer__copyright">
                        © {currentYear} Priyank Patel. Built with{' '}
                        <FiHeart className="footer__heart" /> using React.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
