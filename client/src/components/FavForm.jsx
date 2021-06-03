/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  FavFormGroup,
  FavFormLabel,
  FavFormInput,
  FavFormRequiredMessage,
  FavFormButton,
} from '../styles/favFormStyles';

const FavForm = ({ location, addFav, closeModal }) => {
  // Input fields
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name) {
      // Update the name of the location
      console.info(location);
      location.name = name;
      console.info(location);

      // Add the custom location to the user's favs.
      addFav(location);

      // Clear the state and close the modal.
      setName('');
      closeModal();
    } else {
      alert('Please fill in all the fields');
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FavFormGroup>
          <FavFormLabel htmlFor="eventName">Name *</FavFormLabel>
          <FavFormInput
            id="eventName"
            type="text"
            placeholder="Name your custom location"
            name="eventName"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </FavFormGroup>

        <FavFormGroup>
          <FavFormRequiredMessage>Required fields *</FavFormRequiredMessage>
          <FavFormButton type="submit">Submit</FavFormButton>
        </FavFormGroup>
      </form>
    </div>
  );
};

export default FavForm;
