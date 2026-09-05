import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FolderGit2, Briefcase, ChevronDown } from 'lucide-react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs';
import { scrollToSection } from '../utils/smoothScroll';
import './Hero.css';

const ROLES = ['Web Developer', 'Laravel Developer', 'React Enthusiast'];

/**
 * Typewriter role text: types out each role on load and on every swap.
 * Falls back to static text for prefers-reduced-motion.
 */
const TypeRole = ({ text }) => {
  const reduced = usePrefersReducedMotion();
  const [typed, setTyped] = useState(reduced ? text : '');

  useEffect(() => {
    if (reduced) {
      setTyped(text);
      return;
    }
    setTyped('');
    let i = 0;
    const interval = setInterval(() => {
      i += 1;
      setTyped(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 55);
    return () => clearInterval(interval);
  }, [text, reduced]);

  return (
    <span className="role-text" aria-label={text}>
      <span aria-hidden="true">{typed}</span>
      <span className="type-caret" aria-hidden="true" />
    </span>
  );
};

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const heroRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  /* Mouse parallax: normalised cursor position is written to CSS vars on
     the section (rAF-throttled). CSS moves the photo, stat cards and
     background blobs a few px opposite to the cursor via the `translate`
     property, which composes cleanly with existing transform animations. */
  useEffect(() => {
    const el = heroRef.current;
    if (!el || reduced) return;

    const onMove = (e) => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        el.style.setProperty('--par-x', x.toFixed(3));
        el.style.setProperty('--par-y', y.toFixed(3));
      });
    };
    const onLeave = () => {
      el.style.setProperty('--par-x', '0');
      el.style.setProperty('--par-y', '0');
    };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [reduced]);

  const scrollTo = (id) => scrollToSection(id);

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
          >
            <span className="badge-dot" />
            Open to opportunities
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.08 }}
          >
            Hi, I&apos;m{' '}
            <span className="gradient-text">Elvin</span>
            <br />
            <span className="role-rotator">
              <span className="role-sizer" aria-hidden="true">
                {ROLES.reduce((a, b) => (b.length > a.length ? b : a))}
              </span>
              <TypeRole text={ROLES[roleIndex]} />
            </span>
          </motion.h1>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.16 }}
          >
            Crafting modern, responsive, and user-centric web experiences
            with clean code and creative solutions.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 90, damping: 18, delay: 0.24 }}
          >
            <button className="btn-primary btn-large" onClick={() => scrollTo('contact')}>
              Get in Touch
              <ArrowRight size={18} className="btn-arrow" />
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
            <a href="https://github.com/Vin0210" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="GitHub">
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/elvin-ramos-a347b2339" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
              <FaLinkedin size={20} />
            </a>
            <a href="https://www.instagram.com/vin.viinn/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Instagram">
              <FaInstagram size={20} />
            </a>
            <a href="https://www.facebook.com/elvinramos.meme" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Facebook">
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
              src="/images/elvin.jpg"
              alt="Elvin - Web Developer"
              className="hero-image"
              loading="eager"
            />
            <div className="hero-ring ring-1" aria-hidden="true" />
            <div className="hero-ring ring-2" aria-hidden="true" />
            <div className="hero-ring ring-3" aria-hidden="true" />

            {/* Stat cards live inside the circle container so their
                percentage offsets sit flush against the circle edge */}
            <div className="floating-card card-1">
              <div className="card-icon"><FolderGit2 size={22} /></div>
              <div>
                <div className="card-label">Projects</div>
                <div className="card-value">10+</div>
              </div>
            </div>

            <div className="floating-card card-2">
              <div className="card-icon"><Briefcase size={22} /></div>
              <div>
                <div className="card-label">Experience</div>
                <div className="card-value">2+ Years</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <button className="hero-scroll-cue" onClick={() => scrollTo('about')} aria-label="Scroll to About section">
        <ChevronDown size={18} />
      </button>

      <div className="hero-background">
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
        <div className="bg-blob blob-3" />
      </div>
    </section>
  );
};

export default React.memo(Hero);