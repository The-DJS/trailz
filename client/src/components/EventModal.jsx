/* eslint-disable import/extensions */
import React from 'react';
import Modal from 'react-modal';
import {
  CustomModal,
  ModalExitButton,
} from '../styles/modalStyles';
import EventForm from './EventForm.jsx';

const EventModal = ({ location, addEvent }) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'ForestGreen';
    subtitle.style.marginLeft = '32%';
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button type="button" onClick={openModal}>
        Create an event
      </button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Create Event Modal"
      >
        <CustomModal>
          <div>
            <ModalExitButton type="button" onClick={closeModal}>
              X
            </ModalExitButton>
            <h1 ref={(_subtitle) => (subtitle = _subtitle)}>Create an Event</h1>
          </div>
          <EventForm
            location={location}
            addEvent={addEvent}
            closeModal={closeModal}
          />
        </CustomModal>
      </Modal>
    </div>
  );
};

export default EventModal;
