import React from 'react';
import profilePic from '../assets/cat.jpg'; 
import './Hero.css'; 

const Hero = () => {
  return (
    <div className="hero-container">
      
      <div className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">Home</li>
          <li className="navbar-item">About</li>
          <li className="navbar-item">Projects</li>
          <li className="navbar-item">Contact</li>
        </ul>
      </div>

      <div className="hero-header">
        <span className="my-name">Elvin Ramos</span>
      </div>

      <div className="hero-content">
        <div className="profile-pic-container">
    
          <img src={profilePic} alt="Profile" className="profile-pic" />
        </div>
        <h1>Hello, its me</h1>
        <h2> Elvin Ramos </h2>
        <h3> And I'm a  </h3>
        <p>
          <span className="highlight web-developer">Web Developer</span> |{' '}
          <span className="highlight tech-enthusiast">Tech Enthusiast</span> |{' '}
          <span className="highlight problem-solver">Problem Solver</span>
        </p>
        <button>View More</button>
      </div>
    </div>
  );
};

export default Hero;
