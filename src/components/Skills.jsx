import { motion } from 'framer-motion';
import { useState } from 'react';

const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [activeCategory, setActiveCategory] = useState("Frontend");

  const skillsData = [
    {
      category: "Frontend",
      icon: "💻",
      skills: [
        { name: "React", level: 90, icon: "/icons/react.jpg" },
        { name: "JavaScript", level: 85, icon: "/icons/js.jpg" },
        { name: "HTML/CSS", level: 95, icon: "/icons/html.jpg" },
        { name: "Tailwind", level: 85, icon: "/icons/tailwind.jpg" },
      ]
    },
    {
      category: "Backend",
      icon: "🔧",
      skills: [
        { name: "Node.js", level: 80, icon: "/icons/nodejs.jpg" },
        { name: "Django", level: 75, icon: "/icons/django.jpg" },
        { name: "MongoDB", level: 70, icon: "/icons/mongodb.jpg" },
        { name: "Firebase", level: 65, icon: "/icons/firebase.jpg" },
      ]
    },
    {
      category: "Tools",
      icon: "🛠️",
      skills: [
        { name: "Git", level: 85, icon: "/icons/git.jpg" },
        { name: "VS Code", level: 90, icon: "/icons/vscode.jpg" },
        { name: "Tensorflow", level: 75, icon: "/icons/tensorflow.jpg" },
        { name: "Flutter", level: 60, icon: "/icons/flutter.jpg" },
      ]
    }
  ];

  const activeSkills = skillsData.find(cat => cat.category === activeCategory)?.skills || [];

  return (
    <motion.section 
      id="skills"
      className="skills-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: '4rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
      }}
    >
      <motion.h2
        className="section-title"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '3rem',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        My Skills
      </motion.h2>

      {/* Category Tabs */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '2rem',
        flexWrap: 'wrap',
      }}>
        {skillsData.map((category, index) => (
          <motion.button
            key={index}
            onClick={() => setActiveCategory(category.category)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              background: activeCategory === category.category 
                ? 'linear-gradient(90deg, rgba(0, 219, 222, 0.2), rgba(252, 0, 255, 0.2))' 
                : 'rgba(255, 255, 255, 0.05)',
              border: activeCategory === category.category 
                ? '1px solid rgba(0, 219, 222, 0.5)' 
                : '1px solid rgba(255, 255, 255, 0.1)',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
            }}
            whileHover={{ 
              background: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
            {category.category}
          </motion.button>
        ))}
      </div>

      {/* Skills Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '1.5rem',
      }}>
        {activeSkills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseEnter={() => setHoveredSkill(skill.name)}
            onMouseLeave={() => setHoveredSkill(null)}
            style={{
              background: 'rgba(26, 26, 46, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '1.5rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              transform: hoveredSkill === skill.name ? 'translateY(-5px)' : 'none',
              boxShadow: hoveredSkill === skill.name 
                ? '0 10px 30px rgba(0, 219, 222, 0.3)' 
                : 'none',
            }}
          >
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1rem',
            }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '10px',
                background: 'rgba(255, 255, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                {skill.icon ? (
                  <img 
                    src={skill.icon} 
                    alt={skill.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.target.src = '/icons/default-skill.svg';
                      e.target.style.padding = '10px';
                      e.target.style.objectFit = 'contain';
                    }}
                  />
                ) : (
                  <span style={{ fontSize: '1.5rem' }}>🛠️</span>
                )}
              </div>
              <h3 style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: 'white',
                margin: 0,
              }}>
                {skill.name}
              </h3>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}>
              <div style={{
                flex: 1,
                height: '8px',
                borderRadius: '4px',
                background: 'rgba(255, 255, 255, 0.1)',
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
                    borderRadius: '4px',
                  }}
                />
              </div>
              <span style={{
                color: '#00dbde',
                fontWeight: '600',
                fontSize: '0.9rem',
              }}>
                {skill.level}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Circular Skills Alternative (Uncomment to use) */}
      {/*
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '2rem',
        marginTop: '3rem',
      }}>
        {activeSkills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div style={{
              position: 'relative',
              width: '100px',
              height: '100px',
            }}>
              <svg viewBox="0 0 36 36" style={{
                width: '100%',
                height: '100%',
                transform: 'rotate(-90deg)',
              }}>
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.1)"
                  strokeWidth="3"
                />
                <motion.path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#skill-gradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0, 100' }}
                  whileInView={{ 
                    strokeDasharray: [`${skill.level}, 100`],
                    transition: { duration: 1, delay: index * 0.1 }
                  }}
                />
              </svg>
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: 'white',
                fontWeight: '600',
                fontSize: '1.2rem',
              }}>
                {skill.level}%
              </div>
            </div>
            <span style={{
              color: 'white',
              fontWeight: '500',
              textAlign: 'center',
            }}>
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
      */}
    </motion.section>
  );
};

export default Skills;