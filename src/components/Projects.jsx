import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    title: 'Cat 1',
    description: 'Agile and curious, always chasing after anything that moves.',
    image: '/images/project1.jpg',
    technologies: ['React'],
    liveLink: 'https://bongo.cat//',
    githubLink: 'https://github.com/project1',
    moreDescription: 'Meow meow',
  },
  {
    title: 'Cat 2',
    description: 'Climbs, jumps, and investigates every corner of the home.',
    image: '/images/project2.jpg',
    technologies: ['React'],
    liveLink: 'https://cat-bounce.com/',
    githubLink: 'https://github.com/project2',
    moreDescription: 'Meow',
  },
  {
    title: 'Cat 3',
    description: 'Runs around the house at full speed when everyone is asleep.',
    image: '/images/project3.jpg',
    technologies: ['CSS'],
    liveLink: 'https://bongo.cat//',
    githubLink: 'https://github.com/portfolio',
    moreDescription: 'Meow',
  },
  {
    title: 'Cat 4',
    description: 'Always meowing for treats and extra meals.',
    image: '/images/project5.jpg',
    technologies: ['CSS'],
    liveLink: 'https://cat-bounce.com/',
    githubLink: 'https://github.com/weatherapp',
    moreDescription: 'Meow meow',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <motion.section
      id="projects"
      className="projects-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="section-title"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        Projects
      </motion.h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
            onClick={() => setSelectedProject(project)}
          >
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={() => setSelectedProject(null)}>
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>{selectedProject.title}</h3>
            <img src={selectedProject.image} alt={selectedProject.title} className="modal-image" />
            <p>{selectedProject.moreDescription}</p>
            <h4>Technologies Used:</h4>
            <ul className="modal-technologies">
              {selectedProject.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
            <div className="project-links">
              <a
                href={selectedProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="live-demo"
              >
                Live Demo
              </a>
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                GitHub
              </a>
            </div>
            <button className="close-button" onClick={() => setSelectedProject(null)}>
              Close
            </button>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}