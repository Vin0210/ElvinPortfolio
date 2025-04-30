import { motion } from 'framer-motion';
import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGraduationCap, FaBriefcase, FaAward } from 'react-icons/fa';

export default function Qualifications() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const [activeTab, setActiveTab] = useState('education');

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
      description: "Focus on mathematics and computer science fundamentals."
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
      title: "React Certification",
      institution: "LinkedIn",
      year: "2025",
      description: "Advanced React concepts and best practices certification."
    },
    {
      id: 2,
      title: "JavaScript Expert",
      institution: "LinkedIn",
      year: "2025",
      description: "Certified JavaScript Developer (CJD) certification."
    }
  ];

  const getActiveData = () => {
    switch (activeTab) {
      case 'education': return educationData;
      case 'experience': return experienceData;
      case 'certifications': return certificationData;
      default: return educationData;
    }
  };

  const getIcon = () => {
    switch (activeTab) {
      case 'education': return <FaGraduationCap />;
      case 'experience': return <FaBriefcase />;
      case 'certifications': return <FaAward />;
      default: return <FaGraduationCap />;
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
          left: '-10%',
          bottom: '20%',
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
        My Qualifications
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
        justifyContent: 'center',
        gap: '1rem',
        marginBottom: '3rem',
        flexWrap: 'wrap'
      }}>
        {[
          { id: 'education', label: 'Education', icon: <FaGraduationCap /> },
          { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
          { id: 'certifications', label: 'Certifications', icon: <FaAward /> }
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
              background: activeTab === tab.id 
                ? 'linear-gradient(90deg, rgba(0, 219, 222, 0.2), rgba(252, 0, 255, 0.2))' 
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
              background: activeTab === tab.id 
                ? 'linear-gradient(90deg, rgba(0, 219, 222, 0.3), rgba(252, 0, 255, 0.3))' 
                : 'rgba(255, 255, 255, 0.1)',
            }}
          >
            {tab.icon}
            {tab.label}
          </motion.button>
        ))}
      </div>

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
              top: '2.5rem',
              bottom: '2.5rem',
              width: '4px',
              background: 'linear-gradient(to bottom, #00dbde, #fc00ff)',
              borderRadius: '2px'
            }} />

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              paddingLeft: '3rem'
            }}>
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
                  background: 'rgba(0, 219, 222, 0.1)',
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

              <p style={{
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: '1.6',
                margin: 0
              }}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}