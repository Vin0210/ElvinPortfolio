import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Wrench } from 'lucide-react';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const categories = useMemo(() => ({
  frontend: {
    icon: <Code2 size={20} />,
    label: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95, color: '#E34F26' },
      { name: 'CSS3', level: 90, color: '#1572B6' },
      { name: 'JavaScript', level: 90, color: '#F7DF1E' },
      { name: 'jQuery', level: 85, color: '#0769AD' },
      { name: 'React', level: 75, color: '#61DAFB' },
       { name: 'VueJS', level: 75, color: '#a700c5' },
      { name: 'Bootstrap', level: 90, color: '#7952B3' }
    ]
  },

  backend: {
    icon: <Server size={20} />,
    label: 'Backend',
    skills: [
      { name: 'PHP', level: 95, color: '#777BB4' },
      { name: 'Laravel', level: 90, color: '#FF2D20' },
      { name: 'Node.js', level: 70, color: '#339933' },
      { name: 'MySQL', level: 90, color: '#4479A1' }
    ]
  },

  tools: {
    icon: <Wrench size={20} />,
    label: 'Tools',
    skills: [
      { name: 'Git', level: 85, color: '#F05032' },
      { name: 'GitHub Desktop', level: 90, color: '#8034A9' },
      { name: 'VS Code', level: 95, color: '#007ACC' }
    ]
  }
}), []);

  const activeSkills = categories[activeCategory]?.skills || [];

  const handleSpotlight = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  }, []);

  return (
    <section id="skills" className="skills section-padding">
      <div className="skills-container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">My Stack</span>
          <h2 className="section-title">Technologies I work with</h2>
        </motion.div>

        <div className="skills-tabs">
          {Object.entries(categories).map(([key, category]) => (
            <button
              key={key}
              className={`tab-btn ${activeCategory === key ? 'active' : ''}`}
              onClick={() => setActiveCategory(key)}
              style={{ position: 'relative' }}
            >
              {activeCategory === key && (
                <motion.span
                  layoutId="skillsTabPill"
                  className="tab-pill"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="tab-content">
                {category.icon}
                {category.label}
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="skills-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {activeSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                onMouseMove={handleSpotlight}
              >
                <div className="skill-header">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percentage">{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-progress"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    style={{ background: skill.color }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default React.memo(Skills);