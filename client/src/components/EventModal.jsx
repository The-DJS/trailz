/* eslint-disable import/extensions */
import React from 'react';
import Modal from 'react-modal';
import {
  CustomModal,
  ExitButton,
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
        contentLabel="Example Modal"
      >
        <CustomModal>
          <div>
            <ExitButton type="button" onClick={closeModal}>
              X
            </ExitButton>
            <h1 ref={(_subtitle) => (subtitle = _subtitle)}>Create an event</h1>
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
