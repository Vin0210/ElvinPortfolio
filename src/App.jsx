import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Qualifications from './components/Qualifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './index.css';

function App() {
  return (
    <div style={{ height: '600px', position: 'relative' }}>
      <Header />
      <Hero />
      <About />
      <Skills />
      <Qualifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;