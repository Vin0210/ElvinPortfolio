import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Maximize2, ChevronLeft, ChevronRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { featuredProjects, smallerBuilds } from '../data/projects';
import Kicker from './Kicker';
import './Projects.css';

const ProjectCase = ({ project, index, onImageClick }) => {
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, '0');

  const hasGallery = project.gallery && project.gallery.length > 0;

  return (
    <article
      className={`project-case ${flip ? 'flip' : ''}`}
    >
      <div className="case-media">
        <button
          className="case-image-btn"
          onClick={(e) => onImageClick(e, project)}
          aria-label={`View ${project.title} screenshots`}
        >
          <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
          <span className="case-image-hint" aria-hidden="true">
            <Maximize2 size={16} /> full size
          </span>
        </button>
        <p className="case-caption">
          fig.{num} — {project.id}
          {hasGallery && ` (+${project.gallery.length} more in the lightbox)`}
        </p>
      </div>

      <div className="case-body">
        <div className="case-head">
          <span className="case-num">{num}</span>
          <div>
            <h3 className="case-title">{project.title}</h3>
            <p className="case-tagline">{project.tagline}</p>
            {project.status && (
              <span className={`status-badge ${project.status === 'in progress' ? 'building' : 'live'}`} style={{ marginTop: '10px' }}>
                {project.status}
              </span>
            )}
          </div>
        </div>

        <dl className="case-meta">
          <div>
            <dt>year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt>role</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>

        <p className="case-why">{project.why}</p>

        <ul className="case-points">
          {project.points.map((point) => (
            <li key={point}>{point}</li>
          ))}
        </ul>

        <div className="case-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="stack-item">{tech}</span>
          ))}
        </div>

        <div className="case-links">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-link"
            >
              live demo <span className="arrow" aria-hidden="true">↗</span>
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-link"
            >
              <FaGithub size={14} /> source <span className="arrow" aria-hidden="true">↗</span>
            </a>
          )}
          {!project.demo && !project.github && (
            <span className="case-links-none">private / in progress</span>
          )}
        </div>
      </div>
    </article>
  );
};

const Projects = () => {
  const [gallery, setGallery] = useState(null);

  const handleImageClick = (e, project) => {
    e.stopPropagation();
    setGallery({
      images: [project.image, ...(project.gallery || [])],
      index: 0,
      title: project.title,
    });
  };

  const closeGallery = useCallback(() => setGallery(null), []);

  const stepGallery = useCallback(
    (dir) => {
      setGallery((g) => {
        if (!g || g.images.length < 2) return g;
        const next = (g.index + dir + g.images.length) % g.images.length;
        return { ...g, index: next };
      });
    },
    []
  );

  useEffect(() => {
    if (!gallery) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeGallery();
      if (e.key === 'ArrowRight') stepGallery(1);
      if (e.key === 'ArrowLeft') stepGallery(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [gallery, closeGallery, stepGallery]);

  return (
    <section id="work" className="work section-padding">
      <div className="section-inner">
        <Kicker index="02" label="work" />
        <h2 className="section-title">
          Things I&apos;ve <em>built.</em>
        </h2>
        <p className="section-lede">
          A mix of professional work and side projects — each one shipped,
          or honest about still being in progress.
        </p>

        <div className="cases">
          {featuredProjects.map((project, index) => (
            <ProjectCase
              key={project.id}
              project={project}
              index={index}
              onImageClick={handleImageClick}
            />
          ))}
        </div>

        <div
          className="small-builds"
        >
          <h3 className="small-builds-title">$ ls ./smaller-builds</h3>
          <ul>
            {smallerBuilds.map((build) => (
              <li key={build.name} className="small-build">
                <div className="small-build-main">
                  <span className="small-build-name">{build.name}</span>
                  <span className="small-build-note">{build.note}</span>
                </div>
                <div className="small-build-side">
                  <span className="small-build-stack">{build.stack}</span>
                  <span className="small-build-links">
                    {build.demo && (
                      <a href={build.demo} target="_blank" rel="noopener noreferrer" className="mono-link">
                        demo <span className="arrow" aria-hidden="true">↗</span>
                      </a>
                    )}
                    {build.github && (
                      <a href={build.github} target="_blank" rel="noopener noreferrer" className="mono-link">
                        <FaGithub size={13} /> code <span className="arrow" aria-hidden="true">↗</span>
                      </a>
                    )}
                    {!build.demo && !build.github && (
                      <span className="small-build-none">no public links yet</span>
                    )}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gallery lightbox with prev/next */}
      <AnimatePresence>
        {gallery && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.94, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={closeGallery} aria-label="Close">
                <X size={26} />
              </button>
              <img
                key={gallery.index}
                src={gallery.images[gallery.index]}
                alt={`${gallery.title} screenshot ${gallery.index + 1} of ${gallery.images.length}`}
                decoding="async"
              />
              {gallery.images.length > 1 && (
                <>
                  <button
                    className="lightbox-prev"
                    onClick={() => stepGallery(-1)}
                    aria-label="Previous screenshot"
                  >
                    <ChevronLeft size={26} />
                  </button>
                  <button
                    className="lightbox-next"
                    onClick={() => stepGallery(1)}
                    aria-label="Next screenshot"
                  >
                    <ChevronRight size={26} />
                  </button>
                </>
              )}
              <p className="lightbox-hint">
                {gallery.images.length > 1
                  ? `${gallery.index + 1} / ${gallery.images.length} — click outside to close`
                  : 'click outside to close'}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(Projects);
