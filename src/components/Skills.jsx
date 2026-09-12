import React from 'react';
import Kicker from './Kicker';
import './Skills.css';

const GROUPS = [
  {
    label: 'frontend',
    items: [
      { name: 'HTML & CSS', daily: true },
      { name: 'JavaScript', daily: true },
      { name: 'jQuery', daily: true },
      { name: 'React', daily: true },
      { name: 'Bootstrap', daily: true },
      { name: 'Vue', daily: false },
    ],
  },
  {
    label: 'backend',
    items: [
      { name: 'PHP', daily: true },
      { name: 'Laravel', daily: true },
      { name: 'MySQL', daily: true },
      { name: 'Node.js', daily: true },
    ],
  },
  {
    label: 'tools & workflow',
    items: [
      { name: 'Git & GitHub', daily: true },
      { name: 'VS Code', daily: true },
      { name: 'phpMyAdmin / XAMPP', daily: true },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills section-padding">
      <div className="section-inner">
        <Kicker index="03" label="skills" />
        <h2 className="section-title">
          What I <em>reach for.</em>
        </h2>
        <p className="section-lede">
          No percentages — just what I use daily and what I can hold my own
          with.
        </p>

        <div className="skills-groups">
          {GROUPS.map((group) => (
            <div
              key={group.label}
              className="skill-group"
            >
              <h3 className="skill-group-label">{group.label}</h3>
              <ul className="skill-list">
                {group.items.map((item) => (
                  <li key={item.name} className="skill-item">
                    <span
                      className={`skill-dot ${item.daily ? 'daily' : ''}`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="skills-legend">
          <span className="skill-dot daily" aria-hidden="true" /> daily driver
          &nbsp;&nbsp;
          <span className="skill-dot" aria-hidden="true" /> comfortable, still
          leveling up
        </p>
      </div>
    </section>
  );
};

export default React.memo(Skills);
