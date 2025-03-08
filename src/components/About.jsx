import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>About Me</h2>
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Hi, I'm Elvin, a passionate web developer with expertise in building modern and responsive websites. I specialize in React, JavaScript, and modern web technologies. I love creating user-friendly and visually appealing applications that solve real-world problems.
      </motion.p>
    </motion.section>
  );
}