import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_afkti3j', // Replace with your service ID
        'template_sjw5kan', // Replace with your template ID
        form.current,
        '_Z515reM204pZ__7y' // Replace with your public key
      )
      .then(
        (result) => {
          console.log('Email sent successfully!', result.text);
          setIsSubmitted(true);
          setError(null);
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          setError('Failed to send email. Please try again.');
        }
      );
  };

  return (
    <motion.section
      id="contact"
      className="contact-section"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h2
        className="section-title"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 1 }}
      >
        Contact Me
      </motion.h2>
      {isSubmitted ? (
        <motion.div
          className="success-message"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p>Thank you! Your message has been sent.</p>
        </motion.div>
      ) : (
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          className="contact-form"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="form-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="form-input"
          />
          <textarea
            name="message"
            placeholder="Your Message"
            required
            className="form-textarea"
          ></textarea>
          <button type="submit" className="submit-button">
            Send
          </button>
          {error && <p className="error-message">{error}</p>}
        </motion.form>
      )}
    </motion.section>
  );
}