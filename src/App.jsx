import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Qualifications from './components/Qualifications';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Trips from './components/Trips'; 
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Qualifications />
      <Projects />
      <Trips /> {/* Add the Trips component */}
      <Contact />
      
      <Footer/>
    </div>
  );
}

export default App;