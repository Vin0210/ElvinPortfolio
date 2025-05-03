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
        backgroundColor: '#1a1a2e',
        color: 'white',
        padding: 'clamp(1rem, 5vw, 4rem)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(1.5rem, 4vw, 3rem)',
        zIndex: 2,
        alignItems: 'center',
        textAlign: 'center'
      }}>
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.5rem'
          }}
        >
       
          <img 
  src="/images/profile.jpg" 
  alt="Profile"
  style={{
    width: '120px',
    height: '120px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #00dbde',
    boxShadow: '0 4px 15px rgba(0, 219, 222, 0.4)'
  }}
/>


          {/* Main Heading */}
          <h1 style={{
            fontSize: 'clamp(2rem, 8vw, 4.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            margin: 0,
            color: 'white'
          }}>
            Hi, I'm <span style={{ color: '#00dbde' }}>Elvin</span>
          </h1>

          {/* Subheading */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              fontSize: 'clamp(1.25rem, 4vw, 2rem)',
              fontWeight: 600,
              margin: 0,
              color: '#00dbde'
            }}
          >
            Web Developer
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.25rem)',
              opacity: 0.85,
              maxWidth: '700px',
              lineHeight: 1.6,
              margin: '0.5rem 0'
            }}
          >
            Fresh and enthusiastic developer ready to bring ideas to life through clean code and creative solutions.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            justifyContent: 'center',
            width: '100%',
            maxWidth: '800px'
          }}
        >
          {[
            { value: '10+', label: 'Projects Completed' },
            { value: '100%', label: 'Code Quality' }, 
            { value: 'Fast', label: 'Problem Solver' }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.5rem',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '16px',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                minWidth: '140px'
              }}
            >
              <span style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
                fontWeight: 700,
                color: '#00dbde',
                marginBottom: '0.5rem'
              }}>
                {stat.value}
              </span>
              <span style={{
                fontSize: 'clamp(0.9rem, 3vw, 1rem)',
                opacity: 0.8,
                fontWeight: 500
              }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          style={{ 
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
        
          
          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ 
              scale: 1.05,
              backgroundColor: 'rgba(0, 219, 222, 0.1)',
              borderColor: '#00dbde'
            }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '1rem 2.5rem',
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#00dbde',
              backgroundColor: 'transparent',
              border: '2px solid rgba(0, 219, 222, 0.5)',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            Contact Me
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
            </svg>
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
        opacity: 0.03,
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      
      {/* Subtle floating dots */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.1 } : {}}
        transition={{ duration: 1.5, delay: 0.5 }}
        style={{
          position: 'absolute',
          right: '10%',
          top: '20%',
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#00dbde',
          filter: 'blur(30px)',
          zIndex: 1
        }}
      />
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.1 } : {}}
        transition={{ duration: 1.5, delay: 0.7 }}
        style={{
          position: 'absolute',
          left: '15%',
          bottom: '15%',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          backgroundColor: '#fc00ff',
          filter: 'blur(30px)',
          zIndex: 1
        }}
      />
    </section>
  );
};

export default HeroSection;