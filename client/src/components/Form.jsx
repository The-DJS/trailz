import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  color: SlateGray;
    display: block;
  width: 300px;
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
`;

const Textarea = styled.textarea`
  padding: 0.5em;
  color: LightSlateGray;
  background: AliceBlue;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
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
`;

const Message = styled.label`
  margin-bottom: 0.5em;
  color: SlateGray;
    display: block;
`;

const Button = styled.button`
margin-bottom: 0.5em;
background-color: ForestGreen;
font-weight: bolder;
color: AliceBlue;
  display: block;
`;

// const message = 'this is the validation message';
const Form = ({ location }) => (
  <div>
    <FormGroup>
      <Label htmlFor="eventName">Title</Label>
      <Input id="eventName" type="text" placeholder="Name your event" name="eventName" />
    </FormGroup>

    <FormGroup>
      <Label htmlFor="locationName">Location</Label>
      <Message id="locationName" name="locationName">{location.name}</Message>
    </FormGroup>

    <FormGroup>
      <Label htmlFor="date">Date</Label>
      <Input type="date" id="date" name="date" />
    </FormGroup>

    <FormGroup>
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        rows="4"
        cols="50"
        placeholder="Starts at noon near the gazebo./n Bring drinks!"
      />
    </FormGroup>

    <FormGroup>
      <Label htmlFor="isPublic">Type:</Label>
      <Select id="isPublic" name="isPublic">
        <Option value="true">Public</Option>
        <Option value="false">False</Option>
      </Select>
    </FormGroup>

    <FormGroup>
      <input type="hidden" id="location" name="location" value={location.location} />
      {/* <input type="hidden" id="owner" name="owner" value={user._id} /> */}
    </FormGroup>

    <FormGroup>
      <Button type="submit">Submit</Button>
    </FormGroup>
  </div>
);

export default Form;
