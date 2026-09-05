import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Server, Wrench } from 'lucide-react';
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiJquery,
  SiReact,
  SiVuedotjs,
  SiBootstrap,
  SiPhp,
  SiLaravel,
  SiNodedotjs,
  SiMysql,
  SiGit,
  SiGithub,
} from 'react-icons/si';
import { headerContainer, headerItem } from '../utils/animationVariants';
import './Skills.css';

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');

  const categories = useMemo(() => ({
  frontend: {
    icon: <Code2 size={20} />,
    label: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95, color: '#E34F26', logo: <SiHtml5 color="#E34F26" /> },
      { name: 'CSS3', level: 90, color: '#1572B6', logo: <SiCss color="#1572B6" /> },
      { name: 'JavaScript', level: 90, color: '#F7DF1E', logo: <SiJavascript className="logo-js" /> },
      { name: 'jQuery', level: 85, color: '#0769AD', logo: <SiJquery color="#0769AD" /> },
      { name: 'React', level: 90, color: '#61DAFB', logo: <SiReact className="logo-react" /> },
       { name: 'VueJS', level: 75, color: '#a700c5', logo: <SiVuedotjs color="#4FC08D" /> },
      { name: 'Bootstrap', level: 90, color: '#7952B3', logo: <SiBootstrap color="#7952B3" /> }
    ]
  },

  backend: {
    icon: <Server size={20} />,
    label: 'Backend',
    skills: [
      { name: 'PHP', level: 95, color: '#777BB4', logo: <SiPhp color="#777BB4" /> },
      { name: 'Laravel', level: 90, color: '#FF2D20', logo: <SiLaravel color="#FF2D20" /> },
      { name: 'Node.js', level: 70, color: '#339933', logo: <SiNodedotjs color="#339933" /> },
      { name: 'MySQL', level: 90, color: '#4479A1', logo: <SiMysql color="#4479A1" /> }
    ]
  },

  tools: {
    icon: <Wrench size={20} />,
    label: 'Tools',
    skills: [
      { name: 'Git', level: 85, color: '#F05032', logo: <SiGit color="#F05032" /> },
      { name: 'GitHub Desktop', level: 90, color: '#8034A9', logo: <SiGithub color="#8034A9" /> },
      { name: 'VS Code', level: 95, color: '#007ACC', logo: <Code2 color="#007ACC" /> }
    ]
  }
}), []);

  const activeSkills = categories[activeCategory]?.skills || [];

  const getTier = (level) => {
    if (level >= 90) return { label: 'Expert', cls: 'tier-expert' };
    if (level >= 80) return { label: 'Advanced', cls: 'tier-advanced' };
    return { label: 'Familiar', cls: 'tier-familiar' };
  };

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
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <motion.span variants={headerItem} className="section-tag">My Stack</motion.span>
          <motion.h2 variants={headerItem} className="section-title">Technologies I work with</motion.h2>
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
            {activeSkills.map((skill, index) => {
              const tier = getTier(skill.level);
              return (
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
                    <div className="skill-logo" aria-hidden="true">{skill.logo}</div>
                    <span className={`skill-tier ${tier.cls}`}>
                      <span className="tier-dot" aria-hidden="true" />
                      {tier.label}
                    </span>
                  </div>
                  <div className="skill-name">{skill.name}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default React.memo(Skills);