import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  // Handle CV download
  const handleDownloadCV = () => {
    // Replace with your actual CV file path
    const cvUrl = '/public/documents/Elvin_Ramos_CV.pdf';
    
    // Create a temporary anchor element
    const link = document.createElement('a');
    link.href = cvUrl;
    link.download = 'Elvin_Ramos_CV.pdf'; // Set the filename for download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Close mobile menu if open
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  // Handle resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsMenuOpen(false);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      for (const item of navItems) {
        const element = document.getElementById(item.id);
        if (element && scrollPosition >= element.offsetTop) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      window.scrollTo({
        top: element.offsetTop - headerHeight,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '1.5rem clamp(1rem, 5vw, 2rem)',
          background: 'rgba(26, 26, 46, 0.9)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        {/* Logo */}
        <motion.div 
          onClick={() => scrollToSection('hero')}
          style={{
            fontSize: '1.8rem',
            fontWeight: 700,
            background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            cursor: 'pointer'
          }}
          whileHover={{ scale: 1.05 }}
        >
          Elvin.
        </motion.div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{ display: 'flex', gap: 'clamp(1rem, 2vw, 2rem)', alignItems: 'center' }}
          >
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  color: activeSection === item.id ? '#00dbde' : 'white',
                  fontSize: 'clamp(0.9rem, 1vw, 1rem)',
                  fontWeight: 500,
                  position: 'relative',
                  padding: '0.5rem 0',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap'
                }}
                whileHover={{ 
                  color: '#fc00ff',
                  y: -2
                }}
                transition={{ duration: 0.3 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #00dbde, #fc00ff)'
                    }}
                    layoutId="activeIndicator"
                  />
                )}
              </motion.div>
            ))}

            <motion.button
              onClick={handleDownloadCV}
              style={{
                padding: '0.7rem 1.8rem',
                background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
                border: 'none',
                borderRadius: '50px',
                color: 'white',
                fontWeight: 600,
                cursor: 'pointer',
                fontSize: '0.9rem',
                boxShadow: '0 4px 15px rgba(0, 219, 222, 0.3)',
                marginLeft: '1rem'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Download CV
            </motion.button>
          </motion.nav>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <motion.button
            style={{
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 1001
            }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </motion.button>
        )}
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMobile && isMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(26, 26, 46, 0.98)',
            zIndex: 999,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '2rem',
            padding: '6rem 1rem 2rem'
          }}
        >
          {navItems.map((item) => (
            <motion.div
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              style={{
                color: activeSection === item.id ? '#00dbde' : 'white',
                fontSize: '1.5rem',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                cursor: 'pointer',
                width: '100%',
                textAlign: 'center'
              }}
              whileHover={{ 
                color: '#fc00ff',
                x: 10
              }}
              transition={{ duration: 0.3 }}
            >
              {item.label}
            </motion.div>
          ))}
          
          <motion.button
            onClick={handleDownloadCV}
            style={{
              padding: '1rem 2.5rem',
              background: 'linear-gradient(90deg, #00dbde, #fc00ff)',
              border: 'none',
              borderRadius: '50px',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '1rem',
              marginTop: '1rem',
              boxShadow: '0 4px 15px rgba(0, 219, 222, 0.3)'
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Download CV
          </motion.button>
        </motion.div>
      )}
    </>
  );
}