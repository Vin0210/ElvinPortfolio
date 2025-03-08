import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Header() {
  return (
    <motion.header
      className="fixed-header"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header Content (Title Only) */}
      <div className="header-content">
        {/* Pulsating Header Title */}
        <motion.h1
          animate={{ opacity: [1, 0.7, 1] }} // Fade in and out
          transition={{
            duration: 2,
            repeat: Infinity, // Repeat forever
            ease: "easeInOut",
          }}
        >
          My Portfolio
        </motion.h1>
      </div>

      {/* Wiggling Navigation Links */}
      <nav>
        <motion.a
          href="#about"
          className="nav-link"
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }} // Wiggle on hover
          transition={{ duration: 0.5 }}
        >
          About
        </motion.a>
        <motion.a
          href="#projects"
          className="nav-link"
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }} // Wiggle on hover
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.a>
        <motion.a
          href="#contact"
          className="nav-link"
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }} // Wiggle on hover
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.a>
      </nav>

      {/* Spinning Social Icons */}
      <div className="social-links">
        <motion.a
          href="https://facebook.com/elvinramos.meme"
          target="_blank"
          rel="noopener noreferrer"
          title="Facebook"
          className="social-link"
          whileHover={{ scale: 1.2, rotate: 360 }} // Spin on hover
          transition={{ duration: 0.5 }}
        >
          <FaFacebook className="social-icon" />
        </motion.a>
        <motion.a
          href="https://instagram.com/elvinramos.meme"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram"
          className="social-link"
          whileHover={{ scale: 1.2, rotate: 360 }} // Spin on hover
          transition={{ duration: 0.5 }}
        >
          <FaInstagram className="social-icon" />
        </motion.a>
      </div>
    </motion.header>
  );
}