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
        overflow: 'hidden'
      }}
    >
      {/* Decorative elements */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          position: 'absolute',
          right: '-10%',
          top: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,219,222,0.1) 0%, rgba(252,0,255,0.05) 70%, transparent 100%)',
          zIndex: -1
        }}
      />
      
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.7 }}
        style={{
          position: 'absolute',
          left: '-15%',
          bottom: '-15%',
          width: '600px',
          height: '600px',
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
          marginBottom: '2rem',
          textAlign: 'center',
          background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          position: 'relative'
        }}
      >
        About Me
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

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          background: 'rgba(26, 26, 46, 0.7)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
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
          Hi, I'm <span style={{ fontWeight: '600', color: '#00dbde' }}>Elvin</span>, a passionate web developer with expertise in building modern and responsive websites. I specialize in <span style={{ 
            background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '600'
          }}>React</span>, <span style={{ 
            background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '600'
          }}>JavaScript</span>, and modern web technologies.
        </motion.p>
        
        <motion.p
          style={{
            fontSize: '1.1rem',
            lineHeight: '1.8',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center'
          }}
        >
          I love creating <span style={{ fontStyle: 'italic' }}>user-friendly</span> and <span style={{ fontStyle: 'italic' }}>visually appealing</span> applications that solve real problems. With a keen eye for design and a passion for clean code, I strive to build experiences that users love.
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
          {['Web Development', 'UI/UX Design', 'Responsive Design', 'Performance'].map((item, index) => (
            <motion.span
              key={index}
              whileHover={{ y: -3 }}
              style={{
                padding: '0.5rem 1rem',
                background: 'rgba(0, 219, 222, 0.1)',
                borderRadius: '50px',
                color: '#00dbde',
                border: '1px solid rgba(0, 219, 222, 0.3)',
                fontSize: '0.9rem'
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