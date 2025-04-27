import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="footer-content">
        {/* Social Media Links */}
        <div className="social-links">
          <motion.a
            href="https://facebook.com/elvinramos.meme"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaFacebook className="social-icon" />
          </motion.a>
          <motion.a
            href="https://www.instagram.com/_thevinsea?igsh=aDQzMzB1bGl4NWhy"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaInstagram className="social-icon" />
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/elvinramos"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaLinkedin className="social-icon" />
          </motion.a>
          <motion.a
            href="https://github.com/elvinramos"
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            whileHover={{ scale: 1.2, rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaGithub className="social-icon" />
          </motion.a>
        </div>

        {/* Copyright Notice */}
        <p className="copyright">
          &copy; {new Date().getFullYear()} Elvin Ramos. All rights reserved.
        </p>
      </div>
    </motion.footer>
  );
}