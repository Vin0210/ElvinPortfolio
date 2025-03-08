import { motion } from 'framer-motion';
import animeCharacter from '../assets/images/cat1.jpg';

export default function Hero() {
  return (
    <motion.section
      id="hero"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="hero-content">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Hi, I'm Elvin
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          A passionate web developer building modern and responsive websites.
        </motion.p>
        <motion.a
          href="#projects"
          className="cta-button"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          View My Work
        </motion.a>
      </div>

      <img
        src={animeCharacter}
        alt="Anime Character"
        className="profile-picture"
      />
    </motion.section>
  );
}