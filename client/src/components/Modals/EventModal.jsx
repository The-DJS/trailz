/* eslint-disable import/extensions */
/* eslint-disable */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  EventCustomModal,
  EventModalExitButton,
  EventInfoButton,
} from '../../styles/eventModalStyles';
import EventForm from '../Forms/EventForm.jsx';

const EventModal = ({ location, addEvent, toggleSearch }) => {
  // Title that appears for the modal.
  let subtitle;

  // Track when the modal is open.
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    // Toggle search so it disappears when the modal opens.
    toggleSearch();
  };

  // Styling of the title.
  const afterOpenModal = () => {
    subtitle.style.color = 'ForestGreen';
    subtitle.style.marginLeft = '31%';
  };

  const closeModal = () => {
    setIsOpen(false);
    // Toggle search so it reappears when the modal closes.
    toggleSearch();
  };

  useEffect(() => {
    Modal.setAppElement('body');
  }, []);

  return (
    <div>
      <EventInfoButton type="button" onClick={openModal}>
        Create an event
      </EventInfoButton>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Create Event Modal"
      >
        <EventCustomModal>
          <div>
            <EventModalExitButton type="button" onClick={closeModal}>
              X
            </EventModalExitButton>
            <h1 ref={(_subtitle) => (subtitle = _subtitle)}>Create an Event</h1>
          </div>
          <EventForm
            location={location}
            addEvent={addEvent}
            closeModal={closeModal}
          />
        </EventCustomModal>
      </Modal>
    </div>
  );
};

export default EventModal;
