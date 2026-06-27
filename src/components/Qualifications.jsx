import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Code, ExternalLink, X, Maximize2 } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import './Qualifications.css';

const Qualifications = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null); // New state for image viewing

  const tabs = useMemo(() => [
    { id: 'projects', icon: <Code size={18} />, label: 'Projects' },
    { id: 'education', icon: <GraduationCap size={18} />, label: 'Education' },
    { id: 'experience', icon: <Briefcase size={18} />, label: 'Experience' },
    { id: 'certifications', icon: <Award size={18} />, label: 'Certifications' }
  ], []);

  const projects = useMemo(() => [
    {
      id: 1,
      title: 'Snake Identification App',
      description: 'Machine learning app for identifying Philippine snake species',
      image: '/images/Snake.jpg',
      tech: ['Flutter', 'TensorFlow'],
      github: '#',
      demo: '#',
      fullDescription: 'This app helps users identify Philippine snake species through image recognition. Built with Flutter for cross-platform compatibility and TensorFlow for machine learning capabilities.'
    },
    {
      id: 2,
      title: 'Pokémon Web',
      description: 'Comprehensive Pokémon encyclopedia with team building',
      image: '/images/project2.jpg',
      tech: ['React', 'CSS', 'JSON Server'],
      github: 'https://github.com/Vin0210/Pokemon',
      demo: 'https://pokemonhehe.netlify.app/',
      fullDescription: 'A feature-rich Pokémon web app that allows users to explore detailed Pokémon information, build custom teams, simulate battles, and track battle history.'
    },
    {
      id: 3,
      title: 'Todo List',
      description: 'Productivity app with task management features',
      image: '/images/project3.jpg',
      tech: ['React', 'CSS'],
      github: 'https://github.com/Vin0210/todo-app',
      demo: 'https://todotodo1222.netlify.app/',
      fullDescription: 'A clean, intuitive to-do list application with task prioritization, completion tracking, and responsive design.'
    },
    {
      id: 4,
      title: 'Fast Food E-Commerce',
      description: 'Online ordering platform for food delivery',
      image: '/images/project5.jpg',
      tech: ['PHP', 'phpMyAdmin', 'XAMPP'],
      github: 'https://github.com/Annur12/e-commerce',
      demo: 'https://cat-bounce.com/',
      fullDescription: 'A full-featured fast food ordering system with menu browsing, cart functionality, and order tracking.'
    },
    {
      id: 5,
      title: 'RMMC System',
      description: 'Comprehensive School Management System for academic and administrative operations.',
      image: '/images/rmmc.png',
      tech: ['Laravel', 'Node.js', 'Mysql', 'HTML', 'CSS', 'Javascript', 'Bootstrap', 'GithubDesktop', 'WampServer', 'Jquery', 'phpMyAdmin'],
      github: '',
      demo: 'https://rmmcmain.com/',
      fullDescription: 'Designed, developed and maintained a comprehensive School Management System for RMMC that digitizes and streamlines institutional processes. The platform features integrated modules for Admissions, Enrollment, Registrar, Finance, Cashier, Student and Teacher Portals, grading, scheduling, and analytics, enabling efficient management of academic and administrative workflows through a centralized system.'
    }
  ], []);

  const education = useMemo(() => [
    {
      id: 1,
      title: 'Information Technology Degree',
      institution: 'Western Mindanao State University',
      year: '2020 - 2025',
      description: 'Specialized in Web Development and Software Engineering'
    },
    {
      id: 2,
      title: 'Senior High School Diploma',
      institution: 'Culianan National High School',
      year: '2018 - 2020',
      description: 'Focused on Research, History and Technology'
    }
  ], []);

  const experience = useMemo(() => [
    {
      
      id: 1,
      title: 'Web Developer',
      institution: 'Itech Rar, Inc.',
      year: 'June 2025 - Present',
      description: 'Developing and maintaining enterprise web applications, including school management systems, by implementing new features, optimizing performance, and collaborating with cross-functional teams to deliver reliable software solutions.'

    },
    {
      id: 2,
      title: 'Document Archiving System Developer',
      institution: 'Western Mindanao State University (WMSU)',
      year: '2022',
      description: 'Assisted in developing a Document Archiving System for WESMAARDEC at WMSU. Contributed to building a secure and efficient document management solution for academic records and institutional documents.'
    },
    {
      id: 3,
      title: 'Capstone Project 2',
      institution: 'WMSU CCS',
      year: '2025 - Present',
      description: 'Building Snake Recognition app using Machine Learning'
    },
    {
      id: 4,
      title: 'e-Commerce Website',
      institution: 'WMSU CCS',
      year: '2023',
      description: 'Developed full-featured e-commerce platform'
    }
  ], []);

  const certifications = useMemo(() => [
    {
      id: 1,
      title: 'Python for Beginners',
      institution: 'Simplilearn',
      year: '2025',
      image: '/images/cert3.png'
    },
    {
      id: 2,
      title: 'Machine Learning with Python',
      institution: 'SimpliLearn',
      year: '2025',
      image: '/images/cert1.png'
    },
    {
      id: 3,
      title: 'Responsive Web Design',
      institution: 'freeCodeCamp',
      year: '2025',
      image: '/images/cert5.png'
    },
    {
      id: 4,
      title: 'JavaScript Algorithms and Data Structures',
      institution: 'freeCodeCamp',
      year: '2025',
      image: '/images/cert6.png'
    }
  ], []);

  const getContent = () => {
    switch(activeTab) {
      case 'projects': return projects;
      case 'education': return education;
      case 'experience': return experience;
      case 'certifications': return certifications;
      default: return projects;
    }
  };

  // Handle image click to open in full view
  const handleImageClick = (e, image) => {
    e.stopPropagation();
    setSelectedImage(image);
  };

  const renderCard = (item) => {
    if (activeTab === 'projects') {
      return (
        <motion.div
          className="project-card"
          whileHover={{ y: -8 }}
        >
          <div 
            className="project-image"
            onClick={(e) => handleImageClick(e, item.image)}
          >
            <img src={item.image} alt={item.title} loading="lazy" />
            <div className="project-overlay">
              <div className="project-overlay-content">
                <Maximize2 size={24} />
                <span>Click to view full image</span>
              </div>
            </div>
          </div>
          <div className="project-info">
            <h3 className="project-title">{item.title}</h3>
            <p className="project-description">{item.description}</p>
            <div className="project-tech">
              {item.tech.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>
            <button 
              className="project-details-btn"
              onClick={() => setSelectedProject(item)}
            >
              View Details →
            </button>
          </div>
        </motion.div>
      );
    }

    if (activeTab === 'certifications') {
      return (
        <div 
          className="cert-card"
          onClick={(e) => handleImageClick(e, item.image)}
        >
          <div className="cert-image-wrapper">
            <img src={item.image} alt={item.title} className="cert-image" loading="lazy" />
            <div className="cert-overlay">
              <Maximize2 size={20} />
              <span>Click to view</span>
            </div>
          </div>
          <div className="cert-info">
            <h4 className="cert-title">{item.title}</h4>
            <span className="cert-institution">{item.institution}</span>
            <span className="cert-year">{item.year}</span>
          </div>
        </div>
      );
    }

    return (
      <div className="item-card">
        <div className="item-header">
          <h3 className="item-title">{item.title}</h3>
          <span className="item-year">{item.year}</span>
        </div>
        <div className="item-institution">{item.institution}</div>
        <p className="item-description">{item.description}</p>
      </div>
    );
  };

  return (
    <section id="qualifications" className="qualifications section-padding">
      <div className="qualifications-container">
        <motion.div
          className="qualifications-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">My Work & Qualifications</h2>
        </motion.div>

        <div className="qualifications-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`q-tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="qualifications-grid"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            {getContent().map((item, index) => (
              <motion.div
                key={item.id || index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                {renderCard(item)}
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={() => setSelectedProject(null)}>
                <X size={24} />
              </button>
              
              {/* Clickable project image in modal */}
              <div 
                className="modal-image-wrapper"
                onClick={(e) => handleImageClick(e, selectedProject.image)}
              >
                <img src={selectedProject.image} alt={selectedProject.title} />
                <div className="modal-image-overlay">
                  <Maximize2 size={24} />
                  <span>View full size</span>
                </div>
              </div>
              
              <h2>{selectedProject.title}</h2>
              <p>{selectedProject.fullDescription || selectedProject.description}</p>
              <div className="modal-tech">
                {selectedProject.tech.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
              <div className="modal-links">
                <a href={selectedProject.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
                  <ExternalLink size={18} /> Live Demo
                </a>
                <a href={selectedProject.github} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <FaGithub size={18} /> View Code
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Image View Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="image-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="image-modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="image-modal-close" onClick={() => setSelectedImage(null)}>
                <X size={28} />
              </button>
              <img src={selectedImage} alt="Full view" />
              <div className="image-modal-footer">
                <span>Click anywhere outside to close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default React.memo(Qualifications);