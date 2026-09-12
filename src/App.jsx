import { ThemeProvider } from './components/ThemeContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Background from './components/Background';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <a href="#work" className="skip-link">Skip to work</a>
        <Header />
        <main id="main">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Background />
          <Contact />
        </main>
        <Footer />
        <Chatbot />
      </div>
    </ThemeProvider>
  );
}

export default App;