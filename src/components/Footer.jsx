import React from 'react';
import { ArrowUp } from 'lucide-react';
import { scrollToTop } from '../utils/smoothScroll';
import './Footer.css';

const LINKS = [
  { label: 'github', href: 'https://github.com/Vin0210' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/elvin-ramos-a347b2339' },
  { label: 'blog', href: 'https://elvinsblog.netlify.app/' },
  { label: 'instagram', href: 'https://www.instagram.com/vin.viinn/' },
  { label: 'facebook', href: 'https://www.facebook.com/elvinramos.meme' },
];

const Footer = () => (
  <footer className="footer">
    <div className="section-inner footer-inner">
      <div className="footer-top">
        <button className="footer-logo" onClick={scrollToTop} aria-label="Back to top">
          <span className="logo-text">elvin</span>
          <span className="logo-cursor" aria-hidden="true" />
        </button>
        <ul className="footer-links">
          {LINKS.map(({ label, href }) => (
            <li key={label}>
              <a href={href} target="_blank" rel="noopener noreferrer" className="mono-link">
                {label} <span className="arrow">↗</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Elvin Ramos · Zamboanga City, PH</p>
        <button className="footer-top-btn" onClick={scrollToTop} aria-label="Back to top">
          <ArrowUp size={16} /> top
        </button>
      </div>
    </div>
  </footer>
);

export default React.memo(Footer);
