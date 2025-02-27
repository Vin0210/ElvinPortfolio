import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Header() {
  return (
    <header>
      <h1>My Portfolio</h1>
      <nav>
        <a href="#about">About</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
      </nav>
      <div className="social-links">
        <a href="https://facebook.com/yourusername" target="_blank" rel="noopener noreferrer">
          <FaFacebook className="social-icon" />
        </a>
        <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="social-icon" />
        </a>
      </div>
    </header>
  );
}