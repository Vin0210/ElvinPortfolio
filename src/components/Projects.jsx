import { motion } from 'framer-motion';
import { useState } from 'react';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';

const projects = [
  {
    title: 'Snake Identification App',
    description: 'Accessible application for identifying snake species native to the Philippines',
    image: '/images/Snake.jpg',
    technologies: ['Flutter', 'TensorFlow'],
    liveLink: 'https://bongo.cat/',
    githubLink: 'https://github.com/project1',
    moreDescription: 'This app helps users identify Philippine snake species through image recognition. Built with Flutter for cross-platform compatibility and TensorFlow for machine learning capabilities.',
  },
  {
    title: 'Pokémon Web',
    description: 'Comprehensive Pokémon encyclopedia with team building features',
    image: '/images/project2.jpg',
    technologies: ['React', 'CSS', 'JSON Server'],
    liveLink: 'https://pokemonhehe.netlify.app/',
    githubLink: 'https://github.com/Vin0210/Pokemon',
    moreDescription: 'A feature-rich Pokémon web app that allows users to explore detailed Pokémon information, build custom teams, simulate battles, and track battle history. Uses React for the frontend and JSON Server for mock API responses.',
  },
  {
    title: 'Todo List',
    description: 'Productivity app for task management',
    image: '/images/project3.jpg',
    technologies: ['React', 'CSS'],
    liveLink: 'https://apptodo12.netlify.app/',
    githubLink: 'https://github.com/Vin0210/ToDo',
    moreDescription: 'A clean, intuitive to-do list application with task prioritization, completion tracking, and responsive design. Built with React for state management and modern CSS for styling.',
  },
  {
    title: 'Fast Food E-Commerce',
    description: 'Online ordering platform for food delivery',
    image: '/images/project5.jpg',
    technologies: ['React', 'CSS'],
    liveLink: 'https://elvinsblog.netlify.app/',
    githubLink: 'https://github.com/Vin0210/Blog',
    moreDescription: 'A full-featured fast food ordering system with menu browsing, cart functionality, and order tracking. Features responsive design for optimal viewing on all devices.',
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

  const handleImageClick = (e, image) => {
    e.stopPropagation();
    setExpandedImage(image);
  };

  return (
    <motion.section
      id="projects"
      className="projects-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <motion.h2
        className="section-title"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
        style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '3rem',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        My Projects
      </motion.h2>
      
      <div className="project-list" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '2rem',
      }}>
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ 
              scale: 1.03,
              boxShadow: '0 10px 30px rgba(0, 219, 222, 0.3)'
            }}
            onClick={() => setSelectedProject(project)}
            style={{ 
              cursor: 'pointer',
              borderRadius: '12px',
              overflow: 'hidden',
              background: 'rgba(26, 26, 46, 0.7)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <div 
              className="project-image-container"
              onClick={(e) => handleImageClick(e, project.image)}
              style={{ 
                cursor: 'zoom-in',
                height: '200px',
                overflow: 'hidden',
              }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>
            <div style={{ padding: '1.5rem' }}>
              <h3 style={{
                fontSize: '1.5rem',
                fontWeight: '600',
                marginBottom: '0.5rem',
                color: 'white',
              }}>
                {project.title}
              </h3>
              <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '1rem',
                lineHeight: '1.5',
              }}>
                {project.description}
              </p>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      background: 'linear-gradient(90deg, rgba(0, 219, 222, 0.2), rgba(252, 0, 255, 0.2))',
                      color: '#00dbde',
                      fontSize: '0.8rem',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setExpandedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
            padding: '2rem',
          }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setExpandedImage(null);
            }}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            <FiX />
          </button>
          <motion.img 
            src={expandedImage} 
            alt="Expanded view" 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              maxHeight: '90vh',
              maxWidth: '90vw',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        </motion.div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: 'rgba(26, 26, 46, 0.95)',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
            }}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              <FiX />
            </button>

            <h3 style={{
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'white',
              background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              {selectedProject.title}
            </h3>

            <div 
              onClick={(e) => handleImageClick(e, selectedProject.image)}
              style={{ 
                cursor: 'zoom-in',
                marginBottom: '1.5rem',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '300px',
              }}
            >
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              marginBottom: '2rem',
            }}>
              {selectedProject.moreDescription}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{
                color: 'white',
                fontSize: '1.2rem',
                marginBottom: '1rem',
              }}>
                Technologies Used:
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {selectedProject.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      background: 'linear-gradient(90deg, rgba(0, 219, 222, 0.2), rgba(252, 0, 255, 0.2))',
                      color: '#00dbde',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
            }}>
              <a
                href={selectedProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
                  color: 'white',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'transform 0.3s ease',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <FiExternalLink /> Live Demo
              </a>
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'transform 0.3s ease',
                }}
                whileHover={{ scale: 1.05 }}
              >
                <FiGithub /> View Code
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}