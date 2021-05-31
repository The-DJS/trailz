import React from 'react';
import styled from 'styled-components';

const FormGroup = styled.div`
  color: palevioletred;
    display: block;
  width: 300px;
  margin: 50px auto;
`;

const Label = styled.label`
margin-bottom: 0.5em;
color: palevioletred;
    display: block;
`;

const Input = styled.input`
  padding: 0.5em;
  color: palevioletred;
  background: papayawhip;
  border: none;
  border-radius: 3px;
  width: 100%;
  margin-bottom: 0.5em;
`;

const Message = styled.label`
  margin-bottom: 0.5em;
  color: palevioletred;
    display: block;
`;

const Button = styled.button`
margin-bottom: 0.5em;
color: palevioletred;
  display: block;
`;

// const message = 'this is the validation message';
const Form = ({ location }) => {
  console.log(location);
  return (
    <div>
      <Form>
        <FormGroup controlId="eventName">
          <Label>Event Title:</Label>
          <Input type="text" placeholder="Name this event" />
        </FormGroup>

        <FormGroup>
          <Label>Location:</Label>
        </FormGroup>

        <FormGroup>
          <Button type="submit">Submit</Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default Form;
