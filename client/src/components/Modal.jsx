/* eslint-disable import/extensions */
import React from 'react';
import Modal from 'react-modal';
import Form from './Form.jsx';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const CustomModal = ({ location }) => {
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
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button type="button" onClick={closeModal}>
          X
        </button>
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create an event</h2>
        <Form location={location} />
      </Modal>
    </div>
  );
};

export default CustomModal;
