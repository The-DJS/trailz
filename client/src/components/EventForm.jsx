/* eslint-disable no-alert */
import React, { useState } from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  color: SlateGray;
  display: block;
  width: 85vw;
  margin: 50px auto;
`;

const Label = styled.label`
  margin-bottom: 0.5em;
  color: ForestGreen;
  display: block;
`;

const Input = styled.input`
  padding: 0.5em;
  color: SlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  &:invalid {
    border: 2px solid red;
  }
`;

const Textarea = styled.textarea`
  padding: 0.5em;
  color: LightSlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  &:invalid {
    border: 2px solid red;
  }
`;

const Option = styled.option`
  padding: 0.5em;
  color: LightSlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

const Select = styled.select`
  padding: 0.5em;
  color: SlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
  &:invalid {
    border: 2px solid red;
  }
`;

const Message = styled.label`
  margin-bottom: 0.5em;
  background: AliceBlue;
  width: 100%;
  color: SlateGray;
  display: block;
`;

const RequiredMessage = styled.label`
  margin-bottom: 0.5em;
  width: 100%;
  font-weight: bold;
  color: red;
  display: block;
`;

const Button = styled.button`
  margin-bottom: 0.5em;
  background-color: ForestGreen;
  font-weight: bolder;
  width: 10vw;
  height: 5vh;
  border: 0px;
  color: AliceBlue;
  display: block;
`;

// const message = 'this is the validation message';
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
          : location, name,
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
          <Label htmlFor="eventName">Title *</Label>
          <Input
            id="eventName"
            type="text"
            placeholder="Name your event"
            name="eventName"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="isPublic">What is the main activity for this event? *</Label>
          <Select
            id="activity"
            name="activity"
            defaultValue=""
            onChange={(e) => setActivity(e.target.value)}
            required
          >
            <Option disabled value="">-- select an activity --</Option>
            <Option value="true">Hiking</Option>
            <Option value="false">Biking</Option>
            <Option value="false">Fishing</Option>
            <Option value="false">Camping</Option>
            <Option value="false">Running</Option>
            <Option value="false">Other</Option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="locationName">Location *</Label>
          <Message id="locationName" name="locationName">
            {location.name === 'Custom User Pin'
              ? (
                <Input
                  id="locationName"
                  type="text"
                  placeholder="Name your custom location"
                  name="locationName"
                  onChange={(e) => setCustomName(e.target.value)}
                  required
                />
              )
              : location.name }
          </Message>
        </FormGroup>

        <FormGroup>
          <Label htmlFor="date">Date *</Label>
          <Input
            type="date"
            id="date"
            name="date"
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="description">Description *</Label>
          <Textarea
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
          <Label htmlFor="isPublic">Is this a public event? *</Label>
          <Select
            id="isPublic"
            name="isPublic"
            defaultValue=""
            onChange={(e) => setIsPublic(e.target.value)}
            required
          >
            <Option disabled value="">-- select an option --</Option>
            <Option value="true">True</Option>
            <Option value="false">False</Option>
          </Select>
        </FormGroup>

        <FormGroup>
          <input
            type="hidden"
            id="location"
            name="location"
            value={location.location}
          />
          {/* <input type="hidden" id="owner" name="owner" value={user._id} /> */}
        </FormGroup>

        <FormGroup>
          <RequiredMessage>Required fields *</RequiredMessage>
        </FormGroup>

        <FormGroup>
          <Button type="submit">Submit</Button>
        </FormGroup>
      </form>
    </div>
  );
};

export default EventForm;
