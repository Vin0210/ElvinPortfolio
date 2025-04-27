import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Track window width
  const navRef = useRef(null);

  // Check if navigation links overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (navRef.current) {
        const nav = navRef.current;
        setIsOverflowing(nav.scrollWidth > nav.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  // Track window width changes
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <motion.header
      className="fixed-header"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
      }}
    >
      {/* Floating Animation */}
      <motion.div
        className="header-content"
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.h1
          className="portfolio-title"
          animate={{ opacity: [1, 0.7, 1] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          My Portfolio
        </motion.h1>
      </motion.div>

      {/* Navigation Links (Centered) */}
      <nav
        ref={navRef}
        className={`nav-links ${isOverflowing || windowWidth <= 768 ? 'hidden' : 'flex'}`}
      >
        <motion.a
          href="#about"
          className="nav-link"
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.a>
        <motion.a
          href="#projects"
          className="nav-link"
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.a>
        <motion.a
          href="#contact"
          className="nav-link"
          whileHover={{ scale: 1.1, rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
        >
          Contact
        </motion.a>
      </nav>

      {/* Hamburger Menu Button (Visible if overflowing or on small screens) */}
      {(isOverflowing || windowWidth <= 768) && (
        <motion.button
          className="hamburger-menu"
          onClick={toggleMenu}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </motion.button>
      )}

      {/* Dropdown Menu (Visible when menu is open) */}
      {isMenuOpen && (
        <motion.div
          className="dropdown-menu"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.a
            href="#about"
            className="dropdown-link"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            About
          </motion.a>
          <motion.a
            href="#projects"
            className="dropdown-link"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Projects
          </motion.a>
          <motion.a
            href="#contact"
            className="dropdown-link"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Contact
          </motion.a>
        </motion.div>
      )}
    </motion.header>
  );
}