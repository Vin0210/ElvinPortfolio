import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Globe, Zap, Users } from 'lucide-react';
import './About.css';

const STAT_VALUES = ['10+', '5+', '500+', '8+'];

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

const About = () => {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true });
  const [counts, setCounts] = useState(['0', '0', '0', '0']);

  useEffect(() => {
    if (!statsInView) return;
    const duration = 1400;
    let start;
    let raf;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setCounts(
        STAT_VALUES.map((value) => {
          const match = value.match(/(\d+)(.*)/);
          const target = parseInt(match[1], 10);
          const suffix = match[2] || '';
          return Math.round(target * easeOutCubic(progress)) + suffix;
        })
      );
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [statsInView]);

  const stats = [
    { icon: <Code size={24} />, label: 'Projects' },
    { icon: <Globe size={24} />, label: 'Clients' },
    { icon: <Zap size={24} />, label: 'Hours Coded' },
    { icon: <Users size={24} />, label: 'Collaborations' }
  ];

  return (
    <section id="about" className="about section-padding">
      <div className="about-container">
        <motion.div
          className="about-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-title">Passionate about creating <br />digital experiences</h2>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="about-text">
              I&apos;m a Web Developer with a strong passion for building modern, scalable, and user-centric web applications. With hands-on experience developing enterprise school management systems, I specialize in PHP, Laravel, React, JavaScript, and MySQL.
            </p>
            <p className="about-text">
              I enjoy transforming complex requirements into reliable, efficient, and intuitive digital solutions.
            </p>

            <div className="about-stats" ref={statsRef}>
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{counts[index]}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="about-skills"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="skill-tags">
              {['Laravel', 'JavaScript', 'Jquery', 'MySQL', 'Node.js', 'CSS', 'HTML', 'Bootstrap', 'React', 'PHP'].map((skill, index) => (
                <motion.span
                  key={skill}
                  className="skill-tag"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(About);