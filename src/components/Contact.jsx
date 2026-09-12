import React, { useRef, useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Kicker from './Kicker';
import './Contact.css';

const SOCIALS = [
  { label: 'github', href: 'https://github.com/Vin0210' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/elvin-ramos-a347b2339' },
];

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setFailed(false);
    emailjs
      .sendForm(
        'service_afkti3j',
        'template_sjw5kan',
        form.current,
        '_Z515reM204pZ__7y'
      )
      .then(() => {
        setSent(true);
        setLoading(false);
        form.current.reset();
      })
      .catch(() => {
        setLoading(false);
        setFailed(true);
      });
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="section-inner contact-grid">
        <div>
          <Kicker index="05" label="contact" />
          <h2 className="section-title">
            Say <em>hello.</em>
          </h2>
          <p className="contact-lede">
            Got a role, a project, or just a question about something I
            built? My inbox is open — I usually reply within a day or two.
          </p>
          <div className="contact-direct">
            <a href="mailto:elvinramos454@gmail.com" className="mono-link">
              elvinramos454@gmail.com <span className="arrow">↗</span>
            </a>
            <span className="contact-loc">Zamboanga City, PH · open to remote</span>
          </div>
          <ul className="contact-socials">
            {SOCIALS.map(({ label, href }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" className="mono-link">
                  {label} <span className="arrow">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {sent ? (
            <div className="contact-sent">
              <CheckCircle size={36} className="sent-icon" />
              <h3>Message sent.</h3>
              <p>Thanks for reaching out — I&apos;ll get back to you soon.</p>
              <button className="btn-secondary" onClick={() => setSent(false)}>
                send another
              </button>
            </div>
          ) : (
            <form ref={form} onSubmit={handleSubmit} className="contact-form">
              <div className="field-row">
                <div className="field">
                  <label htmlFor="c-name">name</label>
                  <input id="c-name" type="text" name="name" placeholder="Your name" required autoComplete="name" />
                </div>
                <div className="field">
                  <label htmlFor="c-email">email</label>
                  <input id="c-email" type="email" name="email" placeholder="you@example.com" required autoComplete="email" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="c-msg">message</label>
                <textarea id="c-msg" name="message" rows="5" placeholder="Role, timeline, and what you need built" required />
              </div>
              {failed && (
                <p className="form-error">
                  Something went wrong sending that. Try the email link instead.
                </p>
              )}
              <button type="submit" className="btn-primary" disabled={loading}>
                {loading ? 'sending…' : (<><Send size={16} /> send message</>)}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(Contact);
