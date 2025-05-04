import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaArrowUp } from 'react-icons/fa';

export default function Footer() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.footer
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      style={{
        background: 'rgba(26, 26, 46, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '3rem 2rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        position: 'relative'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '2rem'
      }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            display: 'flex',
            gap: '1.5rem',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}
        >
          {[
            {
              icon: <FaFacebook />,
              url: 'https://facebook.com/elvinramos.meme',
              color: '#1877F2'
            },
            {
              icon: <FaInstagram />,
              url: 'https://www.instagram.com/_thevinsea?igsh=aDQzMzB1bGl4NWhy',
              color: '#E4405F'
            },
            {
              icon: <FaLinkedin />,
              url: 'https://linkedin.com/in/elvinramos',
              color: '#0A66C2'
            },
            {
              icon: <FaGithub />,
              url: 'https://github.com/Vin0210',
              color: '#181717'
            }
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
              whileHover={{
                y: -5,
                color: social.color,
                scale: 1.1
              }}
              whileTap={{ scale: 0.9 }}
              style={{
                fontSize: '1.5rem',
                color: 'rgba(255, 255, 255, 0.7)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}
            >
              {social.icon}
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontSize: '0.9rem',
            textAlign: 'center',
            margin: 0
          }}
        >
          &copy; {new Date().getFullYear()} Elvin Ramos. All rights reserved.
        </motion.p>

        <motion.button
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{
            y: -5,
            background: 'linear-gradient(90deg, #00dbde, #fc00ff)'
          }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: 'rgba(26, 26, 46, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 100,
            color: 'white',
            fontSize: '1.2rem'
          }}
        >
          <FaArrowUp />
        </motion.button>
      </div>
    </motion.footer>
  );
}