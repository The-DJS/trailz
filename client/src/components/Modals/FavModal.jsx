/* eslint-disable import/extensions */
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
  FavCustomModal,
  FavModalExitButton,
  FavInfoButton,
} from '../../styles/favModalStyles';
import FavForm from '../Forms/FavForm.jsx';

const FavModal = ({ location, addFav, toggleSearch }) => {
  // Title that appears for the modal
  let subtitle;

  // Track when the modal is open.
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    /**
     * Only open the modal if the name of the location is "Dropped Pin" so user
     * can name their custom location.
     */
    if (location.name === 'Dropped Pin') {
      setIsOpen(true);
      // Toggle search so it disappears when the modal opens.
      toggleSearch();
    } else {
      // Add location as is.
      addFav(location);
    }
  };

  // Styling of the title.
  const afterOpenModal = () => {
    subtitle.style.color = 'ForestGreen';
    subtitle.style.marginLeft = '12%';
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
      <FavInfoButton type="button" onClick={openModal}>
        Add to favs
      </FavInfoButton>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Add Favs Modal"
      >
        <FavCustomModal>
          <div>
            <FavModalExitButton type="button" onClick={closeModal}>
              X
            </FavModalExitButton>
            <h1 ref={(_subtitle) => (subtitle = _subtitle)}>
              Add custom location to your favs
            </h1>
          </div>
          <FavForm
            location={location}
            addFav={addFav}
            closeModal={closeModal}
          />
        </FavCustomModal>
      </Modal>
    </div>
  );
};

export default FavModal;
