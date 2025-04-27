import React from 'react';

const Skills = () => {
  const skillsData = [
    {
      category: "Frontend",
      icon: "💻",
      skills: [
        { name: "React", level: 90, icon: "/icons/react.svg" },
        { name: "JavaScript", level: 85, icon: "/icons/javascript.svg" },
        { name: "HTML/CSS", level: 95, icon: "/icons/html.svg" },
        { name: "TypeScript", level: 80, icon: "/icons/typescript.svg" },
        { name: "Tailwind", level: 85, icon: "/icons/tailwind.svg" },
      ]
    },
    {
      category: "Backend",
      icon: "🔧",
      skills: [
        { name: "Node.js", level: 80, icon: "/icons/nodejs.svg" },
        { name: "Express", level: 75, icon: "/icons/express.svg" },
        { name: "MongoDB", level: 70, icon: "/icons/mongodb.svg" },
        { name: "Firebase", level: 65, icon: "/icons/firebase.svg" },
      ]
    },
    {
      category: "Tools",
      icon: "🛠️",
      skills: [
        { name: "Git", level: 85, icon: "/icons/git.svg" },
        { name: "VS Code", level: 90, icon: "/icons/vscode.svg" },
        { name: "Figma", level: 75, icon: "/icons/figma.svg" },
        { name: "Docker", level: 60, icon: "/icons/docker.svg" },
      ]
    }
  ];

  return (
    <section className="skills-section" id="skills">
      <h2 className="section-title">My Skills</h2>
      
      <div className="skills-container">
        {skillsData.map((category, index) => (
          <div className="skill-category" key={index}>
            <h3>
              <span className="icon">{category.icon}</span>
              {category.category}
            </h3>
            <div className="skill-list">
              {category.skills.map((skill, skillIndex) => (
                <div className="skill-item" key={skillIndex}>
                  {skill.icon && (
                    <img 
                      src={skill.icon} 
                      alt={skill.name} 
                      className="skill-icon" 
                      onError={(e) => {
                        e.target.src = '/icons/default-skill.svg';
                      }}
                    />
                  )}
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-level">
                    <div 
                      className="skill-level-bar" 
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Alternative circular version - uncomment to use */}
      {/*
      <div className="skills-container skills-circular">
        {skillsData.flatMap(category => category.skills).map((skill, index) => (
          <div className="skill-circle" key={index}>
            <div className="circle-progress">
              <svg viewBox="0 0 36 36">
                <path 
                  className="circle-bg" 
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path 
                  className="circle-fill" 
                  strokeDasharray={`${skill.level}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="circle-text">{skill.level}%</div>
            </div>
            <div className="skill-circle-name">{skill.name}</div>
          </div>
        ))}
      </div>
      */}
    </section>
  );
};

export default Skills;