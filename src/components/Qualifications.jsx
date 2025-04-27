import React, { useState } from 'react';

const Qualifications = () => {
  const [activeTab, setActiveTab] = useState('education');

  const educationData = [
    {
      id: 1,
      title: "Computer Science Degree",
      institution: "University of Technology",
      year: "2018 - 2022",
      description: "Specialized in Web Development and Software Engineering. Graduated with honors."
    },
    {
      id: 2,
      title: "Frontend Development Bootcamp",
      institution: "Code Academy",
      year: "2020",
      description: "Intensive 6-month program focusing on modern JavaScript frameworks."
    },
    {
      id: 3,
      title: "High School Diploma",
      institution: "Tech High School",
      year: "2014 - 2018",
      description: "Focus on mathematics and computer science fundamentals."
    }
  ];

  const experienceData = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      institution: "Tech Solutions Inc.",
      year: "2022 - Present",
      description: "Leading a team of developers building responsive web applications."
    },
    {
      id: 2,
      title: "Junior Web Developer",
      institution: "Digital Agency",
      year: "2020 - 2022",
      description: "Developed and maintained client websites using modern frameworks."
    },
    {
      id: 3,
      title: "Intern Developer",
      institution: "Startup Ventures",
      year: "2019",
      description: "Assisted in developing MVP products for early-stage startups."
    }
  ];

  const certificationData = [
    {
      id: 1,
      title: "React Certification",
      institution: "Meta (via Coursera)",
      year: "2023",
      description: "Advanced React concepts and best practices certification."
    },
    {
      id: 2,
      title: "JavaScript Expert",
      institution: "JavaScript Institute",
      year: "2021",
      description: "Certified JavaScript Developer (CJD) certification."
    }
  ];

  return (
    <section className="qualifications-section" id="qualifications">
      <h2 className="section-title">My Qualifications</h2>
      
      <div className="qualifications-container">
        <div className="qualifications-tabs">
          <button 
            className={`tab-button ${activeTab === 'education' ? 'active' : ''}`}
            onClick={() => setActiveTab('education')}
          >
            Education
          </button>
          <button 
            className={`tab-button ${activeTab === 'experience' ? 'active' : ''}`}
            onClick={() => setActiveTab('experience')}
          >
            Experience
          </button>
          <button 
            className={`tab-button ${activeTab === 'certifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('certifications')}
          >
            Certifications
          </button>
        </div>
        
        <div className={`qualifications-content ${activeTab === 'education' ? 'active' : ''}`}>
          {educationData.map((item) => (
            <div className="qualification-card" key={item.id}>
              <div className="qualification-icon">🎓</div>
              <h3 className="qualification-title">{item.title}</h3>
              <span className="qualification-subtitle">{item.institution}</span>
              <span className="qualification-date">{item.year}</span>
              <p className="qualification-description">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className={`qualifications-content ${activeTab === 'experience' ? 'active' : ''}`}>
          {experienceData.map((item) => (
            <div className="qualification-card" key={item.id}>
              <div className="qualification-icon">💼</div>
              <h3 className="qualification-title">{item.title}</h3>
              <span className="qualification-subtitle">{item.institution}</span>
              <span className="qualification-date">{item.year}</span>
              <p className="qualification-description">{item.description}</p>
            </div>
          ))}
        </div>
        
        <div className={`qualifications-content ${activeTab === 'certifications' ? 'active' : ''}`}>
          {certificationData.map((item) => (
            <div className="qualification-card" key={item.id}>
              <div className="qualification-icon">🏆</div>
              <h3 className="qualification-title">{item.title}</h3>
              <span className="qualification-subtitle">{item.institution}</span>
              <span className="qualification-date">{item.year}</span>
              <p className="qualification-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Qualifications;