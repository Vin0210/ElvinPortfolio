import React, { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs';
import { scrollToSection } from '../utils/smoothScroll';
import './Hero.css';

const PROMPT = '~ $ whoami';

const ROLES = ['web developer', 'laravel developer', 'react enthusiast'];

/**
 * Executes once on load: types the prompt, then goes solid.
 * Static text when reduced motion is preferred.
 */
const ExecPrompt = () => {
  const reduced = usePrefersReducedMotion();
  const [n, setN] = useState(reduced ? PROMPT.length : 0);

  useEffect(() => {
    if (reduced) {
      setN(PROMPT.length);
      return;
    }
    if (n >= PROMPT.length) return;
    const t = setTimeout(() => setN((v) => v + 1), 45);
    return () => clearTimeout(t);
  }, [n, reduced]);

  return (
    <p className="hero-prompt" aria-hidden="true">
      <span>{PROMPT.slice(0, n)}</span>
      <span className="type-caret" aria-hidden="true" />
    </p>
  );
};

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

const SOCIALS = [
  { label: 'github', href: 'https://github.com/Vin0210' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/elvin-ramos-a347b2339' },
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="hero-inner">
        <div className="hero-copy">
          <ExecPrompt />

          <h1 className="hero-name">
            Elvin <em>Ramos</em>
          </h1>

          <p className="hero-role">
            <span className="role-prompt" aria-hidden="true">&gt;</span>{' '}
            <TypeRole text={ROLES[roleIndex]} />
          </p>

          <p className="hero-desc">
            I build and maintain web systems people rely on every day — school
            management platforms, booking sites, and internal tools. Mostly
            Laravel, React, and MySQL. Currently a web developer at
            Itech&nbsp;Rar,&nbsp;Inc.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollToSection('work')}>
              see my work
            </button>
            <button className="btn-secondary" onClick={() => scrollToSection('contact')}>
              get in touch
            </button>
          </div>

          <ul className="hero-socials">
            {SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mono-link"
                >
                  {label}
                  <span className="arrow" aria-hidden="true">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-visual">
          <figure className="hero-photo">
            <img
              src="/images/elvin.jpg"
              alt="Elvin Ramos"
              loading="eager"
            />
            <figcaption className="hero-photo-caption">
              elvin ramos — zamboanga city, 2025
            </figcaption>
          </figure>
          <p className="hero-note" aria-hidden="true">
            {'// probably in VS Code right now'}
          </p>
        </div>
      </div>

      <button
        className="hero-scroll-cue"
        onClick={() => scrollToSection('about')}
        aria-label="Scroll to about section"
      >
        scroll <span aria-hidden="true">↓</span>
      </button>
    </section>
  );
};

export default React.memo(Hero);
