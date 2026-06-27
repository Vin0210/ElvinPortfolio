import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowRight, Mail, Download } from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">ELvin.</span>
            <p className="footer-description">
              Crafting modern web experiences with clean code and creative design.
            </p>
          </div>

          <div className="footer-social">
            <a href="https://github.com/Vin0210" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <FaGithub size={20} />
            </a>
            <a href="www.linkedin.com/in/elvin-ramos-a347b2339" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <FaLinkedin size={20} />
            </a>
           
            <a href="https://www.instagram.com/vin.viinn/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.facebook.com/elvinramos.meme" target="_blank" rel="noopener noreferrer" className="footer-social-link">
              <FaFacebook size={20} />
            </a>

          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-copyright">
            &copy; {new Date().getFullYear()} Elvin Ramos. All rights reserved.
          </p>
          <button className="footer-back-top" onClick={scrollToTop}>
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);