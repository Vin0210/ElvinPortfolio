import { motion } from 'framer-motion';

const projects = [
  { image: '/images/project1.jpg' },
  { image: '/images/project2.jpg' },
  { image: '/images/project3.jpg' },
  { image: '/images/project5.jpg' },
];

export default function Projects() {
  return (
    <motion.section
      id="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
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
            <img src={project.image} alt={`Project ${index + 1}`} />
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
