import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight,  Mail } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import './Hero.css';

const Hero = () => {
  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="badge-dot" />
            Open to opportunities
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Hi, I'm{' '}
            <span className="gradient-text">Elvin</span>
            <br />
            Web Developer
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Crafting modern, responsive, and user-centric web experiences
            with clean code and creative solutions.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <button className="btn-primary btn-large" onClick={() => scrollTo('contact')}>
              Get in Touch
              <ArrowRight size={18} />
            </button>
            <button className="btn-secondary" onClick={() => scrollTo('qualifications')}>
              View My Work
            </button>
          </motion.div>

          <motion.div
            className="hero-social"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a href="https://github.com/Vin0210" target="_blank" rel="noopener noreferrer" className="social-link">
              <FaGithub size={20} />
            </a>
            <a href="https://www.instagram.com/vin.viinn/" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                          <FaInstagram size={20} />
                        </a>
                        <a href="https://www.facebook.com/elvinramos.meme" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                          <FaFacebook size={20} />
                        </a>
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="hero-image-wrapper">
            <img
              src="/images/profile.jpg"
              alt="Elvin - Web Developer"
              className="hero-image"
              loading="eager"
            />
            <div className="hero-ring ring-1" />
            <div className="hero-ring ring-2" />
            <div className="hero-ring ring-3" />
          </div>

          <div className="floating-card card-1 float">
            <div className="card-icon">⚡</div>
            <div>
              <div className="card-label">Projects</div>
              <div className="card-value">10+</div>
            </div>
          </div>

          <div className="floating-card card-2 float" style={{ animationDelay: '1s' }}>
            <div className="card-icon">🎯</div>
            <div>
              <div className="card-label">Experience</div>
              <div className="card-value">2+ Years</div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="hero-background">
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
        <div className="bg-blob blob-3" />
      </div>
    </section>
  );
};

export default React.memo(Hero);