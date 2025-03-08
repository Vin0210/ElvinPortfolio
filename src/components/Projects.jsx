import { motion } from 'framer-motion';
import { useState } from 'react';

const projects = [
  {
    title: 'Project 1',
    description: 'A modern web application built with React and Node.js.',
    image: '/images/project1.jpg',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
    liveLink: 'https://project1.com',
    githubLink: 'https://github.com/yourusername/project1',
    moreDescription: 'This project is a full-stack web application that allows users to manage tasks and collaborate with teams.',
  },
  {
    title: 'Project 2',
    description: 'An e-commerce platform with a responsive design.',
    image: '/images/project2.jpg',
    technologies: ['React', 'Redux', 'Firebase', 'Stripe'],
    liveLink: 'https://project2.com',
    githubLink: 'https://github.com/yourusername/project2',
    moreDescription: 'This project is an e-commerce platform that includes features like product search, cart management, and secure payments.',
  },
  {
    title: 'Project 3',
    description: 'A portfolio website showcasing my projects and skills.',
    image: '/images/project3.jpg',
    technologies: ['React', 'Vite', 'Framer Motion', 'CSS'],
    liveLink: 'https://portfolio.com',
    githubLink: 'https://github.com/yourusername/portfolio',
    moreDescription: 'This project is a personal portfolio website built with React and Vite, featuring animations and a modern design.',
  },
  {
    title: 'Project 4',
    description: 'A weather app with real-time data and forecasts.',
    image: '/images/project5.jpg',
    technologies: ['React', 'OpenWeather API', 'Axios', 'CSS'],
    liveLink: 'https://weatherapp.com',
    githubLink: 'https://github.com/yourusername/weatherapp',
    moreDescription: 'This project is a weather application that provides real-time weather data and forecasts for any location.',
  },
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>Projects</h2>
      <div className="project-list">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="project-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedProject(project)}
          >
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
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
            <img src={selectedProject.image} alt={selectedProject.title} />
            <p>{selectedProject.moreDescription}</p>
            <h4>Technologies Used:</h4>
            <ul>
              {selectedProject.technologies.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
            <div className="project-links">
              <a href={selectedProject.liveLink} target="_blank" rel="noopener noreferrer">
                Live Demo
              </a>
              <a href={selectedProject.githubLink} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            </div>
            <button onClick={() => setSelectedProject(null)}>Close</button>
          </motion.div>
        </div>
      )}
    </motion.section>
  );
}