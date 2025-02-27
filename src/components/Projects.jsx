import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Project 1',
    description: 'A modern web application built with React and Node.js.',
    image: '/images/project1.jpg',
  },
  {
    title: 'Project 2',
    description: 'An e-commerce platform with a responsive design.',
    image: '/images/project2.jpg',
  },
];

export default function Projects() {
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
          >
            <img src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}