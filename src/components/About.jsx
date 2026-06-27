import React from 'react';
import { motion } from 'framer-motion';
import { Code, Globe, Zap, Users } from 'lucide-react';
import './About.css';

const About = () => {
  const stats = [
    { icon: <Code size={24} />, label: 'Projects', value: '10+' },
    { icon: <Globe size={24} />, label: 'Clients', value: '5+' },
    { icon: <Zap size={24} />, label: 'Hours Coded', value: '500+' },
    { icon: <Users size={24} />, label: 'Collaborations', value: '8+' }
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
          {/* <span className="section-tag">About Me</span> */}
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
              I'm a Web Developer with a strong passion for building modern, scalable, and user-centric web applications. With hands-on experience developing enterprise school management systems, I specialize in PHP, Laravel, React, JavaScript, and MySQL.
            </p>
            <p className="about-text">
              I enjoy transforming complex requirements into reliable, efficient, and intuitive digital solutions.
            </p>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-icon">{stat.icon}</div>
                  <div className="stat-value">{stat.value}</div>
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