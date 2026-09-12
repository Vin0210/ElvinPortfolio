import React from 'react';
import Kicker from './Kicker';
import { useInViewOnce } from '../hooks/useInViewOnce';
import { usePrefersReducedMotion } from '../hooks/useMotionPrefs';
import './About.css';

const NOW_LINES = [
  ['role', 'web developer @ itech rar, inc.'],
  ['degree', 'bs information technology, wmsu (2020–2025)'],
  ['building', 'school systems, booking platforms, ml capstone'],
  ['learning', 'machine learning · tensorflow · flutter'],
];

const About = () => {
  const [termRef, termInView] = useInViewOnce();
  const reduced = usePrefersReducedMotion();
  const show = termInView || reduced;

  return (
    <section id="about" className="about section-padding">
      <div className="section-inner">
        <Kicker index="01" label="about" />
        <h2 className="section-title">
          The short <em>version.</em>
        </h2>

        <div className="about-grid">
          <div className="about-prose">
            <p>
              I got into web development at Western Mindanao State University,
              where I finished an IT degree in 2025. Since mid-2025 I&apos;ve been
              working at Itech Rar, Inc., building and maintaining a school
              management system that students, teachers, and administrators
              actually use every day.
            </p>
            <p>
              Most of that work is Laravel, React, and MySQL — new features,
              bug fixes, performance, and the occasional migration nobody wants
              to touch. Before the job: a document archiving system for WMSU,
              a machine-learning capstone, and the usual pile of side projects
              that taught me the most.
            </p>
            <p>
              I like problems where correctness matters — enrollment logic,
              billing, scheduling. The boring-sounding parts that have to be
              right, because people depend on them.
            </p>
          </div>

          <aside
            ref={termRef}
            className={`about-now term${show ? ' is-in' : ''}`}
            aria-label="What I'm doing now"
          >
            <p className="now-title">
              $ cat now.txt
              {!show && <span className="term-caret" aria-hidden="true" />}
            </p>
            <dl className="now-list">
              {NOW_LINES.map(([key, value], i) => (
                <div
                  className={`now-row term-row${show ? ' is-shown' : ''}`}
                  style={{ transitionDelay: `${150 + i * 70}ms` }}
                  key={key}
                >
                  <dt>{key}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="now-note">
              {'// updated whenever something changes'}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);
