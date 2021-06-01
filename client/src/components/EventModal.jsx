/* eslint-disable import/extensions */
import React from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import EventForm from './EventForm.jsx';

const CustomModal = styled.div`
    top: 63vh;
    left: 43vw;
    bottom: auto;
    position: absolute;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    overflow-y: auto;
`;

const Button = styled.button`
  background-color: ForestGreen;
  font-weight: bolder;
  font-size: 1.5rem;
  width: 8vw;
  height: 5vh;
  border: 0px;
  color: AliceBlue;
  display: block;
`;

const EventModal = ({ location, addEvent }) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = React.useState(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'ForestGreen';
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
          <Button type="button" onClick={closeModal}>
            X
          </Button>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create an event</h2>
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
