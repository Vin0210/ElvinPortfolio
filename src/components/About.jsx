import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <motion.section
      id="about"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      style={{

        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#1a1a2e'
      }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.03,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
        style={{
          position: 'absolute',
          left: '-15%',
          bottom: '-15%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          backgroundColor: 'rgba(252, 0, 255, 0.05)',
          zIndex: 0,
          filter: 'blur(30px)'
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
          color: '#00dbde',
          position: 'relative'
        }}
      >
        About Me
        <motion.span
          initial={{ width: 0 }}
          animate={inView ? { width: '100px' } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            height: '4px',
            backgroundColor: '#00dbde',
            margin: '0.5rem auto 0',
            borderRadius: '2px'
          }}
        />
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          backgroundColor: 'rgba(26, 26, 46, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '12px',
          padding: '3rem',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          maxWidth: '800px',
          margin: '0 auto',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
        }}
      >
        <motion.p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}
        >
          Hi, I'm <span style={{ fontWeight: '600', color: '#00dbde' }}>Elvin</span>, I enjoy building modern, responsive websites. I work with tools like <span style={{
            color: '#00dbde',
            fontWeight: '600'
          }}>React</span> and <span style={{
            color: '#00dbde',
            fontWeight: '600'
          }}>JavaScript</span>, to create clean and useful web apps.
        </motion.p>

        <motion.p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            marginBottom: '2rem'
          }}
        >
          I love creating <span style={{ fontStyle: 'italic', color: '#00dbde' }}>user-friendly</span> and <span style={{ fontStyle: 'italic', color: '#00dbde' }}>visually appealing</span> applications. With a keen eye for design and a passion for clean code, I care about good design and writing code that works well, so users have a great experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginTop: '2rem',
            flexWrap: 'wrap'
          }}
        >
          {['Web Development', 'UI/UX', 'Responsive', 'Performance', 'Clean Code'].map((item, index) => (
            <motion.span
              key={index}
              whileHover={{ y: -3, backgroundColor: 'rgba(0, 219, 222, 0.2)' }}
              style={{
                padding: '0.5rem 1.2rem',
                backgroundColor: 'rgba(0, 219, 222, 0.1)',
                borderRadius: '50px',
                color: '#00dbde',
                border: '1px solid rgba(0, 219, 222, 0.3)',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.3s ease'
              }}
            >
              {item}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>


    </motion.section>
  );
}