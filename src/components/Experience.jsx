import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const experiences = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "Jan 2022 - Present",
      description: [
        "Developed responsive web applications using React and TypeScript",
        "Collaborated with UX designers to implement pixel-perfect interfaces",
        "Optimized application performance, reducing load times by 40%"
      ],
      tags: ["React", "TypeScript", "Redux", "Jest"]
    },
    {
      id: 2,
      role: "Web Developer",
      company: "Digital Creative Agency",
      period: "Mar 2020 - Dec 2021",
      description: [
        "Built and maintained client websites using modern JavaScript frameworks",
        "Implemented RESTful APIs integration with backend services",
        "Mentored junior developers in frontend best practices"
      ],
      tags: ["JavaScript", "Node.js", "Express", "MongoDB"]
    },
    {
      id: 3,
      role: "Junior Developer",
      company: "Startup Ventures",
      period: "Jun 2018 - Feb 2020",
      description: [
        "Assisted in developing MVP products for early-stage startups",
        "Participated in agile development processes",
        "Contributed to open-source projects"
      ],
      tags: ["HTML/CSS", "JavaScript", "Git", "Agile"]
    }
  ];

  return (
    <motion.section
      ref={ref}
      id="experience"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      {/* Decorative elements */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          position: 'absolute',
          right: '-10%',
          top: '20%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,219,222,0.1) 0%, rgba(252,0,255,0.05) 70%, transparent 100%)',
          zIndex: -1
        }}
      />

      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '3rem',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative'
        }}
      >
        My Experience
        <motion.span
          initial={{ width: 0 }}
          animate={inView ? { width: '100px' } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            display: 'block',
            height: '4px',
            background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
            margin: '0.5rem auto 0',
            borderRadius: '2px'
          }}
        />
      </motion.h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        position: 'relative'
      }}>
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 + index * 0.15, duration: 0.6 }}
            style={{
              background: 'rgba(26, 26, 46, 0.7)',
              backdropFilter: 'blur(10px)',
              borderRadius: '16px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ 
              transform: 'translateY(-5px)',
              boxShadow: '0 15px 40px rgba(0, 219, 222, 0.3)'
            }}
          >
            {/* Timeline indicator */}
            <div style={{
              position: 'absolute',
              left: '2rem',
              top: '3rem',
              bottom: '3rem',
              width: '4px',
              background: 'linear-gradient(to bottom, #00dbde, #fc00ff)',
              borderRadius: '2px'
            }} />

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              paddingLeft: '3rem'
            }}>
              <div>
                <h3 style={{
                  fontSize: '1.5rem',
                  fontWeight: '600',
                  color: 'white',
                  marginBottom: '0.25rem'
                }}>
                  {exp.role}
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    color: '#00dbde',
                    fontWeight: '500'
                  }}>
                    {exp.company}
                  </span>
                  <span style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: '0.9rem'
                  }}>
                    {exp.period}
                  </span>
                </div>
              </div>

              <ul style={{
                listStyleType: 'none',
                paddingLeft: '0',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                {exp.description.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.6 + index * 0.15 + i * 0.1 }}
                    style={{
                      color: 'rgba(255, 255, 255, 0.8)',
                      position: 'relative',
                      paddingLeft: '1.5rem',
                      lineHeight: '1.6'
                    }}
                    whileHover={{ x: 5 }}
                  >
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      color: '#00dbde'
                    }}>▹</span>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
                marginTop: '1rem'
              }}>
                {exp.tags.map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + index * 0.15 + i * 0.05 }}
                    style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '20px',
                      background: 'linear-gradient(90deg, rgba(0, 219, 222, 0.2), rgba(252, 0, 255, 0.2))',
                      color: '#00dbde',
                      fontSize: '0.8rem'
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default Experience;