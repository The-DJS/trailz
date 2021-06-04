/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  EventCustomModal,
  EventModalExitButton,
  EventInfoButton,
} from '../../styles/eventModalStyles';
import EventForm from '../Forms/EventForm.jsx';

const EventModal = ({ location, addEvent, toggleSearch }) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
    toggleSearch();
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'ForestGreen';
    subtitle.style.marginLeft = '32%';
  };

  const closeModal = () => {
    setIsOpen(false);
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
