import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export default function Contact() {
  const form = useRef(); // Ref for the form
  const [isSubmitted, setIsSubmitted] = useState(false); // State for submission status
  const [error, setError] = useState(null); // State for error handling

  const sendEmail = (e) => {
    e.preventDefault(); // Prevent default form submission

    // Send the form data using EmailJS
    emailjs
      .sendForm(
        'service_afkti3j', // Replace with your EmailJS Service ID
        'template_sjw5kan', // Replace with your EmailJS Template ID
        form.current, // Form reference
        '_Z515reM204pZ__7y' // Replace with your EmailJS Public Key
      )
      .then(
        (result) => {
          console.log('Email sent successfully!', result.text);
          setIsSubmitted(true); // Set submission status to true
          setError(null); // Clear any previous errors
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          setError('Failed to send email. Please try again.'); // Set error message
        }
      );
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2>Contact Me</h2>
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p style={{ color: 'green' }}>Thank you! Your message has been sent.</p>
        </motion.div>
      ) : (
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" placeholder="Your Message" required></textarea>
          <button type="submit">Send</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </motion.form>
      )}
    </motion.section>
  );
}