import React, { lazy, Suspense } from 'react';
import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Qualifications from './components/Qualifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <main>
          <Hero />
          <About />
          <Skills />
          <Qualifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;