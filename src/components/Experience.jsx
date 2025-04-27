import React from 'react';

const Experience = () => {
  const experiences = [
    {
      id: 1,
      role: "Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "Jan 2022 - Present",
      description: [
        "Developed responsive web applications using React and TypeScript",
        "Collaborated with UX designers to implement pixel-perfect interfaces",
        "Optimized application performance, reducing load times by 40%"
      ],
      tags: ["React", "TypeScript", "Redux", "Jest"]
    },
    {
      id: 2,
      role: "Web Developer",
      company: "Digital Creative Agency",
      period: "Mar 2020 - Dec 2021",
      description: [
        "Built and maintained client websites using modern JavaScript frameworks",
        "Implemented RESTful APIs integration with backend services",
        "Mentored junior developers in frontend best practices"
      ],
      tags: ["JavaScript", "Node.js", "Express", "MongoDB"]
    },
    {
      id: 3,
      role: "Junior Developer",
      company: "Startup Ventures",
      period: "Jun 2018 - Feb 2020",
      description: [
        "Assisted in developing MVP products for early-stage startups",
        "Participated in agile development processes",
        "Contributed to open-source projects"
      ],
      tags: ["HTML/CSS", "JavaScript", "Git", "Agile"]
    }
  ];

  return (
    <section className="experience-section" id="experience">
      <h2 className="section-title">My Experience</h2>
      
      <div className="experience-container">
        {experiences.map((exp) => (
          <div className="experience-card" key={exp.id}>
            <div className="experience-header">
              <h3 className="experience-role">{exp.role}</h3>
              <div className="experience-meta">
                <span className="experience-company">{exp.company}</span>
                <span className="experience-period">{exp.period}</span>
              </div>
            </div>
            
            <ul className="experience-description">
              {exp.description.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            
            <div className="experience-tags">
              {exp.tags.map((tag, index) => (
                <span className="tag" key={index}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;