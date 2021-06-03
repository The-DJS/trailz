/* eslint-disable no-alert */
import React, { useState } from 'react';
import {
  FormGroup,
  Label,
  Input,
  Textarea,
  Option,
  Select,
  Message,
  RequiredMessage,
  Button,
} from '../styles/formStyles';

// const message = 'this is the validation message';
const AddFavForm = ({ location, addEvent, closeModal }) => {
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
          <Label htmlFor="isPublic">
            What is the main activity for this event? *
          </Label>
          <Select
            id="activity"
            name="activity"
            defaultValue=""
            onChange={(e) => setActivity(e.target.value)}
            required
          >
            <Option disabled value="">
              -- select an activity --
            </Option>
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
              : (
                location.name
              )}
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
            <Option disabled value="">
              -- select an option --
            </Option>
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
          <Button type="submit">Submit</Button>
        </FormGroup>
      </form>
    </div>
  );
};

export default AddFavForm;
