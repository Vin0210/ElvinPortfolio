import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.section
      id="about"
      className="about-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      
      <motion.h2
        className="about-title"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        About Me
      </motion.h2>
      <motion.p
        className="about-description"
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Hi, I'm Elvin, a passionate web developer with expertise in building modern and responsive websites. I specialize in <span className="highlight">React</span>, <span className="highlight">JavaScript</span>, and modern web technologies. I love creating user-friendly and visually appealing applications.
      </motion.p>
    </motion.section>
  );
}