import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';

// Import local images
import mountains from '../assets/images/Quezon.jpg';
import beach from '../assets/images/Tagaytay.jpg';
import city from '../assets/images/Manila.jpg';
import City from '../assets/images/Baguio.jpg';

// Trip data
const tripsData = [
  {
    id: 1,
    title: 'Trip to Quezon',
    description: 'A breathtaking journey through the great City.',
    image: mountains,
  },
  {
    id: 2,
    title: 'Subic Bay',
    description: 'Relaxing days with the great scenery.',
    image: beach,
  },
  {
    id: 3,
    title: 'Manila',
    description: 'Exploring the vibrant culture and architecture of the city.',
    image: city,
  },
  {
    id: 5,
    title: 'City of Baguio',
    description: 'Exploring the vibrant culture and architecture of the city.',
    image: City,
  },
];

// Modal styles
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    maxHeight: '90%',
    overflow: 'hidden',
    padding: 0,
    border: 'none',
    borderRadius: '10px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
};

// Bind modal to your app (for accessibility)
Modal.setAppElement('#root');

export default function Trips() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Open modal and set the selected image
  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <motion.section
      id="trips"
      className="trips-section"
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
        My Trips
      </motion.h2>
      <div className="trips-grid">
        {tripsData.map((trip, index) => (
          <motion.div
            key={trip.id}
            className="trip-card"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: '0 10px 20px rgba(0, 0, 0, 0.2)' }}
          >
            <img
              src={trip.image}
              alt={trip.title}
              className="trip-image"
              onClick={() => openModal(trip.image)} // Make the image clickable
              style={{ cursor: 'pointer' }} // Add pointer cursor
            />
            <div className="trip-content">
              <h3>{trip.title}</h3>
              <p>{trip.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal for displaying the selected image */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Image Modal"
      >
        {selectedImage && (
          <img
            src={selectedImage}
            alt="Enlarged view"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        )}
      </Modal>
    </motion.section>
  );
}