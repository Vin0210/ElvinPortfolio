import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1>My Portfolio</h1>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="social-links">
      <a
          href="https://facebook.com/elvinramos.meme"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
        >
            <FaFacebook />
            </a>
            <a
          href="https://instagram.com/elvinramos.meme"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
        >
          <FaInstagram />
        </a>
      </div>
    </motion.header>
  );
}