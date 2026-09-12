import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { scrollToSection } from '../utils/smoothScroll';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  const { scrollYProgress } = useScroll();
  const progressScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  const navItems = useMemo(() => [
    { id: 'about', label: 'about' },
    { id: 'work', label: 'work' },
    { id: 'skills', label: 'skills' },
    { id: 'background', label: 'background' },
    { id: 'contact', label: 'contact' },
  ], []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);

        const sections = navItems
          .map((item) => ({
            id: item.id,
            element: document.getElementById(item.id),
          }))
          .filter((s) => s.element);

        // Bottom of page: contact is short + footer follows, so the
        // offset check alone never reaches it. Pin it when near bottom.
        const nearBottom =
          window.innerHeight + window.scrollY >=
          document.documentElement.scrollHeight - 80;
        if (nearBottom) {
          setActive('contact');
          ticking = false;
          return;
        }

        const scrollPos = window.scrollY + window.innerHeight * 0.35;

        let current = sections[0]?.id;
        for (const section of sections) {
          if (scrollPos >= section.element.offsetTop) {
            current = section.id;
          }
        }
        if (current) setActive(current);
        ticking = false;
      });
    };

    handleScroll();
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
    scrollToSection(id);
    setIsOpen(false);
  }, []);

  // The logo text is typeable — clicking it edits instead of scrolling home.
  const stopBubble = useCallback((e) => e.stopPropagation(), []);

  const handleLogoKeyDown = useCallback((e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
    }
  }, []);

  const handleLogoPaste = useCallback((e) => {
    e.preventDefault();
    const text = (e.clipboardData || window.clipboardData).getData('text');
    document.execCommand('insertText', false, text);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <button
            className="logo"
            onClick={() => scrollToSection('home')}
            aria-label="Back to top"
          >
            <span
              className="logo-edit"
              contentEditable
              suppressContentEditableWarning
              spellCheck={false}
              title="go on, type something"
              onClick={stopBubble}
              onKeyDown={handleLogoKeyDown}
              onPaste={handleLogoPaste}
            >
              elvin
            </span>
            <span className="logo-cursor" aria-hidden="true" />
          </button>

          {/* Desktop Navigation */}
          <div className="header-actions">
            <nav className="desktop-nav" aria-label="Primary">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-link ${active === item.id ? 'active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <ThemeToggle />

            <button className="btn-primary header-cta" onClick={() => scrollTo('contact')}>
              hire me
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="mobile-actions">
            <ThemeToggle />
            <button
              className="mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
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
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                className={`mobile-nav-link ${active === item.id ? 'active' : ''}`}
                onClick={() => scrollTo(item.id)}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.04 }}
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
              hire me
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Header);