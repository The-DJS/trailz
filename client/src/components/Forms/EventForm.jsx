/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  EventFormGroup,
  EventFormLabel,
  EventFormInput,
  EventFormTextarea,
  EventFormOption,
  EventFormSelect,
  EventFormMessage,
  EventFormRequiredMessage,
  EventFormButton,
} from '../../styles/eventFormStyles';

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
        <EventFormGroup>
          <EventFormLabel htmlFor="eventName">Title *</EventFormLabel>
          <EventFormInput
            id="eventName"
            type="text"
            placeholder="Name your event"
            name="eventName"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </EventFormGroup>

        <EventFormGroup>
          <EventFormLabel htmlFor="isPublic">
            What is the main activity for this event? *
          </EventFormLabel>
          <EventFormSelect
            id="activity"
            name="activity"
            defaultValue=""
            onChange={(e) => setActivity(e.target.value)}
            required
          >
            <EventFormOption disabled value="">
              -- select an activity --
            </EventFormOption>
            <EventFormOption value="true">Hiking</EventFormOption>
            <EventFormOption value="false">Biking</EventFormOption>
            <EventFormOption value="false">Fishing</EventFormOption>
            <EventFormOption value="false">Camping</EventFormOption>
            <EventFormOption value="false">Running</EventFormOption>
            <EventFormOption value="false">Other</EventFormOption>
          </EventFormSelect>
        </EventFormGroup>

        <EventFormGroup>
          {location.name === 'Custom User Pin'
            ? (
              <>
                <EventFormLabel htmlFor="locationName">Location *</EventFormLabel>
                <EventFormInput
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
                <EventFormLabel htmlFor="locationName">Location</EventFormLabel>
                <EventFormMessage><strong>{location.name}</strong></EventFormMessage>
              </>
            )}
        </EventFormGroup>

        <EventFormGroup>
          <EventFormLabel htmlFor="date">Date *</EventFormLabel>
          <EventFormInput
            type="date"
            id="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </EventFormGroup>

        <EventFormGroup>
          <EventFormLabel htmlFor="description">Description *</EventFormLabel>
          <EventFormTextarea
            id="description"
            name="description"
            rows="4"
            cols="50"
            placeholder="Starts at noon near the gazebo./n Bring drinks!"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </EventFormGroup>

        <EventFormGroup>
          <EventFormLabel htmlFor="isPublic">Is this a public event? *</EventFormLabel>
          <EventFormSelect
            id="isPublic"
            name="isPublic"
            defaultValue=""
            onChange={(e) => setIsPublic(e.target.value)}
            required
          >
            <EventFormOption disabled value="">
              -- select an option --
            </EventFormOption>
            <EventFormOption value="true">True</EventFormOption>
            <EventFormOption value="false">False</EventFormOption>
          </EventFormSelect>
        </EventFormGroup>

        <EventFormGroup>
          <EventFormInput
            type="hidden"
            id="location"
            name="location"
            value={location.location}
          />
        </EventFormGroup>

        <EventFormGroup>
          <EventFormRequiredMessage>Required fields *</EventFormRequiredMessage>
          <EventFormButton type="submit">Submit</EventFormButton>
        </EventFormGroup>
      </form>
    </div>
  );
};

export default EventForm;
