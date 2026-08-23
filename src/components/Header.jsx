import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X, Sparkles } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const navItems = useMemo(() => [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'qualifications', label: 'Work' }
    
  ], []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);

        const sections = navItems.map(item => ({
          id: item.id,
          element: document.getElementById(item.id)
        }));

        const scrollPos = window.scrollY + 100;

        for (const section of sections) {
          if (section.element) {
            const { offsetTop, offsetHeight } = section.element;
            if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
              setActive(section.id);
              break;
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setIsOpen(false);
    };
    const handleKeydown = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const scrollTo = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = 80;
      window.scrollTo({
        top: element.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
    setIsOpen(false);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <motion.div
            className="logo"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollTo('home')}
          >
            <Sparkles size={24} className="logo-icon" />
            <span className="logo-text">ELvin.</span>
          </motion.div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="header-actions">
            <nav className="desktop-nav">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-link ${active === item.id ? 'active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                  {active === item.id && (
                    <motion.div
                      className="nav-indicator"
                      layoutId="navIndicator"
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Single ThemeToggle for desktop */}
            <ThemeToggle />

            <button className="btn-primary desktop-cta" onClick={() => scrollTo('contact')}>
              Let&apos;s Talk
            </button>
          </div>

          {/* Mobile Navigation - Hidden on desktop */}
          <div className="mobile-actions">
            {/* Single ThemeToggle for mobile */}
            <ThemeToggle />
            <button
              className="mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      <motion.div className="scroll-progress" style={{ scaleX: progressScale }} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`mobile-nav-link ${active === item.id ? 'active' : ''}`}
                onClick={() => scrollTo(item.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <span className="mobile-nav-index">0{index + 1}</span>
                {item.label}
              </motion.button>
            ))}
            <motion.button
              className="btn-primary mobile-cta"
              onClick={() => scrollTo('contact')}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Let&apos;s Talk
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Header);