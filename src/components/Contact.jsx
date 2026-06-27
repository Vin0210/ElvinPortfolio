import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Mail, User, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const form = useRef();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm(
      'service_afkti3j',
      'template_sjw5kan',
      form.current,
      '_Z515reM204pZ__7y'
    ).then(() => {
      setSubmitted(true);
      setLoading(false);
      form.current.reset();
    }).catch(() => {
      setLoading(false);
    });
  };

  return (
    <section id="contact" className="contact section-padding">
      <div className="contact-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
        
          <h2 className="section-title">Let's work together</h2>
          <p className="contact-subtitle">
            Have a project in mind? I'd love to hear from you.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            className="contact-success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <CheckCircle size={48} className="success-icon" />
            <h3>Message Sent!</h3>
            <p>Thanks for reaching out. I'll get back to you soon.</p>
            <button className="btn-primary" onClick={() => setSubmitted(false)}>
              Send Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            ref={form}
            onSubmit={handleSubmit}
            className="contact-form"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="form-group">
              <label htmlFor="name">
                <User size={16} />
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Elvin Ramos"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">
                <Mail size={16} />
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="elvin@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">
                <MessageSquare size={16} />
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell me about your project..."
                rows="5"
                required
              />
            </div>

            <button type="submit" className="btn-primary submit-btn" disabled={loading}>
              {loading ? 'Sending...' : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        )}
      </div>

      <div className="contact-background">
        <div className="bg-blob blob-1" />
        <div className="bg-blob blob-2" />
      </div>
    </section>
  );
};

export default React.memo(Contact);