/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  FormGroup,
  FormLabel,
  FormInput,
  FormTextarea,
  FormOption,
  FormSelect,
  FormMessage,
  FormRequiredMessage,
  FormButton,
} from '../styles/formStyles';

const EventForm = ({ location, addEvent, closeModal }) => {
  // Input fields
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState('');
  const [activity, setActivity] = useState('');
  const [customName, setCustomName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && date && description && isPublic && activity) {
      addEvent(
        title,
        location.name === 'Custom User Pin'
          ? customName
          : location.name,
        location.location.lat,
        location.location.lng,
        date,
        description,
        isPublic,
      );
      setTitle('');
      setDate('');
      setDescription('');
      setIsPublic('');
      closeModal();
    } else {
      alert('Please fill in all the fields');
    }
  };

  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <FormLabel htmlFor="eventName">Title *</FormLabel>
          <FormInput
            id="eventName"
            type="text"
            placeholder="Name your event"
            name="eventName"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="isPublic">
            What is the main activity for this event? *
          </FormLabel>
          <FormSelect
            id="activity"
            name="activity"
            defaultValue=""
            onChange={(e) => setActivity(e.target.value)}
            required
          >
            <FormOption disabled value="">
              -- select an activity --
            </FormOption>
            <FormOption value="true">Hiking</FormOption>
            <FormOption value="false">Biking</FormOption>
            <FormOption value="false">Fishing</FormOption>
            <FormOption value="false">Camping</FormOption>
            <FormOption value="false">Running</FormOption>
            <FormOption value="false">Other</FormOption>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          {location.name === 'Custom User Pin'
            ? (
              <>
                <FormLabel htmlFor="locationName">Location *</FormLabel>
                <FormInput
                  id="locationName"
                  type="text"
                  placeholder="Name your custom location"
                  name="locationName"
                  onChange={(e) => setCustomName(e.target.value)}
                  required
                />
              </>
            )
            : (
              <>
                <FormLabel htmlFor="locationName">Location</FormLabel>
                <FormMessage><strong>{location.name}</strong></FormMessage>
              </>
            )}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="date">Date *</FormLabel>
          <FormInput
            type="date"
            id="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="description">Description *</FormLabel>
          <FormTextarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            placeholder="Starts at noon near the gazebo./n Bring drinks!"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="isPublic">Is this a public event? *</FormLabel>
          <FormSelect
            id="isPublic"
            name="isPublic"
            defaultValue=""
            onChange={(e) => setIsPublic(e.target.value)}
            required
          >
            <FormOption disabled value="">
              -- select an option --
            </FormOption>
            <FormOption value="true">True</FormOption>
            <FormOption value="false">False</FormOption>
          </FormSelect>
        </FormGroup>

        <FormGroup>
          <FormInput
            type="hidden"
            id="location"
            name="location"
            value={location.location}
          />
        </FormGroup>

        <FormGroup>
          <FormRequiredMessage>Required fields *</FormRequiredMessage>
          <FormButton type="submit">Submit</FormButton>
        </FormGroup>
      </form>
    </div>
  );
};

export default EventForm;
