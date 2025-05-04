import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FiSend, FiCheckCircle } from 'react-icons/fi';

export default function Contact() {
  const form = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    emailjs
      .sendForm(
        'service_afkti3j',
        'template_sjw5kan',
        form.current,
        '_Z515reM204pZ__7y'
      )
      .then(
        (result) => {
          console.log('Email sent successfully!', result.text);
          setIsSubmitted(true);
          setIsLoading(false);
          form.current.reset();
        },
        (error) => {
          console.error('Failed to send email:', error.text);
          setError('Failed to send email. Please try again later.');
          setIsLoading(false);
        }
      );
  };

  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        padding: '6rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative'
      }}
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        style={{
          position: 'absolute',
          left: '-10%',
          top: '20%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          backgroundColor: 'rgba(0, 219, 222, 0.1)',
          zIndex: -1,
          filter: 'blur(30px)'
        }}
      />

      <motion.h2
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          marginBottom: '3rem',
          textAlign: 'center',
          color: '#00dbde',
          position: 'relative'
        }}
      >
        Contact Me
        <motion.span
          initial={{ width: 0 }}
          whileInView={{ width: '100px' }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            height: '4px',
            backgroundColor: '#00dbde',
            margin: '0.5rem auto 0',
            borderRadius: '2px'
          }}
        />
      </motion.h2>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '3rem 2rem',
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3 }}
            style={{
              fontSize: '3rem',
              color: '#00dbde',
              marginBottom: '1.5rem',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <FiCheckCircle />
          </motion.div>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'white',
            marginBottom: '1rem'
          }}>
            Message Sent Successfully!
          </h3>
          <p style={{
            color: 'rgba(255, 255, 255, 0.8)',
            lineHeight: '1.6',
            marginBottom: '1.5rem'
          }}>
            Thank you for reaching out. I'll get back to you as soon as possible.
          </p>
          <motion.button
            onClick={() => setIsSubmitted(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#00dbde',
              color: 'white',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '1rem',
              marginTop: '1rem',
              transition: 'all 0.3s ease'
            }}

          >
            Send Another Message
          </motion.button>
        </motion.div>
      ) : (
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          style={{
            backgroundColor: 'rgba(26, 26, 46, 0.7)',
            backdropFilter: 'blur(10px)',
            borderRadius: '16px',
            padding: '2.5rem',
            maxWidth: '600px',
            margin: '0 auto',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
          }}
        >
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="name" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              Your Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Elvin Ramos"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              className="focus:border-[#00dbde]"
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="email" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              Your Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="user@email.com"
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                transition: 'border-color 0.3s ease'
              }}
              className="focus:border-[#00dbde]"
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label htmlFor="message" style={{
              display: 'block',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '0.5rem',
              fontSize: '0.9rem'
            }}>
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Hello, I'd like to talk about..."
              required
              rows="5"
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'white',
                fontSize: '1rem',
                outline: 'none',
                resize: 'vertical',
                minHeight: '150px',
                transition: 'border-color 0.3s ease'
              }}
              className="focus:border-[#00dbde]"
            ></textarea>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                color: '#ff6b6b',
                marginBottom: '1rem',
                textAlign: 'center'
              }}
            >
              {error}
            </motion.p>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.05 }}
            whileTap={{ scale: isLoading ? 1 : 0.95 }}
            style={{
              width: '100%',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#00dbde',
              color: 'black',
              border: 'none',
              borderRadius: '50px',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              opacity: isLoading ? 0.8 : 1,
              transition: 'all 0.3s ease'
            }}

          >
            {isLoading ? (
              <>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <FiSend />
                <span>Send Message</span>
              </>
            )}
          </motion.button>
        </motion.form>
      )}
    </motion.section>
  );
}