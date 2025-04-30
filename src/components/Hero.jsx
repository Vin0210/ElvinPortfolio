import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const HeroSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      window.scrollTo({
        top: element.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="hero" 
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
        color: 'white',
        padding: 'clamp(1rem, 5vw, 2rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1rem, 3vw, 2rem)',
        zIndex: 2,
        alignItems: 'center', // Center all content
        textAlign: 'center' // Center text
      }}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 4rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: 'clamp(0.5rem, 2vw, 1rem)',
            background: 'linear-gradient(90deg, #ffffff, #e6e6e6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Hi, I'm Elvin<br />
            A Passionate<br />
            <span style={{ 
              background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
              WebkitBackgroundClip: 'text'
            }}>
              Web Developer
            </span>
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.2rem)',
            opacity: 0.9,
            maxWidth: '600px',
            marginTop: '1rem'
          }}>
            Fresh and enthusiastic developer ready to bring ideas to life through clean code and creative solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(1rem, 3vw, 2rem)',
            marginTop: 'clamp(1rem, 3vw, 2rem)',
            justifyContent: 'center' // Center stats
          }}
        >
          {[
            { value: '10+', label: 'Projects Built' },
            { value: '100%', label: 'Dedication' }, 
            { value: 'Fast', label: 'Learner' }
          ].map((stat, index) => (
            <div key={index} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center', // Center stat items
              minWidth: '120px'
            }}>
              <span style={{
                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                fontWeight: 700,
                background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                {stat.value}
              </span>
              <span style={{
                fontSize: 'clamp(0.8rem, 3vw, 1rem)',
                opacity: 0.8
              }}>
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{ 
            marginTop: 'clamp(1.5rem, 5vw, 3rem)',
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap',
            justifyContent: 'center' // Center buttons
          }}
        >
          <motion.button
            onClick={() => scrollToSection('projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: 'clamp(0.8rem, 3vw, 1rem) clamp(1.5rem, 5vw, 2.5rem)',
              fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
              fontWeight: 600,
              color: 'white',
              background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'transform 0.3s ease',
              boxShadow: '0 4px 15px rgba(0, 219, 222, 0.3)',
              whiteSpace: 'nowrap'
            }}
          >
            View My Work
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 219, 222, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: 'clamp(0.8rem, 3vw, 1rem) clamp(1.5rem, 5vw, 2.5rem)',
              fontSize: 'clamp(0.9rem, 3vw, 1.1rem)',
              fontWeight: 600,
              color: '#00dbde',
              background: 'transparent',
              border: '2px solid #00dbde',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap'
            }}
          >
            Contact Me
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
        opacity: 0.1,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: 'clamp(20px, 5vw, 40px) clamp(20px, 5vw, 40px)'
      }} />
      
      <motion.div 
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }}
        style={{
          position: 'absolute',
          right: '-10%',
          bottom: '-10%',
          width: 'clamp(200px, 60vw, 500px)',
          height: 'clamp(200px, 60vw, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,219,222,0.2) 0%, rgba(252,0,255,0.1) 70%, transparent 100%)',
          zIndex: 1
        }}
      />
    </section>
  );
};

export default HeroSection;