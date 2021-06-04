/* eslint-disable import/extensions */
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import {
  FavCustomModal,
  FavModalExitButton,
  FavInfoButton,
} from '../../styles/favModalStyles';
import FavForm from '../Forms/FavForm.jsx';

const FavModal = ({ location, addFav, toggleSearch }) => {
  let subtitle;

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    if (location.name === 'Dropped Pin') {
      setIsOpen(true);
      toggleSearch();
    } else {
      addFav(location);
    }
  };

  const afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'ForestGreen';
    subtitle.style.marginLeft = '12%';
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
