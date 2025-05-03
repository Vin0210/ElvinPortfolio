import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaBriefcase, FaAward, FaCode } from 'react-icons/fa';
import { FiX, FiExternalLink, FiGithub } from 'react-icons/fi';

export default function Qualifications() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeTab, setActiveTab] = useState('education');
  const [selectedProject, setSelectedProject] = useState(null);
  const [expandedImage, setExpandedImage] = useState(null);

  const handleImageClick = (e, image) => {
    e.stopPropagation();
    setExpandedImage(image);
  };

  const educationData = [
    {
      id: 1,
      title: "Information Technology Degree",
      institution: "Western Mindanao State University",
      year: "2020 - 2025",
      description: "Specialized in Web Development, Application Development and Software Engineering."
    },
    {
      id: 2,
      title: "Senior High School Diploma",
      institution: "Culianan National High School",
      year: "2020",
      description: "Intensive 2-years program focusing on Research, History and Technology"
    },
    {
      id: 3,
      title: "High School Diploma",
      institution: "Culianan National High School",
      year: "2015 - 2020",
      description: "Gained essential knowledge in math, science, and computer fundamentals to prepare for further studies."
    }
  ];

  const experienceData = [
    {
      id: 1,
      title: "Capstone Project 2",
      institution: "WMSU CCS",
      year: "2025 - Present",
      description: "Collaborating with the team of developers building an application for Snake Recognition using Machine Learning"
    },
    {
      id: 2,
      title: "e-Commerce Website",
      institution: "WMSU CCS",
      year: "2023",
      description: "Developed and maintained an e-Commerce Web for IT - Elective 2"
    },
    {
      id: 3,
      title: "Software Engineering",
      institution: "WMSU CCS",
      year: "2022",
      description: "Assisted in developing Document Archiving System for WESMAARDEC in WMSU."
    }
  ];

  const certificationData = [
    {
      id: 1,
      title: "Python Certifications",
      institution: "LinkedIn",
      year: "2025",
      description: "Python for Beginners certification."
    },
    {
      id: 2,
      title: "Machine Learning",
      institution: "LinkedIn",
      year: "2025",
      description: "Machine Learing using Python certification."
    }
  ];

  const projectsData = [
    {
      id: 1,
      title: "Snake Identification App",
      institution: "Personal Project",
      year: "2025",
      description: "Accessible application for identifying snake species native to the Philippines",
      image: "/images/Snake.jpg",
      technologies: ["Flutter", "TensorFlow"],
      liveLink: "https://snake.io/",
      githubLink: "https://github.com/project1",
      moreDescription: "This app helps users identify Philippine snake species through image recognition. Built with Flutter for cross-platform compatibility and TensorFlow for machine learning capabilities.",
    },
    {
      id: 2,
      title: "Pokémon Web",
      institution: "Personal Project",
      year: "2024",
      description: "Comprehensive Pokémon encyclopedia with team building features",
      image: "/images/project2.jpg",
      technologies: ["React", "CSS", "JSON Server"],
      liveLink: "https://pokemonhehe.netlify.app/",
      githubLink: "https://github.com/Vin0210/Pokemon",
      moreDescription: "A feature-rich Pokémon web app that allows users to explore detailed Pokémon information, build custom teams, simulate battles, and track battle history. Uses React for the frontend and JSON Server for mock API responses.",
    },
    {
      id: 3,
      title: "Todo List",
      institution: "Personal Project",
      year: "2023",
      description: "Productivity app for task management",
      image: "/images/project3.jpg",
      technologies: ["React", "CSS"],
      liveLink: "https://apptodo12.netlify.app/",
      githubLink: "https://github.com/Vin0210/ToDo",
      moreDescription: "A clean, intuitive to-do list application with task prioritization, completion tracking, and responsive design. Built with React for state management and modern CSS for styling.",
    },
    {
      id: 4,
      title: "Fast Food E-Commerce",
      institution: "Personal Project",
      year: "2023",
      description: "Online ordering platform for food delivery",
      image: "/images/project5.jpg",
      technologies: ["React", "CSS"],
      liveLink: "https://elvinsblog.netlify.app/",
      githubLink: "https://github.com/Vin0210/Blog",
      moreDescription: "A full-featured fast food ordering system with menu browsing, cart functionality, and order tracking. Features responsive design for optimal viewing on all devices.",
    }
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case 'education': return educationData;
      case 'experience': return experienceData;
      case 'certifications': return certificationData;
      case 'projects': return projectsData;
      default: return educationData;
    }
  };

  const getIcon = () => {
    switch (activeTab) {
      case 'education': return <FaGraduationCap />;
      case 'experience': return <FaBriefcase />;
      case 'certifications': return <FaAward />;
      case 'projects': return <FaCode />;
      default: return <FaGraduationCap />;
    }
  };

  const renderContent = (item) => {
    if (activeTab === 'projects') {
      return (
        <div 
        id="projects"
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem',
          
        }}>
          {/* Project header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 219, 222, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00dbde',
              fontSize: '1.2rem'
            }}>
              {getIcon()}
            </div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: 'white',
              margin: 0
            }}>
              {item.title}
            </h3>
          </div>

          {/* Project meta */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              color: '#00dbde',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              {item.institution}
            </span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.9rem'
            }}>
              {item.year}
            </span>
          </div>

          {/* Project image */}
          <div 
            onClick={(e) => handleImageClick(e, item.image)}
            style={{ 
              cursor: 'zoom-out',
              height: '200px',
              width: '100%',
              overflow: 'hidden',
              borderRadius: '8px',
              marginBottom: '1rem',
            }}
          >
            <img 
              src={item.image} 
              alt={item.title} 
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.3s ease',
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>

          {/* Project description */}
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6',
            margin: 0,
            marginBottom: '1rem'
          }}>
            {item.description}
          </p>

          {/* Technologies */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            marginBottom: '1rem'
          }}>
            {item.technologies.map((tech, techIndex) => (
              <span 
                key={techIndex} 
                style={{
                  padding: '0.25rem 0.75rem',
                  borderRadius: '20px',
                  backgroundColor: 'rgba(0, 219, 222, 0.1)',
                  color: '#00dbde',
                  fontSize: '0.8rem',
                  border: '1px solid rgba(0, 219, 222, 0.3)'
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{
            display: 'flex',
            gap: '1rem',
          }}>
            <a
              href={item.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: '#00dbde',
                color: 'black',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.9rem',
                transition: 'all 0.3s ease',
              }}
              whileHover={{ 
                backgroundColor: '#fc00ff',
                transform: 'scale(1.05)'
              }}
            >
              <FiExternalLink size={14} /> Live Demo
            </a>
            <a
              href={item.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'white',
                borderRadius: '50px',
                textDecoration: 'none',
                fontWeight: '500',
                fontSize: '0.9rem',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                transition: 'all 0.3s ease',
              }}
              whileHover={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                transform: 'scale(1.05)'
              }}
            >
              <FiGithub size={14} /> View Code
            </a>
          </div>
        </div>
      );
    } else {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          paddingLeft: '3rem'
        }}>
          {/* Item header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '0.5rem'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: 'rgba(0, 219, 222, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#00dbde',
              fontSize: '1.2rem'
            }}>
              {getIcon()}
            </div>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: 'white',
              margin: 0
            }}>
              {item.title}
            </h3>
          </div>

          {/* Item meta */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              color: '#00dbde',
              fontWeight: '500',
              fontSize: '0.9rem'
            }}>
              {item.institution}
            </span>
            <span style={{
              color: 'rgba(255, 255, 255, 0.6)',
              fontSize: '0.9rem'
            }}>
              {item.year}
            </span>
          </div>

          {/* Description */}
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6',
            margin: 0
          }}>
            {item.description}
          </p>
        </div>
      );
    }
  };

  return (
    <motion.section
      ref={ref}
      id="qualifications"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
      style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        backgroundColor: '#1a1a2e'
      }}
    >
      {/* Section title */}
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
        Qualifications
        <motion.span
          initial={{ width: 0 }}
          animate={inView ? { width: '100px' } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            display: 'block',
            height: '4px',
            backgroundColor: '#00dbde',
            margin: '0.5rem auto 0',
            borderRadius: '2px'
          }}
        />
      </motion.h2>

      {/* Tab navigation */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
          { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
          { id: 'certifications', label: 'Certifications', icon: <FaAward /> },
          { id: 'projects', label: 'Projects', icon: <FaCode /> }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              padding: '0.75rem 1.5rem',
              borderRadius: '50px',
              backgroundColor: activeTab === tab.id 
                ? 'rgba(0, 219, 222, 0.2)' 
                : 'rgba(255, 255, 255, 0.05)',
              border: activeTab === tab.id 
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
              backgroundColor: activeTab === tab.id 
                ? 'rgba(0, 219, 222, 0.3)' 
                : 'rgba(255, 255, 255, 0.1)',
            }}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Content grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '1.5rem'
      }}>
        {getActiveData().map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 + index * 0.1, duration: 0.6 }}
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              padding: '2rem',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}
            whileHover={{ 
              transform: activeTab !== 'projects' ? 'translateY(-5px)' : 'none',
              boxShadow: activeTab !== 'projects' ? '0 15px 40px rgba(0, 219, 222, 0.3)' : '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}
            onClick={activeTab === 'projects' ? () => setSelectedProject(item) : undefined}
          >
            {/* Timeline indicator for non-project items */}
            {activeTab !== 'projects' && (
              <div style={{
                position: 'absolute',
                left: '2rem',
                top: '2.5rem',
                bottom: '2.5rem',
                width: '4px',
                backgroundColor: '#00dbde',
                borderRadius: '2px'
              }} />
            )}
            
            {renderContent(item)}
          </motion.div>
        ))}
      </div>

      {/* Expanded Image Modal */}
      {expandedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setExpandedImage(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'zoom-out',
            padding: '2rem',
          }}
        >
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setExpandedImage(null);
            }}
            style={{
              position: 'absolute',
              top: '2rem',
              right: '2rem',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer',
              zIndex: 1001,
            }}
          >
            <FiX />
          </button>
          <motion.img 
            src={expandedImage} 
            alt="Expanded view" 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2 }}
            style={{
              maxHeight: '90vh',
              maxWidth: '90vw',
              objectFit: 'contain',
              borderRadius: '8px',
            }}
          />
        </motion.div>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
        >
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'rgba(26, 26, 46, 0.95)',
              borderRadius: '12px',
              padding: '2rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '90vh',
              overflowY: 'auto',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'relative',
            }}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                background: 'transparent',
                border: 'none',
                color: 'white',
                fontSize: '1.5rem',
                cursor: 'pointer',
              }}
            >
              <FiX />
            </button>

            <h3 style={{
              fontSize: '2rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: '#00dbde',
            }}>
              {selectedProject.title}
            </h3>

            <div 
              onClick={(e) => handleImageClick(e, selectedProject.image)}
              style={{ 
                cursor: 'zoom-in',
                marginBottom: '1.5rem',
                borderRadius: '8px',
                overflow: 'hidden',
                height: '300px',
              }}
            >
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
              />
            </div>

            <p style={{
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              marginBottom: '2rem',
            }}>
              {selectedProject.moreDescription}
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h4 style={{
                color: 'white',
                fontSize: '1.2rem',
                marginBottom: '1rem',
              }}>
                Technologies Used:
              </h4>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.5rem',
              }}>
                {selectedProject.technologies.map((tech, index) => (
                  <span 
                    key={index} 
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '20px',
                      backgroundColor: 'rgba(0, 219, 222, 0.1)',
                      color: '#00dbde',
                      border: '1px solid rgba(0, 219, 222, 0.3)'
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '2rem',
            }}>
              <a
                href={selectedProject.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: '#00dbde',
                  color: 'black',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{ 
                  backgroundColor: '#fc00ff',
                  transform: 'scale(1.05)'
                }}
              >
                <FiExternalLink /> Live Demo
              </a>
              <a
                href={selectedProject.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.75rem 1.5rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  borderRadius: '50px',
                  textDecoration: 'none',
                  fontWeight: '500',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.05)'
                }}
              >
                <FiGithub /> View Code
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </motion.section>
  );
}