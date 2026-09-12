import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import Kicker from './Kicker';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs';
import './Background.css';

const EXP = [
  {
    year: 'Jun 2025 — Present',
    title: 'Web Developer',
    place: 'Itech Rar, Inc.',
    desc: 'Maintain RMMC school management system. Registrar, finance and enrollment features, bug fixes and query performance.',
  },
  {
    year: '2025',
    title: 'Capstone — Snake ID App',
    place: 'WMSU CCS',
    desc: 'Machine learning app that identifies Philippine snake species from photos. Flutter and TensorFlow.',
  },
  {
    year: '2023',
    title: 'Fast-Food Ordering Site',
    place: 'WMSU CCS, group project',
    desc: 'Menu, cart and order tracking. PHP and MySQL.',
  },
  {
    year: '2022',
    title: 'Document Archiving System',
    place: 'WMSU, WESMAARDEC',
    desc: 'Document management and archiving for academic records.',
  },
];

const EDU = [
  {
    year: '2020 — 2025',
    title: 'BS Information Technology',
    place: 'Western Mindanao State University',
    desc: 'Web development and software engineering.',
  },
];

const CERTS = [
  { name: 'Python for Beginners', from: 'Simplilearn · 2025', img: '/images/cert3.webp' },
  { name: 'Machine Learning with Python', from: 'Simplilearn · 2025', img: '/images/cert1.webp' },
  { name: 'Responsive Web Design', from: 'freeCodeCamp · 2025', img: '/images/cert5.webp' },
  { name: 'JS Algorithms & Data Structures', from: 'freeCodeCamp · 2025', img: '/images/cert6.webp' },
];

const Timeline = ({ items, quiet, show, base }) => (
  <ol className={`timeline${quiet ? ' timeline-quiet' : ''}`}>
    {items.map((item, i) => (
      <li
        key={item.title}
        className={`timeline-item term-row${show ? ' is-shown' : ''}`}
        style={{ transitionDelay: `${(base || 0) + i * 70}ms` }}
      >
        <p className="timeline-year">{item.year}</p>
        <h4 className="timeline-title">{item.title}</h4>
        <p className="timeline-place">{item.place}</p>
        <p className="timeline-desc">{item.desc}</p>
      </li>
    ))}
  </ol>
);

const Background = () => {
  const [cert, setCert] = useState(null);
  const [termRef, termInView] = useInViewOnce();
  const reduced = usePrefersReducedMotion();
  const show = termInView || reduced;

  return (
    <section id="background" className="background section-padding">
    <div className="section-inner">
      <Kicker index="04" label="background" />
      <h2 className="section-title">
        Where I&apos;ve <em>been.</em>
      </h2>

      <div ref={termRef} className={`background-grid term${show ? ' is-in' : ''}`}>
        <div>
          <h3 className="bg-column-title">
            $ history --experience
            {!show && <span className="term-caret" aria-hidden="true" />}
          </h3>
          <Timeline items={EXP} show={show} base={150} />
        </div>

        <div>
          <h3 className="bg-column-title">$ history --education</h3>
          <Timeline items={EDU} quiet show={show} base={150 + EXP.length * 70} />

          <h3 className="bg-column-title bg-certs-title">$ ls ./certs</h3>
          <ul className="certs-list">
            {CERTS.map((cert) => (
              <li key={cert.name}>
                <button
                  className="cert-row"
                  onClick={() => setCert(cert.img)}
                  aria-label={`View ${cert.name} certificate`}
                >
                  <img src={cert.img} alt="" className="cert-thumb" loading="lazy" />
                  <span className="cert-text">
                    <span className="cert-name">{cert.name}</span>
                    <span className="cert-from">{cert.from}</span>
                  </span>
                  <span className="cert-expand" aria-hidden="true">↗</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>

    <AnimatePresence>
      {cert && (
        <motion.div
          className="lightbox-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCert(null)}
        >
          <motion.div
            className="lightbox-content"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="lightbox-close" onClick={() => setCert(null)} aria-label="Close">
              <X size={26} />
            </button>
            <img src={cert} alt="Certificate full view" decoding="async" />
            <p className="lightbox-hint">click outside to close</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </section>
  );
};

export default React.memo(Background);
